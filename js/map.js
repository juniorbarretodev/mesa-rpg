import { ref, set, update, onValue, off } from "firebase/database";
import { rtdb } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';

const IMGBB_API_KEY = '00e4e8b63e8248b4e584774dad7cff00';
const IMGBB_URL = 'https://api.imgbb.com/1/upload';

export const TokenTypes = {
  PLAYER: 'player',
  ENEMY: 'enemy',
  NPC: 'npc',
  OBJECT: 'object'
};

export const MapSystem = {
  currentMap: null,
  tokens: {},
  drawingData: null,
  listeners: [],
  drawingCanvas: null,
  drawingCtx: null,
  gridCanvas: null,
  gridCtx: null,
  isDrawing: false,
  gridVisible: false,

  async initialize(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="map-wrapper">
        <img id="mapImage" class="map-image" style="display: none;">
        <canvas id="mapGridCanvas" class="map-grid-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></canvas>
        <canvas id="mapDrawingCanvas" class="map-drawing-canvas"></canvas>
        <div id="tokensLayer" class="tokens-layer"></div>
        <div class="map-drop-zone" id="mapDropZone">
          <p>Arraste uma imagem de mapa aqui</p>
          <p class="text-muted" style="font-size: 0.85rem;">ou clique para selecionar</p>
        </div>
        <input type="file" id="mapFileInput" accept="image/*" style="display: none;">
      </div>
    `;

    const dropZone = container.querySelector('#mapDropZone');
    const fileInput = container.querySelector('#mapFileInput');
    const mapImage = container.querySelector('#mapImage');
    const drawingCanvas = container.querySelector('#mapDrawingCanvas');
    const gridCanvas = container.querySelector('#mapGridCanvas');

    this.drawingCanvas = drawingCanvas;
    this.gridCanvas = gridCanvas;

    const setupCanvas = () => {
      const wrapper = container.querySelector('.map-wrapper');
      drawingCanvas.width = wrapper.offsetWidth;
      drawingCanvas.height = wrapper.offsetHeight;
      this.drawingCtx = drawingCanvas.getContext('2d');
      this.loadDrawingData();
      
      gridCanvas.width = wrapper.offsetWidth;
      gridCanvas.height = wrapper.offsetHeight;
      this.gridCtx = gridCanvas.getContext('2d');
      this.renderGrid();
    };

    if (RoomSystem.isMaster) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          this.uploadMapImage(file);
        }
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.uploadMapImage(file);
        }
      });

      this.setupDrawing(drawingCanvas, container.querySelector('.map-wrapper'));

      window.addEventListener('resize', setupCanvas);
      setTimeout(setupCanvas, 100);
    } else {
      dropZone.style.display = 'none';
    }

    await this.loadMapData();
    this.subscribeToMap();
  },

  async uploadMapImage(file) {
    const code = RoomSystem.currentRoomCode;
    if (!code || !RoomSystem.isMaster) return;

    try {
      const formData = new FormData();
      formData.append('key', IMGBB_API_KEY);
      formData.append('image', file);

      const response = await fetch(IMGBB_URL, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        await this.saveMapData({ imageUrl });
        
        document.getElementById('mapDropZone').style.display = 'none';
        document.getElementById('mapImage').src = imageUrl;
        document.getElementById('mapImage').style.display = 'block';
      } else {
        throw new Error(data.error?.message || 'Erro no upload');
      }
    } catch (error) {
      console.error('Erro ao fazer upload do mapa:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    }
  },

  async saveMapData(data) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const updates = {};
    
    if (data.imageUrl) {
      updates['imageUrl'] = data.imageUrl;
    }
    
    if (this.drawingData && RoomSystem.isMaster) {
      updates['drawing'] = this.drawingData;
    }

    await update(ref(rtdb, `rooms/${code}/map`), updates);
  },

  async loadMapData() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const mapRef = ref(rtdb, `rooms/${code}/map`);
    
    return new Promise((resolve) => {
      onValue(mapRef, (snap) => {
        const data = snap.val();
        if (data) {
          this.currentMap = data;
          
          if (data.imageUrl) {
            const dropZone = document.getElementById('mapDropZone');
            const mapImage = document.getElementById('mapImage');
            if (dropZone && mapImage) {
              dropZone.style.display = 'none';
              mapImage.src = data.imageUrl;
              mapImage.style.display = 'block';
            }
          }
          
          if (data.drawing) {
            this.drawingData = data.drawing;
            this.loadDrawingData();
          }
          
          if (data.tokens) {
            this.tokens = data.tokens;
            this.renderTokens();
          }
        }
        resolve(data);
      }, { onlyOnce: true });
    });
  },

  subscribeToMap() {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const mapRef = ref(rtdb, `rooms/${code}/map`);
    
    const listener = onValue(mapRef, (snap) => {
      const data = snap.val();
      if (!data) return;

      if (data.imageUrl !== this.currentMap?.imageUrl) {
        const dropZone = document.getElementById('mapDropZone');
        const mapImage = document.getElementById('mapImage');
        if (dropZone && mapImage) {
          dropZone.style.display = 'none';
          mapImage.src = data.imageUrl;
          mapImage.style.display = 'block';
        }
      }

      if (data.tokens) {
        this.tokens = data.tokens;
        this.renderTokens();
      }

      if (data.drawing && data.drawing !== this.drawingData) {
        this.drawingData = data.drawing;
        this.loadDrawingData();
      }
    });

    this.listeners.push({ ref: mapRef, listener });
  },

  setupDrawing(canvas, wrapper) {
    if (!RoomSystem.isMaster) return;

    const ctx = canvas.getContext('2d');
    let lastX = 0;
    let lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDrawing = (e) => {
      if (!RoomSystem.isMaster) return;
      this.isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    };

    const draw = (e) => {
      if (!this.isDrawing || !RoomSystem.isMaster) return;
      e.preventDefault();
      
      const pos = getPos(e);
      ctx.beginPath();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      
      lastX = pos.x;
      lastY = pos.y;
    };

    const stopDrawing = () => {
      if (this.isDrawing && RoomSystem.isMaster) {
        this.isDrawing = false;
        this.saveDrawingData();
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
  },

  async saveDrawingData() {
    if (!this.drawingCanvas || !RoomSystem.isMaster) return;
    
    this.drawingData = this.drawingCanvas.toDataURL('image/png');
    await this.saveMapData({ drawing: this.drawingData });
  },

  loadDrawingData() {
    if (!this.drawingCtx || !this.drawingData) return;
    
    const img = new Image();
    img.onload = () => {
      this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
      this.drawingCtx.drawImage(img, 0, 0);
    };
    img.src = this.drawingData;
  },

  async clearDrawing() {
    if (!RoomSystem.isMaster) return;
    
    if (this.drawingCtx && this.drawingCanvas) {
      this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    }
    this.drawingData = null;
    await this.saveMapData({ drawing: null });
  },

  renderGrid() {
    if (!this.gridCtx || !this.gridCanvas) return;
    
    const ctx = this.gridCtx;
    const width = this.gridCanvas.width;
    const height = this.gridCanvas.height;
    const cellSize = Math.min(width, height) / 20;
    
    ctx.clearRect(0, 0, width, height);
    
    if (!this.gridVisible) return;
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= 20; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= 20; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(width, y * cellSize);
      ctx.stroke();
    }
  },

  toggleGrid() {
    this.gridVisible = !this.gridVisible;
    this.renderGrid();
    return this.gridVisible;
  },

  async addToken(tokenData) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return null;

    const tokenId = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const token = {
      id: tokenId,
      name: tokenData.name || 'Token',
      type: tokenData.type || TokenTypes.NPC,
      x: tokenData.x || 50,
      y: tokenData.y || 50,
      hp: tokenData.hp || 10,
      hpMax: tokenData.hpMax || 10,
      color: tokenData.color || this.getDefaultColor(tokenData.type),
      imageUrl: tokenData.imageUrl || null,
      visible: tokenData.visible !== false,
      ...tokenData
    };

    await set(ref(rtdb, `rooms/${code}/map/tokens/${tokenId}`), token);
    return token;
  },

  getDefaultColor(type) {
    const colors = {
      [TokenTypes.PLAYER]: '#d4af37',
      [TokenTypes.ENEMY]: '#dc2626',
      [TokenTypes.NPC]: '#3b82f6',
      [TokenTypes.OBJECT]: '#6b7280'
    };
    return colors[type] || colors[TokenTypes.NPC];
  },

  async updateToken(tokenId, updates) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    await update(ref(rtdb, `rooms/${code}/map/tokens/${tokenId}`), updates);
  },

  async moveToken(tokenId, x, y) {
    await this.updateToken(tokenId, { x, y });
  },

  async removeToken(tokenId) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    await set(ref(rtdb, `rooms/${code}/map/tokens/${tokenId}`), null);
  },

  renderTokens() {
    const container = document.getElementById('tokensLayer');
    if (!container) return;

    container.innerHTML = '';

    Object.values(this.tokens).forEach(token => {
      const canMove = RoomSystem.isMaster || 
        (token.type === TokenTypes.PLAYER && token.ownerId === AuthSystem.currentUser?.uid);
      
      const tokenEl = document.createElement('div');
      tokenEl.className = `map-token ${token.type}`;
      tokenEl.id = token.id;
      tokenEl.style.cssText = `
        left: ${token.x}px;
        top: ${token.y}px;
        border-color: ${token.color};
        background-color: ${token.imageUrl ? 'transparent' : token.color + '33'};
        ${!token.visible && !RoomSystem.isMaster ? 'opacity: 0.3;' : ''}
      `;

      if (token.imageUrl) {
        tokenEl.style.backgroundImage = `url(${token.imageUrl})`;
        tokenEl.style.backgroundSize = 'cover';
      } else {
        tokenEl.innerHTML = `<span>${token.name.charAt(0).toUpperCase()}</span>`;
      }

      if (token.hpMax > 0 && RoomSystem.isMaster) {
        const hpBar = document.createElement('div');
        hpBar.className = 'token-hp-bar';
        hpBar.style.cssText = `
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: #333;
          border-radius: 2px;
        `;
        const hpFill = document.createElement('div');
        hpFill.style.cssText = `
          width: ${(token.hp / token.hpMax) * 100}%;
          height: 100%;
          background: ${token.hp / token.hpMax > 0.5 ? '#22c55e' : token.hp / token.hpMax > 0.25 ? '#eab308' : '#dc2626'};
          border-radius: 2px;
        `;
        hpBar.appendChild(hpFill);
        tokenEl.appendChild(hpBar);
      }

      const nameLabel = document.createElement('div');
      nameLabel.className = 'token-name';
      nameLabel.textContent = token.name;
      tokenEl.appendChild(nameLabel);

      if (canMove) {
        this.makeTokenDraggable(tokenEl, token);
      }

      if (RoomSystem.isMaster) {
        tokenEl.addEventListener('dblclick', () => {
          this.showTokenEditor(token);
        });
      }

      container.appendChild(tokenEl);
    });
  },

  makeTokenDraggable(element, token) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = token.x;
      initialY = token.y;
      element.style.cursor = 'grabbing';
      e.stopPropagation();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      const newX = Math.max(0, Math.min(element.parentElement.offsetWidth - 50, initialX + dx));
      const newY = Math.max(0, Math.min(element.parentElement.offsetHeight - 50, initialY + dy));
      
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      element.style.cursor = 'grab';
      
      const newX = parseInt(element.style.left);
      const newY = parseInt(element.style.top);
      
      if (newX !== token.x || newY !== token.y) {
        this.moveToken(token.id, newX, newY);
        token.x = newX;
        token.y = newY;
      }
    };

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  },

  showTokenEditor(token) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Editar Token: ${token.name}</h3>
        <div class="form-group">
          <label>Nome</label>
          <input type="text" id="tokenName" value="${token.name}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>HP</label>
            <input type="number" id="tokenHp" value="${token.hp}" min="0">
          </div>
          <div class="form-group">
            <label>HP Max</label>
            <input type="number" id="tokenHpMax" value="${token.hpMax}" min="1">
          </div>
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <select id="tokenType">
            <option value="enemy" ${token.type === 'enemy' ? 'selected' : ''}>Inimigo</option>
            <option value="npc" ${token.type === 'npc' ? 'selected' : ''}>NPC</option>
            <option value="object" ${token.type === 'object' ? 'selected' : ''}>Objeto</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" id="tokenVisible" ${token.visible ? 'checked' : ''}>
            Visível para jogadores
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn btn-danger" id="deleteToken">Excluir</button>
          <button class="btn btn-secondary" id="cancelToken">Cancelar</button>
          <button class="btn btn-primary" id="saveToken">Salvar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#saveToken').addEventListener('click', async () => {
      await this.updateToken(token.id, {
        name: document.getElementById('tokenName').value,
        hp: parseInt(document.getElementById('tokenHp').value) || 0,
        hpMax: parseInt(document.getElementById('tokenHpMax').value) || 1,
        type: document.getElementById('tokenType').value,
        visible: document.getElementById('tokenVisible').checked
      });
      document.body.removeChild(modal);
    });

    modal.querySelector('#cancelToken').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.querySelector('#deleteToken').addEventListener('click', async () => {
      await this.removeToken(token.id);
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  },

  unsubscribe() {
    this.listeners.forEach(({ ref: mapRef, listener }) => {
      off(mapRef, 'value', listener);
    });
    this.listeners = [];
  }
};

export default MapSystem;
