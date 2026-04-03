import { doc, setDoc, getDoc, updateDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';

export const SheetSystem = {
  currentSheet: null,
  playerSheets: {}, // Cache para o Mestre acessar todas as fichas da sala
  unsubscriber: null,

  async loadOrCreateSheet(roomCode) {
    try {
      const user = AuthSystem.currentUser;
      if (!user || !roomCode) {
        console.warn("[SheetSystem] Usuário ou código da sala ausente.");
        return null;
      }

      console.log(`[SheetSystem] Carregando ficha para sala ${roomCode}, usuário ${user.uid}...`);
      const sheetRef = doc(db, 'sheets', roomCode, user.uid);
      
      console.log("[SheetSystem] Buscando documento no Firestore...");
      const sheetSnap = await getDoc(sheetRef);

      if (sheetSnap.exists()) {
        console.log("[SheetSystem] Ficha encontrada!");
        this.currentSheet = { id: sheetSnap.id, ...sheetSnap.data() };
        return this.currentSheet;
      }

      console.log("[SheetSystem] Ficha não existe. Buscando Perfil Global...");
      // Se não existir ficha na sala, busca os dados Globais do Perfil
      const globalProfile = await AuthSystem.getUserProfile();
      console.log("[SheetSystem] Perfil global carregado:", globalProfile);

      const defaultSheet = {
        name: globalProfile?.nick || AuthSystem.currentNick || 'Novo Aventureiro',
        class: globalProfile?.favoriteClass || 'Aventureiro',
        level: 1,
        avatarUrl: globalProfile?.avatarUrl || '',
        hp: 20,
        hpMax: 20,
        resources: { mana: 10, stamina: 10 },
        status: [],
        attacks: [
          { id: 'atk_1', name: 'Ataque Básico', dice: '1d6', bonus: 0, description: 'Um ataque simples.', keyWords: ['ataque', 'atacar', 'batida'] }
        ],
        spells: [],
        items: [
          { id: 'item_1', name: 'Poção de Cura', effect: '+1d4 HP', quantity: 2 }
        ],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log("[SheetSystem] Criando nova ficha na sala...");
      await setDoc(sheetRef, defaultSheet);
      this.currentSheet = { id: user.uid, ...defaultSheet };
      console.log("[SheetSystem] Ficha inicializada com sucesso!");
      return this.currentSheet;
    } catch (error) {
      console.error("[SheetSystem] Erro ao carregar/criar ficha:", error);
      throw error;
    }
  },

  subscribeToSheet(roomCode, callback) {
    const user = AuthSystem.currentUser;
    if (!user || !roomCode) return;

    const sheetRef = doc(db, 'sheets', roomCode, user.uid);
    this.unsubscriber = onSnapshot(sheetRef, (snap) => {
      if (snap.exists()) {
        this.currentSheet = { id: snap.id, ...snap.data() };
        callback(this.currentSheet);
      }
    });
  },

  async updateSheet(updates) {
    const roomCode = RoomSystem.currentRoomCode;
    const user = AuthSystem.currentUser;
    if (!user || !roomCode) return;

    const sheetRef = doc(db, 'sheets', roomCode, user.uid);
    await updateDoc(sheetRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async updateHP(delta) {
    const newHP = Math.max(0, Math.min(this.currentSheet.hpMax, this.currentSheet.hp + delta));
    await this.updateSheet({ hp: newHP });
    return newHP;
  },

  async updateResource(resourceName, delta) {
    const resources = { ...this.currentSheet.resources };
    if (resources[resourceName] !== undefined) {
      resources[resourceName] = Math.max(0, resources[resourceName] + delta);
      await this.updateSheet({ resources });
    }
  },

  async addStatus(statusName) {
    const status = [...(this.currentSheet.status || [])];
    if (!status.includes(statusName)) {
      status.push(statusName);
      await this.updateSheet({ status });
    }
  },

  async removeStatus(statusName) {
    const status = (this.currentSheet.status || []).filter(s => s !== statusName);
    await this.updateSheet({ status });
  },

  async addAttack(attack) {
    const attacks = [...(this.currentSheet.attacks || [])];
    attack.id = `atk_${Date.now()}`;
    attacks.push(attack);
    await this.updateSheet({ attacks });
  },

  async removeAttack(attackId) {
    const attacks = (this.currentSheet.attacks || []).filter(a => a.id !== attackId);
    await this.updateSheet({ attacks });
  },

  async addSpell(spell) {
    const spells = [...(this.currentSheet.spells || [])];
    spell.id = `spell_${Date.now()}`;
    spells.push(spell);
    await this.updateSheet({ spells });
  },

  async removeSpell(spellId) {
    const spells = (this.currentSheet.spells || []).filter(s => s.id !== spellId);
    await this.updateSheet({ spells });
  },

  async addItem(item) {
    const items = [...(this.currentSheet.items || [])];
    item.id = `item_${Date.now()}`;
    items.push(item);
    await this.updateSheet({ items });
  },

  async removeItem(itemId) {
    const items = (this.currentSheet.items || []).filter(i => i.id !== itemId);
    await this.updateSheet({ items });
  },

  unsubscribe() {
    if (this.unsubscriber) {
      this.unsubscriber();
      this.unsubscriber = null;
    }
  }
};
