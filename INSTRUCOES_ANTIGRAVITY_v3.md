# 📋 INSTRUÇÕES ANTIGRAVITY — v3
## Correções e melhorias do projeto mesa-rpg

Execute cada tarefa em ordem. Commit após cada tarefa concluída.

---

## TAREFA 1 — index.html: Remover botão "Editar Perfil Global"

**Arquivo:** `index.html`

Localizar e remover completamente o bloco abaixo (ou equivalente):
```html
<div class="flex flex-center mt-md">
  <a href="profile.html" class="btn btn-secondary btn-sm">👤 Editar Meu Perfil Global</a>
</div>
```
Não alterar nada mais neste arquivo.

---

## TAREFA 2 — master.html: Corrigir botão de carregar mapa

**Arquivo:** `master.html`

### 2a. Remover toda lógica de clique na área do mapa
No `<script>` do master.html, localizar o event listener de clique no mapa e remover:
```javascript
// REMOVER qualquer linha parecida com isso:
mapZone.addEventListener('click', ...)
mapDropZone.addEventListener('click', ...)
```

### 2b. Garantir que existe um botão dedicado fora da área do mapa
Certificar que existe no HTML (fora do elemento de drop zone):
```html
<button id="btnLoadMap" class="btn btn-secondary btn-sm">🗺 Carregar Mapa</button>
```
E no script:
```javascript
document.getElementById('btnLoadMap').addEventListener('click', () => {
  document.getElementById('mapFileInput').click();
});
document.getElementById('mapFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) MapSystem.loadMapImage(file);
});
```

### 2c. Garantir que o placeholder interno não é clicável
No CSS, adicionar ao elemento de drop zone:
```css
#mapDropZone { cursor: default; pointer-events: none; }
#mapDropZone canvas, #mapDropZone .map-token { pointer-events: all; }
```

---

## TAREFA 3 — master.html: Corrigir botões de NPC (Hostil / Neutro / Amigável)

**Arquivo:** `master.html`

### 3a. Verificar se os botões existem no HTML
Certificar que existem exatamente estes três botões:
```html
<button class="btn btn-sm" style="background:#dc2626;color:white;" onclick="MasterSystem.openNpcModal('hostile')">+ Hostil</button>
<button class="btn btn-sm" style="background:#ca8a04;color:white;" onclick="MasterSystem.openNpcModal('neutral')">+ Neutro</button>
<button class="btn btn-sm" style="background:#16a34a;color:white;" onclick="MasterSystem.openNpcModal('friendly')">+ Amigável</button>
```

### 3b. Adicionar método openNpcModal no master.js
No arquivo `js/master.js`, adicionar o método dentro do objeto `MasterSystem`:

```javascript
openNpcModal(type) {
  const colors = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
  const labels = { hostile: 'Hostil', neutral: 'Neutro', friendly: 'Amigável' };

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
  modal.innerHTML = `
    <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:8px;padding:24px;min-width:300px;">
      <h3 style="color:#e8c97a;margin-bottom:16px;">Novo NPC ${labels[type]}</h3>
      <div style="margin-bottom:12px;">
        <label style="display:block;margin-bottom:4px;font-size:0.85rem;">Nome</label>
        <input id="npcModalName" type="text" placeholder="Nome do NPC"
          style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        <div style="flex:1;">
          <label style="display:block;margin-bottom:4px;font-size:0.85rem;">HP</label>
          <input id="npcModalHp" type="number" value="20" min="1"
            style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
        </div>
        <div style="flex:1;">
          <label style="display:block;margin-bottom:4px;font-size:0.85rem;">HP Máx</label>
          <input id="npcModalHpMax" type="number" value="20" min="1"
            style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button onclick="this.closest('.modal-overlay').remove()"
          style="background:transparent;border:1px solid #8a6a1a;color:#c9a84c;padding:8px 16px;border-radius:4px;cursor:pointer;">
          Cancelar
        </button>
        <button onclick="MasterSystem.createNpcFromModal('${type}')"
          style="background:${colors[type]};border:none;color:white;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;">
          Criar NPC
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('npcModalName').focus();
},

createNpcFromModal(type) {
  const name = document.getElementById('npcModalName')?.value?.trim() || 'NPC';
  const hp   = parseInt(document.getElementById('npcModalHp')?.value)    || 20;
  const hpMax= parseInt(document.getElementById('npcModalHpMax')?.value) || 20;
  const colors = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
  const typeMap = { hostile: 'enemy', neutral: 'npc', friendly: 'friendly' };

  document.querySelector('.modal-overlay')?.remove();

  const npc = {
    id: `npc_${Date.now()}`,
    name, hp, hpMax,
    status: '',
    type: typeMap[type],
    alignment: type,
    color: colors[type]
  };

  // Adiciona ao estado local
  if (!this.npcCards) this.npcCards = {};
  this.npcCards[npc.id] = npc;

  this.renderNpcCard(npc);
},
```

### 3c. Adicionar método renderNpcCard no master.js

```javascript
renderNpcCard(npc) {
  const container = document.getElementById('npcCardsContainer');
  if (!container) return;

  const colors   = { hostile: '#dc2626', neutral: '#ca8a04', friendly: '#16a34a' };
  const labels   = { hostile: 'Hostil',  neutral: 'Neutro',  friendly: 'Amigável' };
  const statuses = ['—','Caído','Sangrando','Paralizado','Atordoado','Envenenado','Assustado','Cego'];
  const hpPct    = Math.max(0, Math.min(100, (npc.hp / npc.hpMax) * 100));
  const color    = colors[npc.alignment] || npc.color || '#888';

  // Remove card antigo se existir (para re-renderizar após update)
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

    <!-- HP editável -->
    <div style="margin-top:8px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
        <button onclick="MasterSystem.adjustNpcHP('${npc.id}',-1)"
          style="background:#dc2626;border:none;color:white;width:20px;height:20px;border-radius:3px;cursor:pointer;font-size:0.8rem;">−</button>
        <input id="npc-hp-${npc.id}" type="number" value="${npc.hp}" min="0" max="${npc.hpMax}"
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

    <!-- Status -->
    <select id="npc-status-${npc.id}" onchange="MasterSystem.setNpcStatus('${npc.id}', this.value)"
      style="width:100%;margin-top:8px;background:#0a0705;border:1px solid #8a6a1a;
        color:#a08050;border-radius:3px;padding:3px;font-size:0.65rem;">
      ${statuses.map(s => `<option value="${s}" ${npc.status===s?'selected':''}>${s}</option>`).join('')}
    </select>

    ${npc.status && npc.status !== '—' ? `
      <div style="margin-top:4px;font-size:0.6rem;color:#f1c40f;text-align:center;">⚠ ${npc.status}</div>
    ` : ''}
  `;

  // Drag para o mapa
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
  // Sincronizar com token no mapa se existir
  const token = Object.values(MapSystem.tokens || {}).find(t => t.npcCardId === npcId);
  if (token) MapSystem.updateToken(token.id, { hp: npc.hp });
},

setNpcHP(npcId, value) {
  const npc = this.npcCards?.[npcId];
  if (!npc) return;
  npc.hp = Math.max(0, Math.min(npc.hpMax, parseInt(value) || 0));
  this.npcCards[npcId] = npc;
  // Atualizar barra sem re-renderizar tudo
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
```

### 3d. Adicionar container de cards no master.html

Localizar a seção de NPCs no HTML e substituir o conteúdo por:
```html
<div style="margin-bottom:8px;display:flex;gap:6px;flex-wrap:wrap;">
  <button class="btn btn-sm" style="background:#dc2626;color:white;border:none;"
    onclick="MasterSystem.openNpcModal('hostile')">+ Hostil</button>
  <button class="btn btn-sm" style="background:#ca8a04;color:white;border:none;"
    onclick="MasterSystem.openNpcModal('neutral')">+ Neutro</button>
  <button class="btn btn-sm" style="background:#16a34a;color:white;border:none;"
    onclick="MasterSystem.openNpcModal('friendly')">+ Amigável</button>
</div>
<div id="npcCardsContainer" style="display:flex;gap:8px;flex-wrap:wrap;padding:4px 0;min-height:40px;"></div>
```

### 3e. Aceitar drop de npcCard no mapa

No event listener de `drop` do mapa (map.js ou master.html), adicionar tratamento:
```javascript
const npcCardData = e.dataTransfer.getData('npcCard');
if (npcCardData) {
  const npc = JSON.parse(npcCardData);
  await MapSystem.addToken({
    name: npc.name,
    type: npc.type,
    hp: npc.hp,
    hpMax: npc.hpMax,
    color: npc.color,
    npcCardId: npc.id   // ← vínculo com o card
  });
}
```

---

## TAREFA 4 — Cards de jogadores visíveis para todos

**Arquivo:** `master.html` e `player.html`

### 4a. master.html — Cards de jogadores com avatar, nome e vida

No método `renderPlayerSheets` do `master.js`, tornar cada card **draggável para o mapa**:

```javascript
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
```

### 4b. Adicionar método de drag de player para mapa no master.js

```javascript
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
```

### 4c. Aceitar drop de playerCard no mapa

No drop handler do mapa, adicionar:
```javascript
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
}
```

### 4d. Token com avatar no mapa

No `map.js`, no método que renderiza tokens, verificar se token tem `avatarUrl` e exibir:
```javascript
// Dentro da função de render do token:
const innerContent = token.avatarUrl
  ? `<img src="${token.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
  : `<span style="font-size:1rem;">${token.name?.charAt(0)?.toUpperCase() || '?'}</span>`;
```

### 4e. player.html — Cards de todos os jogadores visíveis

No `player.html`, adicionar uma seção acima do mapa que mostra os cards de todos os jogadores (incluindo o próprio):

```html
<div id="allPlayerCards" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;"></div>
```

No script do `player.html`, subscribe na coleção de fichas e renderizar:
```javascript
// Após SheetSystem.subscribeToSheet(...)
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './js/firebase.js';

const sheetsRef = collection(db, 'sheets', roomCode, 'players');
onSnapshot(sheetsRef, (snap) => {
  const container = document.getElementById('allPlayerCards');
  if (!container) return;
  container.innerHTML = '';
  snap.forEach(docSnap => {
    const s = docSnap.data();
    const hpPct = Math.max(0, Math.min(100, ((s.hp||0)/(s.hpMax||20))*100));
    const isMe = docSnap.id === AuthSystem.currentUser?.uid;
    const av = s.avatarUrl
      ? `<img src="${s.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
      : `<span>${s.name?.[0]?.toUpperCase()||'?'}</span>`;
    const card = document.createElement('div');
    card.style.cssText = `
      background:#1a1208;border:2px solid ${isMe?'#c9a84c':'#4a3820'};
      border-radius:6px;padding:8px;width:120px;flex-shrink:0;
    `;
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <div style="width:32px;height:32px;border-radius:50%;border:1px solid #8a6a1a;
          background:#0a0705;overflow:hidden;display:flex;align-items:center;
          justify-content:center;flex-shrink:0;">${av}</div>
        <div style="font-family:'Cinzel',serif;font-size:0.65rem;color:#e8c97a;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          ${s.name || '?'} ${isMe ? '(você)' : ''}
        </div>
      </div>
      <div style="font-size:0.65rem;color:#a08050;margin-bottom:4px;">
        ❤ ${s.hp||0} / ${s.hpMax||20}
      </div>
      <div style="height:5px;background:#333;border-radius:2px;overflow:hidden;">
        <div style="height:100%;width:${hpPct}%;background:${hpPct>50?'#16a34a':hpPct>25?'#ca8a04':'#dc2626'};"></div>
      </div>
      ${(s.status||[]).length>0?`<div style="font-size:0.55rem;color:#f1c40f;margin-top:4px;">⚠ ${s.status.join(', ')}</div>`:''}
    `;
    container.appendChild(card);
  });
});
```

---

## TAREFA 5 — master.html: Ferramenta de desenho funcional

**Arquivo:** `master.html`

### 5a. Garantir que o canvas de desenho existe sobre o mapa

No HTML do mapa, certificar que existe:
```html
<canvas id="drawCanvas" style="position:absolute;inset:0;z-index:20;pointer-events:none;"></canvas>
```

### 5b. Garantir que a toolbar de desenho tem caneta E borracha funcionais

Substituir a toolbar de desenho por:
```html
<div id="drawToolbar" style="display:flex;align-items:center;gap:6px;padding:6px;
  background:#1a1208;border:1px solid #8a6a1a;border-radius:4px;flex-wrap:wrap;">
  <span style="font-family:'Cinzel',serif;font-size:0.5rem;color:#8a6a1a;letter-spacing:1px;">DESENHO</span>

  <button id="btnPen" onclick="DrawSystem.setTool('pen')"
    title="Caneta"
    style="width:30px;height:30px;background:#1a1208;border:1px solid #8a6a1a;
      color:#c9a84c;border-radius:4px;cursor:pointer;font-size:1rem;">✏️</button>

  <button id="btnEraser" onclick="DrawSystem.setTool('eraser')"
    title="Borracha"
    style="width:30px;height:30px;background:#1a1208;border:1px solid #8a6a1a;
      color:#c9a84c;border-radius:4px;cursor:pointer;font-size:1rem;">🧹</button>

  <input type="color" id="drawColor" value="#e74c3c"
    title="Cor"
    style="width:30px;height:30px;padding:0;border:1px solid #8a6a1a;
      border-radius:4px;cursor:pointer;background:none;">

  <input type="range" id="drawSize" min="2" max="30" value="4"
    title="Espessura"
    style="width:60px;accent-color:#c9a84c;">

  <button id="btnClearDraw" onclick="DrawSystem.clear()"
    title="Limpar desenho"
    style="width:30px;height:30px;background:#1a1208;border:1px solid #8b1a1a;
      color:#e74c3c;border-radius:4px;cursor:pointer;font-size:0.9rem;">🗑</button>
</div>
```

### 5c. Adicionar DrawSystem no script do master.html

```javascript
const DrawSystem = {
  tool: 'none',   // 'pen' | 'eraser' | 'none'
  drawing: false,
  canvas: null,
  ctx: null,

  init() {
    this.canvas = document.getElementById('drawCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.tool === 'none') return;
      this.drawing = true;
      const pos = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.drawing || this.tool === 'none') return;
      const pos = this.getPos(e);
      const size = parseInt(document.getElementById('drawSize')?.value || 4);
      if (this.tool === 'eraser') {
        this.ctx.clearRect(pos.x - size, pos.y - size, size * 2, size * 2);
      } else {
        this.ctx.strokeStyle = document.getElementById('drawColor')?.value || '#e74c3c';
        this.ctx.lineWidth   = size;
        this.ctx.lineCap     = 'round';
        this.ctx.lineJoin    = 'round';
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
      }
    });

    this.canvas.addEventListener('mouseup',    () => { this.drawing = false; });
    this.canvas.addEventListener('mouseleave', () => { this.drawing = false; });
  },

  setTool(tool) {
    this.tool = (this.tool === tool) ? 'none' : tool;
    this.canvas.style.pointerEvents = this.tool !== 'none' ? 'all' : 'none';
    this.canvas.style.cursor = this.tool === 'pen' ? 'crosshair' : this.tool === 'eraser' ? 'cell' : 'default';
    document.getElementById('btnPen')?.style.setProperty('border-color',    this.tool === 'pen'    ? '#e8c97a' : '#8a6a1a');
    document.getElementById('btnEraser')?.style.setProperty('border-color', this.tool === 'eraser' ? '#e8c97a' : '#8a6a1a');
  },

  clear() {
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const saved = this.ctx?.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width  = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
    if (saved) this.ctx.putImageData(saved, 0, 0);
  },

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
};

// Inicializar após o DOM carregar
setTimeout(() => DrawSystem.init(), 500);
window.DrawSystem = DrawSystem;
```

---

## RESUMO DOS ARQUIVOS MODIFICADOS

| Arquivo | Tarefas |
|---------|---------|
| `index.html` | 1 |
| `master.html` | 2, 3d, 4a/c, 5 |
| `js/master.js` | 3b/c, 4b |
| `js/map.js` | 4d |
| `player.html` | 4e |

## NOTAS PARA O AGENTE

- NÃO modificar `firebase.js`, `auth.js`, `room.js`, `chat.js`, `sheet.js`, `sounds.js`, `dice.js`
- NÃO alterar as regras do Firebase
- Manter todo CSS existente — apenas adicionar inline styles nos novos elementos
- O `DrawSystem` deve ser uma variável global (`window.DrawSystem`) pois é chamado por onclick inline
- O `MasterSystem` já é exposto em `window.MasterSystem` no final do master.js — manter isso
- Ao adicionar métodos no `MasterSystem`, adicioná-los DENTRO do objeto existente, antes do último `}`
