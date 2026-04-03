import { ref, set, update, onValue, off } from "firebase/database";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { rtdb, db } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';
import { DiceSystem } from './dice.js';
import { SoundManager } from './sounds.js';
import { ChatSystem, BATTLE_PHASES } from './chat.js';

export const BattleSystem = {
  battleState: null,
  listeners: [],
  playerAbilities: {}, // Mantido por compatibilidade
  participantsData: {}, // Cache completo das fichas (HP, recursos, etc)
  currentTurn: null,
  turnIndex: 0,
  initiative: [],
  pendingDamage: null,

  async initialize() {
    await this.subscribeToBattleState();
    await this.loadParticipantsData();
  },

  async loadParticipantsData() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetsRef = collection(db, 'sheets', code, 'players');
    const snap = await getDocs(sheetsRef);
    
    snap.forEach(doc => {
      const sheet = { id: doc.id, ...doc.data() };
      this.participantsData[doc.id] = sheet;
      
      const abilities = [
        ...(sheet.attacks || []),
        ...(sheet.spells || [])
      ];
      this.playerAbilities[doc.id] = abilities;
    });
  },

  async subscribeToBattleState() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const battleRef = ref(rtdb, `rooms/${code}/battleState`);
    
    const listener = onValue(battleRef, (snap) => {
      const data = snap.val();
      this.battleState = data;
      this.onBattleStateChange(data);
    });

    this.listeners.push({ ref: battleRef, listener });
  },

  onBattleStateChange(state) {
    if (!state) return;

    if (state.active) {
      this.updateBattleUI(true);
      this.updateTurnIndicator(state);
    } else {
      this.updateBattleUI(false);
    }
  },

  updateBattleUI(active) {
    const indicator = document.getElementById('battleIndicator');
    const toggleBtn = document.getElementById('toggleBattleBtn');
    
    if (indicator) {
      indicator.classList.toggle('active', active);
    }
    
    if (toggleBtn && RoomSystem.isMaster) {
      toggleBtn.textContent = active ? '⚔️ Desativar Batalha' : '⚔️ Ativar Batalha';
      toggleBtn.classList.toggle('btn-danger', active);
      toggleBtn.classList.toggle('btn-success', !active);
    }

    document.body.classList.toggle('battle-mode', active);
  },

  updateTurnIndicator(state) {
    const container = document.getElementById('turnIndicator');
    if (!container || !state) return;

    if (state.turn) {
      const currentParticipant = state.initiative?.find(i => 
        (i.id || i) === state.turn
      );
      const name = typeof currentParticipant === 'object' ? currentParticipant.name : currentParticipant;
      
      container.innerHTML = `
        <div class="turn-info">
          <span class="round-badge">Rodada ${state.round || 1}</span>
          <span class="turn-name">Vez de: ${name || '---'}</span>
        </div>
      `;
      container.style.display = 'block';
    }
  },

  async startBattle() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    const participants = await this.rollInitiative();
    
    await set(ref(rtdb, `rooms/${code}/battleState`), {
      active: true,
      round: 1,
      turn: participants[0]?.id || participants[0],
      initiative: participants.map(p => ({ 
        id: p.id, 
        name: p.name, 
        initiative: p.initiative,
        type: p.type
      })),
      pendingAction: null,
      lastModified: Date.now()
    });

    await ChatSystem.sendMessage('⚔️ **BATALHA INICIADA!** A primeira rodada começou!', 'system');
    
    this.initiative = participants;
    this.turnIndex = 0;
  },

  async rollInitiative() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return [];

    const participants = [];
    
    Object.values(MapSystem.tokens || {}).forEach(token => {
      if (token.type !== 'object') {
        participants.push({
          id: token.id,
          name: token.name,
          type: token.type,
          initiative: Math.floor(Math.random() * 20) + 1
        });
      }
    });

    const sheetsRef = collection(db, 'sheets', code, 'players');
    const snap = await getDocs(sheetsRef);
    
    snap.forEach(doc => {
      const sheet = doc.data();
      if (sheet.name) {
        participants.push({
          id: doc.id,
          name: sheet.name,
          type: 'player',
          initiative: Math.floor(Math.random() * 20) + 1
        });
      }
    });

    participants.sort((a, b) => b.initiative - a.initiative);
    
    return participants;
  },

  async endBattle() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    await set(ref(rtdb, `rooms/${code}/battleState`), null);
    await ChatSystem.sendMessage('🏆 **BATALHA ENCERRADA!** A situação foi resolvida.', 'system');
    
    this.battleState = null;
    this.initiative = [];
    this.turnIndex = 0;
  },

  async nextTurn() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !this.battleState?.active) return;

    this.turnIndex++;
    
    if (this.turnIndex >= this.battleState.initiative.length) {
      this.turnIndex = 0;
      await update(ref(rtdb, `rooms/${code}/battleState`), {
        round: (this.battleState.round || 1) + 1
      });
      await ChatSystem.sendMessage(`🔄 **Rodada ${this.battleState.round + 1}** começou!`, 'system');
    }

    const nextTurn = this.battleState.initiative[this.turnIndex];
    
    await update(ref(rtdb, `rooms/${code}/battleState`), {
      turn: nextTurn?.id || nextTurn
    });
  },

  parsePlayerAction(message, playerId) {
    const abilities = this.playerAbilities[playerId] || [];
    const normalizedMessage = message.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    for (const ability of abilities) {
      const keywords = ability.keyWords || [ability.name?.toLowerCase()];
      
      const match = keywords.some(keyword => {
        const normalizedKeyword = keyword.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedMessage.includes(normalizedKeyword);
      });

      if (match) {
        const target = this.extractTarget(message, ability.name);
        
        return {
          detected: true,
          ability: ability,
          target: target,
          dice: ability.dice,
          playerId: playerId
        };
      }
    }

    return { detected: false };
  },

  extractTarget(message, abilityName) {
    const patterns = [
      /(?:no?|no|in|vs|versus)\s+(.+?)(?:\s+e|\s*$)/i,
      /(?:alvo|target)\s*:?\s*(.+?)(?:\s*$)/i
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  },

  async applyDamage(targetId, damage) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const token = MapSystem.tokens?.[targetId];
    if (token) {
      const newHP = Math.max(0, (token.hp || 0) - damage);
      await MapSystem.updateToken(targetId, { hp: newHP });
      
      if (newHP <= 0) {
        await this.handleTokenDeath(targetId);
      }
    } else {
      const sheetRef = doc(db, 'sheets', code, 'players', targetId);
      const sheet = this.participantsData[targetId];
      
      if (sheet) {
        const newHP = Math.max(0, Math.min(sheet.hpMax || 20, (sheet.hp || 0) - damage));
        await updateDoc(sheetRef, { hp: newHP });
        
        // Atualiza cache local
        this.participantsData[targetId].hp = newHP;
      } else {
        console.warn("BattleSystem: Ficha não encontrada para aplicação de dano:", targetId);
      }
    }
  },

  async handleTokenDeath(tokenId) {
    const token = MapSystem.tokens?.[tokenId];
    if (!token) return;

    await ChatSystem.sendMessage(`💀 **${token.name}** foi derrotado!`, 'system');
    SoundManager.playDeath(token.type === 'enemy' ? 'enemy' : 'monster');
    
    setTimeout(async () => {
      await MapSystem.removeToken(tokenId);
    }, 2000);
  },

  async processBattleAction(parsedAction) {
    if (!parsedAction?.detected) return null;

    const { ability, target, dice, playerId } = parsedAction;
    
    const rollResult = DiceSystem.roll(dice);
    
    const chatMessage = {
      senderId: playerId,
      senderNick: AuthSystem.currentNick,
      text: `Usou **${ability.name}**${target ? ` contra **${target}**` : ''}! 🎲 ${dice}: ${rollResult.total} (${rollResult.results.join(', ')})`,
      type: 'battle',
      timestamp: Date.now(),
      parsedAction: {
        ability: ability.name,
        target: target,
        dice: dice,
        result: rollResult.total,
        phase: 'awaiting_master'
      }
    };

    if (ability.manaCost) {
      const sheetRef = doc(db, 'sheets', RoomSystem.currentRoomCode, 'players', playerId);
      const currentMana = this.playerAbilities[playerId]?.resources?.mana || 0;
      if (currentMana < ability.manaCost) {
        await ChatSystem.sendMessage(`⚠️ **${AuthSystem.currentNick}** não tem mana suficiente!`, 'system');
        return null;
      }
    }

    SoundManager.playSpellCast?.(ability.soundType);
    
    return {
      ...chatMessage,
      rollResult: rollResult
    };
  },

  async masterConfirmDamage(targetName, finalDamage, messageId) {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    const targetToken = Object.values(MapSystem.tokens || {}).find(
      t => t.name?.toLowerCase().includes(targetName?.toLowerCase())
    );

    if (targetToken) {
      await this.applyDamage(targetToken.id, finalDamage);
      await ChatSystem.sendMessage(
        `💥 **${targetName}** sofreu **${finalDamage}** de dano! HP: ${Math.max(0, targetToken.hp - finalDamage)}/${targetToken.hpMax}`,
        'battle'
      );
    } else {
      await ChatSystem.sendMessage(
        `💥 **${finalDamage}** de dano aplicado em **${targetName}**!`,
        'battle'
      );
    }
  },

  cleanup() {
    this.listeners.forEach(({ ref: battleRef, listener }) => {
      off(battleRef, 'value', listener);
    });
    this.listeners = [];
    this.battleState = null;
    this.playerAbilities = {};
    this.initiative = [];
  }
};

export default BattleSystem;
