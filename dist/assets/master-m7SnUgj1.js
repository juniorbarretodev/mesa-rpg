import{R as r,d as f,a as y,u as g,S as m,c as L,o as _,A as C,b as E,r as M,e as w,s as H,g as R}from"./sounds-D8zRJubN.js";import{T as x,B as v,M as c}from"./battle-ClXZCOPJ.js";import{C as k,D}from"./dice-DwlbI5xZ.js";const S={playerSheets:{},playerInitMods:{},listeners:[],npcTemplates:[{name:"Orc",hp:30,type:x.ENEMY,color:"#dc2626"},{name:"Goblin",hp:10,type:x.ENEMY,color:"#16a34a"},{name:"Esqueleto",hp:20,type:x.ENEMY,color:"#e5e5e5"},{name:"Lobo",hp:15,type:x.ENEMY,color:"#6b7280"},{name:"Mago",hp:25,type:x.NPC,color:"#3b82f6"},{name:"Aldeão",hp:8,type:x.NPC,color:"#92400e"},{name:"Guarda",hp:20,type:x.NPC,color:"#1e40af"}],async initialize(){if(!r.isMaster){console.warn("MasterSystem: Apenas o mestre pode inicializar");return}await this.subscribeToPlayerSheets(),await this.subscribeToPlayerInitMods()},async subscribeToPlayerInitMods(){const e=r.currentRoomCode;if(!e)return;const a=E(M(w,`rooms/${e}/playerInitMods`),t=>{this.playerInitMods=t.val()||{}});this.listeners.push({ref:`rooms/${e}/playerInitMods`,listener:a,type:"rtdb"})},async subscribeToPlayerSheets(){const e=r.currentRoomCode;if(!e)return;const a=L(y,"sheets",e,"players"),t=_(a,n=>{n.forEach(s=>{var u;const i={id:s.id,...s.data()},o=this.playerSheets[s.id],l=o&&o.avatarUrl!==i.avatarUrl;s.id!==((u=C.currentUser)==null?void 0:u.uid)&&(this.playerSheets[s.id]=i),l&&this.syncPlayerToken(s.id)}),this.renderPlayerSheets()});this.listeners.push({ref:a,listener:t,type:"firestore"})},renderPlayerSheets(){const e=document.getElementById("masterPlayerSheets");if(!e)return;const a=Object.values(this.playerSheets);if(a.length===0){e.innerHTML='<p class="text-muted">Nenhuma ficha de jogador ainda</p>';return}e.innerHTML=a.map(t=>{var i,o;const n=Math.max(0,Math.min(100,(t.hp||0)/(t.hpMax||20)*100)),s=t.avatarUrl?`<img src="${t.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`:`<span style="font-size:1.2rem;">${((o=(i=t.name)==null?void 0:i[0])==null?void 0:o.toUpperCase())||"?"}</span>`;return`
        <div class="master-sheet-card" data-player-id="${t.id}" draggable="true" ondragstart="MasterSystem.onPlayerCardDragStart(event, '${t.id}')">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:40px;height:40px;border-radius:50%;border:2px solid #c9a84c;background:#1a1208;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              ${s}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-family:'Cinzel',serif;font-size:0.75rem;color:#e8c97a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${t.name||"Sem nome"}
              </div>
              <div style="font-size:0.65rem;color:#a08050;">
                ${t.class||"Aventureiro"} Nv.${t.level||1}
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${t.id}', -5)">-5</button>
            <button class="btn btn-sm btn-danger" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${t.id}', -1)">-1</button>
            <span style="font-family:'Cinzel',serif;font-size:0.8rem;color:#e8d8b0;margin:0 4px;">
              ${t.hp||0}/${t.hpMax||20}
            </span>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${t.id}', 1)">+1</button>
            <button class="btn btn-sm btn-success" style="padding:2px 6px;font-size:0.7rem;" onclick="MasterSystem.adjustPlayerHP('${t.id}', 5)">+5</button>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
            <label style="font-size:0.6rem;color:#8a6a1a;">HP Max:</label>
            <button class="btn btn-sm btn-secondary" style="padding:1px 5px;font-size:0.65rem;" onclick="MasterSystem.adjustPlayerHPMax('${t.id}', -5)">-5</button>
            <input type="number" value="${t.hpMax||20}" min="1"
              style="width:40px;background:#0a0705;border:1px solid #8a6a1a;color:#e8d8b0;
                border-radius:3px;padding:2px;text-align:center;font-size:0.65rem;"
              onchange="MasterSystem.setPlayerHPMax('${t.id}', this.value)">
            <button class="btn btn-sm btn-secondary" style="padding:1px 5px;font-size:0.65rem;" onclick="MasterSystem.adjustPlayerHPMax('${t.id}', 5)">+5</button>
          </div>
          <div style="height:6px;background:#333;border-radius:3px;overflow:hidden;margin-bottom:6px;">
            <div style="height:100%;width:${n}%;background:${n>50?"#16a34a":n>25?"#ca8a04":"#dc2626"};transition:width 0.3s;"></div>
          </div>
          ${(t.status||[]).length>0?`
            <div style="font-size:0.6rem;color:#f1c40f;">⚠ ${t.status.join(", ")}</div>
          `:""}
          <div style="display:flex;gap:4px;margin-top:6px;">
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;" onclick="MasterSystem.showStatusModal('${t.id}', '${t.name}')">Status</button>
            <button class="btn btn-sm btn-secondary" style="flex:1;font-size:0.65rem;" onclick="MasterSystem.dragPlayerToMap('${t.id}')">🗺</button>
          </div>
        </div>
      `}).join("")},onPlayerCardDragStart(e,a){const t=this.playerSheets[a];t&&(e.dataTransfer.setData("playerCard",JSON.stringify({playerId:a,name:t.name,avatarUrl:t.avatarUrl||"",hp:t.hp,hpMax:t.hpMax})),e.dataTransfer.effectAllowed="copy")},async dragPlayerToMap(e){const a=this.playerSheets[e];a&&await c.addToken({name:a.name,type:"player",hp:a.hp,hpMax:a.hpMax,avatarUrl:a.avatarUrl||"",color:"#c9a84c",ownerId:e})},async dragNpcToMap(e){var t;const a=(t=this.npcCards)==null?void 0:t[e];a&&(await c.addToken({name:a.name,type:a.type,hp:a.hp,hpMax:a.hpMax,color:a.color,npcCardId:a.id}),m.playNotification())},syncPlayerToken(e){try{const a=this.playerSheets[e];if(!a)return;const t=Object.values(c.tokens||{}).find(s=>s.ownerId===e);if(!t)return;const n={};(t.hp!==a.hp||t.hpMax!==a.hpMax)&&(n.hp=a.hp,n.hpMax=a.hpMax,n.status=a.status||[]),t.avatarUrl!==a.avatarUrl&&(n.avatarUrl=a.avatarUrl||""),Object.keys(n).length>0&&(c.updateToken(t.id,n),c.renderTokens())}catch{}},async adjustPlayerHP(e,a){const t=r.currentRoomCode;if(!t)return;const n=f(y,"sheets",t,"players",e),s=this.playerSheets[e];if(!s)return;const i=Math.max(0,Math.min(s.hpMax,(s.hp||0)+a));await g(n,{hp:i}),this.playerSheets[e]={...s,hp:i},this.renderPlayerSheets(),this.syncPlayerToken(e),m.playDiceLand()},async adjustPlayerHPMax(e,a){const t=r.currentRoomCode;if(!t)return;const n=f(y,"sheets",t,"players",e),s=this.playerSheets[e];if(!s)return;const i=Math.max(1,(s.hpMax||20)+a);await g(n,{hpMax:i}),this.playerSheets[e]={...s,hpMax:i},this.renderPlayerSheets(),this.syncPlayerToken(e)},async setPlayerHPMax(e,a){const t=r.currentRoomCode;if(!t)return;const n=f(y,"sheets",t,"players",e),s=this.playerSheets[e];if(!s)return;const i=Math.max(1,parseInt(a)||20);await g(n,{hpMax:i}),this.playerSheets[e]={...s,hpMax:i},this.renderPlayerSheets(),this.syncPlayerToken(e)},showStatusModal(e,a){const t=this.playerSheets[e];if(!t)return;const n=["Envenenado","Atordoado","Paralizado","Assustado","Protegido","Bendito","Abraçado","Enfeitiçado","Cego","Surdo","Mudo","Sangrando"],s=document.createElement("div");s.className="modal-overlay-npc",s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;",s.innerHTML=`
      <div style="background:#1a1208;border:1px solid #8a6a1a;border-radius:8px;padding:24px;min-width:300px;">
        <h3 style="color:#e8c97a;margin-bottom:16px;">Status: ${a}</h3>
        <div class="status-grid">
          ${n.map(i=>{var o;return`
            <label class="status-checkbox">
              <input type="checkbox" value="${i}" 
                ${(o=t.status)!=null&&o.includes(i)?"checked":""}
                onchange="MasterSystem.togglePlayerStatus('${e}', '${i}', this.checked)">
              ${i}
            </label>
          `}).join("")}
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay-npc').remove()">Fechar</button>
        </div>
      </div>
    `,document.body.appendChild(s)},async togglePlayerStatus(e,a,t){const n=r.currentRoomCode;if(!n)return;const s=f(y,"sheets",n,"players",e),i=this.playerSheets[e];if(!i)return;let o=[...i.status||[]];t&&!o.includes(a)?o.push(a):t||(o=o.filter(l=>l!==a)),await g(s,{status:o}),this.playerSheets[e]={...i,status:o},this.renderPlayerSheets(),this.syncPlayerToken(e)},_npcCreating:!1,openNpcModal(e){document.querySelectorAll(".modal-overlay-npc").forEach(o=>o.remove());const a={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},t={hostile:"Hostil",neutral:"Neutro",friendly:"Amigável"},n=a[e]||"#888",s=t[e]||"NPC",i=document.createElement("div");i.className="modal-overlay-npc",i.style.cssText=["position:fixed","inset:0","background:rgba(0,0,0,0.75)","display:flex","align-items:center","justify-content:center","z-index:9999"].join(";"),i.innerHTML=`
      <div style="background:#1a1208;border:2px solid ${n};border-radius:8px;
                  padding:24px;min-width:300px;max-width:360px;width:90%;">
        <h3 style="color:${n};margin:0 0 16px;font-family:'Cinzel',serif;
                   font-size:1rem;letter-spacing:2px;">+ NPC ${s}</h3>

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
            style="background:${n};border:none;color:white;padding:8px 16px;
                   border-radius:4px;cursor:pointer;font-weight:bold;font-size:0.85rem;">
            Criar NPC
          </button>
        </div>
      </div>
    `,document.body.appendChild(i),i.querySelector("#_npcName").focus(),i.addEventListener("click",o=>{o.target===i&&i.remove()}),i.querySelector("#_npcCancel").addEventListener("click",()=>i.remove()),i.querySelector("#_npcConfirm").addEventListener("click",()=>{if(this._npcCreating)return;const o=i.querySelector("#_npcName").value.trim()||"NPC",l=Math.max(1,parseInt(i.querySelector("#_npcHp").value)||20),u=Math.max(1,parseInt(i.querySelector("#_npcHpMax").value)||20);i.remove(),this._createNpc(e,o,l,u)}),i.querySelector("#_npcName").addEventListener("keydown",o=>{o.key==="Enter"&&i.querySelector("#_npcConfirm").click()})},_createNpc(e,a,t,n){if(this._npcCreating)return;this._npcCreating=!0,setTimeout(()=>{this._npcCreating=!1},5e3);const s={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},i={hostile:"enemy",neutral:"npc",friendly:"friendly"};this.npcCards||(this.npcCards={});const o={id:`npc_${Date.now()}`,name:a,hp:t,hpMax:n,initMod:0,status:"—",alignment:e,type:i[e]||"npc",color:s[e]||"#888"};this.npcCards[o.id]=o,this._renderNpcCard(o);try{m.playNotification()}catch{}},_renderNpcCard(e){var $;const a=document.getElementById("npcCardsContainer");if(!a)return;const t={hostile:"#dc2626",neutral:"#ca8a04",friendly:"#16a34a"},n={hostile:"Hostil",neutral:"Neutro",friendly:"Amigável"},s=["—","Caído","Sangrando","Paralizado","Atordoado","Envenenado","Assustado","Cego"],i=t[e.alignment]||e.color||"#888",o=n[e.alignment]||"NPC",l=Math.max(0,Math.min(100,e.hp/e.hpMax*100)),u=l>50?"#16a34a":l>25?"#ca8a04":"#dc2626";($=document.getElementById(`npc-card-${e.id}`))==null||$.remove();const p=document.createElement("div");p.id=`npc-card-${e.id}`,p.draggable=!0,p.style.cssText=`
      width:150px;background:#1a1208;border:2px solid ${i};border-radius:6px;
      padding:10px;position:relative;flex-shrink:0;cursor:grab;user-select:none;
    `,p.innerHTML=`
      <!-- botão remover -->
      <button data-action="remove"
        style="position:absolute;top:4px;right:4px;background:none;border:none;
               color:#666;cursor:pointer;font-size:0.8rem;line-height:1;">✕</button>

      <!-- nome -->
      <div style="font-family:'Cinzel',serif;font-size:0.72rem;color:${i};
                  margin-bottom:5px;padding-right:18px;white-space:nowrap;
                  overflow:hidden;text-overflow:ellipsis;" title="${e.name}">
        ${e.name}
      </div>

      <!-- badge tipo -->
      <span style="font-size:0.5rem;background:${i}22;border:1px solid ${i};
                   color:${i};padding:1px 5px;border-radius:2px;
                   font-family:'Cinzel',serif;letter-spacing:1px;">${o}</span>

      <!-- controles HP -->
      <div style="margin-top:8px;">
        <div style="display:flex;align-items:center;gap:3px;margin-bottom:4px;">
          <button data-action="hp-minus"
            style="background:#dc2626;border:none;color:white;width:20px;height:20px;
                   border-radius:3px;cursor:pointer;font-size:0.9rem;flex-shrink:0;">−</button>
          <input data-action="hp-input" type="number"
            value="${e.hp}" min="0" max="${e.hpMax}"
            style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
                   color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.75rem;">
          <span data-action="hpmax-display" style="color:#666;font-size:0.7rem;flex-shrink:0;">/${e.hpMax}</span>
          <button data-action="hp-plus"
            style="background:#16a34a;border:none;color:white;width:20px;height:20px;
                   border-radius:3px;cursor:pointer;font-size:0.9rem;flex-shrink:0;">+</button>
        </div>
        <!-- barra HP -->
        <div style="height:5px;background:#333;border-radius:3px;overflow:hidden;">
          <div data-action="hp-bar"
            style="height:100%;width:${l}%;background:${u};transition:width 0.3s;"></div>
        </div>
      </div>

      <!-- HP Max -->
      <div style="display:flex;align-items:center;gap:3px;margin-top:6px;">
        <label style="font-size:0.55rem;color:#8a6a1a;">HP Max:</label>
        <button data-action="hpmax-minus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">−</button>
        <input data-action="hpmax-input" type="number"
          value="${e.hpMax}" min="1"
          style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
                 color:#e8d8b0;border-radius:3px;padding:2px;font-size:0.65rem;">
        <button data-action="hpmax-plus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">+</button>
      </div>

      <!-- Init Mod -->
      <div style="display:flex;align-items:center;gap:3px;margin-top:4px;">
        <label style="font-size:0.55rem;color:#c9a84c;">Init:</label>
        <button data-action="initmod-minus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">−</button>
        <input data-action="initmod-input" type="number"
          value="${e.initMod||0}"
          style="width:36px;text-align:center;background:#0a0705;border:1px solid #8a6a1a;
                 color:#c9a84c;border-radius:3px;padding:2px;font-size:0.65rem;">
        <button data-action="initmod-plus"
          style="background:#555;border:none;color:white;width:18px;height:18px;
                 border-radius:2px;cursor:pointer;font-size:0.75rem;flex-shrink:0;">+</button>
      </div>

      <!-- status -->
      <select data-action="status"
        style="width:100%;margin-top:8px;background:#0a0705;border:1px solid #8a6a1a;
               color:#a08050;border-radius:3px;padding:3px;font-size:0.62rem;">
        ${s.map(d=>`<option value="${d}"${e.status===d?" selected":""}>${d}</option>`).join("")}
      </select>
      ${e.status&&e.status!=="—"?`<div style="margin-top:3px;font-size:0.58rem;color:#f1c40f;text-align:center;">⚠ ${e.status}</div>`:""}

      <!-- add to map -->
      <button data-action="map"
        style="width:100%;margin-top:6px;background:#c9a84c;border:none;color:white;
               padding:4px 8px;border-radius:3px;cursor:pointer;font-size:0.7rem;">
        &#x1F5FA;&#xFE0F; Adicionar ao Mapa
      </button>
    `,p.addEventListener("click",d=>{var T;const h=(T=d.target.closest("[data-action]"))==null?void 0:T.dataset.action;h&&(h==="remove"&&this._removeNpc(e.id),h==="hp-minus"&&this._adjustNpcHP(e.id,-1),h==="hp-plus"&&this._adjustNpcHP(e.id,1),h==="hpmax-minus"&&this._adjustNpcHPMax(e.id,-1),h==="hpmax-plus"&&this._adjustNpcHPMax(e.id,1),h==="initmod-minus"&&this._adjustNpcInitMod(e.id,-1),h==="initmod-plus"&&this._adjustNpcInitMod(e.id,1),h==="map"&&this.dragNpcToMap(e.id))}),p.querySelector('[data-action="hp-input"]').addEventListener("change",d=>{this._setNpcHP(e.id,d.target.value)}),p.querySelector('[data-action="hpmax-input"]').addEventListener("change",d=>{this._setNpcHPMax(e.id,d.target.value)}),p.querySelector('[data-action="initmod-input"]').addEventListener("change",d=>{this._setNpcInitMod(e.id,d.target.value)}),p.querySelector('[data-action="status"]').addEventListener("change",d=>{this._setNpcStatus(e.id,d.target.value)}),p.addEventListener("dragstart",d=>{d.dataTransfer.setData("npcCard",JSON.stringify(e)),d.dataTransfer.effectAllowed="copy"}),a.appendChild(p)},_adjustNpcHP(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.hp=Math.max(0,Math.min(t.hpMax,t.hp+a)),this._updateNpcCardHP(e,t.hp,t.hpMax),this._syncNpcToken(e,t.hp))},_adjustNpcHPMax(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.hpMax=Math.max(1,t.hpMax+a),t.hp>t.hpMax&&(t.hp=t.hpMax),t.hp/t.hpMax*100,this._updateNpcCardFull(e,t.hp,t.hpMax),this._syncNpcToken(e,t.hp))},_setNpcHPMax(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.hpMax=Math.max(1,parseInt(a)||1),t.hp>t.hpMax&&(t.hp=t.hpMax),this._updateNpcCardFull(e,t.hp,t.hpMax),this._syncNpcToken(e,t.hp))},_setNpcHP(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.hp=Math.max(0,Math.min(t.hpMax,parseInt(a)||0)),this._updateNpcCardHP(e,t.hp,t.hpMax),this._syncNpcToken(e,t.hp))},_updateNpcCardHP(e,a,t){const n=Math.max(0,Math.min(100,a/t*100)),s=document.querySelector(`#npc-card-${e} [data-action="hp-bar"]`),i=document.querySelector(`#npc-card-${e} [data-action="hp-input"]`);s&&(s.style.width=n+"%",s.style.background=n>50?"#16a34a":n>25?"#ca8a04":"#dc2626"),i&&(i.value=a)},_updateNpcCardFull(e,a,t){const n=document.getElementById(`npc-card-${e}`);if(!n)return;const s=Math.max(0,Math.min(100,a/t*100)),i=n.querySelector('[data-action="hp-bar"]'),o=n.querySelector('[data-action="hp-input"]'),l=n.querySelector('[data-action="hpmax-input"]');n.querySelector('[data-action="hpmax-display"]'),i&&(i.style.width=s+"%",i.style.background=s>50?"#16a34a":s>25?"#ca8a04":"#dc2626"),o&&(o.value=a),l&&(l.value=t);const u=n.querySelector('[data-action="hpmax-display"]');u&&(u.textContent=`/${t}`)},_setNpcStatus(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.status=a,this._renderNpcCard(t))},_adjustNpcInitMod(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.initMod=(t.initMod||0)+a,this._updateNpcInitMod(e,t.initMod))},_setNpcInitMod(e,a){var n;const t=(n=this.npcCards)==null?void 0:n[e];t&&(t.initMod=parseInt(a)||0,this._updateNpcInitMod(e,t.initMod))},_updateNpcInitMod(e,a){const t=document.querySelector(`#npc-card-${e} [data-action="initmod-input"]`);t&&(t.value=a)},_removeNpc(e){var a;this.npcCards&&delete this.npcCards[e],(a=document.getElementById(`npc-card-${e}`))==null||a.remove(),this._syncNpcToken(e,null,!0)},_syncNpcToken(e,a,t=!1){try{const n=Object.values(c.tokens||{}).find(s=>s.npcCardId===e);if(!n)return;t?c.removeToken(n.id):c.updateToken(n.id,{hp:a})}catch{}},adjustNpcHP(e,a){this._adjustNpcHP(e,a)},setNpcHP(e,a){this._setNpcHP(e,a)},setNpcStatus(e,a){this._setNpcStatus(e,a)},removeNpc(e){this._removeNpc(e)},async handleMapDrop(e){e.preventDefault();const a=e.dataTransfer.getData("npcCard");if(a){const n=JSON.parse(a);await c.addToken({name:n.name,type:n.type,hp:n.hp,hpMax:n.hpMax,color:n.color,npcCardId:n.id}),m.playNotification();return}const t=e.dataTransfer.getData("playerCard");if(t){const n=JSON.parse(t);await c.addToken({name:n.name,type:"player",hp:n.hp,hpMax:n.hpMax,avatarUrl:n.avatarUrl,color:"#c9a84c",ownerId:n.playerId}),m.playNotification();return}},async toggleBattleMode(){var n;const e=r.currentRoomCode;if(!e||!r.isMaster)return;const a=!((n=r.currentRoom)!=null&&n.battleMode),t=f(y,"rooms",e);return await g(t,{battleMode:a}),a?(await v.startBattle(),m.playBattleStart()):await v.endBattle(),a},async endSession(){if(!confirm("Tem certeza que deseja encerrar a sessão?"))return;const e=r.currentRoomCode;if(!e)return;const a=f(y,"rooms",e);await g(a,{status:"closed"}),await r.leaveRoom(e),window.location.href="index.html"},cleanup(){this.listeners.forEach(({listener:e})=>{e()}),this.listeners=[],this.playerSheets={}}};window.MasterSystem=S;const j=new URLSearchParams(window.location.search),b=j.get("code");async function q(){try{if(!b){window.location.href="index.html";return}if(await C.waitForInitialization(),!C.isAuthenticated()){window.location.href="index.html";return}if(await r.joinRoom(b),document.getElementById("masterNick").textContent=C.currentNick||"Mestre",await c.initialize("mapContainer"),c.subscribeToMap(),r.subscribeToRoom(b,{onRoomUpdate:a=>{document.getElementById("battleIndicator").classList.toggle("active",a.battleMode),a.battleMode&&(document.getElementById("toggleBattleBtn").textContent="⚔️ Desativar Batalha",document.getElementById("toggleBattleBtn").classList.remove("btn-success"),document.getElementById("toggleBattleBtn").classList.add("btn-danger"))},onPlayersUpdate:a=>{A(a)}}),console.log("[Master] Inicializando Chat e Batalha..."),k.subscribeToChat(b,a=>{typeof renderChatMessages=="function"?renderChatMessages(a):typeof B=="function"&&B(a)}),k.subscribeToDice(b,a=>{typeof renderDiceHistory=="function"?renderDiceHistory(a):typeof N=="function"&&N(a)}),await S.initialize(),await v.initialize(),window.DrawSystem&&(window.DrawSystem.canvas=document.getElementById("drawCanvas"),window.DrawSystem.canvas&&(window.DrawSystem.init(),window.DrawSystem.syncFromRTDB())),r.isMaster){const a=M(w,`rooms/${b}/initiativePhase`);E(a,t=>{const n=t.val(),s=document.getElementById("finalizeInitBtn");s&&(n&&n.active?s.style.display="inline-flex":s.style.display="none")})}const e=document.getElementById("chatInput");e.disabled=!1,e.placeholder="Digite sua mensagem...",document.getElementById("chatSendBtn").disabled=!1,console.log("[Master] Sistemas prontos!")}catch(e){console.error("[Master] Erro crítico na inicialização:",e),alert("Erro ao carregar mesa. Verifique o console.")}}function A(e){const a=document.getElementById("playersList");a.innerHTML=e.map(t=>{var n,s;return`
        <div class="player-item">
          <div class="player-avatar">${((s=(n=t.nick)==null?void 0:n[0])==null?void 0:s.toUpperCase())||"?"}</div>
          <span class="player-name">${t.nick}</span>
          <span class="player-status ${t.online?"":"offline"}">${t.online?"Online":"Offline"}</span>
        </div>
      `}).join("")}function B(e){const a=document.getElementById("chatMessages");a.innerHTML=e.slice(-50).map(t=>{const n=new Date(t.timestamp).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),s=t.type==="roll"?"text-gold":t.type==="action"?"text-green":t.type==="battle"?"text-red":t.type==="system"?"text-purple":"";return t.type==="roll"?`<div class="message"><span class="message-sender">${t.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${n}</span><div class="message-roll">🎲 ${t.text}</div></div>`:`<div class="message ${s}"><span class="message-sender">${t.senderNick}</span> <span class="text-muted" style="font-size: 0.75rem;">${n}</span><div>${t.text}</div></div>`}).join(""),a.scrollTop=a.scrollHeight}function N(e){const a=document.getElementById("rollHistory");a.innerHTML=e.slice(-10).reverse().map(t=>`
        <div class="mb-sm" style="padding: 0.5rem; background: var(--color-bg-secondary); border-radius: var(--radius-sm);">
          <strong>${t.rolledBy}</strong> <span class="text-gold">${t.dice}</span> = ${t.total}
          ${t.context?`<div class="text-muted" style="font-size: 0.8rem;">${t.context}</div>`:""}
        </div>
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhuma rolagem ainda</p>'}function U(){const e=document.getElementById("tokensList"),a=Object.values(c.tokens||{});e.innerHTML=a.map(t=>`
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
      `).join("")||'<p class="text-muted" style="font-size: 0.85rem;">Nenhum token</p>'}q();async function P(e){const a=document.getElementById("diceDisplay"),t=await D.rollWithAnimation(e,a,{animate:!0});a.textContent=t.total,await k.sendRoll(e,t.results,t.total,"Mestre"),m.playDiceRoll(),setTimeout(()=>m.playDiceLand(),300)}document.querySelectorAll(".dice-btn").forEach(e=>{e.addEventListener("click",()=>P(e.dataset.dice))});document.getElementById("rollCustomBtn").addEventListener("click",()=>{const e=document.getElementById("customDiceInput").value.trim();e&&P(e)});document.getElementById("customDiceInput").addEventListener("keypress",e=>{if(e.key==="Enter"){const a=e.target.value.trim();a&&P(a)}});document.getElementById("chatForm").addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("chatInput").value.trim();a&&(await k.sendMessage(a),document.getElementById("chatInput").value="")});document.getElementById("endSessionBtn").addEventListener("click",async()=>{await S.endSession()});document.getElementById("loadMapBtn").addEventListener("click",()=>{const e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",e.addEventListener("change",a=>{const t=a.target.files[0];t&&c.uploadMapImage(t),setTimeout(()=>e.remove(),100)}),document.body.appendChild(e),e.click()});document.getElementById("toggleGridBtn").addEventListener("click",()=>{c.toggleGrid()});const z=document.getElementById("finalizeInitBtn");z.addEventListener("click",async()=>{await v.finalizeInitiative(),z.style.display="none"});document.getElementById("toggleBattleBtn").addEventListener("click",async()=>{const e=await S.toggleBattleMode();if(e!==void 0){document.getElementById("battleIndicator").classList.toggle("active",e);const a=document.getElementById("toggleBattleBtn");e?(a.textContent="⚔️ Desativar Batalha",a.classList.remove("btn-success"),a.classList.add("btn-danger"),document.getElementById("masterEndTurnBtn").style.display="inline-block"):(a.textContent="⚔️ Ativar Batalha",a.classList.remove("btn-danger"),a.classList.add("btn-success"),document.getElementById("masterEndTurnBtn").style.display="none")}});var I;(I=document.getElementById("masterEndTurnBtn"))==null||I.addEventListener("click",async()=>{const e=document.getElementById("masterEndTurnBtn");e.disabled=!0,e.textContent="Passando...",await v.endTurn(),setTimeout(()=>{e.disabled=!1,e.textContent="⏭️ Fim de Turno"},4e3)});const O=setInterval(()=>{U()},2e3);window.DrawSystem={tool:"none",drawing:!1,canvas:null,ctx:null,init(){this.canvas=document.getElementById("drawCanvas"),this.canvas&&(this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.resize(),window.addEventListener("resize",()=>this.resize()),document.addEventListener("mousedown",e=>{this.tool!=="none"&&e.target!==this.canvas&&!e.target.closest("#drawToolbar")&&this.setTool("none")}),this.canvas.addEventListener("mousedown",e=>{if(this.tool==="none")return;this.drawing=!0;const a=this.getPos(e);this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y)}),this.canvas.addEventListener("mousemove",e=>{var n,s;if(!this.drawing||this.tool==="none")return;const a=this.getPos(e),t=parseInt(((n=document.getElementById("drawSize"))==null?void 0:n.value)||4);this.tool==="eraser"?this.ctx.clearRect(a.x-t,a.y-t,t*2,t*2):(this.ctx.strokeStyle=((s=document.getElementById("drawColor"))==null?void 0:s.value)||"#e74c3c",this.ctx.lineWidth=t,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineTo(a.x,a.y),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y))}),this.canvas.addEventListener("mouseup",()=>{this.drawing=!1,this.syncToRTDB()}),this.canvas.addEventListener("mouseleave",()=>{this.drawing=!1,this.syncToRTDB()}))},syncTimer:null,syncToRTDB(){!this.ctx||!this.canvas||(clearTimeout(this.syncTimer),this.syncTimer=setTimeout(()=>{const e=this.canvas.toDataURL("image/png"),a=r.currentRoomCode;a&&R(M(w,`rooms/${a}/map`),{drawing:e}).catch(()=>{})},500))},syncFromRTDB(){const e=r.currentRoomCode;e&&E(M(w,`rooms/${e}/map/drawing`),a=>{const t=a.val();if(t&&this.ctx&&this.canvas){const n=new Image;n.onload=()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(n,0,0)},n.src=t}})},setTool(e){var a,t;this.tool=this.tool===e?"none":e,this.canvas.style.pointerEvents=this.tool!=="none"?"all":"none",this.canvas.style.cursor=this.tool==="pen"?"crosshair":this.tool==="eraser"?"cell":"default",(a=document.getElementById("btnPen"))==null||a.style.setProperty("border-color",this.tool==="pen"?"#e8c97a":"#8a6a1a"),(t=document.getElementById("btnEraser"))==null||t.style.setProperty("border-color",this.tool==="eraser"?"#e8c97a":"#8a6a1a")},clear(){this.ctx&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);const e=r.currentRoomCode;e&&H(M(w,`rooms/${e}/map/drawing`),null).catch(()=>{})},resize(){var t;if(!this.canvas)return;const e=this.canvas.parentElement;if(!e)return;const a=(t=this.ctx)==null?void 0:t.getImageData(0,0,this.canvas.width,this.canvas.height);this.canvas.width=e.offsetWidth,this.canvas.height=e.offsetHeight,a&&this.ctx.putImageData(a,0,0)},getPos(e){const a=this.canvas.getBoundingClientRect();return{x:e.clientX-a.left,y:e.clientY-a.top}}};window.addEventListener("beforeunload",()=>{clearInterval(O),k.unsubscribe(),c.unsubscribe(),S.cleanup(),v.cleanup(),r.cleanup()});
