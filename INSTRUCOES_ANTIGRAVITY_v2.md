# 📋 INSTRUÇÕES PARA O ANTIGRAVITY
## Projeto: mesa-rpg — Conjunto de mudanças v2

Execute as tarefas abaixo **em ordem**. Cada tarefa é independente mas usa os mesmos arquivos.
Ao final de cada tarefa, aguarde confirmação antes de prosseguir.

---

## TAREFA 1 — player.html: Remover mana/stamina, manter só HP

**Arquivo:** `player.html`

1. Na função `renderSheet`, remover completamente os blocos de mana e stamina:
   - Remover as linhas que referenciam `manaText`, `manaBar`, `staminaText`, `staminaBar`
2. No HTML, remover os elementos com id `manaText`, `manaBar`, `staminaText`, `staminaBar` e seus containers `.resource-bar`
3. Manter apenas o bloco de HP (`hpText`, `hpBar`)
4. Remover o botão "Editar Personagem" do menu/header do player (qualquer link ou botão que leve para `profile.html` ou edição inline)

---

## TAREFA 2 — player.html: Ficha de personagem intuitiva com skills do grimório

**Arquivo:** `player.html`

Substituir o painel lateral esquerdo da ficha por um novo design com abas:

### Abas da ficha:
- **Geral** — Avatar, nome, classe, nível, HP
- **Habilidades** — Lista de ataques e magias (existente, mas reformulada)
- **Grimório** — Nova aba com as magias/habilidades pré-cadastradas por personagem
- **Itens** — Lista de itens (existente)

### Aba Grimório — lógica:
Ao carregar a ficha, verificar o campo `sheet.class` e popular a aba com as habilidades correspondentes do grimório abaixo.

Usar este mapeamento de classe → habilidades (extraído do grimório do grupo):

```javascript
const GRIMORIO = {
  "Guerreiro": {
    color: "#c04040",
    abilities: [
      { name: "Segunda Oportunidade", type: "Utilidade", desc: "Quando errar um ataque, pode usar reação para fazer outro ataque contra o mesmo alvo. Recarrega no início do turno. (Luta Defensiva)", tags: ["Reação"] },
      { name: "Ação Extra", type: "Passiva", desc: "Pode atacar duas vezes quando usar a ação Atacar.", tags: ["Passiva"] },
      { name: "Surto de Ação", type: "Ativa", desc: "Uma vez por descanso curto: faz uma ação adicional no turno.", tags: ["1/descanso"] },
      { name: "Estilo: Luta Defensiva", type: "Passiva", desc: "+1 CA enquanto usa armadura.", tags: ["Passiva"] }
    ]
  },
  "Bardo": {
    color: "#c06080",
    abilities: [
      { name: "Inspiração Bárdica", type: "Suporte", desc: "Ação bônus: concede 1d6 de Inspiração a um aliado. Pode ser usado em ataque, teste ou resistência. Usos = Mod Carisma por descanso longo.", tags: ["Ação Bônus"] },
      { name: "Zombaria Malévola", type: "Truque", desc: "Insulta uma criatura. Sabedoria CD 14. Se falhar: 1d4 dano psíquico e desvantagem no próximo ataque. Alcance 18m.", tags: ["Dano", "Truque"] },
      { name: "Ilusão Menor", type: "Truque", desc: "Cria som ou imagem ilusória. Investigação CD 14 para detectar. Duração 1 minuto. Alcance 9m.", tags: ["Ilusão", "Truque"] },
      { name: "Sono", type: "Controle", desc: "Rola 5d8. Total indica PV de criaturas que adormecem (menor PV primeiro). Não afeta mortos-vivos. Alcance 27m, área esfera 6m.", tags: ["Controle", "Nv1"] },
      { name: "Sugestão", type: "Controle", desc: "Sugere ação a criatura. Sabedoria CD 14. Se falhar: segue sugestão por até 8h. Alcance 9m.", tags: ["Controle", "Nv2"] },
      { name: "Imobilizar Pessoa", type: "Controle", desc: "Paralisa humanoide. Sabedoria CD 14 por turno. Ataques contra ela têm vantagem. Alcance 18m.", tags: ["Controle", "Nv2"] }
    ]
  },
  "Feiticeiro": {
    color: "#8060c0",
    abilities: [
      { name: "Toque Gelado", type: "Truque", desc: "Alcance 36m. 1d8 dano necrótico. Alvo não pode recuperar PV até próximo turno. Mortos-vivos têm desvantagem no ataque.", tags: ["Dano", "Truque"] },
      { name: "Bola de Fogo", type: "Dano", desc: "Explosão numa área de 6m de raio. 8d6 de dano de fogo. Destreza CD 15 para metade. Alcance 45m.", tags: ["Dano", "Nv3"] },
      { name: "Raio", type: "Dano", desc: "8d6 de dano de raio. Linha de 30m de comprimento e 1,5m de largura. Destreza CD 15 para metade.", tags: ["Dano", "Nv3"] },
      { name: "Metamagia: Magia Sutil", type: "Passiva", desc: "Lança magias sem componentes verbais ou somáticos. Custo: 1 ponto de feitiçaria.", tags: ["Passiva"] },
      { name: "Metamagia: Magia Gêmea", type: "Ativa", desc: "Aplica magia de alvo único em dois alvos. Custo: nível da magia em pontos.", tags: ["Ativa"] }
    ]
  },
  "Ladino": {
    color: "#40a060",
    abilities: [
      { name: "Ataque Furtivo", type: "Dano", desc: "Uma vez por turno, +3d6 de dano se tiver vantagem no ataque ou aliado adjacente ao alvo (sem desvantagem).", tags: ["Dano", "Passiva"] },
      { name: "Ação Ardilosa", type: "Ativa", desc: "Ação bônus: Disparada, Desengajar ou Esconder.", tags: ["Ação Bônus"] },
      { name: "Sentidos Aguçados", type: "Passiva", desc: "Vantagem em testes de Percepção baseados em visão.", tags: ["Passiva"] },
      { name: "Esquiva Sobrenatural", type: "Reação", desc: "Reação: quando receber dano de ataque visível, reduzir pela metade.", tags: ["Reação"] }
    ]
  },
  "Clérigo": {
    color: "#40a0c0",
    abilities: [
      { name: "Palavra de Cura", type: "Cura", desc: "Ação bônus. Alcance 18m. Cura 1d4 + Mod Sabedoria. Nível 1.", tags: ["Cura", "Ação Bônus"] },
      { name: "Cura Ferimentos", type: "Cura", desc: "Alcance toque. Cura 1d8 + Mod Sabedoria. Nível 1.", tags: ["Cura", "Nv1"] },
      { name: "Sagrado Flamejante", type: "Dano", desc: "Truque. Alcance 18m. 1d8 dano radiante. Alvo não pode ficar invisível até próximo turno.", tags: ["Dano", "Truque"] },
      { name: "Escudo da Fé", type: "Suporte", desc: "+2 CA a uma criatura. Concentração, 10 min. Alcance 18m. Ação bônus.", tags: ["Suporte", "Nv1"] },
      { name: "Bênção", type: "Suporte", desc: "Até 3 criaturas adicionam 1d4 em ataques e testes de resistência. Concentração, 1 min.", tags: ["Suporte", "Nv1"] }
    ]
  },
  "Paladino": {
    color: "#c09020",
    abilities: [
      { name: "Golpe Divino", type: "Dano", desc: "Smite: gasta slot de magia após acertar ataque. Causa +2d8 dano radiante por nível do slot (max 5d8). +1d8 extra contra mortos-vivos.", tags: ["Dano", "Reação"] },
      { name: "Cura pelas Mãos", type: "Cura", desc: "Pool de cura = 5 × nível. Ação: restaura PV tocando criatura. Pode curar doenças/venenos (5 PV do pool cada).", tags: ["Cura", "Ativo"] },
      { name: "Aura de Proteção", type: "Passiva", desc: "Aliados em 3m adicionam Mod Carisma em testes de resistência.", tags: ["Passiva", "Aura"] },
      { name: "Escudo da Fé", type: "Suporte", desc: "+2 CA a uma criatura. Concentração, 10 min.", tags: ["Suporte", "Nv1"] },
      { name: "Bênção", type: "Suporte", desc: "Até 3 criaturas adicionam 1d4 em ataques e resistências. Concentração, 1 min.", tags: ["Suporte", "Nv1"] }
    ]
  },
  "Bruxo": {
    color: "#c8a040",
    abilities: [
      { name: "Toque do Túmulo", type: "Truque", desc: "Alcance toque. 1d8 necrótico. Alvo não recupera PV até próximo turno.", tags: ["Dano", "Truque"] },
      { name: "Explosão Eldritch", type: "Truque", desc: "Alcance 36m. 1d10 de dano de força.", tags: ["Dano", "Truque"] },
      { name: "Armadura Amaldiçoada", type: "Ativa", desc: "Maldição um alvo: +1d6 necrótico em cada acerto. Desvantagem em testes do atributo escolhido. Alcance 27m.", tags: ["Controle", "Nv1"] },
      { name: "Praga", type: "Controle", desc: "Amaldiçoa criatura. Desvantagem em testes do atributo escolhido. +1d6 necrótico extra em cada acerto. Alcance 27m. Concentração 1h.", tags: ["Controle", "Nv1"] },
      { name: "Mente Desperta", type: "Especial", desc: "Comunicação telepática com criaturas visíveis até 9m. Não precisa compartilhar idioma. Uso ilimitado.", tags: ["Especial"] }
    ]
  }
};
```

Renderizar as habilidades da aba Grimório como cards com:
- Nome em destaque
- Tags coloridas (Dano=vermelho, Cura=verde, Controle=roxo, Suporte=azul, Truque=cinza, Passiva=dourado)
- Descrição
- Botão "Usar no Chat" que envia a habilidade como mensagem de ação no chat

---

## TAREFA 3 — master.html: Mapa com botão dedicado e grid 20x20

**Arquivo:** `master.html`

1. **Botão de carregar mapa:** Remover qualquer lógica que abra o seletor de arquivo ao clicar na área do mapa. Adicionar um botão `🗺 Carregar Mapa` **fora** da área do mapa (acima dela, no toolbar ou header da seção do mapa). Apenas o mestre vê este botão.

2. **Grid 20x20:** Sobre a imagem do mapa (mas abaixo dos tokens), adicionar um `<canvas>` ou overlay SVG que desenhe um grid de 20×20 células cobrindo toda a área do mapa. O grid deve:
   - Ser semi-transparente (linhas brancas com 15% de opacidade)
   - Redimensionar junto com o mapa
   - Ter um toggle (botão 🔲) para mostrar/esconder o grid

---

## TAREFA 4 — master.html: Novo sistema de NPC

**Arquivo:** `master.html`

### Remover:
- O menu/lista atual de templates de NPC (`npcList`, `npcTemplates`)
- O método `setupNPCPanel()` do `master.js`

### Adicionar painel de NPC com 3 botões:
```
[ + Hostil ] [ + Neutro ] [ + Amigável ]
```

Cada botão abre um modal simples com campos:
- Nome (texto)
- HP / HP Máximo (número)
- Tipo já definido pelo botão clicado

Ao confirmar, cria um **card quadrado** na seção de NPCs com:
- Nome em destaque
- Barra de HP
- Badge de tipo (Hostil=vermelho, Neutro=amarelo, Amigável=verde)
- Dropdown de status: `—`, `Caído`, `Sangrando`, `Paralizado`, `Atordoado`, `Envenenado`, `Assustado`, `Cego`
- Se status = `—`, campo de status fica em branco/invisível
- Botão de remover (✕)
- O card deve ser **draggable** para o mapa (cria token ao soltar)

### NPC no mapa:
- Ao arrastar um card de NPC para o mapa, cria um token com a cor do tipo
- Hostil: vermelho `#dc2626`
- Neutro: amarelo `#ca8a04`
- Amigável: verde `#16a34a`

---

## TAREFA 5 — map.js / player.html: Jogadores movem suas próprias peças

**Arquivos:** `map.js`, `player.html`

No sistema de tokens do mapa:

1. No `map.js`, adicionar campo `ownerId` ao token quando ele for criado a partir de um jogador
2. No `player.html`, ao renderizar tokens no mapa (read-only atual), tornar o token do próprio jogador **draggável**:
   - Detectar: `token.ownerId === AuthSystem.currentUser?.uid`
   - Se for o token do jogador: habilitar drag com `mousedown/mousemove/mouseup`
   - Ao soltar: chamar `MapSystem.updateToken(tokenId, { x: newX, y: newY })` para sincronizar via Firebase
   - Tokens de outros jogadores e NPCs: `pointer-events: none` (não movíveis pelo jogador)

---

## TAREFA 6 — master.js: Mestre pode arrastar players para o mapa

**Arquivo:** `master.js`

Na lista de fichas dos jogadores (`masterPlayerSheets`), tornar cada card draggável:
- `draggable="true"` em cada `.master-sheet-card`
- No `dragstart`: setar `dataTransfer` com os dados do jogador (uid, nome, avatarUrl)
- No `drop` do mapa: criar token de tipo `player` com `ownerId = playerId`
- Token do player no mapa deve ter borda dourada e inicial do nome

---

## TAREFA 7 — sounds.js: Silenciar erros de som faltando

**Arquivo:** `js/sounds.js`

Substituir o método `preload()` por:

```javascript
async preload() {
  // Sons ZapSplat ainda não adicionados
  // Adicionar arquivos .wav em /sounds/ quando disponíveis
  // Por enquanto, retornar silenciosamente para evitar erros 404
  return;
},
```

---

## RESUMO DOS ARQUIVOS MODIFICADOS

| Arquivo | Tarefas |
|---------|---------|
| `player.html` | 1, 2, 5 |
| `master.html` | 3, 4, 6 |
| `js/master.js` | 4, 6 |
| `js/map.js` | 5 |
| `js/sounds.js` | 7 |

---

## NOTAS IMPORTANTES PARA O AGENTE

- **Não alterar** `firebase.js`, `auth.js`, `room.js`, `chat.js`, `dice.js`, `sheet.js`
- **Não alterar** as regras do Firebase (Firestore/Realtime DB)
- **Manter** toda a lógica existente de chat, batalha e rolagem de dados
- **Manter** o estilo visual atual (CSS vars, fontes, cores medievais)
- Ao criar novos elementos HTML, usar as classes CSS já existentes (`btn`, `btn-primary`, `badge`, `panel`, etc)
- O grid do mapa deve funcionar mesmo sem imagem carregada
- Testar que jogadores conseguem mover apenas seu próprio token
