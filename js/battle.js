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
  playerAbilities: {}, // Mantido por compatibilidade
  participantsData: {}, // Cache completo das fichas (HP, recursos, etc)
  currentTurn: null,
  turnIndex: 0,
  initiative: [],
  pendingDamage: null,

  async initialize() {
    await this.subscribeToBattleState();
    await this.loadParticipantsData();
    if (RoomSystem.isMaster) {
      this.subscribeToInitiativeOrder();
    }
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

  // ── SISTEMA DE INICIATIVA ──────────────────────────────

  // Inicia fase de iniciativa para a batalha
  async startInitiativePhase() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    // Coleta jogadores + NPCs do mapa
    const players = await this.getRoomPlayers();
    const npcTokens = Object.values(MapSystem.tokens || {}).filter(
      t => t.type === 'enemy' || t.type === 'npc' || t.type === 'friendly'
    );

    if (players.length === 0 && npcTokens.length === 0) {
      alert('Nenhum jogador ou NPC para rolar iniciativa.');
      return;
    }

    // Cria initiativeOrder: players (roll null) + NPCs (auto roll)
    const initiativeOrder = [];

    players.forEach(p => {
      initiativeOrder.push({
        id: p.id,
        name: p.name,
        type: 'player',
        dexMod: p.dexMod || 0,
        roll: null,
        total: null,
        avatarUrl: p.avatarUrl || ''
      });
    });

    // NPCs auto-rolam 1d20
    npcTokens.forEach(token => {
      const roll = Math.floor(Math.random() * 20) + 1;
      initiativeOrder.push({
        id: token.id,
        name: token.name,
        type: 'npc',
        dexMod: 0,
        roll: roll,
        total: roll,
        npcCardId: token.npcCardId || null,
        avatarUrl: token.avatarUrl || ''
      });
    });

    // Salva initiativeOrder no RTDB
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), initiativeOrder);

    // Guarda phase.rolls apenas para players rolarem manualmente
    const playerRolls = {};
    players.forEach(p => {
      playerRolls[p.id] = {
        id: p.id,
        name: p.name,
        dexMod: p.dexMod || 0,
        roll: null,
        total: null
      };
    });

    await set(ref(rtdb, `rooms/${code}/initiativePhase`), {
      active: true,
      rolls: playerRolls,
      startedAt: Date.now(),
      startedBy: AuthSystem.currentUser?.uid
    });

    await ChatSystem.sendMessage(
      '⏱️ Iniciativa! Jogadores rolem 1d20. NPCs já rolaram automaticamente.',
      'system'
    );

    SoundManager.playBattleStart();
  },

  // Retorna jogadores da sala com dados da ficha (incluindo DEX mod e initMod do player card)
  async getRoomPlayers() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return [];

    const players = [];
    const sheetsRef = collection(db, 'sheets', code, 'players');

    try {
      const snap = await getDocs(sheetsRef);
      const masterUid = RoomSystem.currentRoom?.masterId;

      // Carrega presença e initMods em paralelo
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

        const dexVal = s.attributes?.dexterity?.value ?? s.attributes?.destreza?.value ?? 0;
        const dexMod = Math.floor((parseInt(dexVal) - 10) / 2);

        // initMod do player card sobrepõe DEX mod
        const initMod = initMods?.[uid]?.mod;
        const finalMod = initMod !== undefined && initMod !== null ? initMod : dexMod;

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

    // DiceSystem.roll retorna { results: [...] }, mas passamos direto
    const rollVal = Array.isArray(rollResult) ? rollResult[0] : Array.isArray(rollResult?.results) ? rollResult.results[0] : parseInt(rollResult);
    if (isNaN(rollVal) || rollVal < 1 || rollVal > 20) {
      console.warn('Battle: Invalid initiative roll value:', rollResult);
      return;
    }

    const initRef = ref(rtdb, `rooms/${code}/initiativePhase`);

    try {
      const snap = await new Promise((resolve) => onValue(initRef, resolve, { onlyOnce: true }));
      const phase = snap.val();
      if (!phase || !phase.active || !phase.rolls) {
        console.warn('Battle: Initiative phase not active');
        return;
      }

      // Se não tem entry para este jogador, pode ser que não foi incluído — ignora silenciosamente
      if (!phase.rolls[playerId]) {
        console.warn('Battle: Player not in initiative rolls:', playerId);
        return;
      }

      const dexMod = phase.rolls[playerId].dexMod || 0;
      // Previne double-submission
      if (phase.rolls[playerId].roll !== null) {
        console.log('Battle: Player already submitted, skipping');
        return;
      }

      const total = rollVal + dexMod;

      await update(initRef, {
        [`rolls/${playerId}.roll`]: rollVal,
        [`rolls/${playerId}.total`]: total
      });

      SoundManager.playDiceRoll();
      setTimeout(() => SoundManager.playDiceLand(), 300);
    } catch (e) {
      console.error('Battle: Error submitting initiative roll:', e);
    }
  },

  // Mestre finaliza a fase de iniciativa e resolve a ordem
  async finalizeInitiative() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    try {
      // Pega player rolls e initiativeOrder em paralelo
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

      // Mescla: players com rolls finais + NPCs já rolados
      const finalOrder = [];

      // Players: atualiza rolls do phase no order
      const orderItems = orderData || [];
      if (phaseData?.rolls) {
        orderItems.forEach(item => {
          if (item.type === 'player' && phaseData.rolls[item.id]?.roll !== null) {
            item.roll = phaseData.rolls[item.id].roll;
            item.total = phaseData.rolls[item.id].total;
          }
          finalOrder.push(item);
        });
      } else {
        finalOrder.push(...orderItems);
      }

      // Ordena por total (decrescente), null por último
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
        dexMod: p.dexMod ?? 0,
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

  // ── PAINEL DE INICIATIVA DRAGGABLE (MESTRE) ─────────

  // Subescreve a ordem de iniciativa via drag & drop
  async reorderInitiative(order) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), order);

    // Atualiza battleState se a batalha já estiver ativa
    const battleState = this.battleState;
    if (battleState?.active) {
      await update(ref(rtdb, `rooms/${code}/battleState/initiative`), order.map(p => ({
        id: p.id,
        name: p.name,
        initiative: p.total ?? 0,
        type: p.type || 'player',
        roll: p.roll ?? null,
        dexMod: p.dexMod ?? 0,
        npcCardId: p.npcCardId || null,
        avatarUrl: p.avatarUrl || ''
      })));

      // Se o turno atual mudou de posição, ajusta turnIndex
      if (battleState.turn) {
        const newIdx = order.findIndex(p => p.id === battleState.turn);
        if (newIdx >= 0) this.turnIndex = newIdx;
      }
    }
  },

  // Adiciona NPC à iniciativa com roll automático
  async addNpcToInitiative(npcId) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    // Tenta pegar do MasterSystem, senão do mapa
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
    const entry = {
      id: npc.id || `npc_init_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: npc.name,
      type: 'npc',
      dexMod: 0,
      roll: roll,
      total: roll,
      npcCardId: npcId,
      avatarUrl: npc.avatarUrl || ''
    };

    // Adiciona ao initiativeOrder no RTDB
    const orderSnap = await new Promise((resolve) => {
      onValue(ref(rtdb, `rooms/${code}/initiativeOrder`), (s) => resolve(s.val() || []), { onlyOnce: true });
    });

    orderSnap.push(entry);
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), orderSnap);

    // Se batalha ativa, atualiza battleState.initiative também
    if (this.battleState?.active) {
      await set(ref(rtdb, `rooms/${code}/battleState/initiative`), orderSnap);
    }
  },

  subscribeToInitiativeOrder() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const orderRef = ref(rtdb, `rooms/${code}/initiativeOrder`);
    const listener = onValue(orderRef, (snap) => {
      const order = snap.val();
      if (order && Array.isArray(order)) {
        this.renderInitiativePanel(order);
      } else {
        // Remove painel se iniciativa não existe
        document.getElementById('initiativePanel')?.remove();
      }
    });

    this.initiativeListeners.push({ ref: orderRef, listener });
  },

  renderInitiativePanel(order) {
    const container = document.getElementById('initiativePanel');
    if (!container) {
      // Cria painel se não existe
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
      const modStr = p.dexMod >= 0 ? `+${p.dexMod}` : `${p.dexMod}`;
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

    // Setup drag events
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
          <button id="addNpcInitBtn" style="background:#c9a84c;border:none;color:white;padding:4px 8px;border-radius:3px;cursor:pointer;font-size:0.7rem;">OK</button>
        </div>
      </div>
    `;

    // Insert before the first panel in sidebar
    sidebar.insertBefore(panel, sidebar.querySelector('.panel'));

    // Wire up the add NPC button
    document.getElementById('addNpcInitBtn')?.addEventListener('click', () => {
      const select = document.getElementById('npcInitSelect');
      if (select?.value) {
        this.addNpcToInitiative(select.value);
        select.value = '';
      }
    });
  },

  // Atualiza dropdown de NPCs no painel de iniciativa
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

    // Listener em tempo real dos resultados
    onValue(initRef, (snap) => {
      const phase = snap.val();
      if (!phase || !phase.rolls) return;

      const list = document.getElementById('initiativeRollList');
      if (!list) return;

      const entries = Object.values(phase.rolls);
      list.innerHTML = entries.map(p => `
        <div style="display:flex;align-items:center;gap:10px;padding:8px;margin-bottom:4px;background:#0a0705;border-radius:6px;
          border-left:3px solid ${p.roll !== null ? '#22c55e' : '#666'};">
          <span style="flex:1;color:#e8d8b0;">${p.name}</span>
          <span style="color:#8a6a1a;font-size:0.75rem;">DEX: +${p.dexMod}</span>
          <span style="color:#e8c97a;font-family:monospace;min-width:50px;text-align:right;">
            ${p.roll !== null ? `🎲 ${p.roll} → <strong style="color:#22c55e;font-size:1.1rem;">${p.total}</strong>` : '<em style="color:#666;">Aguardando...</em>'}
          </span>
        </div>
      `).join('');
    }, { onlyOnce: false });

    const finalizeBtn = document.getElementById('finalizeInitBtn');
    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', async () => {
        await this.finalizeInitiative();
      });
    }

    // Fecha ao clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'; // só esconde, não remove
        // Mostra botão para reabrir
        const reopenBtn = document.getElementById('reopenInitiativeBtn');
        if (reopenBtn) reopenBtn.style.display = 'inline-block';
      }
    });
  },

  // Exibe modal ao jogador para rolar iniciativa
  showPlayerInitiativeModal() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const initRef = ref(rtdb, `rooms/${code}/initiativePhase`);
    let modalOpen = false;

    onValue(initRef, (snap) => {
      const phase = snap.val();
      if (!phase || !phase.active) {
        document.getElementById('initiativePlayerModal')?.remove();
        modalOpen = false;
        return;
      }

      const playerId = AuthSystem.currentUser?.uid;
      if (!phase.rolls || !phase.rolls[playerId]) {
        return;
      }

      if (phase.rolls[playerId].roll !== null) {
        // Já rolou — fecha modal
        document.getElementById('initiativePlayerModal')?.remove();
        modalOpen = false;
        return;
      }

      if (modalOpen) return; // já está aberto
      modalOpen = true;

      const modal = document.createElement('div');
      modal.id = 'initiativePlayerModal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;';
      modal.innerHTML = `
        <div style="background:#1a1208;border:2px solid #c9a84c;border-radius:12px;padding:24px;min-width:350px;text-align:center;">
          <h3 style="color:#e8c97a;margin:0 0 8px;font-family:'Cinzel',serif;">⏱️ Rolar Iniciativa</h3>
          <p style="color:#a08050;font-size:0.85rem;margin:0 0 16px;">Role 1d20 para definir a ordem de turno!</p>
          <div id="playerInitResult" style="font-size:2.5rem;color:#e8c97a;margin:12px 0;font-family:monospace;">-</div>
          <button id="rollInitiativeBtn" style="background:#c9a84c;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:bold;">
            🎲 Rolar 1d20
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      const rollBtn = document.getElementById('rollInitiativeBtn');
      if (rollBtn) {
        rollBtn.addEventListener('click', async () => {
          rollBtn.disabled = true;
          rollBtn.textContent = 'Rolando...';

          const display = document.getElementById('playerInitResult');
          const diceRoll = await DiceSystem.rollWithAnimation('1d20', display, { animate: true });

          // Passa o objeto completo { results, total, ... } para que submitInitiativeRoll extraia corretamente
          await this.submitInitiativeRoll({ results: diceRoll.results });

          // Exibe resultado com modificador
          const dexMod = phase.rolls[playerId]?.dexMod || 0;
          const total = diceRoll.results[0] + dexMod;
          display.innerHTML = `🎲 ${diceRoll.results[0]} <span style="font-size:1.2rem;color:#a08050;">+ ${dexMod} = ${total}</span>`;
          rollBtn.textContent = '✅ Rola registrada!';

          ChatSystem.sendMessage(`rolou iniciativa: 🎲 ${diceRoll.results[0]} (DEX ${dexMod >= 0 ? '+' : ''}${dexMod}) → ${total}`, 'action');
        });
      }
    }, { onlyOnce: false });
  },

  async startBattle() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    // Inicia a fase de iniciativa (players + auto-roll NPCs)
    await this.startInitiativePhase();

    // Exibe painel de iniciativa draggable
    const orderSnap = await new Promise((resolve) => {
      onValue(ref(rtdb, `rooms/${code}/initiativeOrder`), (s) => resolve(s.val() || []), { onlyOnce: true });
    });
    this.renderInitiativePanel(orderSnap);
    this.updateInitiativeNpcDropdown();

    // Atualiza dropdown periodicamente quando NPCs mudam
    const updateInterval = setInterval(() => {
      this.updateInitiativeNpcDropdown();
    }, 3000);

    // Guarda intervalo para cleanup
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

    await set(ref(rtdb, `rooms/${code}/battleState`), null);
    await set(ref(rtdb, `rooms/${code}/initiativePhase`), null);
    await set(ref(rtdb, `rooms/${code}/initiativeOrder`), null);
    await ChatSystem.sendMessage('🏆 **BATALHA ENCERRADA!** A situação foi resolvida.', 'system');

    this.battleState = null;
    this.initiative = [];
    this.turnIndex = 0;
    document.getElementById('initiativeModal')?.remove();
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
          const isYourTurn = isCurrentTurn && (p.id === AuthSystem.currentUser?.uid);

          html += `
            <div style="display:flex;align-items:center;gap:6px;padding:4px 8px;margin:2px 0;border-radius:4px;
              ${isCurrentTurn ? 'background:rgba(212,175,55,0.3);' : ''}">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;
                border-radius:50%;font-size:0.75rem;font-weight:bold;
                ${isFirst ? 'background:#c9a84c;color:#1a1208;' : 'background:#333;color:#888;'}">
                ${posNumber}
              </span>
              <span style="${isYourTurn ? 'color:#22c55e;font-weight:bold;' : 'color:#e8d8b0;'}">${p.name}</span>
              <span style="color:#a08050;font-size:0.75rem;">(DEX +${p.dexMod || 0})</span>
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
    this.battleState = null;
    this.playerAbilities = {};
    this.initiative = [];
  }
};

export default BattleSystem;