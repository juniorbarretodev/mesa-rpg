import{R as m,d as x,a as b,u as M,S as f,c as B,o as N,A as w}from"./sounds-DvokLOTz.js";import{T as h,B as E,M as p}from"./battle-E3W_S5g0.js";import{C as v,D as I}from"./dice-B1K2oSAH.js";const y={playerSheets:{},listeners:[],npcTemplates:[{name:"Orc",hp:30,type:h.ENEMY,color:"#dc2626"},{name:"Goblin",hp:10,type:h.ENEMY,color:"#16a34a"},{name:"Esqueleto",hp:20,type:h.ENEMY,color:"#e5e5e5"},{name:"Lobo",hp:15,type:h.ENEMY,color:"#6b7280"},{name:"Mago",hp:25,type:h.NPC,color:"#3b82f6"},{name:"Aldeão",hp:8,type:h.NPC,color:"#92400e"},{name:"Guarda",hp:20,type:h.NPC,color:"#1e40af"}],async initialize(){var e,a,t;if(!m.isMaster){console.warn("MasterSystem: Apenas o mestre pode inicializar");return}(e=document.getElementById("btnAddHostil"))==null||e.addEventListener("click",()=>this.openNpcModal("hostile")),(a=document.getElementById("btnAddNeutro"))==null||a.addEventListener("click",()=>this.openNpcModal("neutral")),(t=document.getElementById("btnAddAmigavel"))==null||t.addEventListener("click",()=>this.openNpcModal("friendly")),await this.subscribeToPlayerSheets()},async subscribeToPlayerSheets(){const e=m.currentRoomCode;if(!e)return;const a=B(b,"sheets",e,"players"),t=N(a,n=>{n.forEach(o=>{var r;const s={id:o.id,...o.data()};o.id!==((r=w.currentUser)==null?void 0:r.uid)&&(this.playerSheets[o.id]=s)}),this.renderPlayerSheets()});this.listeners.push({ref:a,listener:t,type:"firestore"})},renderPlayerSheets(){const e=document.getElementById("masterPlayerSheets");if(!e)return;const a=Object.values(this.playerSheets);if(a.length===0){e.innerHTML='<p class="text-muted">Nenhuma ficha de jogador ainda</p>';return}e.innerHTML=a.map(t=>{var s,r;const n=Math.max(0,Math.min(100,(t.hp||0)/(t.hpMax||20)*100)),o=t.avatarUrl?`<img src="${t.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`:`<span style="font-size:1.2rem;">${((r=(s=t.name)==null?void 0:s[0])==null?void 0:r.toUpperCase())||"?"}</span>`;return`
        <div class="master-sheet-card" data-player-id="${t.id}"
          draggable="true"
          ondragstart="MasterSystem.onPlayerCardDragStart(event, '${t.id}')">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:40px;height:40px;border-radius:50%;border:2px solid #c9a84c;
              background:#1a1208;overflow:hidden;display:flex;align-items:center;
              justify-content:center;flex-shrink:0;">
              ${o}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:#e8c97a;
                white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${t.name||"Sem nome"}
              </div>
              <div style="font-size:0.65rem;color:#a08050;">
                ${t.class||"Aventureiro"} Nv.${t.level||1}
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${t.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${t.id}', -1)">-1</button>
            <span style="font-family:'Cinzel',serif;font-size:0.8rem;color:#e8d8b0;margin:0 4px;">
              ${t.hp||0}/${t.hpMax||20}
            </span>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${t.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;"
              onclick="MasterSystem.adjustPlayerHP('${t.id}', 5)">+5</button>
          </div>
          <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;margin-bottom:6px;">
            <div style="height:100%;width:${n}%;background:${n>50?"#16a34a":n>25?"#ca8a04":"#dc2626"};transition:width 0.3s;"></div>
          </div>
          ${(t.status||[]).length>0?`
            <div style="font-size:0.6rem;color:#f1c40f;">⚠ ${t.status.join(", ")}</div>
          `:""}
          <div style="display:flex;gap:4px;margin-top:6px;">
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;"
              onclick="MasterSystem.showStatusModal('${t.id}', '${t.name}')">Status</button>
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;"
              onclick="MasterSystem.dragPlayerToMap('${t.id}')">🗺</button>
          </div>
        </div>
      `}).join("")},onPlayerCardDragStart(e,a){const t=this.playerSheets[a];t&&(e.dataTransfer.setData("playerCard",JSON.stringify({playerId:a,name:t.name,avatarUrl:t.avatarUrl||"",hp:t.hp,hpMax:t.hpMax})),e.dataTransfer.effectAllowed="copy")},async dragPlayerToMap(e){const a=this.playerSheets[e];a&&await p.addToken({name:a.name,type:"player",hp:a.hp,hpMax:a.hpMax,avatarUrl:a.avatarUrl||"",color:"#c9a84c",ownerId:e})},async adjustPlayerHP(e,a){const t=m.currentRoomCode;if(!t)return;const n=x(b,"sheets",t,"players",e),o=this.playerSheets[e];if(!o)return;const s=Math.max(0,Math.min(o.hpMax,(o.hp||0)+a));await M(n,{hp:s}),this.playerSheets[e]={...o,hp:s},this.renderPlayerSheets(),f.playDiceLand()},showStatusModal(e,a){const t=this.playerSheets[e];if(!t)return;const n=["Envenenado","Atordoado","Paralizado","Assustado","Protegido","Bendito","Abraçado","Enfeitiçado","Cego","Surdo","Mudo","Sangrando"],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
      <div class="modal-content">
        <h3>Status: ${a}</h3>
        <div class="status-grid">
          ${n.map(s=>{var r;return`
            <label class="status-checkbox">
              <input type="checkbox" value="${s}" 
                ${(r=t.status)!=null&&r.includes(s)?"checked":""}
                onchange="MasterSystem.togglePlayerStatus('${e}', '${s}', this.checked)">
              ${s}
            </label>
          `}).join("")}
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Fechar</button>
        </div>
      </div>
    `,document.body.appendChild(o)},async togglePlayerStatus(e,a,t){const n=m.currentRoomCode;if(!n)return;const o=x(b,"sheets",n,"players",e),s=this.playerSheets[e];if(!s)return;let r=[...s.status||[]];t&&!r.includes(a)?r.push(a):t||(r=r.filter(d=>d!==a)),await M(o,{status:r}),this.playerSheets[e]={...s,status:r},this.renderPlayerSheets()},createNpcFromStaticModal(e,a){var c,l,u,i;const t=((l=(c=document.getElementById("npcModalName"))==null?void 0:c.value)==null?void 0:l.trim())||"NPC",n=parseInt((u=document.getElementById("npcModalHp"))==null?void 0:u.value)||20,o=parseInt((i=document.getElementById("npcModalHpMax"))==null?void 0:i.value)||20,s={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},r={hostile:"enemy",neutral:"npc",friendly:"friendly"},d={id:`npc_${Date.now()}`,name:t,hp:n,hpMax:o,type:r[e],color:s[e],status:"Normal"};this.npcCards||(this.npcCards={}),this.npcCards[d.id]=d,this.renderNpcCard(d)},openNpcModal(e){document.querySelectorAll(".modal-overlay").forEach(s=>s.remove());const a={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},t={hostile:"Hostil",neutral:"Neutro",friendly:"Amigável"},n=Date.now(),o=document.createElement("div");o.className="modal-overlay",o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;",o.innerHTML=`
      <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:8px;padding:24px;min-width:300px;">
        <h3 style="color:#e8c97a;margin-bottom:16px;">Novo NPC ${t[e]}</h3>
        <div style="margin-bottom:12px;">
          <label for="npcModalName_${n}" style="display:block;margin-bottom:4px;font-size:0.85rem;">Nome</label>
          <input id="npcModalName_${n}" type="text" placeholder="Nome do NPC"
            style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
        </div>
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <div style="flex:1;">
            <label for="npcModalHp_${n}" style="display:block;margin-bottom:4px;font-size:0.85rem;">HP</label>
            <input id="npcModalHp_${n}" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
          </div>
          <div style="flex:1;">
            <label for="npcModalHpMax_${n}" style="display:block;margin-bottom:4px;font-size:0.85rem;">HP Máx</label>
            <input id="npcModalHpMax_${n}" type="number" value="20" min="1"
              style="width:100%;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;padding:8px;border-radius:4px;">
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="btnCancelNpc_${n}" onclick="this.closest('.modal-overlay').remove()"
            style="background:transparent;border:1px solid #8a6a1a;color:#c9a84c;padding:8px 16px;border-radius:4px;cursor:pointer;">
            Cancelar
          </button>
          <button id="btnCreateNpc_${n}" onclick="window.MasterSystem.createNpcFromModal('${e}', '${n}')"
            style="background:${a[e]};border:none;color:white;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;">
            Criar NPC
          </button>
        </div>
      </div>
    `,document.body.appendChild(o),document.getElementById(`btnCancelNpc_${n}`).addEventListener("click",()=>{o.remove()}),document.getElementById(`btnCreateNpc_${n}`).addEventListener("click",()=>{this.createNpcFromModal(e,n)}),document.getElementById(`npcModalName_${n}`).focus()},createNpcFromModal(e,a){var c,l,u,i;const t=((l=(c=document.getElementById(`npcModalName_${a}`))==null?void 0:c.value)==null?void 0:l.trim())||"NPC",n=parseInt((u=document.getElementById(`npcModalHp_${a}`))==null?void 0:u.value)||20,o=parseInt((i=document.getElementById(`npcModalHpMax_${a}`))==null?void 0:i.value)||20,s={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},r={hostile:"enemy",neutral:"npc",friendly:"friendly"};document.querySelectorAll(".modal-overlay").forEach(S=>S.remove());const d={id:`npc_${Date.now()}`,name:t,hp:n,hpMax:o,status:"",type:r[e]||"npc",alignment:e,color:s[e]};this.npcCards||(this.npcCards={}),this.npcCards[d.id]=d,this.renderNpcCard(d)},renderNpcCard(e){var c;const a=document.getElementById("npcCardsContainer");if(!a)return;const t={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},n={hostile:"Hostil",neutral:"Neutro",friendly:"Amigável"},o=["—","Caído","Sangrando","Paralizado","Atordoado","Envenenado","Assustado","Cego"],s=Math.max(0,Math.min(100,e.hp/e.hpMax*100)),r=t[e.alignment]||e.color||"#888";(c=document.getElementById(`npc-card-${e.id}`))==null||c.remove();const d=document.createElement("div");d.id=`npc-card-${e.id}`,d.draggable=!0,d.style.cssText=`
      width:140px; background:#1a1208; border:2px solid ${r};
      border-radius:6px; padding:10px; position:relative;
      flex-shrink:0; cursor:grab;
    `,d.innerHTML=`
      <button onclick="MasterSystem.removeNpc('${e.id}')"
        style="position:absolute;top:4px;right:4px;background:none;border:none;color:#888;cursor:pointer;font-size:0.75rem;">✕</button>

      <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:${r};margin-bottom:6px;padding-right:16px;
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${e.name}">
        ${e.name}
      </div>

      <span style="font-size:0.55rem;background:${r}22;border:1px solid ${r};
        color:${r};padding:1px 5px;border-radius:2px;font-family:'Cinzel',serif;letter-spacing:1px;">
        ${n[e.alignment]||"NPC"}
      </span>

      <div style="margin-top:8px;">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
          <button onclick="MasterSystem.adjustNpcHP('${e.id}',-1)"
            style="background:#dc2626;border:none;color:white;width:20px;height:20px;border-radius:3px;cursor:pointer;font-size:0.8rem;">−</button>
          <input id="npc-hp-${e.id}" type="number" value="${e.hp}" min="0" max="${e.hpMax}"
            aria-label="Vida atual do NPC"
            onchange="MasterSystem.setNpcHP('${e.id}', this.value)"
            style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
              color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.75rem;">
          <span style="color:#666;font-size:0.7rem;">/${e.hpMax}</span>
          <button onclick="MasterSystem.adjustNpcHP('${e.id}',1)"
            style="background:#16a34a;border:none;color:white;width:20px;height:20px;border-radius:3px;cursor:pointer;font-size:0.8rem;">+</button>
        </div>
        <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;">
          <div id="npc-hpbar-${e.id}" style="height:100%;width:${s}%;background:${s>50?"#16a34a":s>25?"#ca8a04":"#dc2626"};transition:width 0.3s;"></div>
        </div>
      </div>

      <select id="npc-status-${e.id}" aria-label="Status do NPC" onchange="MasterSystem.setNpcStatus('${e.id}', this.value)"
        style="width:100%;margin-top:8px;background:#0a0705;border:1px solid #8a6a1a;
          color:#a08050;border-radius:3px;padding:3px;font-size:0.65rem;">
        ${o.map(l=>`<option value="${l}" ${e.status===l?"selected":""}>${l}</option>`).join("")}
      </select>

      ${e.status&&e.status!=="—"?`
        <div style="margin-top:4px;font-size:0.6rem;color:#f1c40f;text-align:center;">⚠ ${e.status}</div>
      `:""}
    `,d.addEventListener("dragstart",l=>{l.dataTransfer.setData("npcCard",JSON.stringify(e)),l.dataTransfer.effectAllowed="copy"}),a.appendChild(d)},adjustNpcHP(e,a){var o;const t=(o=this.npcCards)==null?void 0:o[e];if(!t)return;t.hp=Math.max(0,Math.min(t.hpMax,t.hp+a)),this.npcCards[e]=t,this.renderNpcCard(t);const n=Object.values(p.tokens||{}).find(s=>s.npcCardId===e);n&&p.updateToken(n.id,{hp:t.hp})},setNpcHP(e,a){var r;const t=(r=this.npcCards)==null?void 0:r[e];if(!t)return;t.hp=Math.max(0,Math.min(t.hpMax,parseInt(a)||0)),this.npcCards[e]=t;const n=Math.max(0,Math.min(100,t.hp/t.hpMax*100)),o=document.getElementById(`npc-hpbar-${e}`);o&&(o.style.width=n+"%",o.style.background=n>50?"#16a34a":n>25?"#ca8a04":"#dc2626");const s=Object.values(p.tokens||{}).find(d=>d.npcCardId===e);s&&p.updateToken(s.id,{hp:t.hp})},setNpcStatus(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.status=a,this.npcCards[e]=t,this.renderNpcCard(t))},removeNpc(e){var t,n;(t=this.npcCards)==null||delete t[e],(n=document.getElementById(`npc-card-${e}`))==null||n.remove();const a=Object.values(p.tokens||{}).find(o=>o.npcCardId===e);a&&p.removeToken(a.id)},async handleMapDrop(e){e.preventDefault();const a=e.dataTransfer.getData("npcCard");if(a){const n=JSON.parse(a);await p.addToken({name:n.name,type:n.type,hp:n.hp,hpMax:n.hpMax,color:n.color,npcCardId:n.id}),f.playNotification();return}const t=e.dataTransfer.getData("playerCard");if(t){const n=JSON.parse(t);await p.addToken({name:n.name,type:"player",hp:n.hp,hpMax:n.hpMax,avatarUrl:n.avatarUrl,color:"#c9a84c",ownerId:n.playerId}),f.playNotification();return}},async toggleBattleMode(){var n;const e=m.currentRoomCode;if(!e||!m.isMaster)return;const a=!((n=m.currentRoom)!=null&&n.battleMode),t=x(b,"rooms",e);return await M(t,{battleMode:a}),a?(await E.startBattle(),f.playBattleStart()):await E.endBattle(),a},async endSession(){if(!confirm("Tem certeza que deseja encerrar a sessão?"))return;const e=m.currentRoomCode;if(!e)return;const a=x(b,"rooms",e);await M(a,{status:"closed"}),await m.leaveRoom(e),window.location.href="index.html"},cleanup(){this.listeners.forEach(({ref:e,listener:a,type:t})=>{t==="firestore"&&a()}),this.listeners=[],this.playerSheets={}}};window.MasterSystem=y;const P=new URLSearchParams(window.location.search),g=P.get("code");async function z(){var e,a,t,n;try{if(console.log("[Master] Iniciando sistemas..."),await w.waitForInitialization(),!g||!w.isAuthenticated()){window.location.href="index.html";return}if(await m.joinRoom(g),!m.isMaster){console.warn("[Master] Acesso negado. Redirecionando para Lobby."),window.location.href="lobby.html?code="+g;return}document.getElementById("masterNick").textContent=w.currentNick,document.getElementById("roomName").textContent=((e=m.currentRoom)==null?void 0:e.name)||"Mesa",console.log("[Master] Inicializando Mapa..."),await p.initialize("mapContainer"),p.subscribeToMap();const o=document.querySelector(".map-wrapper");o&&(o.addEventListener("dragover",i=>i.preventDefault()),o.addEventListener("drop",i=>y.handleMapDrop(i)),console.log("[Master] Listeners de Drop no Mapa configurados."));const s=document.getElementById("npcModalConfig"),r=document.getElementById("npcModalTitle"),d=document.getElementById("btnCancelNpc"),c=document.getElementById("btnCreateNpc");let l="hostile";(a=document.getElementById("btnAddHostil"))==null||a.addEventListener("click",i=>{l="hostile",r.textContent="Novo NPC Hostil",c.style.background="#dc2626",s.style.display="flex"}),(t=document.getElementById("btnAddNeutro"))==null||t.addEventListener("click",i=>{l="neutral",r.textContent="Novo NPC Neutro",c.style.background="#ca8a04",s.style.display="flex"}),(n=document.getElementById("btnAddAmigavel"))==null||n.addEventListener("click",i=>{l="friendly",r.textContent="Novo NPC Amigável",c.style.background="#16a34a",s.style.display="flex"}),d==null||d.addEventListener("click",()=>{s.style.display="none",document.getElementById("npcModalName").value=""}),c==null||c.addEventListener("click",()=>{const i=Date.now();y.createNpcFromStaticModal(l,i),s.style.display="none",document.getElementById("npcModalName").value=""}),m.subscribeToRoom(g,{onRoomUpdate:i=>{document.getElementById("battleIndicator").classList.toggle("active",i.battleMode),i.battleMode&&(document.getElementById("toggleBattleBtn").textContent="⚔️ Desativar Batalha",document.getElementById("toggleBattleBtn").classList.remove("btn-success"),document.getElementById("toggleBattleBtn").classList.add("btn-danger"))},onPlayersUpdate:i=>{}}),console.log("[Master] Inicializando Chat e Batalha..."),v.subscribeToChat(g,i=>{typeof renderChatMessages=="function"?renderChatMessages(i):typeof C=="function"&&C(i)}),v.subscribeToDice(g,i=>{typeof renderDiceHistory=="function"?renderDiceHistory(i):typeof k=="function"&&k(i)}),await y.initialize(),await E.initialize(),window.DrawSystem&&window.DrawSystem.init();const u=document.getElementById("chatInput");u.disabled=!1,u.placeholder="Digite sua mensagem...",document.getElementById("chatSendBtn").disabled=!1,console.log("[Master] Sistemas prontos!")}catch(o){console.error("[Master] Erro crítico na inicialização:",o),alert("Erro ao carregar mesa. Verifique o console.")}}function C(e){const a=document.getElementById("chatMessages");a.innerHTML=e.slice(-50).map(t=>{const n=new Date(t.timestamp).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),o=t.type==="roll"?"text-gold":t.type==="action"?"text-green":t.type==="battle"?"text-red":t.type==="system"?"text-purple":"";return t.type==="roll"?`<div class="message"><span class="message-sender">${t.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${n}</span><div class="message-roll">🎲 ${t.text}</div></div>`:`<div class="message ${o}"><span class="message-sender">${t.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${n}</span><div>${t.text}</div></div>`}).join(""),a.scrollTop=a.scrollHeight}function k(e){const a=document.getElementById("rollHistory");a.innerHTML=e.slice(-10).reverse().map(t=>`
        <div class="mb-sm" style="padding: 0.5rem; background: var(--color-bg-secondary); border-radius: var(--radius-sm);">
          <strong>${t.rolledBy}</strong> <span class="text-gold">${t.dice}</span> = ${t.total}
          ${t.context?`<div class="text-muted" style="font-size: 0.8rem;">${t.context}</div>`:""}
        </div>
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhuma rolagem ainda</p>'}function L(){const e=document.getElementById("tokensList"),a=Object.values(p.tokens||{});e.innerHTML=a.map(t=>`
        <div class="token-item" style="
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-sm);
          border-left: 3px solid ${t.color};
        ">
          <span>${t.name}</span>
          ${t.hpMax>0?`<span class="text-muted" style="font-size: 0.8rem;">${t.hp}/${t.hpMax} HP</span>`:""}
        </div>
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhum token</p>'}z();async function $(e){const a=document.getElementById("diceDisplay"),t=await I.rollWithAnimation(e,a,{animate:!0});a.textContent=t.total,await v.sendRoll(e,t.results,t.total,"Mestre"),f.playDiceRoll(),setTimeout(()=>f.playDiceLand(),300)}document.querySelectorAll(".dice-btn").forEach(e=>{e.addEventListener("click",()=>$(e.dataset.dice))});document.getElementById("rollCustomBtn").addEventListener("click",()=>{const e=document.getElementById("customDiceInput").value.trim();e&&$(e)});document.getElementById("customDiceInput").addEventListener("keypress",e=>{if(e.key==="Enter"){const a=e.target.value.trim();a&&$(a)}});document.getElementById("chatForm").addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("chatInput").value.trim();a&&(await v.sendMessage(a),document.getElementById("chatInput").value="")});document.getElementById("toggleBattleBtn").addEventListener("click",async()=>{await y.toggleBattleMode()});document.getElementById("endSessionBtn").addEventListener("click",async()=>{await y.endSession()});document.getElementById("loadMapBtn").addEventListener("click",()=>{const e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",e.addEventListener("change",a=>{const t=a.target.files[0];t&&p.uploadMapImage(t)}),document.body.appendChild(e),e.click(),e.remove()});document.getElementById("toggleGridBtn").addEventListener("click",()=>{p.toggleGrid()});setInterval(()=>{L()},2e3);window.DrawSystem={tool:"none",drawing:!1,canvas:null,ctx:null,init(){this.canvas=document.getElementById("drawCanvas"),this.canvas&&(this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.resize(),window.addEventListener("resize",()=>this.resize()),document.addEventListener("mousedown",e=>{this.tool!=="none"&&e.target!==this.canvas&&!e.target.closest("#drawToolbar")&&this.setTool("none")}),this.canvas.addEventListener("mousedown",e=>{if(this.tool==="none")return;this.drawing=!0;const a=this.getPos(e);this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y)}),this.canvas.addEventListener("mousemove",e=>{var n,o;if(!this.drawing||this.tool==="none")return;const a=this.getPos(e),t=parseInt(((n=document.getElementById("drawSize"))==null?void 0:n.value)||4);this.tool==="eraser"?this.ctx.clearRect(a.x-t,a.y-t,t*2,t*2):(this.ctx.strokeStyle=((o=document.getElementById("drawColor"))==null?void 0:o.value)||"#e74c3c",this.ctx.lineWidth=t,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineTo(a.x,a.y),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y))}),this.canvas.addEventListener("mouseup",()=>{this.drawing=!1}),this.canvas.addEventListener("mouseleave",()=>{this.drawing=!1}))},setTool(e){var a,t;this.tool=this.tool===e?"none":e,this.canvas.style.pointerEvents=this.tool!=="none"?"all":"none",this.canvas.style.cursor=this.tool==="pen"?"crosshair":this.tool==="eraser"?"cell":"default",(a=document.getElementById("btnPen"))==null||a.style.setProperty("border-color",this.tool==="pen"?"#e8c97a":"#8a6a1a"),(t=document.getElementById("btnEraser"))==null||t.style.setProperty("border-color",this.tool==="eraser"?"#e8c97a":"#8a6a1a")},clear(){this.ctx&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},resize(){var t;if(!this.canvas)return;const e=this.canvas.parentElement;if(!e)return;const a=(t=this.ctx)==null?void 0:t.getImageData(0,0,this.canvas.width,this.canvas.height);this.canvas.width=e.offsetWidth,this.canvas.height=e.offsetHeight,a&&this.ctx.putImageData(a,0,0)},getPos(e){const a=this.canvas.getBoundingClientRect();return{x:e.clientX-a.left,y:e.clientY-a.top}}};window.addEventListener("beforeunload",()=>{v.unsubscribe(),p.unsubscribe(),y.cleanup(),E.cleanup(),m.cleanup()});
