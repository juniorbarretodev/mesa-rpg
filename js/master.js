import { doc, updateDoc, onSnapshot, collection } from "firebase/firestore";
import { ref, onValue, set } from "firebase/database";
import { rtdb, db } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';
import { MapSystem, TokenTypes } from './map.js';
import { BattleSystem } from './battle.js';
import { SoundManager } from './sounds.js';

export const MasterSystem = {
  playerSheets: {},
  playerInitMods: {},
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
    await this.subscribeToPlayerSheets();
    await this.subscribeToPlayerInitMods();
  },

  async subscribeToPlayerInitMods() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const listener = onValue(ref(rtdb, `rooms/${code}/playerInitMods`), (snap) => {
      this.playerInitMods = snap.val() || {};
    });

    this.listeners.push({ ref: `rooms/${code}/playerInitMods`, listener, type: 'rtdb' });
  },

  async subscribeToPlayerSheets() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetsRef = collection(db, 'sheets', code, 'players');

    const listener = onSnapshot(sheetsRef, (snap) => {
      snap.forEach(doc => {
        const sheet = { id: doc.id, ...doc.data() };
        const prevSheet = this.playerSheets[doc.id];
        const avatarChanged = prevSheet && prevSheet.avatarUrl !== sheet.avatarUrl;
        if (doc.id !== AuthSystem.currentUser?.uid) {
          this.playerSheets[doc.id] = sheet;
        }
        if (avatarChanged) {
          this.syncPlayerToken(doc.id);
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
        <div class="master-sheet-card" data-player-id="${sheet.id}" draggable="true" ondragstart="MasterSystem.onPlayerCardDragStart(event, '${sheet.id}')">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:40px;height:40px;border-radius:50%;border:2px solid #c9a84c;background:#1a1208;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              ${avatarContent}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:#e8c97a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${sheet.name || 'Sem nome'}
              </div>
              <div style="font-size:0.65rem;color:#a08050;">
                ${sheet.class || 'Aventureiro'} Nv.${sheet.level || 1}
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -1)">-1</button>
            <span style="font-family:'Cinzel',serif;font-size:0.8rem;color:#e8d8b0;margin:0 4px;">
              ${sheet.hp || 0}/${sheet.hpMax || 20}
            </span>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 5)">+5</button>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <label style="font-size:0.6rem;color:#8a6a1a;">HP Max:</label>
            <button class="btn btn-sm btn-secondary" style="padding:1px 5px;font-size:0.65rem;" onclick="MasterSystem.adjustPlayerHPMax('${sheet.id}', -5)">-5</button>
            <input type="number" value="${sheet.hpMax || 20}" min="1"
              style="width:40px;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;
                border-radius:3px;padding:2px;text-align:center;font-size:0.65rem;"
              onchange="MasterSystem.setPlayerHPMax('${sheet.id}', this.value)">
            <button class="btn btn-sm btn-secondary" style="padding:1px 5px;font-size:0.65rem;" onclick="MasterSystem.adjustPlayerHPMax('${sheet.id}', 5)">+5</button>
          </div>
          <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;margin-bottom:6px;">
            <div style="height:100%;width:${hpPct}%;background:${hpPct > 50 ? '#16a34a' : hpPct > 25 ? '#ca8a04' : '#dc2626'};transition:width 0.3s;"></div>
          </div>
          ${(sheet.status || []).length > 0 ? `
            <div style="font-size:0.6rem;color:#f1c40f;">⚠ ${sheet.status.join(', ')}</div>
          ` : ''}
          <div style="display:flex;gap:4px;margin-top:6px;">
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;" onclick="MasterSystem.showStatusModal('${sheet.id}', '${sheet.name}')">Status</button>
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;" onclick="MasterSystem.dragPlayerToMap('${sheet.id}')">🗺</button>
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

  async dragNpcToMap(npcId) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    await MapSystem.addToken({
      name: npc.name,
      type: npc.type,
      hp: npc.hp,
      hpMax: npc.hpMax,
      color: npc.color,
      npcCardId: npc.id
    });
    SoundManager.playNotification();
  },

  syncPlayerToken(playerId) {
    try {
      const sheet = this.playerSheets[playerId];
      if (!sheet) return;
      const token = Object.values(MapSystem.tokens || {}).find(t => t.ownerId === playerId);
      if (!token) return;
      const updates = {};
      if (token.hp !== sheet.hp || token.hpMax !== sheet.hpMax) {
        updates.hp = sheet.hp;
        updates.hpMax = sheet.hpMax;
        updates.status = sheet.status || [];
      }
      if (token.avatarUrl !== sheet.avatarUrl) {
        updates.avatarUrl = sheet.avatarUrl || '';
      }
      if (Object.keys(updates).length > 0) {
        MapSystem.updateToken(token.id, updates);
        MapSystem.renderTokens();
      }
    } catch(e) {}
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
    this.syncPlayerToken(playerId);

    SoundManager.playDiceLand();
  },

  async adjustPlayerHPMax(playerId, delta) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetRef = doc(db, 'sheets', code, 'players', playerId);
    const sheet = this.playerSheets[playerId];

    if (!sheet) return;

    const newMax = Math.max(1, (sheet.hpMax || 20) + delta);

    await updateDoc(sheetRef, { hpMax: newMax });

    this.playerSheets[playerId] = { ...sheet, hpMax: newMax };
    this.renderPlayerSheets();
    this.syncPlayerToken(playerId);
  },

  async setPlayerHPMax(playerId, value) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const sheetRef = doc(db, 'sheets', code, 'players', playerId);
    const sheet = this.playerSheets[playerId];

    if (!sheet) return;

    const newMax = Math.max(1, parseInt(value) || 20);

    await updateDoc(sheetRef, { hpMax: newMax });

    this.playerSheets[playerId] = { ...sheet, hpMax: newMax };
    this.renderPlayerSheets();
    this.syncPlayerToken(playerId);
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
    modal.className = 'modal-overlay-npc';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
    modal.innerHTML = `
      <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:8px;padding:24px;min-width:300px;">
        <h3 style="color:#e8c97a;margin-bottom:16px;">Status: ${playerName}</h3>
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
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay-npc').remove()">Fechar</button>
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
    this.syncPlayerToken(playerId);
  },

  // ── NPC SYSTEM (reescrito do zero) ────────────────────

  _npcCreating: false,  // flag de delay para evitar criação dupla

  openNpcModal(type) {
    // Remove qualquer modal aberto
    document.querySelectorAll('.modal-overlay-npc').forEach(el => el.remove());

    const COLORS = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const LABELS = { hostile: 'Hostil',  neutral: 'Neutro',  friendly: 'Amigável' };
    const color  = COLORS[type] || '#888';
    const label  = LABELS[type] || 'NPC';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay-npc';
    modal.style.cssText = [
      'position:fixed', 'inset:0', 'background:rgba(0,0,0,0.75)',
      'display:flex', 'align-items:center', 'justify-content:center', 'z-index:9999'
    ].join(';');

    modal.innerHTML = `
      <div style="background:#1a1208;border:2px solid ${color};border-radius:8px;
                  padding:24px;min-width:300px;max-width:360px;width:90%;">
        <h3 style="color:${color};margin:0 0 16px;font-family:'Cinzel',serif;
                   font-size:1rem;letter-spacing:2px;">+ NPC ${label}</h3>

        <label style="display:block;margin-bottom:4px;font-size:0.8rem;color:#a08050;">Nome</label>
        <input id="_npcName" type="text" placeholder="Nome do NPC" autofocus
          style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;
                 padding:8px;border-radius:4px;margin-bottom:12px;box-sizing:border-box;">

        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <div style="flex:1;">
            <label style="display:block;margin-bottom:4px;font-size:0.8rem;color:#a08050;">HP</label>
            <input id="_npcHp" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;
                     padding:8px;border-radius:4px;box-sizing:border-box;">
          </div>
          <div style="flex:1;">
            <label style="display:block;margin-bottom:4px;font-size:0.8rem;color:#a08050;">HP Máx</label>
            <input id="_npcHpMax" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;
                     padding:8px;border-radius:4px;box-sizing:border-box;">
          </div>
        </div>

        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="_npcCancel"
            style="background:transparent;border:1px solid #8a6a1a;color:#c9a84c;
                   padding:8px 16px;border-radius:4px;cursor:pointer;font-size:0.85rem;">
            Cancelar
          </button>
          <button id="_npcConfirm"
            style="background:${color};border:none;color:white;padding:8px 16px;
                   border-radius:4px;cursor:pointer;font-weight:bold;font-size:0.85rem;">
            Criar NPC
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('#_npcName').focus();

    // fechar ao clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector('#_npcCancel').addEventListener('click', () => modal.remove());

    modal.querySelector('#_npcConfirm').addEventListener('click', () => {
      if (this._npcCreating) return;  // guard contra duplo clique

      const name  = modal.querySelector('#_npcName').value.trim() || 'NPC';
      const hp    = Math.max(1, parseInt(modal.querySelector('#_npcHp').value)    || 20);
      const hpMax = Math.max(1, parseInt(modal.querySelector('#_npcHpMax').value) || 20);

      modal.remove();
      this._createNpc(type, name, hp, hpMax);
    });

    // Enter no campo nome confirma
    modal.querySelector('#_npcName').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') modal.querySelector('#_npcConfirm').click();
    });
  },

  _createNpc(type, name, hp, hpMax) {
    if (this._npcCreating) return;
    this._npcCreating = true;

    // delay de 5s para evitar conflitos de comunicação
    setTimeout(() => { this._npcCreating = false; }, 5000);

    const COLORS  = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const TYPEKEY = { hostile: 'enemy',   neutral: 'npc',     friendly: 'friendly' };

    if (!this.npcCards) this.npcCards = {};

    const npc = {
      id:        `npc_${Date.now()}`,
      name,
      hp,
      hpMax,
      status:    '—',
      alignment: type,
      type:      TYPEKEY[type] || 'npc',
      color:     COLORS[type]  || '#888'
    };

    this.npcCards[npc.id] = npc;
    this._renderNpcCard(npc);
    try { SoundManager.playNotification(); } catch(e) {}
  },

  _renderNpcCard(npc) {
    const container = document.getElementById('npcCardsContainer');
    if (!container) return;

    const COLORS  = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
    const LABELS  = { hostile: 'Hostil',  neutral: 'Neutro',  friendly: 'Amigável' };
    const STATUSES = ['—','Caído','Sangrando','Paralizado','Atordoado','Envenenado','Assustado','Cego'];

    const color  = COLORS[npc.alignment]  || npc.color || '#888';
    const label  = LABELS[npc.alignment]  || 'NPC';
    const hpPct  = Math.max(0, Math.min(100, (npc.hp / npc.hpMax) * 100));
    const barBg  = hpPct > 50 ? '#16a34a' : hpPct > 25 ? '#ca8a04' : '#dc2626';

    // Remove card anterior se existir (re-render)
    document.getElementById(`npc-card-${npc.id}`)?.remove();

    const card = document.createElement('div');
    card.id        = `npc-card-${npc.id}`;
    card.draggable = true;
    card.style.cssText = `
      width:150px;background:#1a1208;border:2px solid ${color};border-radius:6px;
      padding:10px;position:relative;flex-shrink:0;cursor:grab;user-select:none;
    `;

    card.innerHTML = `
      <!-- botão remover -->
      <button data-action="remove"
        style="position:absolute;top:4px;right:4px;background:none;border:none;
               color:#666;cursor:pointer;font-size:0.8rem;line-height:1;">✕</button>

      <!-- nome -->
      <div style="font-family:'Cinzel',serif;font-size:0.72rem;color:${color};
                  margin-bottom:5px;padding-right:18px;white-space:nowrap;
                  overflow:hidden;text-overflow:ellipsis;" title="${npc.name}">
        ${npc.name}
      </div>

      <!-- badge tipo -->
      <span style="font-size:0.5rem;background:${color}22;border:1px solid ${color};
                   color:${color};padding:1px 5px;border-radius:2px;
                   font-family:'Cinzel',serif;letter-spacing:1px;">${label}</span>

      <!-- controles HP -->
      <div style="margin-top:8px;">
        <div style="display:flex;align-items:center;gap:3px;margin-bottom:4px;">
          <button data-action="hp-minus"
            style="background:#dc2626;border:none;color:white;width:20px;height:20px;
                   border-radius:3px;cursor:pointer;font-size:0.9rem;flex-shrink:0;">−</button>
          <input data-action="hp-input" type="number"
            value="${npc.hp}" min="0" max="${npc.hpMax}"
            style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
                   color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.75rem;">
          <span data-action="hpmax-display" style="color:#666;font-size:0.7rem;flex-shrink:0;">/${npc.hpMax}</span>
          <button data-action="hp-plus"
            style="background:#16a34a;border:none;color:white;width:20px;height:20px;
                   border-radius:3px;cursor:pointer;font-size:0.9rem;flex-shrink:0;">+</button>
        </div>
        <!-- barra HP -->
        <div style="height:5px;background:#333;border-radius:3px;overflow:hidden;">
          <div data-action="hp-bar"
            style="height:100%;width:${hpPct}%;background:${barBg};transition:width 0.3s;"></div>
        </div>
      </div>

      <!-- HP Max -->
      <div style="display:flex;align-items:center;gap:3px;margin-top:6px;">
        <label style="font-size:0.55rem;color:#8a6a1a;">HP Max:</label>
        <button data-action="hpmax-minus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">−</button>
        <input data-action="hpmax-input" type="number"
          value="${npc.hpMax}" min="1"
          style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
                 color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.65rem;">
        <button data-action="hpmax-plus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">+</button>
      </div>

      <!-- status -->
      <select data-action="status"
        style="width:100%;margin-top:8px;background:#0a0705;border:1px solid #8a6a1a;
               color:#a08050;border-radius:3px;padding:3px;font-size:0.62rem;">
        ${STATUSES.map(s => `<option value="${s}"${npc.status===s?' selected':''}>${s}</option>`).join('')}
      </select>
      ${npc.status && npc.status !== '—'
        ? `<div style="margin-top:3px;font-size:0.58rem;color:#f1c40f;text-align:center;">⚠ ${npc.status}</div>`
        : ''}

      <!-- add to map -->
      <button data-action="map"
        style="width:100%;margin-top:6px;background:#c9a84c;border:none;color:white;
               padding:4px 8px;border-radius:3px;cursor:pointer;font-size:0.7rem;">
        &#x1F5FA;&#xFE0F; Adicionar ao Mapa
      </button>
    `;

    // ── event delegation ──────────────────────────────
    card.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (!action) return;
      if (action === 'remove')       this._removeNpc(npc.id);
      if (action === 'hp-minus')     this._adjustNpcHP(npc.id, -1);
      if (action === 'hp-plus')      this._adjustNpcHP(npc.id, +1);
      if (action === 'hpmax-minus')  this._adjustNpcHPMax(npc.id, -1);
      if (action === 'hpmax-plus')   this._adjustNpcHPMax(npc.id, +1);
      if (action === 'map')          this.dragNpcToMap(npc.id);
    });

    card.querySelector('[data-action="hp-input"]').addEventListener('change', (e) => {
      this._setNpcHP(npc.id, e.target.value);
    });

    card.querySelector('[data-action="hpmax-input"]').addEventListener('change', (e) => {
      this._setNpcHPMax(npc.id, e.target.value);
    });

    card.querySelector('[data-action="status"]').addEventListener('change', (e) => {
      this._setNpcStatus(npc.id, e.target.value);
    });

    // drag para o mapa
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('npcCard', JSON.stringify(npc));
      e.dataTransfer.effectAllowed = 'copy';
    });

    container.appendChild(card);
  },

  _adjustNpcHP(npcId, delta) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hp = Math.max(0, Math.min(npc.hpMax, npc.hp + delta));
    this._updateNpcCardHP(npcId, npc.hp, npc.hpMax);
    this._syncNpcToken(npcId, npc.hp);
  },

  _adjustNpcHPMax(npcId, delta) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hpMax = Math.max(1, npc.hpMax + delta);
    if (npc.hp > npc.hpMax) npc.hp = npc.hpMax;
    const pct = (npc.hp / npc.hpMax) * 100;
    this._updateNpcCardFull(npcId, npc.hp, npc.hpMax);
    this._syncNpcToken(npcId, npc.hp);
  },

  _setNpcHPMax(npcId, value) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hpMax = Math.max(1, parseInt(value) || 1);
    if (npc.hp > npc.hpMax) npc.hp = npc.hpMax;
    this._updateNpcCardFull(npcId, npc.hp, npc.hpMax);
    this._syncNpcToken(npcId, npc.hp);
  },

  _setNpcHP(npcId, value) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.hp = Math.max(0, Math.min(npc.hpMax, parseInt(value) || 0));
    this._updateNpcCardHP(npcId, npc.hp, npc.hpMax);
    this._syncNpcToken(npcId, npc.hp);
  },

  _updateNpcCardHP(npcId, hp, hpMax) {
    const pct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
    const bar = document.querySelector(`#npc-card-${npcId} [data-action="hp-bar"]`);
    const inp = document.querySelector(`#npc-card-${npcId} [data-action="hp-input"]`);
    if (bar) { bar.style.width = pct + '%'; bar.style.background = pct>50?'#16a34a':pct>25?'#ca8a04':'#dc2626'; }
    if (inp) inp.value = hp;
  },

  _updateNpcCardFull(npcId, hp, hpMax) {
    const card = document.getElementById(`npc-card-${npcId}`);
    if (!card) return;
    const pct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
    const bar = card.querySelector('[data-action="hp-bar"]');
    const hpInput = card.querySelector('[data-action="hp-input"]');
    const hpMaxInput = card.querySelector('[data-action="hpmax-input"]');
    const hpMaxLabel = card.querySelector('[data-action="hpmax-display"]');
    if (bar) { bar.style.width = pct + '%'; bar.style.background = pct>50?'#16a34a':pct>25?'#ca8a04':'#dc2626'; }
    if (hpInput) hpInput.value = hp;
    if (hpMaxInput) hpMaxInput.value = hpMax;
    // Update the "/MAX" span
    const maxSpan = card.querySelector('[data-action="hpmax-display"]');
    if (maxSpan) maxSpan.textContent = `/${hpMax}`;
  },

  _setNpcStatus(npcId, status) {
    const npc = this.npcCards?.[npcId];
    if (!npc) return;
    npc.status = status;
    this._renderNpcCard(npc);  // re-render para atualizar badge
  },

  _removeNpc(npcId) {
    if (this.npcCards) delete this.npcCards[npcId];
    document.getElementById(`npc-card-${npcId}`)?.remove();
    this._syncNpcToken(npcId, null, true);
  },

  _syncNpcToken(npcId, hp, remove = false) {
    try {
      const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
      if (!token) return;
      if (remove) MapSystem.removeToken(token.id);
      else        MapSystem.updateToken(token.id, { hp });
    } catch(e) {}
  },

  // aliases públicos para onclick inline legado (caso existam)
  adjustNpcHP(id, d)  { this._adjustNpcHP(id, d); },
  setNpcHP(id, v)     { this._setNpcHP(id, v); },
  setNpcStatus(id, s) { this._setNpcStatus(id, s); },
  removeNpc(id)       { this._removeNpc(id); },

  async handleMapDrop(e) {
    e.preventDefault();

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
    this.listeners.forEach(({ listener }) => {
      listener();
    });
    this.listeners = [];
    this.playerSheets = {};
  }
};

window.MasterSystem = MasterSystem;
export default MasterSystem;