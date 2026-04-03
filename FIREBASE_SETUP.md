# 🔥 Guia de Configuração do Firebase

Siga estes passos para configurar o Firebase para o projeto:

---

## 1. Criar Projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"**
3. Dê um nome ao projeto (ex: `rpg-platform`)
4. Desabilite o Google Analytics (opcional) → clique em **Criar projeto**
5. Após criar, clique em **Continuar**

---

## 2. Habilitar Authentication

1. No menu lateral, clique em **Authentication**
2. Clique em **Primeiros passos**
3. Em "Provedores", clique em **Email/Senha**
4. Habilite:
   - ✅ Email/Senha
   - ❌ Email link (desabilitado)
5. Clique em **Salvar**

---

## 3. Criar Realtime Database

1. No menu lateral, clique em **Realtime Database**
2. Clique em **Criar banco de dados**
3. Escolha a localização (São Paulo para melhor performance)
4. Selecione **Iniciar no modo de teste** (isso facilitará o início)
5. Clique em **Ativar**
6. Depois clique na aba **Regras** (no menu superior) e cole estas regras:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "rooms": {
      "$roomId": {
        "chat": {
          ".indexOn": ["timestamp"]
        }
      }
    }
  }
}
```

### Explicação das Regras:

| Nó | Regra | Descrição |
|----|-------|-----------|
| `rooms/$roomId` | Leitura/Escrita | Apenas usuários autenticados |
| `masterId` | Leitura | Salvo automaticamente ao criar sala |
| `chat/$messageId` | Criar apenas | Jogadores enviam, não apagam histórico |
| `dice` | Leitura | Histórico de rolagens |
| `map` | **Apenas mestre** | Apenas o mestre edita mapa e tokens |
| `presence/$playerId` | **Apenas próprio** | Jogador só edita sua própria presença |
| `battleState` | **Apenas mestre** | Controle de batalha exclusivo |

---

## 4. Criar Firestore Database

1. No menu lateral, clique em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha a mesma localização do Realtime DB
4. Selecione **Iniciar no modo de teste**
5. Clique em **Criar**
6. Depois clique na aba **Regras** (no menu superior) e cole estas regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite ler/escrever perfis de usuário se estiver logado
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }
    
    // Regras para Fichas de Personagem
    match /sheets/{roomId}/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isMaster(get(/databases/$(database)/documents/rooms/$(roomId)).data));
      allow write: if isAuthenticated() && isOwner(userId);
    }
    
    // Regras para as salas
    match /rooms/{roomId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null;
      
      // Permite que jogadores se adicionem à lista da sala
      match /players/{playerId} {
        allow read, write: if request.auth != null;
      }
    }
    
    // Permite acesso às fichas
    match /sheets/{roomId}/{playerId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 5. Upload de Imagens (imgBB)

O projeto usa **imgBB** para upload de mapas (não usa Firebase Storage).

1. Cadastre-se em https://imgbb.com/
2. Vá em **API Key** nas configurações
3. Use a API key gratuita (até 1.5GB de uploads)
4. A API key já está configurada no código

---

## 6. Obter Credenciais do Firebase

1. Clique no **ícone de engrenagem** ao lado de "Visão geral do projeto"
2. Clique em **Configurações do projeto**
3. Role até "Seus aplicativos"
4. Clique no ícone **</>** (Web)
5. Registre o app com um apelido (ex: `RPG Web`)
6. **NÃO** marque "Firebase Hosting"
7. Clique em **Registrar app**
8. Copie o objeto `firebaseConfig` que aparece

---

## 7. Preencher o arquivo .env

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu_projeto-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_APP_NAME=RPG Platform
VITE_APP_INTERNAL_DOMAIN=rpgapp.internal
VITE_IMGBB_API_KEY=sua_api_key_imgbb
```

---

## 8. Testar Localmente

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm run dev
```

3. Abra http://localhost:5173

4. Crie uma mesa e teste!

---

## ⚠️ IMPORTANTE

- **NUNCA** comita o arquivo `.env` no git (já está no .gitignore)
- Em produção, use variáveis de ambiente do Vercel
- Após testar, considere restringir mais as regras de segurança
