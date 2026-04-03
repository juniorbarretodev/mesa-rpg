# 🏰 RPG Online Platform — Arquitetura do Sistema

> Stack: HTML/CSS/JS puro · Firebase · Vercel
> Autenticação: apelido + senha
> Tempo real: Firebase Realtime Database + Firestore

---

## 1. VISÃO GERAL

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (hospedagem)                   │
│                                                         │
│  /index.html        → Tela de login / criar mesa        │
│  /lobby.html        → Aguardando jogadores              │
│  /master.html       → Painel do Mestre                  │
│  /player.html       → Painel do Jogador                 │
│  /js/               → Módulos JS                        │
│  /css/              → Estilos                           │
│  /sounds/           → Sons ZapSplat                     │
│  /assets/           → Imagens, ícones, fontes           │
└─────────────────────────────────────────────────────────┘
              │  API calls + tempo real
              ▼
┌─────────────────────────────────────────────────────────┐
│                     FIREBASE                            │
│                                                         │
│  Authentication   → login apelido+senha                 │
│  Firestore        → dados persistentes (fichas, mesas)  │
│  Realtime DB      → dados ao vivo (chat, mapa, dados)   │
│  Storage          → imagens de avatar e mapa            │
└─────────────────────────────────────────────────────────┘
```

---

## 2. ESTRUTURA DE PASTAS

```
rpg-platform/
│
├── index.html              ← Login / criar mesa / entrar na mesa
├── lobby.html              ← Sala de espera (mestre aguarda jogadores)
├── master.html             ← Interface completa do mestre
├── player.html             ← Interface do jogador
│
├── css/
│   ├── base.css            ← Reset, variáveis, tipografia
│   ├── layout.css          ← Grid, painéis, responsividade
│   ├── components.css      ← Cards, botões, badges, tooltips
│   ├── map.css             ← Mapa, tokens, canvas de desenho
│   ├── chat.css            ← Chat normal e modo batalha
│   ├── sheet.css           ← Ficha do personagem
│   └── animations.css      ← Dados, ataques, mortes, magias [PLACEHOLDER]
│
├── js/
│   ├── firebase.js         ← Inicialização e config Firebase
│   ├── auth.js             ← Login, logout, sessão
│   ├── room.js             ← Criar/entrar/gerenciar mesa
│   ├── chat.js             ← Chat normal + parser de batalha
│   ├── map.js              ← Mapa, tokens, canvas
│   ├── dice.js             ← Rolagem de dados + animação + sons
│   ├── sheet.js            ← Ficha do personagem (magias, ataques, itens)
│   ├── sounds.js           ← Gerenciador de sons ZapSplat
│   ├── master.js           ← Poderes exclusivos do mestre
│   ├── battle.js           ← Modo batalha + parser de habilidades
│   └── placeholders/
│       ├── attack-anim.js  ← [PLACEHOLDER] Animações de ataque
│       ├── magic-sounds.js ← [PLACEHOLDER] Sons de magia por tipo
│       └── vfx.js          ← [PLACEHOLDER] Efeitos visuais
│
├── sounds/
│   ├── dice/
│   │   ├── roll.mp3        ← ZapSplat: dado rolando
│   │   └── land.mp3        ← ZapSplat: dado pousando
│   ├── combat/
│   │   ├── sword_hit.mp3
│   │   ├── magic_cast.mp3  ← [PLACEHOLDER adicionar por tipo]
│   │   ├── death_enemy.mp3
│   │   ├── death_monster.mp3
│   │   └── death_hero.mp3
│   ├── ui/
│   │   ├── button_click.mp3
│   │   ├── notification.mp3
│   │   └── battle_start.mp3
│   └── ambient/            ← Sons ambiente (carregados pelo mestre)
│
└── assets/
    ├── fonts/              ← Cinzel, IM Fell English (local, offline)
    ├── icons/              ← SVG icons do sistema
    └── img/                ← Logo, backgrounds, placeholders
```

---

## 3. ESTRUTURA DO FIREBASE

### 3.1 Firestore (dados persistentes)

```
firestore/
│
├── rooms/{roomId}
│   ├── name: "A Maldição do Castelo"
│   ├── masterId: "uid_do_mestre"
│   ├── masterNick: "Mestre João"
│   ├── code: "XKZP4"           ← código de 5 letras para entrar
│   ├── createdAt: timestamp
│   ├── status: "waiting"|"playing"|"battle"|"closed"
│   ├── battleMode: false
│   └── players/{playerId}
│       ├── nick: "Thorin"
│       ├── role: "player"|"master"
│       ├── online: true
│       └── joinedAt: timestamp
│
├── sheets/{roomId}/{playerId}
│   ├── name: "Thorin Pedraforte"
│   ├── class: "Guerreiro"
│   ├── level: 5
│   ├── avatarUrl: "https://..."
│   ├── hp: 80
│   ├── hpMax: 80
│   ├── resources: { mana: 0, stamina: 100 }   ← customizável
│   ├── status: []                               ← buffs/debuffs
│   ├── attacks: [
│   │   { id, name: "Golpe Pesado", dice: "2d6", bonus: 3,
│   │     description: "...", keyWords: ["golpe", "pesado"] }
│   │ ]
│   ├── spells: [
│   │   { id, name: "Bola de Fogo", dice: "3d6", manaCost: 5,
│   │     range: "30m", description: "...",
│   │     soundType: "fire",        ← para sons futuros [PLACEHOLDER]
│   │     animType: "explosion",    ← para animações futuras [PLACEHOLDER]
│   │     keyWords: ["bola", "fogo", "bola de fogo"] }
│   │ ]
│   └── items: [
│       { id, name: "Poção de Cura", effect: "+2d4 HP", quantity: 3 }
│     ]
│
└── history/{roomId}
    └── {sessionId}
        ├── date: timestamp
        ├── events: []    ← log de ações da sessão
        └── notes: ""
```

### 3.2 Realtime Database (dados ao vivo)

```
realtimeDB/
│
├── rooms/{roomId}/
│   ├── chat/
│   │   └── {messageId}
│   │       ├── senderId: "uid"
│   │       ├── senderNick: "Thorin"
│   │       ├── text: "Bola de fogo no Orc 2"
│   │       ├── type: "normal"|"action"|"roll"|"system"|"battle"
│   │       ├── timestamp: serverTimestamp
│   │       └── parsedAction: {           ← preenchido pelo parser
│   │           ability: "Bola de Fogo",
│   │           target: "Orc 2",
│   │           dice: "3d6",
│   │           result: 14,
│   │           phase: "resolved"
│   │         }
│   │
│   ├── map/
│   │   ├── imageUrl: "https://..."
│   │   ├── tokens: { ...tokenData }
│   │   └── drawing: ""    ← base64 do canvas [snapshot periódico]
│   │
│   ├── dice/
│   │   └── {rollId}
│   │       ├── rolledBy: "Thorin"
│   │       ├── dice: "3d6"
│   │       ├── results: [4, 2, 6]
│   │       ├── total: 12
│   │       └── context: "Bola de Fogo vs Orc 2"
│   │
│   ├── battleState/
│   │   ├── active: false
│   │   ├── round: 1
│   │   ├── turn: "playerId"
│   │   ├── initiative: ["p1","p2","npc1"]
│   │   └── pendingAction: null    ← ação aguardando resolução
│   │
│   └── presence/
│       └── {playerId}
│           ├── online: true
│           └── lastSeen: timestamp
```

---

## 4. FLUXO DE TELAS

### index.html
```
┌─────────────────────────────────┐
│  🏰 NOME DO SITE                │
│                                 │
│  [ Criar Nova Mesa ]            │
│  [ Entrar numa Mesa ] ← código  │
│                                 │
│  Apelido: [_____________]       │
│  Senha:   [_____________]       │
│  [ Entrar ]                     │
└─────────────────────────────────┘
```

### lobby.html (mestre aguarda)
```
┌─────────────────────────────────┐
│  Mesa: "A Maldição do Castelo"  │
│  Código: XKZP4  [copiar]        │
│                                 │
│  Jogadores conectados:          │
│  ● Thorin (pronto)              │
│  ● Aria (conectando...)         │
│  ○ Vaga 3                       │
│                                 │
│  [ Iniciar Sessão → ]           │
└─────────────────────────────────┘
```

### master.html
```
┌──────────┬─────────────────────┬──────────┐
│ SIDEBAR  │     MAPA CENTRAL    │  TOKENS  │
│ ESQUERDA │                     │  PANEL   │
│          │  [canvas + tokens]  │          │
│ • Dados  │                     │ • Inimigo│
│ • Hist.  │                     │ • NPC    │
│ • NPCs   │                     │ • etc... │
│          ├─────────────────────┤          │
│          │    CHAT / BATALHA   │          │
└──────────┴─────────────────────┴──────────┘
           ↑ fichas dos jogadores (carrossel)
```

### player.html
```
┌──────────────────────────────────────────┐
│  FICHA DO PERSONAGEM (expansível)        │
│  Nome | Classe | HP | Status            │
│  [ Ataques ] [ Magias ] [ Itens ]        │
├──────────────────────────────────────────┤
│              MAPA (read-only)            │
│  Jogador vê posições, não pode editar    │
├──────────────────────────────────────────┤
│              CHAT                        │
│  [ modo normal | modo batalha ]          │
└──────────────────────────────────────────┘
```

---

## 5. FICHA DO PERSONAGEM

A ficha não segue D&D clássico. É modular e customizável pelo jogador dentro do que o mestre permitir.

### Seções da ficha:

**Cabeçalho**
- Avatar (upload)
- Nome do personagem
- Classe (texto livre)
- Nível

**Recursos** (configurável — cada classe pode ter diferentes)
- HP atual / HP máximo (sempre presente)
- Recurso secundário: Mana / Estamina / Fé / Fúria / etc (o jogador nomeia)
- Barra visual para cada recurso

**Status** (badges visuais)
- Envenenado, Atordoado, Protegido, Camuflado, etc
- Mestre pode adicionar/remover remotamente
- Jogador vê em tempo real

**Ataques** (lista editável)
```
Nome:        [ Golpe Pesado      ]
Dado:        [ 2d6 ] + bônus [ 3 ]
Descrição:   [ _________________ ]
Palavras-chave: [ golpe, pesado  ] ← parser usa isso
```

**Magias** (lista editável)
```
Nome:        [ Bola de Fogo      ]
Dado dano:   [ 3d6              ]
Custo mana:  [ 5                ]
Alcance:     [ 30m              ]
Descrição:   [ _________________ ]
Tipo visual: [ fogo ▼ ]  ← PLACEHOLDER animação futura
Palavras-chave: [ bola de fogo  ]
```

**Itens de Classe** (lista editável)
```
Nome:        [ Poção de Cura     ]
Efeito:      [ +2d4 HP          ]
Quantidade:  [ 3  ]
```

---

## 6. SISTEMA DE CHAT E MODO BATALHA

### 6.1 Parser de Habilidades

O parser roda no `battle.js` e analisa mensagens em modo batalha.

```javascript
// Exemplo de fluxo completo:
// Jogador digita: "bola de fogo no orc 2"

// Passo 1: tokenizar input
// Passo 2: varrer spells/attacks do jogador buscando match por keyWords
// Passo 3: se match encontrado → destacar palavra, entrar em fase "target"
// Passo 4: confirmar alvo (clique no token do mapa OU digitar nome)
// Passo 5: mostrar painel de rolagem com o dado correto pré-carregado
// Passo 6: jogador rola → resultado vai para o chat como mensagem especial
// Passo 7: mestre pode editar o dano final antes de aplicar

const BATTLE_PHASES = {
  IDLE: 'idle',
  ABILITY_DETECTED: 'ability_detected',  // habilidade reconhecida
  AWAITING_TARGET: 'awaiting_target',     // esperando alvo
  AWAITING_ROLL: 'awaiting_roll',         // esperando rolagem
  ROLLING: 'rolling',                     // animação de dado
  AWAITING_MASTER: 'awaiting_master',     // mestre confirma/edita dano
  RESOLVED: 'resolved',                   // ação concluída
  CANCELLED: 'cancelled'                  // jogador cancelou
};
```

### 6.2 Visual do chat em batalha

```
┌─────────────────────────────────────────┐
│ ⚔ MODO BATALHA — Round 3               │
├─────────────────────────────────────────┤
│ Thorin: Golpe Pesado no Orc 2           │
│ ▸ [GOLPE PESADO] em [Orc 2]            │
│   🎲 Rolando 2d6+3... → 11             │
│   ✓ Mestre aplicou: 11 de dano         │
├─────────────────────────────────────────┤
│ Aria: bola de fogo no                  │
│ ▸ [BOLA DE FOGO] em ___?              │
│   [ Selecione o alvo ▼ ]  [Cancelar]  │
├─────────────────────────────────────────┤
│ [ __________________________________ ] │
│ [ Enviar ]  ⚔ Modo Batalha ativo      │
└─────────────────────────────────────────┘
```

---

## 7. MÓDULO DE DADOS (dice.js)

```javascript
// Interface pública do módulo

DiceSystem = {
  // Rola N dados de X lados com animação e som
  roll(notation, context, options) {
    // notation: "2d6", "1d20", "3d8+5"
    // context: "Bola de Fogo vs Orc 2"
    // options: { animate: true, broadcast: true, secret: false }
    // retorna: Promise<{ results: [], total, notation, context }>
  },

  // Animação dos dados (substitui a atual)
  animate(container, notation) {
    // [PLACEHOLDER] → trocar por animação 3D/sprite
    // Por enquanto: shake + números aleatórios + resultado final
  },

  // Sons dos dados
  playSound(phase) {
    // phase: 'roll' | 'land' | 'crit' | 'fail'
    // usa ZapSplat quando disponível, fallback para Web Audio API
  }
}
```

---

## 8. MÓDULO DE SONS (sounds.js)

```javascript
SoundManager = {
  // Carrega sons do ZapSplat (arquivos locais em /sounds/)
  preload() {},

  // Toca um som com volume e opções
  play(soundKey, options) {
    // soundKey: 'dice_roll', 'sword_hit', 'spell_fire', etc
    // options: { volume, loop, fadeIn }
  },

  // Mapa de sons por tipo de habilidade [PLACEHOLDER futuro]
  SPELL_SOUNDS: {
    fire:    'sounds/combat/spell_fire.mp3',    // [PLACEHOLDER]
    ice:     'sounds/combat/spell_ice.mp3',     // [PLACEHOLDER]
    heal:    'sounds/combat/spell_heal.mp3',    // [PLACEHOLDER]
    thunder: 'sounds/combat/spell_thunder.mp3', // [PLACEHOLDER]
  },

  // Sons de morte por tipo
  DEATH_SOUNDS: {
    player:  'sounds/combat/death_hero.mp3',
    enemy:   'sounds/combat/death_enemy.mp3',
    monster: 'sounds/combat/death_monster.mp3',
  }
}
```

---

## 9. PLACEHOLDERS PARA FUNCIONALIDADES FUTURAS

Cada placeholder é um módulo vazio com interface definida, pronto para implementação:

### attack-anim.js [PLACEHOLDER]
```javascript
AttackAnimations = {
  // Animação de ataque físico entre dois tokens no mapa
  playMeleeAttack(attackerToken, targetToken, type) {},

  // Animação de projétil (flecha, magia)
  playProjectile(from, to, projectileType) {},

  // Animação de área (explosão, cone de gelo)
  playAreaEffect(centerToken, radius, effectType) {},
}
```

### magic-sounds.js [PLACEHOLDER]
```javascript
MagicSounds = {
  // Som de cast (ao declarar a magia)
  playCast(spellSoundType) {},

  // Som de impacto (ao acertar)
  playImpact(spellSoundType) {},

  // Som de falha (resistência, erro de mira)
  playFail(spellSoundType) {},
}
```

### vfx.js [PLACEHOLDER]
```javascript
VFX = {
  // Partículas no token ao sofrer dano
  playHitEffect(tokenElement, damageType) {},

  // Animação de morte (token desaparece com efeito)
  playDeathEffect(tokenElement, deathType) {},

  // Efeito de status no token (veneno pulsando, brilho de proteção)
  playStatusEffect(tokenElement, statusType) {},
}
```

---

## 10. PERMISSÕES POR PAPEL

| Ação | Mestre | Jogador |
|------|--------|---------|
| Ver mapa | ✅ | ✅ |
| Mover tokens próprios | ✅ | ✅ (só o seu) |
| Mover tokens alheios | ✅ | ❌ |
| Adicionar tokens | ✅ | ❌ |
| Desenhar no mapa | ✅ | ❌ |
| Trocar mapa | ✅ | ❌ |
| Editar ficha própria | ✅ | ✅ |
| Editar ficha alheia | ✅ | ❌ |
| Adicionar NPCs | ✅ | ❌ |
| Ativar modo batalha | ✅ | ❌ |
| Editar dano pós-rolagem | ✅ | ❌ |
| Rolar dados (modo batalha) | ✅ | ✅ (só no turno) |
| Ver HP dos NPCs | ✅ | ❌ (ou limitado) |
| Chat | ✅ | ✅ |
| Upload de imagem de avatar | ✅ | ✅ |

---

## 11. SEQUÊNCIA DE DESENVOLVIMENTO (ATUALIZADO)

### Fase 1 — Base (MVP) ✅ COMPLETO
1. ✅ Configurar Firebase + Vercel
2. ✅ `index.html` → login apelido+senha
3. ✅ `room.js` → criar mesa, gerar código, entrar com código
4. ✅ `lobby.html` → sala de espera
5. ✅ Firebase Auth com email/senha (apelido como displayName)

### Fase 2 — Ficha e Chat ✅ COMPLETO
6. ✅ `player.html` → ficha básica (HP, ataques, magias)
7. ✅ `sheet.js` → salvar ficha no Firestore
8. ✅ Chat em tempo real (Realtime DB)
9. ✅ Integração de sons ZapSplat básicos

### Fase 3 — Mapa e Tokens ✅ COMPLETO
10. ✅ `master.html` → painel do mestre completo
11. ✅ `map.js` → mapa com tokens sincronizados
12. ✅ Canvas de desenho sincronizado
13. ✅ Sistema de peças com tipos (player, enemy, npc, object)

### Fase 4 — Batalha ✅ COMPLETO
14. ✅ `battle.js` → modo batalha, iniciativa automática
15. ✅ Parser de habilidades no chat (keywords matching)
16. ✅ Fluxo completo: habilidade → dado → resolução
17. ✅ `master.js` → funcionalidades exclusivas do mestre
18. ✅ Editor de tokens (HP, status, visibilidade)
19. ✅ Controle de HP dos jogadores pelo mestre

### Fase 5 — Polimento 🔄 EM ANDAMENTO
20. 🔄 Sons completos ZapSplat por tipo
21. 🔄 Responsividade mobile
22. 🔄 Histórico de sessão
23. 🔄 Testes e ajustes

### Fase 6 — Animações [PLACEHOLDERS] 🟡 PENDENTE
24. 🟡 `attack-anim.js` → animações de ataque
25. 🟡 `magic-sounds.js` → sons por tipo de magia
26. 🟡 `vfx.js` → efeitos visuais nos tokens

---

## 12. CONFIGURAÇÃO FIREBASE (firebase.js)

```javascript
// js/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Preencher com suas credenciais do Firebase Console
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);

export const auth     = getAuth(app);
export const db       = getFirestore(app);   // dados persistentes
export const rtdb     = getDatabase(app);    // dados em tempo real
export const storage  = getStorage(app);     // imagens
```

---

## 13. NOTAS IMPORTANTES

**Por que Firebase Realtime DB + Firestore juntos?**
Realtime DB é mais rápido para dados que mudam a cada segundo (chat, posição de tokens, dados rolados). Firestore é melhor para dados estruturados e consultáveis (fichas, histórico).

**Custo Vercel + Firebase**
Ambos têm tier gratuito generoso para projetos pequenos. Uma mesa com 6 jogadores sessões semanais ficará dentro do gratuito por muito tempo.

**Autenticação com apelido+senha**
Firebase Auth usa email por padrão. A solução: criar um "email falso" no formato `apelido_roomcode@rpgapp.internal` — o usuário só vê e digita o apelido e senha. Isso previne colisão de nomes entre mesas diferentes.

**Segurança das Regras Firebase**
As Firestore Rules e Realtime DB Rules devem garantir que:
- Jogador só lê/escreve dados da sala em que está
- Mestre tem acesso total à sua sala
- Nenhum usuário acessa dados de outra sala

---

*Documento gerado como guia de arquitetura. Cada módulo listado em `/js/` representa um arquivo a ser criado durante o desenvolvimento.*
