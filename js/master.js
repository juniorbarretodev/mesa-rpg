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

    container.innerHTML = sheets.map(sheet => `
      <div class="master-sheet-card" data-player-id="${sheet.id}">
        <div class="master-sheet-header">
          <div class="master-sheet-avatar">${sheet.name?.[0]?.toUpperCase() || '?'}</div>
          <div class="master-sheet-info">
            <h4>${sheet.name || 'Sem nome'}</h4>
            <span class="text-muted">${sheet.class || 'Aventureiro'} Nv. ${sheet.level || 1}</span>
          </div>
        </div>
        <div class="master-sheet-hp">
          <div class="hp-control">
            <button class="btn btn-sm btn-danger" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', -1)">-1</button>
            <span class="hp-display">${sheet.hp || 0}/${sheet.hpMax || 20}</span>
            <button class="btn btn-sm btn-success" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" onclick="MasterSystem.adjustPlayerHP('${sheet.id}', 5)">+5</button>
          </div>
          <div class="hp-bar">
            <div class="hp-bar-fill" style="width: ${(sheet.hp / sheet.hpMax) * 100}%"></div>
          </div>
        </div>
        <div class="master-sheet-status">
          <span class="badge ${sheet.status?.includes('Envenenado') ? 'badge-red' : 'badge-gold'}">${sheet.status?.join(', ') || 'Sem status'}</span>
        </div>
        <div class="master-sheet-actions">
          <button class="btn btn-sm btn-secondary" onclick="MasterSystem.showStatusModal('${sheet.id}', '${sheet.name}')">
            Status
          </button>
        </div>
      </div>
    `).join('');
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

  setupNPCPanel() {
    const npcList = document.getElementById('npcList');
    if (!npcList) return;

    npcList.innerHTML = this.npcTemplates.map(npc => `
      <div class="npc-template" draggable="true" data-npc='${JSON.stringify(npc)}'>
        <span class="npc-color" style="background: ${npc.color}"></span>
        <span>${npc.name}</span>
        <span class="npc-hp">${npc.hp} HP</span>
      </div>
    `).join('');

    npcList.querySelectorAll('.npc-template').forEach(template => {
      template.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('npc', template.dataset.npc);
      });
    });
  },

  async handleMapDrop(e) {
    e.preventDefault();
    const npcData = e.dataTransfer.getData('npc');
    if (!npcData) return;

    const npc = JSON.parse(npcData);
    const wrapper = document.querySelector('.map-wrapper');
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    await MapSystem.addToken({
      name: npc.name,
      type: npc.type,
      hp: npc.hp,
      hpMax: npc.hp,
      color: npc.color
    });

    SoundManager.playNotification();
  },

  showAddNPCCustomModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Adicionar NPC Personalizado</h3>
        <div class="form-group">
          <label>Nome</label>
          <input type="text" id="customNpcName" placeholder="Nome do NPC">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>HP</label>
            <input type="number" id="customNpcHp" value="20" min="1">
          </div>
          <div class="form-group">
            <label>HP Max</label>
            <input type="number" id="customNpcHpMax" value="20" min="1">
          </div>
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <select id="customNpcType">
            <option value="enemy">Inimigo</option>
            <option value="npc">NPC</option>
            <option value="object">Objeto</option>
          </select>
        </div>
        <div class="form-group">
          <label>Cor</label>
          <input type="color" id="customNpcColor" value="#dc2626">
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
          <button class="btn btn-primary" onclick="MasterSystem.addCustomNPC()">Adicionar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  async addCustomNPC() {
    const modal = document.querySelector('.modal-overlay');
    const wrapper = document.querySelector('.map-wrapper');
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    await MapSystem.addToken({
      name: document.getElementById('customNpcName').value || 'NPC',
      type: document.getElementById('customNpcType').value,
      hp: parseInt(document.getElementById('customNpcHp').value) || 20,
      hpMax: parseInt(document.getElementById('customNpcHpMax').value) || 20,
      color: document.getElementById('customNpcColor').value
    });

    modal?.remove();
    SoundManager.playNotification();
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
