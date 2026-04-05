import { doc, updateDoc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { ref, set, onValue, off } from "firebase/database";
import { db, rtdb } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';
import { MapSystem, TokenTypes } from './map.js';
import { BattleSystem } from './battle.js';
import { SoundManager } from './sounds.js';

export const MasterSystem = {
  playerSheets: {},
  listeners: [],
  npcTemplates: [
    { name: 'Orc', hp: 30, type: TokenTypes.ENEMY, color: '#dc2626' },
    { name: 'Goblin', hp: 10, type: TokenTypes.ENEMY, color: '#16a34a' },
    { name: 'Esqueleto', hp: 20, type: TokenTypes.ENEMY, color: '#e5e5e5' },
    { name: 'Lobo', hp: 15, type: TokenTypes.ENEMY, color: '#6b7280' },
    { name: 'Mago', hp: 25, type: TokenTypes.NPC, color: '#3b82f6' },
    { name: 'Aldeão', hp: 8, type: TokenTypes.NPC, color: '#92400e' },
    { name: 'Guarda', hp: 20, type: TokenTypes.NPC, color: '#1e40af' }
  ],

  async initialize() {
    if (!RoomSystem.isMaster) {
      console.warn('MasterSystem: Apenas o mestre pode inicializar');
      return;
    }

    document.getElementById('btnAddHostil')?.addEventListener('click', () => this.openNpcModal('hostile'));
    document.getElementById('btnAddNeutro')?.addEventListener('click', () => this.openNpcModal('neutral'));
    document.getElementById('btnAddAmigavel')?.addEventListener('click', () => this.openNpcModal('friendly'));

    await this.subscribeToPlayerSheets();
    // setupNPCPanel removido — novo sistema de NPC está no master.html
  },

  async subscribeToPlayerSheets() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetsRef = collection(db, 'sheets', code, 'players');
    
    const listener = onSnapshot(sheetsRef, (snap) => {
      snap.forEach(doc => {
        const sheet = { id: doc.id, ...doc.data() };
        if (doc.id !== AuthSystem.currentUser?.uid) {
          this.playerSheets[doc.id] = sheet;
        }
      });
      this.renderPlayerSheets();
    });

    this.listeners.push({ ref: sheetsRef, listener, type: 'firestore' });
  },

  renderPlayerSheets() {
    const container = document.getElementById('masterPlayerSheets');
    if (!container) return;

    const sheets = Object.values(this.playerSheets);
    if (sheets.length === 0) {
      container.innerHTML = '<p class="text-muted">Nenhuma ficha de jogador ainda</p>';
      return;
    }

    container.innerHTML = sheets.map(sheet => {
      const hpPct = Math.max(0, Math.min(100, ((sheet.hp || 0) / (sheet.hpMax || 20)) * 100));
      const avatarContent = sheet.avatarUrl
        ? `<img src="${sheet.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
        : `<span style="font-size:1.2rem;">${sheet.name?.[0]?.toUpperCase() || '?'}</span>`;

      return `
        <div class="master-sheet-card" data-player-id="${sheet.id}"
          draggable="true"
          ondragstart="MasterSystem.onPlayerCardDragStart(event, '${sheet.id}')">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:40px;height:40px;border-radius:50%;border:2px solid #c9a84c;
              background:#1a1208;overflow:hidden;display:flex;align-items:center;
              justify-content:center;flex-shrink:0;">
              ${avatarContent}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:#e8c97a;
                white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${sheet.name || 'Sem nome'}
              </div>
              <div style="font-size:0.65rem;color:#a08050;">
                ${sheet.class || 'Aventureiro'} Nv.${sheet.level || 1}
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -1)">-1</button>
            <span style="font-family:'Cinzel',serif;font-size:0.8rem;color:#e8d8b0;margin:0 4px;">
              ${sheet.hp || 0}/${sheet.hpMax || 20}
            </span>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 5)">+5</button>
          </div>
          <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;margin-bottom:6px;">
            <div style="height:100%;width:${hpPct}%;background:${hpPct>50?'#16a34a':hpPct>25?'#ca8a04':'#dc2626'};transition:width 0.3s;"></div>
          </div>
          ${(sheet.status || []).length > 0 ? `
            <div style="font-size:0.6rem;color:#f1c40f;">⚠ ${sheet.status.join(', ')}</div>
          ` : ''}
          <div style="display:flex;gap:4px;margin-top:6px;">
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;"
              onclick="MasterSystem.showStatusModal('${sheet.id}', '${sheet.name}')">Status</button>
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;"
              onclick="MasterSystem.dragPlayerToMap('${sheet.id}')">🗺</button>
          </div>
        </div>
      `;
    }).join('');
  },

  onPlayerCardDragStart(event, playerId) {
    const sheet = this.playerSheets[playerId];
    if (!sheet) return;
    event.dataTransfer.setData('playerCard', JSON.stringify({
      playerId,
      name: sheet.name,
      avatarUrl: sheet.avatarUrl || '',
      hp: sheet.hp,
      hpMax: sheet.hpMax
    }));
    event.dataTransfer.effectAllowed = 'copy';
  },

  async dragPlayerToMap(playerId) {
    const sheet = this.playerSheets[playerId];
    if (!sheet) return;
    await MapSystem.addToken({
      name: sheet.name,
      type: 'player',
      hp: sheet.hp,
      hpMax: sheet.hpMax,
      avatarUrl: sheet.avatarUrl || '',
      color: '#c9a84c',
      ownerId: playerId
    });
  },

  async adjustPlayerHP(playerId, delta) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetRef = doc(db, 'sheets', code, 'players', playerId);
    const sheet = this.playerSheets[playerId];
    
    if (!sheet) return;

    const newHP = Math.max(0, Math.min(sheet.hpMax, (sheet.hp || 0) + delta));
    
    await updateDoc(sheetRef, { hp: newHP });
    
    this.playerSheets[playerId] = { ...sheet, hp: newHP };
    this.renderPlayerSheets();

    SoundManager.playDiceLand();
  },

  showStatusModal(playerId, playerName) {
    const sheet = this.playerSheets[playerId];
    if (!sheet) return;

    const availableStatus = [
      'Envenenado', 'Atordoado', 'Paralizado', 'Assustado',
      'Protegido', 'Bendito', 'Abraçado', 'Enfeitiçado',
      'Cego', 'Surdo', 'Mudo', 'Sangrando'
    ];

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Status: ${playerName}</h3>
        <div class="status-grid">
          ${availableStatus.map(status => `
            <label class="status-checkbox">
              <input type="checkbox" value="${status}" 
                ${sheet.status?.includes(status) ? 'checked' : ''}
                onchange="MasterSystem.togglePlayerStatus('${playerId}', '${status}', this.checked)">
              ${status}
            </label>
          `).join('')}
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Fechar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  async togglePlayerStatus(playerId, statusName, add) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetRef = doc(db, 'sheets', code, 'players', playerId);
    const sheet = this.playerSheets[playerId];
    
    if (!sheet) return;

    let status = [...(sheet.status || [])];
    
    if (add && !status.includes(statusName)) {
      status.push(statusName);
    } else if (!add) {
      status = status.filter(s => s !== statusName);
    }
    
    await updateDoc(sheetRef, { status });
    this.playerSheets[playerId] = { ...sheet, status };
    this.renderPlayerSheets();
  },

  createNpcFromStaticModal(type, modalId) {
    const name = document.getElementById('npcModalName')?.value?.trim() || 'NPC';
    const hp   = parseInt(document.getElementById('npcModalHp')?.value)    || 20;
    const hpMax= parseInt(document.getElementById('npcModalHpMax')?.value) || 20;
    const colors = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const typeMap = { hostile: 'enemy', neutral: 'npc', friendly: 'friendly' };

    const npc = {
      id: `npc_${Date.now()}`,
      name,
      hp,
      hpMax,
      type: typeMap[type],
      color: colors[type],
      status: 'Normal'
    };

    if (!this.npcCards) this.npcCards = {};
    this.npcCards[npc.id] = npc;
    this.renderNpcCard(npc);
  },

  openNpcModal(type) {
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
    const colors = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const labels = { hostile: 'Hostil', neutral: 'Neutro', friendly: 'Amigável' };
    const modalId = Date.now();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
    modal.innerHTML = `
      <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:8px;padding:24px;min-width:300px;">
        <h3 style="color:#e8c97a;margin-bottom:16px;">Novo NPC ${labels[type]}</h3>
        <div style="margin-bottom:12px;">
          <label for="npcModalName_${modalId}" style="display:block;margin-bottom:4px;font-size:0.85rem;">Nome</label>
          <input id="npcModalName_${modalId}" type="text" placeholder="Nome do NPC"
            style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
        </div>
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <div style="flex:1;">
            <label for="npcModalHp_${modalId}" style="display:block;margin-bottom:4px;font-size:0.85rem;">HP</label>
            <input id="npcModalHp_${modalId}" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
          </div>
          <div style="flex:1;">
            <label for="npcModalHpMax_${modalId}" style="display:block;margin-bottom:4px;font-size:0.85rem;">HP Máx</label>
            <input id="npcModalHpMax_${modalId}" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="btnCancelNpc_${modalId}" onclick="this.closest('.modal-overlay').remove()"
            style="background:transparent;border:1px solid #8a6a1a;color:#c9a84c;padding:8px 16px;border-radius:4px;cursor:pointer;">
            Cancelar
          </button>
          <button id="btnCreateNpc_${modalId}" onclick="window.MasterSystem.createNpcFromModal('${type}', '${modalId}')"
            style="background:${colors[type]};border:none;color:white;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;">
            Criar NPC
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById(`btnCancelNpc_${modalId}`).addEventListener('click', () => {
      modal.remove();
    });

    document.getElementById(`btnCreateNpc_${modalId}`).addEventListener('click', () => {
      this.createNpcFromModal(type, modalId);
    });

    document.getElementById(`npcModalName_${modalId}`).focus();
  },

  createNpcFromModal(type, modalId) {
    const name = document.getElementById(`npcModalName_${modalId}`)?.value?.trim() || 'NPC';
    const hp   = parseInt(document.getElementById(`npcModalHp_${modalId}`)?.value)    || 20;
    const hpMax= parseInt(document.getElementById(`npcModalHpMax_${modalId}`)?.value) || 20;
    const colors = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const typeMap = { hostile: 'enemy', neutral: 'npc', friendly: 'friendly' };

    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());

    const npc = {
      id: `npc_${Date.now()}`,
      name, hp, hpMax,
      status: '',
      type: typeMap[type] || 'npc',
      alignment: type,
      color: colors[type]
    };

    if (!this.npcCards) this.npcCards = {};
    this.npcCards[npc.id] = npc;

    this.renderNpcCard(npc);
  },

  renderNpcCard(npc) {
    const container = document.getElementById('npcCardsContainer');
    if (!container) return;

    const colors   = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const labels   = { hostile: 'Hostil',  neutral: 'Neutro',  friendly: 'Amigável' };
    const statuses = ['—','Caído','Sangrando','Paralizado','Atordoado','Envenenado','Assustado','Cego'];
    const hpPct    = Math.max(0, Math.min(100, (npc.hp / npc.hpMax) * 100));
    const color    = colors[npc.alignment] || npc.color || '#888';

    document.getElementById(`npc-card-${npc.id}`)?.remove();

    const card = document.createElement('div');
    card.id = `npc-card-${npc.id}`;
    card.draggable = true;
    card.style.cssText = `
      width:140px; background:#1a1208; border:2px solid ${color};
      border-radius:6px; padding:10px; position:relative;
      flex-shrink:0; cursor:grab;
    `;
    card.innerHTML = `
      <button onclick="MasterSystem.removeNpc('${npc.id}')"
        style="position:absolute;top:4px;right:4px;background:none;border:none;color:#888;cursor:pointer;font-size:0.75rem;">✕</button>

      <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:${color};margin-bottom:6px;padding-right:16px;
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${npc.name}">
        ${npc.name}
      </div>

      <span style="font-size:0.55rem;background:${color}22;border:1px solid ${color};
        color:${color};padding:1px 5px;border-radius:2px;font-family:'Cinzel',serif;letter-spacing:1px;">
        ${labels[npc.alignment] || 'NPC'}
      </span>

      <div style="margin-top:8px;">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
          <button onclick="MasterSystem.adjustNpcHP('${npc.id}',-1)"
            style="background:#dc2626;border:none;color:white;width:20px;height:20px;border-radius:3px;cursor:pointer;font-size:0.8rem;">−</button>
          <input id="npc-hp-${npc.id}" type="number" value="${npc.hp}" min="0" max="${npc.hpMax}"
            aria-label="Vida atual do NPC"
            onchange="MasterSystem.setNpcHP('${npc.id}', this.value)"
            style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
              color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.75rem;">
          <span style="color:#666;font-size:0.7rem;">/${npc.hpMax}</span>
          <button onclick="MasterSystem.adjustNpcHP('${npc.id}',1)"
            style="background:#16a34a;border:none;color:white;width:20px;height:20px;border-radius:3px;cursor:pointer;font-size:0.8rem;">+</button>
        </div>
        <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;">
          <div id="npc-hpbar-${npc.id}" style="height:100%;width:${hpPct}%;background:${hpPct>50?'#16a34a':hpPct>25?'#ca8a04':'#dc2626'};transition:width 0.3s;"></div>
        </div>
      </div>

      <select id="npc-status-${npc.id}" aria-label="Status do NPC" onchange="MasterSystem.setNpcStatus('${npc.id}', this.value)"
        style="width:100%;margin-top:8px;background:#0a0705;border:1px solid #8a6a1a;
          color:#a08050;border-radius:3px;padding:3px;font-size:0.65rem;">
        ${statuses.map(s => `<option value="${s}" ${npc.status===s?'selected':''}>${s}</option>`).join('')}
      </select>

      ${npc.status && npc.status !== '—' ? `
        <div style="margin-top:4px;font-size:0.6rem;color:#f1c40f;text-align:center;">⚠ ${npc.status}</div>
      ` : ''}
    `;

    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('npcCard', JSON.stringify(npc));
      e.dataTransfer.effectAllowed = 'copy';
    });

    container.appendChild(card);
  },

  adjustNpcHP(npcId, delta) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hp = Math.max(0, Math.min(npc.hpMax, npc.hp + delta));
    this.npcCards[npcId] = npc;
    this.renderNpcCard(npc);
    const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
    if (token) MapSystem.updateToken(token.id, { hp: npc.hp });
  },

  setNpcHP(npcId, value) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hp = Math.max(0, Math.min(npc.hpMax, parseInt(value) || 0));
    this.npcCards[npcId] = npc;
    const pct = Math.max(0, Math.min(100, (npc.hp / npc.hpMax) * 100));
    const bar = document.getElementById(`npc-hpbar-${npcId}`);
    if (bar) {
      bar.style.width = pct + '%';
      bar.style.background = pct > 50 ? '#16a34a' : pct > 25 ? '#ca8a04' : '#dc2626';
    }
    const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
    if (token) MapSystem.updateToken(token.id, { hp: npc.hp });
  },

  setNpcStatus(npcId, status) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.status = status;
    this.npcCards[npcId] = npc;
    this.renderNpcCard(npc);
  },

  removeNpc(npcId) {
    delete this.npcCards?.[npcId];
    document.getElementById(`npc-card-${npcId}`)?.remove();
    const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
    if (token) MapSystem.removeToken(token.id);
  },

  async handleMapDrop(e) {
    e.preventDefault();
    
    // Tratamento de TAREFA 3e - npcCard
    const npcCardData = e.dataTransfer.getData('npcCard');
    if (npcCardData) {
      const npc = JSON.parse(npcCardData);
      await MapSystem.addToken({
        name: npc.name,
        type: npc.type,
        hp: npc.hp,
        hpMax: npc.hpMax,
        color: npc.color,
        npcCardId: npc.id
      });
      SoundManager.playNotification();
      return;
    }

    // Tratamento de TAREFA 4c - playerCard
    const playerCardData = e.dataTransfer.getData('playerCard');
    if (playerCardData) {
      const p = JSON.parse(playerCardData);
      await MapSystem.addToken({
        name: p.name,
        type: 'player',
        hp: p.hp,
        hpMax: p.hpMax,
        avatarUrl: p.avatarUrl,
        color: '#c9a84c',
        ownerId: p.playerId
      });
      SoundManager.playNotification();
      return;
    }
  },

  async toggleBattleMode() {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    const newBattleMode = !RoomSystem.currentRoom?.battleMode;
    
    const roomRef = doc(db, 'rooms', code);
    await updateDoc(roomRef, { battleMode: newBattleMode });

    if (newBattleMode) {
      await BattleSystem.startBattle();
      SoundManager.playBattleStart();
    } else {
      await BattleSystem.endBattle();
    }

    return newBattleMode;
  },

  async endSession() {
    if (!confirm('Tem certeza que deseja encerrar a sessão?')) return;

    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const roomRef = doc(db, 'rooms', code);
    await updateDoc(roomRef, { status: 'closed' });

    await RoomSystem.leaveRoom(code);
    window.location.href = 'index.html';
  },

  cleanup() {
    this.listeners.forEach(({ ref: ref, listener, type }) => {
      if (type === 'firestore') {
        listener();
      }
    });
    this.listeners = [];
    this.playerSheets = {};
  }
};

window.MasterSystem = MasterSystem;
export default MasterSystem;
