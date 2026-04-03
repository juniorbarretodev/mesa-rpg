import{R as r,d as h,a as u,u as v,S as d,c as B,o as S,A as g}from"./sounds-vUoiWWks.js";import{T as l,B as b,M as m}from"./battle-BMqdJid8.js";import{C as y,D as w}from"./dice-DtlRVfWd.js";const c={playerSheets:{},listeners:[],npcTemplates:[{name:"Orc",hp:30,type:l.ENEMY,color:"#dc2626"},{name:"Goblin",hp:10,type:l.ENEMY,color:"#16a34a"},{name:"Esqueleto",hp:20,type:l.ENEMY,color:"#e5e5e5"},{name:"Lobo",hp:15,type:l.ENEMY,color:"#6b7280"},{name:"Mago",hp:25,type:l.NPC,color:"#3b82f6"},{name:"Aldeão",hp:8,type:l.NPC,color:"#92400e"},{name:"Guarda",hp:20,type:l.NPC,color:"#1e40af"}],async initialize(){if(!r.isMaster){console.warn("MasterSystem: Apenas o mestre pode inicializar");return}await this.subscribeToPlayerSheets(),await this.setupNPCPanel()},async subscribeToPlayerSheets(){const t=r.currentRoomCode;if(!t)return;const a=B(u,"sheets",t),e=S(a,s=>{s.forEach(n=>{var i;const o={id:n.id,...n.data()};n.id!==((i=g.currentUser)==null?void 0:i.uid)&&(this.playerSheets[n.id]=o)}),this.renderPlayerSheets()});this.listeners.push({ref:a,listener:e,type:"firestore"})},renderPlayerSheets(){const t=document.getElementById("masterPlayerSheets");if(!t)return;const a=Object.values(this.playerSheets);if(a.length===0){t.innerHTML='<p class="text-muted">Nenhuma ficha de jogador ainda</p>';return}t.innerHTML=a.map(e=>{var s,n,o,i;return`
      <div class="master-sheet-card" data-player-id="${e.id}">
        <div class="master-sheet-header">
          <div class="master-sheet-avatar">${((n=(s=e.name)==null?void 0:s[0])==null?void 0:n.toUpperCase())||"?"}</div>
          <div class="master-sheet-info">
            <h4>${e.name||"Sem nome"}</h4>
            <span class="text-muted">${e.class||"Aventureiro"} Nv. ${e.level||1}</span>
          </div>
        </div>
        <div class="master-sheet-hp">
          <div class="hp-control">
            <button class="btn btn-sm btn-danger" onclick="MasterSystem.adjustPlayerHP('${e.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" onclick="MasterSystem.adjustPlayerHP('${e.id}', -1)">-1</button>
            <span class="hp-display">${e.hp||0}/${e.hpMax||20}</span>
            <button class="btn btn-sm btn-success" onclick="MasterSystem.adjustPlayerHP('${e.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" onclick="MasterSystem.adjustPlayerHP('${e.id}', 5)">+5</button>
          </div>
          <div class="hp-bar">
            <div class="hp-bar-fill" style="width: ${e.hp/e.hpMax*100}%"></div>
          </div>
        </div>
        <div class="master-sheet-status">
          <span class="badge ${(o=e.status)!=null&&o.includes("Envenenado")?"badge-red":"badge-gold"}">${((i=e.status)==null?void 0:i.join(", "))||"Sem status"}</span>
        </div>
        <div class="master-sheet-actions">
          <button class="btn btn-sm btn-secondary" onclick="MasterSystem.showStatusModal('${e.id}', '${e.name}')">
            Status
          </button>
        </div>
      </div>
    `}).join("")},async adjustPlayerHP(t,a){const e=r.currentRoomCode;if(!e)return;const s=h(u,"sheets",e,t),n=this.playerSheets[t];if(!n)return;const o=Math.max(0,Math.min(n.hpMax,(n.hp||0)+a));await v(s,{hp:o}),this.playerSheets[t]={...n,hp:o},this.renderPlayerSheets(),d.playDiceLand()},showStatusModal(t,a){const e=this.playerSheets[t];if(!e)return;const s=["Envenenado","Atordoado","Paralizado","Assustado","Protegido","Bendito","Abraçado","Enfeitiçado","Cego","Surdo","Mudo","Sangrando"],n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
      <div class="modal-content">
        <h3>Status: ${a}</h3>
        <div class="status-grid">
          ${s.map(o=>{var i;return`
            <label class="status-checkbox">
              <input type="checkbox" value="${o}" 
                ${(i=e.status)!=null&&i.includes(o)?"checked":""}
                onchange="MasterSystem.togglePlayerStatus('${t}', '${o}', this.checked)">
              ${o}
            </label>
          `}).join("")}
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Fechar</button>
        </div>
      </div>
    `,document.body.appendChild(n)},async togglePlayerStatus(t,a,e){const s=r.currentRoomCode;if(!s)return;const n=h(u,"sheets",s,t),o=this.playerSheets[t];if(!o)return;let i=[...o.status||[]];e&&!i.includes(a)?i.push(a):e||(i=i.filter(M=>M!==a)),await v(n,{status:i}),this.playerSheets[t]={...o,status:i},this.renderPlayerSheets()},setupNPCPanel(){const t=document.getElementById("npcList");t&&(t.innerHTML=this.npcTemplates.map(a=>`
      <div class="npc-template" draggable="true" data-npc='${JSON.stringify(a)}'>
        <span class="npc-color" style="background: ${a.color}"></span>
        <span>${a.name}</span>
        <span class="npc-hp">${a.hp} HP</span>
      </div>
    `).join(""),t.querySelectorAll(".npc-template").forEach(a=>{a.addEventListener("dragstart",e=>{e.dataTransfer.setData("npc",a.dataset.npc)})}))},async handleMapDrop(t){t.preventDefault();const a=t.dataTransfer.getData("npc");if(!a)return;const e=JSON.parse(a),s=document.querySelector(".map-wrapper");if(!s)return;const n=s.getBoundingClientRect();t.clientX-n.left,t.clientY-n.top,await m.addToken({name:e.name,type:e.type,hp:e.hp,hpMax:e.hp,color:e.color}),d.playNotification()},showAddNPCCustomModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
    `,document.body.appendChild(t)},async addCustomNPC(){const t=document.querySelector(".modal-overlay"),a=document.querySelector(".map-wrapper");if(!a)return;const e=a.getBoundingClientRect();e.width/2,e.height/2,await m.addToken({name:document.getElementById("customNpcName").value||"NPC",type:document.getElementById("customNpcType").value,hp:parseInt(document.getElementById("customNpcHp").value)||20,hpMax:parseInt(document.getElementById("customNpcHpMax").value)||20,color:document.getElementById("customNpcColor").value}),t==null||t.remove(),d.playNotification()},async toggleBattleMode(){var s;const t=r.currentRoomCode;if(!t||!r.isMaster)return;const a=!((s=r.currentRoom)!=null&&s.battleMode),e=h(u,"rooms",t);return await v(e,{battleMode:a}),a?(await b.startBattle(),d.playBattleStart()):await b.endBattle(),a},async endSession(){if(!confirm("Tem certeza que deseja encerrar a sessão?"))return;const t=r.currentRoomCode;if(!t)return;const a=h(u,"rooms",t);await v(a,{status:"closed"}),await r.leaveRoom(t),window.location.href="index.html"},cleanup(){this.listeners.forEach(({ref:t,listener:a,type:e})=>{e==="firestore"&&a()}),this.listeners=[],this.playerSheets={}}};window.MasterSystem=c;const P=new URLSearchParams(window.location.search),p=P.get("code");async function $(){var t;if(await g.waitForInitialization(),!p||!g.isAuthenticated()){window.location.href="index.html";return}if(await r.joinRoom(p),!r.isMaster){window.location.href="lobby.html?code="+p;return}document.getElementById("masterNick").textContent=g.currentNick,document.getElementById("roomName").textContent=((t=r.currentRoom)==null?void 0:t.name)||"Mesa",r.subscribeToRoom(p,{onRoomUpdate:a=>{document.getElementById("battleIndicator").classList.toggle("active",a.battleMode),a.battleMode&&(document.getElementById("toggleBattleBtn").textContent="⚔️ Desativar Batalha",document.getElementById("toggleBattleBtn").classList.remove("btn-success"),document.getElementById("toggleBattleBtn").classList.add("btn-danger"))},onPlayersUpdate:C}),y.subscribeToChat(p,N),y.subscribeToDice(p,k),await m.initialize("mapWrapper"),m.subscribeToMap(),c.setupNPCPanel(),await c.initialize(),await b.initialize()}function C(t){const a=document.getElementById("playersList");a.innerHTML=t.map(e=>{var s,n;return`
        <div class="player-item">
          <div class="player-avatar">${((n=(s=e.nick)==null?void 0:s[0])==null?void 0:n.toUpperCase())||"?"}</div>
          <span class="player-name">${e.nick}</span>
          <span class="player-status ${e.online?"":"offline"}">${e.online?"Online":"Offline"}</span>
        </div>
      `}).join("")}function N(t){const a=document.getElementById("chatMessages");a.innerHTML=t.slice(-50).map(e=>{const s=new Date(e.timestamp).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),n=e.type==="roll"?"text-gold":e.type==="action"?"text-green":e.type==="battle"?"text-red":e.type==="system"?"text-purple":"";return e.type==="roll"?`<div class="message"><span class="message-sender">${e.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${s}</span><div class="message-roll">🎲 ${e.text}</div></div>`:`<div class="message ${n}"><span class="message-sender">${e.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${s}</span><div>${e.text}</div></div>`}).join(""),a.scrollTop=a.scrollHeight}function k(t){const a=document.getElementById("rollHistory");a.innerHTML=t.slice(-10).reverse().map(e=>`
        <div class="mb-sm" style="padding: 0.5rem; background: var(--color-bg-secondary); border-radius: var(--radius-sm);">
          <strong>${e.rolledBy}</strong> <span class="text-gold">${e.dice}</span> = ${e.total}
          ${e.context?`<div class="text-muted" style="font-size: 0.8rem;">${e.context}</div>`:""}
        </div>
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhuma rolagem ainda</p>'}function x(){const t=document.getElementById("tokensList"),a=Object.values(m.tokens||{});t.innerHTML=a.map(e=>`
        <div class="token-item" style="
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-sm);
          border-left: 3px solid ${e.color};
        ">
          <span>${e.name}</span>
          ${e.hpMax>0?`<span class="text-muted" style="font-size: 0.8rem;">${e.hp}/${e.hpMax} HP</span>`:""}
        </div>
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhum token</p>'}$();const E=document.getElementById("mapWrapper");E.addEventListener("dragover",t=>t.preventDefault());E.addEventListener("drop",t=>c.handleMapDrop(t));async function f(t){const a=document.getElementById("diceDisplay"),e=await w.rollWithAnimation(t,a,{animate:!0});a.textContent=e.total,await y.sendRoll(t,e.results,e.total,"Mestre"),d.playDiceRoll(),setTimeout(()=>d.playDiceLand(),300)}document.querySelectorAll(".dice-btn").forEach(t=>{t.addEventListener("click",()=>f(t.dataset.dice))});document.getElementById("rollCustomBtn").addEventListener("click",()=>{const t=document.getElementById("customDiceInput").value.trim();t&&f(t)});document.getElementById("customDiceInput").addEventListener("keypress",t=>{if(t.key==="Enter"){const a=t.target.value.trim();a&&f(a)}});document.getElementById("chatForm").addEventListener("submit",async t=>{t.preventDefault();const a=document.getElementById("chatInput").value.trim();a&&(await y.sendMessage(a),document.getElementById("chatInput").value="")});document.getElementById("toggleBattleBtn").addEventListener("click",async()=>{await c.toggleBattleMode()});document.getElementById("endSessionBtn").addEventListener("click",async()=>{await c.endSession()});document.getElementById("addNpcBtn").addEventListener("click",()=>{c.showAddNPCCustomModal()});document.getElementById("clearDrawingBtn").addEventListener("click",async()=>{confirm("Limpar todo o desenho do mapa?")&&(await m.clearDrawing(),d.playButtonClick())});document.getElementById("changeMapBtn").addEventListener("click",()=>{document.getElementById("mapFileInput").click()});setInterval(()=>{x()},2e3);window.addEventListener("beforeunload",()=>{y.unsubscribe(),m.unsubscribe(),c.cleanup(),b.cleanup(),r.cleanup()});
