import { ref, set, update, onValue, off } from "firebase/database";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { rtdb, db } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';
import { MapSystem } from './map.js';
import { DiceSystem } from './dice.js';
import { SoundManager } from './sounds.js';
import { ChatSystem, BATTLE_PHASES } from './chat.js';

export const BattleSystem = {
  battleState: null,
  listeners: [],
  initiativeListeners: [],
  playerAbilities: {},
  participantsData: {},
  currentTurn: null,
  turnIndex: 0,
  initiative: [],
  pendingDamage: null,

  async initialize() {
    await this.subscribeToBattleState();
    await this.loadParticipantsData();
    this.subscribeToInitiativeOrder();
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

    if (state.active && state.initiative) {
      this.updateBattleUI(true);
      if (!RoomSystem.isMaster) {
        this._renderPanelForPlayers();
      } else {
        this.updateTurnIndicator(state);
      }
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

  // ── SISTEMA DE INICIATIVA ──────────────────────────────

  async startInitiativePhase() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    window._initiativePhaseActive = true;
    window._playerInitiativeSubmitted = false;

    const players = await this.getRoomPlayers();
    const npcTokens = Object.values(MapSystem.tokens || {}).filter(
      t => t.type === 'enemy' || t.type === 'npc' || t.type === 'friendly'
    );

    if (players.length === 0 && npcTokens.length === 0) {
      alert('Nenhum jogador ou NPC para rolar iniciativa.');
      return;
    }

    // NPCs auto-rolam imediatamente com 1d20 + initMod
    const npcEntries = [];
    npcTokens.forEach(token => {
      const roll = Math.floor(Math.random() * 20) + 1;
      let initMod = 0;
      if (window.MasterSystem?.npcCards) {
        const npcCard = Object.values(window.MasterSystem.npcCards)
          .find(n => token.npcCardId && n.id === token.npcCardId);
        if (npcCard) {
          initMod = npcCard.initMod || 0;
        } else {
          const matches = Object.values(window.MasterSystem.npcCards)
            .filter(n => n.name === token.name && n.color === token.color);
          if (matches.length === 1) {
            initMod = matches[0].initMod || 0;
          } else {
            const nameMatches = Object.values(window.MasterSystem.npcCards)
              .filter(n => n.name === token.name);
            if (nameMatches.length === 1) {
              initMod = nameMatches[0].initMod || 0;
            }
          }
        }
      }
      npcEntries.push({
        id: token.id,
        name: token.name,
        type: 'npc',
        dexMod: initMod,
        roll: roll,
        total: roll + initMod,
        npcCardId: token.npcCardId || null,
        avatarUrl: token.avatarUrl || ''
      });
    });

    // Salva apenas NPCs no initiativeOrder (players entrarao quando rolarem)
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), npcEntries);

    // Cria phase.rolls para todos os players rolarem
    const playerRolls = {};
    players.forEach(p => {
      playerRolls[p.id] = {
        id: p.id,
        name: p.name,
        dexMod: p.dexMod || 0,
        roll: null,
        total: null,
        avatarUrl: p.avatarUrl || ''
      };
    });

    await set(ref(rtdb, `rooms/${code}/initiativePhase`), {
      active: true,
      rolls: playerRolls,
      startedAt: Date.now(),
      startedBy: AuthSystem.currentUser?.uid
    });

    await ChatSystem.sendMessage(
      '⏱️ Iniciativa! Jogadores rolem 1d20. NPCs ja rolaram automaticamente.',
      'system'
    );

    SoundManager.playBattleStart();
  },

  async getRoomPlayers() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return [];

    const players = [];
    const sheetsRef = collection(db, 'sheets', code, 'players');

    try {
      const snap = await getDocs(sheetsRef);
      const masterUid = RoomSystem.currentRoom?.masterId;

      const [presenceSnap, initMods] = await Promise.all([
        new Promise((resolve) => {
          onValue(ref(rtdb, `rooms/${code}/presence`), (s) => resolve(s.val()), { onlyOnce: true });
        }),
        new Promise((resolve) => {
          onValue(ref(rtdb, `rooms/${code}/playerInitMods`), (s) => resolve(s.val() || {}), { onlyOnce: true });
        })
      ]);

      snap.forEach(docSnap => {
        const s = docSnap.data();
        const uid = docSnap.id;
        if (uid === masterUid) return;

        const dexVal = s.attributes?.dexterity?.value ?? s.attributes?.destreza?.value;
        const dexMod = dexVal !== undefined ? Math.floor((parseInt(dexVal) - 10) / 2) : 0;

        const initMod = initMods?.[uid]?.mod;
        const finalMod = Math.max(0, initMod !== undefined && initMod !== null ? initMod : dexMod);

        const nick = presenceSnap?.[uid]?.nick || s.nick || s.name || 'Jogador';

        players.push({
          id: uid,
          name: s.name || nick || 'Jogador',
          nick: nick,
          dexMod: finalMod,
          class: s.class || 'Aventureiro',
          avatarUrl: s.avatarUrl || ''
        });
      });
    } catch (e) {
      console.warn('Battle: Error fetching room players:', e);
    }

    return players;
  },

  // Submetido pelo jogador — registra o resultado da rolagem de iniciativa
  async submitInitiativeRoll(rollResult) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const playerId = AuthSystem.currentUser?.uid;
    if (!playerId) return;

    const rollVal = Array.isArray(rollResult) ? rollResult[0] : Array.isArray(rollResult?.results) ? rollResult.results[0] : parseInt(rollResult);
    if (isNaN(rollVal) || rollVal < 1 || rollVal > 20) {
      console.warn('Battle: Invalid initiative roll value:', rollResult);
      return;
    }

    const initRef = ref(rtdb, `rooms/${code}/initiativePhase`);

    try {
      const [phaseSnap, initMods] = await Promise.all([
        new Promise((resolve) => onValue(initRef, resolve, { onlyOnce: true })),
        new Promise((resolve) => onValue(ref(rtdb, `rooms/${code}/playerInitMods`), s => resolve(s.val() || {}), { onlyOnce: true }))
      ]);
      const phase = phaseSnap.val();
      if (!phase || !phase.active || !phase.rolls) {
        console.warn('Battle: Initiative phase not active');
        return;
      }

      // Try uid and lowercase fallback
      let playerEntry = phase.rolls[playerId];
      if (!playerEntry && playerId.toLowerCase?.()) {
        playerEntry = phase.rolls[playerId.toLowerCase()];
      }
      if (!playerEntry) {
        console.warn('Battle: Player not in initiative rolls:', playerId, 'available:', Object.keys(phase.rolls || {}));
        return;
      }

      // Previne double-submission
      if (playerEntry.roll !== null) {
        console.log('Battle: Player already submitted, skipping');
        return;
      }

      // Usa initMod do RTDB; fallback DEX
      const playerInitMod = initMods[playerId]?.mod ?? initMods[playerId.toLowerCase()]?.mod;
      const dexModVal = playerEntry.dexMod !== undefined && playerEntry.dexMod !== null ? playerEntry.dexMod : 0;
      const mod = Math.max(0, (playerInitMod !== undefined && playerInitMod !== null) ? playerInitMod : dexModVal);
      const total = rollVal + mod;

      await update(initRef, {
        [`rolls/${playerId}.roll`]: rollVal,
        [`rolls/${playerId}.total`]: total,
        [`rolls/${playerId}.mod`]: mod
      });

      console.log(`Battle: Initiative rolled for ${playerEntry.name}: ${rollVal} + ${mod} = ${total}`);

      const nick = AuthSystem.currentNick || AuthSystem.currentUser?.displayName || 'Jogador';
      await ChatSystem.sendMessage(
        `<span style="color:#a855f7;font-weight:bold;">${nick}</span> <span style="color:#a855f7;">rolou iniciativa: 🎲 <span style="font-size:1.2rem;font-weight:bold;">${rollVal}</span> (Mod ${mod >= 0 ? '+' : ''}${mod}) → <span style="font-size:1.2rem;font-weight:bold;">${total}</span></span>`,
        'initiative'
      );

      // Marca flag local imediatamente para esconder o botao
      window._playerInitiativeSubmitted = true;

      SoundManager.playDiceRoll();
      setTimeout(() => SoundManager.playDiceLand(), 300);
    } catch (e) {
      console.error('Battle: Error submitting initiative roll:', e);
    }
  },

  // ── RENDER UNIFICADO PARA PLAYERS ─────────────────────
  // Combina NPCs (do initiativeOrder) + players que ja rolaram (do initiativePhase)
  // Apenas quem ja rolou aparece na lista.

  _buildPlayerViewList() {
    const npcEntries = this._cachedInitiativeOrder?.filter(p =>
      (p.type === 'npc' || p.type === 'enemy') && p.roll !== null && p.roll !== undefined
    ).map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      dexMod: p.dexMod ?? 0,
      roll: p.roll,
      total: p.total,
      npcCardId: p.npcCardId || null,
      avatarUrl: p.avatarUrl || ''
    })) || [];

    const phaseRolls = this._phaseRolls || {};
    const playerEntries = Object.values(phaseRolls)
      .filter(p => p.roll !== null && p.roll !== undefined)
      .map(p => ({
        id: p.id,
        name: p.name,
        type: 'player',
        dexMod: p.mod ?? p.dexMod ?? 0,
        roll: p.roll,
        total: p.total,
        avatarUrl: p.avatarUrl || ''
      }));

    // Merge evitando duplicatas (phaseRolls tem precedencia)
    const merged = [...playerEntries];
    for (const npc of npcEntries) {
      if (!merged.find(e => e.id === npc.id)) {
        merged.push(npc);
      }
    }

    // Ordena por total decrescente
    merged.sort((a, b) => b.total - a.total);
    return merged;
  },

  _renderPanelForPlayers() {
    let container = document.getElementById('initiativePanelPlayers');
    if (!container) {
      const mapViewer = document.getElementById('mapViewer');
      if (!mapViewer) return;
      container = document.createElement('div');
      container.id = 'initiativePanelPlayers';
      mapViewer.parentNode.insertBefore(container, mapViewer);
    }

    const myId = AuthSystem.currentUser?.uid;
    const isMyTurn = this.battleState?.active && this.battleState?.turn === myId;
    const phaseActive = this._phaseActive || false;
    const phaseRolls = this._phaseRolls || {};
    const myPhaseEntry = phaseRolls[myId];

    const needsToRoll = phaseActive && myPhaseEntry && (myPhaseEntry.roll === null || myPhaseEntry.roll === undefined);
    const hasRolled = myPhaseEntry && myPhaseEntry.roll !== null && myPhaseEntry.roll !== undefined;

    // Build list: only NPCs + players who have rolled
    const rolledList = this._buildPlayerViewList();

    // Build roll button
    let rollButtonHtml = '';
    if (needsToRoll) {
      rollButtonHtml = `
        <div style="padding:8px;margin-bottom:6px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:6px;text-align:center;">
          <div style="color:#c4b5fd;font-size:0.75rem;margin-bottom:6px;font-family:'Cinzel',serif;">Sua vez de rolar iniciativa!</div>
          <button id="playerInitRollBtn" style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;border:none;padding:10px 28px;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:bold;letter-spacing:1px;box-shadow:0 2px 8px rgba(124,58,237,0.4);">
            🎲 1d20
          </button>
        </div>
      `;
    } else if (hasRolled) {
      const rollVal = myPhaseEntry.roll;
      const modVal = myPhaseEntry.mod !== undefined && myPhaseEntry.mod !== null ? myPhaseEntry.mod : (myPhaseEntry.dexMod ?? 0);
      const totalVal = myPhaseEntry.total;
      const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;
      rollButtonHtml = `
        <div style="padding:6px 8px;margin-bottom:6px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:6px;text-align:center;">
          <span style="color:#22c55e;font-size:0.8rem;font-family:monospace;">✅ Iniciativa: ${rollVal} ${modStr} = ${totalVal}</span>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:6px;padding:8px;margin-bottom:8px;">
        <h4 style="color:#e8c97a;margin:0 0 6px;font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:1px;">&#x2694; Iniciativa — Rodada ${this.battleState?.round || 1}
          <button id="sortInitiativeBtn" title="Ordenar por iniciativa (maior para menor)" style="background:none;border:none;color:#8a6a1a;cursor:pointer;font-size:0.75rem;margin-left:6px;vertical-align:middle;">&#x21C5;</button>
        </h4>
        ${rollButtonHtml}
        <div class="initiative-list-players">
          ${rolledList.length === 0 ? '<p style="color:#666;font-size:0.7rem;padding:8px;">Nenhum resultado ainda...</p>' : rolledList.map((p, idx) => {
            const pos = idx + 1;
            const isFirst = pos === 1;
            const isCurrent = this.battleState?.turn === (p.id || p);
            const roll = p.roll;
            const modVal = p.dexMod !== undefined && p.dexMod !== null ? p.dexMod : 0;
            const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;
            const total = p.total;
            const typeLabel = p.type === 'npc' || p.type === 'enemy' ? '🔴' : '';
            return `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;margin:2px 0;
              border-radius:4px;background:#0a0705;
              border-left:3px solid ${isCurrent ? '#c9a84c' : isFirst ? '#555' : '#333'};
              ${isCurrent ? 'background:rgba(201,168,76,0.15);' : ''}">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;
                border-radius:50%;font-size:0.65rem;font-weight:bold;
                ${isFirst ? 'background:#c9a84c;color:#1a1208;' : 'background:#333;color:#888;'}">${pos}</span>
              <span style="flex:1;color:#e8d8b0;font-size:0.75rem;font-family:'Cinzel',serif;">
                ${typeLabel} ${p.name} ${p.id === myId ? '(você)' : ''}
                ${isCurrent && isMyTurn ? '<span style="color:#22c55e;font-weight:bold;"> — SUA VEZ!</span>' : ''}
              </span>
              <span style="color:#c9a84c;font-size:0.8rem;font-family:monospace;font-weight:bold;">${roll} ${modStr} = ${total}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;

    // Sort button
    document.getElementById('sortInitiativeBtn')?.addEventListener('click', () => {
      rolledList.sort((a, b) => b.total - a.total);
      container.querySelector('.initiative-list-players').innerHTML = rolledList.map((p, idx) => {
        const pos = idx + 1;
        const isFirst = pos === 1;
        const isCurrent = this.battleState?.turn === (p.id || p);
        const modVal = p.dexMod ?? 0;
        const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;
        const typeLabel = p.type === 'npc' || p.type === 'enemy' ? '🔴' : '';
        return `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;margin:2px 0;
          border-radius:4px;background:#0a0705;
          border-left:3px solid ${isCurrent ? '#c9a84c' : isFirst ? '#555' : '#333'};
          ${isCurrent ? 'background:rgba(201,168,76,0.15);' : ''}">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;
            border-radius:50%;font-size:0.65rem;font-weight:bold;
            ${isFirst ? 'background:#c9a84c;color:#1a1208;' : 'background:#333;color:#888;'}">${pos}</span>
          <span style="flex:1;color:#e8d8b0;font-size:0.75rem;font-family:'Cinzel',serif;">
            ${typeLabel} ${p.name} ${p.id === myId ? '(você)' : ''}
            ${isCurrent && isMyTurn ? '<span style="color:#22c55e;font-weight:bold;"> — SUA VEZ!</span>' : ''}
          </span>
          <span style="color:#c9a84c;font-size:0.8rem;font-family:monospace;font-weight:bold;">${p.roll} ${modStr} = ${p.total}</span>
        </div>`;
      }).join('');
    });

    // Roll button
    const rollBtn = document.getElementById('playerInitRollBtn');
    if (rollBtn && needsToRoll) {
      rollBtn.addEventListener('click', async () => {
        if (rollBtn.disabled) return;

        rollBtn.disabled = true;
        rollBtn.innerHTML = '⏳ Rolando...';

        const rollVal = Math.floor(Math.random() * 20) + 1;

        await this.submitInitiativeRoll({ results: [rollVal] });

        // Re-render imediatamente apos submit (o listener do RTDB tambem vai atualizar)
        setTimeout(() => this._renderPanelForPlayers(), 200);

        SoundManager.playDiceRoll();
        setTimeout(() => SoundManager.playDiceLand(), 300);
      });
    }
  },

  // ── PAINEL DE INICIATIVA DRAGGABLE (MESTRE) ─────────

  subscribeToInitiativeOrder() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const orderRef = ref(rtdb, `rooms/${code}/initiativeOrder`);
    const listener = onValue(orderRef, (snap) => {
      const order = snap.val();
      if (order && Array.isArray(order)) {
        this._cachedInitiativeOrder = order;
        if (RoomSystem.isMaster) {
          this.renderInitiativePanel(order);
          this.updateInitiativeNpcDropdown();
        } else {
          this._renderPanelForPlayers();
        }
      } else {
        this._cachedInitiativeOrder = null;
        document.getElementById('initiativePanel')?.remove();
        document.getElementById('initiativePanelPlayers')?.remove();
      }
    }, (err) => {
      console.error('Battle: initiativeOrder subscription error:', err);
    });

    this.initiativeListeners.push({ ref: orderRef, listener });

    // Players subscribe to initiativePhase for realtime roll updates
    if (!RoomSystem.isMaster) {
      const phaseRef = ref(rtdb, `rooms/${code}/initiativePhase`);
      const phaseListener = onValue(phaseRef, (snap) => {
        const phase = snap.val();
        if (!phase || !phase.active || !phase.rolls) {
          this._phaseActive = false;
          this._phaseRolls = {};
          window._initiativePhaseActive = false;
          // Ainda render para mostrar NPCs que ja estao no order
          this._renderPanelForPlayers();
          return;
        }

        this._phaseActive = true;
        this._phaseRolls = phase.rolls;
        window._initiativePhaseActive = true;

        const myUid = AuthSystem.currentUser?.uid;
        if (phase.rolls[myUid]?.roll !== null && phase.rolls[myUid]?.roll !== undefined) {
          window._playerInitiativeSubmitted = true;
        }

        this._renderPanelForPlayers();
      }, (err) => {
        console.error('Battle: initiativePhase subscription error:', err);
      });

      this.initiativeListeners.push({ ref: phaseRef, listener: phaseListener });
    }
  },

  renderInitiativePanel(order) {
    const container = document.getElementById('initiativePanel');
    if (!container) {
      this.createInitiativePanel();
      this.renderInitiativePanel(order);
      return;
    }

    const list = container.querySelector('.initiative-list');
    if (!list) return;

    if (!order.length) {
      list.innerHTML = '<p class="text-muted" style="font-size:0.8rem;padding:8px;">Nenhum participante</p>';
      return;
    }

    list.innerHTML = order.map((p, idx) => {
      const pos = idx + 1;
      const isFirst = pos === 1;
      const roll = p.roll ?? '?';
      const modStr = (p.dexMod ?? 0) >= 0 ? `+${p.dexMod}` : `${p.dexMod}`;
      const total = p.total ?? '';
      const typeLabel = p.type === 'npc' ? '🔴' : '';

      return `
        <div class="initiative-item" draggable="true" data-idx="${idx}"
          style="display:flex;align-items:center;gap:8px;padding:6px 8px;margin:3px 0;background:#0a0705;
            border-radius:6px;border-left:3px solid ${isFirst ? '#c9a84c' : '#333'};
            cursor:grab;user-select:none;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;
            border-radius:50%;font-size:0.7rem;font-weight:bold;flex-shrink:0;
            ${isFirst ? 'background:#c9a84c;color:#1a1208;' : 'background:#333;color:#888;'}">
            ${pos}
          </span>
          <span style="flex:1;color:#e8d8b0;font-size:0.8rem;font-family:'Cinzel',serif;">
            ${typeLabel} ${p.name}
          </span>
          <span style="color:#a08050;font-size:0.7rem;font-family:monospace;">
            ${roll} ${modStr} = ${total}
          </span>
          <button class="remove-init-btn" data-idx="${idx}"
            style="background:none;border:none;color:#666;cursor:pointer;font-size:0.75rem;margin-left:4px;">✕</button>
        </div>
      `;
    }).join('');

    // Drag events
    list.querySelectorAll('.initiative-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.idx);
        item.style.opacity = '0.4';
      });
      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
      });
    });

    list.addEventListener('dragover', (e) => { e.preventDefault(); });

    list.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const targetItem = e.target.closest('.initiative-item');
      if (!targetItem) return;
      const toIdx = parseInt(targetItem.dataset.idx);
      if (isNaN(fromIdx) || isNaN(toIdx)) return;

      const newOrder = [...order];
      const [moved] = newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, moved);

      this.reorderInitiative(newOrder);
    });

    // Remove NPC button
    list.querySelectorAll('.remove-init-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        const newOrder = [...order];
        newOrder.splice(idx, 1);
        await this.reorderInitiative(newOrder);
      });
    });
  },

  createInitiativePanel() {
    if (!RoomSystem.isMaster) return;
    const sidebar = document.querySelector('.sidebar-right');
    if (!sidebar) return;

    const panel = document.createElement('div');
    panel.id = 'initiativePanel';
    panel.innerHTML = `
      <div class="panel">
        <h3 class="panel-title">⚔️ Iniciativa</h3>
        <div class="initiative-list"></div>
        <div id="npcInitDropdown" style="margin-top:8px;display:flex;gap:4px;align-items:center;">
          <select id="npcInitSelect" style="flex:1;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:4px;border-radius:3px;font-size:0.7rem;">
            <option value="">+ Adicionar NPC</option>
          </select>
          <button id="addNpcInitBtn" style="background:#c9a84c;border:none;color:#1a1208;padding:4px 8px;border-radius:3px;cursor:pointer;font-size:0.7rem;">OK</button>
        </div>
      </div>
    `;

    sidebar.insertBefore(panel, sidebar.querySelector('.panel'));

    document.getElementById('addNpcInitBtn')?.addEventListener('click', () => {
      const select = document.getElementById('npcInitSelect');
      if (select?.value) {
        this.addNpcToInitiative(select.value);
        select.value = '';
      }
    });
  },

  updateInitiativeNpcDropdown() {
    const select = document.getElementById('npcInitSelect');
    if (!select) return;

    select.innerHTML = '<option value="">+ Adicionar NPC</option>';
    if (window.MasterSystem?.npcCards) {
      Object.values(window.MasterSystem.npcCards).forEach(npc => {
        const opt = document.createElement('option');
        opt.value = npc.id;
        opt.textContent = npc.name;
        select.appendChild(opt);
      });
    }
  },

  async reorderInitiative(order) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), order);

    const battleState = this.battleState;
    if (battleState?.active) {
      await update(ref(rtdb, `rooms/${code}/battleState/initiative`), order.map(p => ({
        id: p.id,
        name: p.name,
        initiative: p.total ?? 0,
        type: p.type || 'player',
        roll: p.roll ?? null,
        dexMod: p.mod ?? p.dexMod ?? 0,
        npcCardId: p.npcCardId || null,
        avatarUrl: p.avatarUrl || ''
      })));

      if (battleState.turn) {
        const newIdx = order.findIndex(p => p.id === battleState.turn);
        if (newIdx >= 0) this.turnIndex = newIdx;
      }
    }
  },

  async addNpcToInitiative(npcId) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    let npc = null;
    if (window.MasterSystem?.npcCards?.[npcId]) {
      npc = window.MasterSystem.npcCards[npcId];
    }

    if (!npc) {
      const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
      if (token) npc = token;
    }

    if (!npc) return;

    const roll = Math.floor(Math.random() * 20) + 1;
    const initMod = npc.initMod || 0;
    const entry = {
      id: npc.id || `npc_init_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: npc.name,
      type: 'npc',
      dexMod: initMod,
      roll: roll,
      total: roll + initMod,
      npcCardId: npcId,
      avatarUrl: npc.avatarUrl || ''
    };

    const orderSnap = await new Promise((resolve) => {
      onValue(ref(rtdb, `rooms/${code}/initiativeOrder`), (s) => resolve(s.val() || []), { onlyOnce: true });
    });

    orderSnap.push(entry);
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), orderSnap);

    if (this.battleState?.active) {
      await set(ref(rtdb, `rooms/${code}/battleState/initiative`), orderSnap);
    }
  },

  // Mestre finaliza a fase de iniciativa
  async finalizeInitiative() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    try {
      const [phaseData, orderData] = await Promise.all([
        new Promise((resolve) => {
          onValue(ref(rtdb, `rooms/${code}/initiativePhase`), (s) => resolve(s.val()), { onlyOnce: true });
        }),
        new Promise((resolve) => {
          onValue(ref(rtdb, `rooms/${code}/initiativeOrder`), (s) => resolve(s.val() || []), { onlyOnce: true });
        })
      ]);

      if (!phaseData?.rolls && !orderData?.length) {
        console.warn('Battle: No initiative data to finalize');
        return;
      }

      // Rebuild final order: NPCs do orderData + players que rolaram do phase
      const finalOrder = [];

      // NPCs do orderData
      for (const item of (orderData || [])) {
        if (item.type === 'npc' || item.type === 'enemy') {
          finalOrder.push({ ...item });
        }
      }

      // Players que rolaram do phase
      for (const [, phaseRoll] of Object.entries(phaseData?.rolls || {})) {
        if (phaseRoll.roll !== null && phaseRoll.roll !== undefined) {
          const mod = phaseRoll.mod ?? phaseRoll.dexMod ?? 0;
          // Find cached data for avatar
          const cached = orderData?.find(c => c.id === phaseRoll.id) || {};
          finalOrder.push({
            id: phaseRoll.id,
            name: phaseRoll.name,
            type: 'player',
            dexMod: mod,
            roll: phaseRoll.roll,
            total: phaseRoll.total,
            mod: mod,
            npcCardId: null,
            avatarUrl: phaseRoll.avatarUrl || cached.avatarUrl || ''
          });
        }
      }

      // Ordena por total decrescente
      finalOrder.sort((a, b) => {
        if (a.total === null && b.total === null) return 0;
        if (a.total === null) return 1;
        if (b.total === null) return -1;
        return b.total - a.total;
      });

      if (finalOrder.length === 0) {
        console.warn('Battle: No valid participants');
        return;
      }

      // Limpa phase e salva ordem final
      await set(ref(rtdb, `rooms/${code}/initiativePhase`), null);
      await set(ref(rtdb, `rooms/${code}/initiativeOrder`), finalOrder);

      // Delay para evitar conflitos
      await new Promise(r => setTimeout(r, 3000));

      // Inicia a batalha
      await this.startBattleWithInitiative(finalOrder);
    } catch (e) {
      console.error('Battle: Error finalizing initiative:', e);
    }
  },

  async startBattleWithInitiative(initiativeOrder) {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    const sanitized = initiativeOrder
      .filter(p => p && p.id && p.name)
      .map(p => ({
        id: p.id,
        name: p.name,
        initiative: p.total ?? 0,
        type: p.type || 'player',
        roll: p.roll ?? null,
        dexMod: p.mod ?? p.dexMod ?? 0,
        npcCardId: p.npcCardId || null,
        avatarUrl: p.avatarUrl || ''
      }));

    if (sanitized.length === 0) {
      console.error('Battle: No valid participants to start battle');
      return;
    }

    await set(ref(rtdb, `rooms/${code}/battleState`), {
      active: true,
      round: 1,
      turn: sanitized[0].id,
      initiative: sanitized,
      pendingAction: null,
      lastModified: Date.now()
    });

    await ChatSystem.sendMessage('⚔️ Batalha iniciada!', 'system');

    this.initiative = sanitized;
    this.turnIndex = 0;
    SoundManager.playBattleStart();

    document.getElementById('initiativeModal')?.remove();
  },

  // Exibe modal ao mestre com tracking da iniciativa
  showInitiativeTrackerModal() {
    const existing = document.getElementById('initiativeModal');
    if (existing) existing.remove();

    const code = RoomSystem.currentRoomCode;
    const initRef = ref(rtdb, `rooms/${code}/initiativePhase`);

    const modal = document.createElement('div');
    modal.id = 'initiativeModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#1a1208;border:2px solid #c9a84c;border-radius:12px;padding:24px;min-width:400px;max-width:500px;width:90%;">
        <h3 style="color:#e8c97a;margin:0 0 16px;font-family:'Cinzel',serif;font-size:1.1rem;letter-spacing:1px;">⏱️ Fase de Iniciativa</h3>
        <p style="color:#a08050;font-size:0.85rem;margin:0 0 12px;">Aguardando jogadores rolarem 1d20...</p>
        <div id="initiativeRollList" style="max-height:300px;overflow-y:auto;font-size:0.85rem;"></div>
        <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
          <button id="finalizeInitBtn" style="background:#22c55e;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">
            Finalizar Iniciativa
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    onValue(initRef, (snap) => {
      const phase = snap.val();
      if (!phase || !phase.rolls) return;

      const list = document.getElementById('initiativeRollList');
      if (!list) return;

      const entries = Object.values(phase.rolls);
      list.innerHTML = entries.map(p => {
        const modLabel = p.mod !== undefined && p.mod !== null
          ? `Init: ${p.mod >= 0 ? '+' : ''}${p.mod}`
          : `DEX: +${p.dexMod}`;
        return `
        <div style="display:flex;align-items:center;gap:10px;padding:8px;margin-bottom:4px;background:#0a0705;border-radius:6px;
          border-left:3px solid ${p.roll !== null ? '#22c55e' : '#666'};">
          <span style="flex:1;color:#e8d8b0;">${p.name}</span>
          <span style="color:#8a6a1a;font-size:0.75rem;">${modLabel}</span>
          <span style="color:#e8c97a;font-family:monospace;min-width:50px;text-align:right;">
            ${p.roll !== null ? `🎲 ${p.roll} → <strong style="color:#22c55e;font-size:1.1rem;">${p.total}</strong>` : '<em style="color:#666;">Aguardando...</em>'}
          </span>
        </div>
      `;
      }).join('');
    }, { onlyOnce: false });

    const finalizeBtn = document.getElementById('finalizeInitBtn');
    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', async () => {
        await this.finalizeInitiative();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        const reopenBtn = document.getElementById('reopenInitiativeBtn');
        if (reopenBtn) reopenBtn.style.display = 'inline-block';
      }
    });
  },

  startBattle() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    this.startInitiativePhase();

    onValue(ref(rtdb, `rooms/${code}/initiativeOrder`), (s) => {
      this.renderInitiativePanel(s.val() || []);
    }, { onlyOnce: true });

    this.updateInitiativeNpcDropdown();

    const updateInterval = setInterval(() => {
      this.updateInitiativeNpcDropdown();
    }, 3000);

    this._npcUpdateInterval = updateInterval;
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

    await new Promise(r => setTimeout(r, 3000));

    await set(ref(rtdb, `rooms/${code}/battleState`), {
      active: false,
      round: 0,
      turn: null,
      initiative: [],
      pendingAction: null,
      lastModified: Date.now()
    });
    await set(ref(rtdb, `rooms/${code}/initiativePhase`), null);
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), []);

    await ChatSystem.sendMessage('🏆 **BATALHA ENCERRADA!** A situação foi resolvida.', 'system');

    this.battleState = null;
    this.initiative = [];
    this.turnIndex = 0;
    this._cachedInitiativeOrder = null;
    this._phaseActive = false;
    this._phaseRolls = {};
    window._initiativePhaseActive = false;
    window._playerInitiativeSubmitted = false;
    document.getElementById('initiativeModal')?.remove();
    document.getElementById('initiativePanelPlayers')?.remove();
  },

  async nextTurn() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !this.battleState?.active) return;

    await new Promise(r => setTimeout(r, 3000));

    this.turnIndex++;

    if (this.turnIndex >= this.battleState.initiative.length) {
      this.turnIndex = 0;
    }

    const newRound = this.battleState.round || 1;

    await update(ref(rtdb, `rooms/${code}/battleState`), {
      turn: this.battleState.initiative[this.turnIndex]?.id,
      round: newRound
    });
  },

  async endTurn() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !this.battleState?.active) return;

    const currentTurnParticipant = this.battleState.initiative[this.turnIndex];
    const isMyTurn = currentTurnParticipant?.id === AuthSystem.currentUser?.uid;
    const isMaster = RoomSystem.isMaster;

    if (!isMyTurn && !isMaster) return;

    await this.nextTurn();
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

  updateBattleDisplayWithPositions(state) {
    const indicator = document.getElementById('battleIndicator');
    const turnIndicator = document.getElementById('turnIndicator');

    if (state?.active && state.initiative) {
      indicator?.classList.add('active');
      if (turnIndicator) {
        turnIndicator.classList.add('active');

        let html = `<div class="turn-info"><span class="round-badge">Rodada ${state.round || 1}</span></div><div style="margin-top:8px;font-size:0.85rem;">`;
        state.initiative.forEach((p, idx) => {
          const isCurrentTurn = state.turn === (p.id || p);
          const posNumber = idx + 1;
          const isFirst = posNumber === 1;

          html += `
            <div style="display:flex;align-items:center;gap:6px;padding:4px 8px;margin:2px 0;border-radius:4px;
              ${isCurrentTurn ? 'background:rgba(212,175,55,0.3);' : ''}">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;
                border-radius:50%;font-size:0.75rem;font-weight:bold;
                ${isFirst ? 'background:#c9a84c;color:#1a1208;' : 'background:#333;color:#888;'}">
                ${posNumber}
              </span>
              <span style="${isCurrentTurn ? 'color:#22c55e;font-weight:bold;' : 'color:#e8d8b0;'}">${p.name}</span>
              <span style="font-family:monospace;color:${isFirst ? '#c9a84c' : '#e8c97a'};">${p.initiative}</span>
            </div>
          `;
        });
        html += '</div>';

        turnIndicator.innerHTML = html;
      }
    } else {
      indicator?.classList.remove('active');
      turnIndicator?.classList.remove('active');
    }
  },

  cleanup() {
    this.listeners.forEach(({ ref: battleRef, listener }) => {
      off(battleRef, 'value', listener);
    });
    this.listeners = [];
    this.initiativeListeners.forEach(({ ref: orderRef, listener }) => {
      off(orderRef, 'value', listener);
    });
    this.initiativeListeners = [];
    this.battleState = null;
    this.playerAbilities = {};
    this.initiative = [];
    this._cachedInitiativeOrder = null;
    this._phaseActive = false;
    this._phaseRolls = {};
    document.getElementById('initiativePanelPlayers')?.remove();
  }
};

export default BattleSystem;
