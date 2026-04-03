import { ref, push, onValue, off } from "firebase/database";
import { rtdb } from './firebase.js';
import { AuthSystem } from './auth.js';
import { RoomSystem } from './room.js';

export const BATTLE_PHASES = {
  IDLE: 'idle',
  ABILITY_DETECTED: 'ability_detected',
  AWAITING_TARGET: 'awaiting_target',
  AWAITING_ROLL: 'awaiting_roll',
  ROLLING: 'rolling',
  AWAITING_MASTER: 'awaiting_master',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled'
};

export const ChatSystem = {
  listeners: [],
  currentPhase: BATTLE_PHASES.IDLE,
  pendingAction: null,

  async sendMessage(text, type = 'normal') {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const user = AuthSystem.currentUser;
    
    const message = {
      senderId: user.uid,
      senderNick: AuthSystem.currentNick,
      text: text,
      type: type,
      timestamp: Date.now()
    };

    await push(ref(rtdb, `rooms/${code}/chat`), message);
  },

  async sendAction(text) {
    await this.sendMessage(text, 'action');
  },

  async sendRoll(dice, results, total, context) {
    const code = RoomSystem.currentRoomCode;
    if (!code) return;

    const user = AuthSystem.currentUser;
    
    const rollData = {
      rolledBy: AuthSystem.currentNick,
      dice: dice,
      results: results,
      total: total,
      context: context,
      timestamp: Date.now()
    };

    await push(ref(rtdb, `rooms/${code}/dice`), rollData);
    await this.sendMessage(`${AuthSystem.currentNick} rolou ${dice}: ${total} (${results.join(', ')})`, 'roll');
  },

  subscribeToChat(code, callback) {
    const chatRef = ref(rtdb, `rooms/${code}/chat`);
    const listener = onValue(chatRef, (snap) => {
      const messages = [];
      snap.forEach((child) => {
        messages.push({ id: child.key, ...child.val() });
      });
      messages.sort((a, b) => a.timestamp - b.timestamp);
      callback(messages);
    });
    this.listeners.push({ ref: chatRef, listener });
    return listener;
  },

  subscribeToDice(code, callback) {
    const diceRef = ref(rtdb, `rooms/${code}/dice`);
    const listener = onValue(diceRef, (snap) => {
      const rolls = [];
      snap.forEach((child) => {
        rolls.push({ id: child.key, ...child.val() });
      });
      rolls.sort((a, b) => a.timestamp - b.timestamp);
      callback(rolls);
    });
    this.listeners.push({ ref: diceRef, listener });
    return listener;
  },

  unsubscribe() {
    this.listeners.forEach(({ ref: chatRef, listener }) => {
      off(chatRef, 'value', listener);
    });
    this.listeners = [];
  },

  parseBattleAction(text, playerAbilities) {
    const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    for (const ability of playerAbilities) {
      const keywords = ability.keyWords || [];
      const match = keywords.some(keyword => 
        normalizedText.includes(keyword.toLowerCase())
      );
      
      if (match) {
        this.currentPhase = BATTLE_PHASES.ABILITY_DETECTED;
        this.pendingAction = {
          ability: ability,
          text: text
        };
        return {
          detected: true,
          ability: ability,
          phase: BATTLE_PHASES.AWAITING_TARGET
        };
      }
    }
    
    return { detected: false };
  },

  setPhase(phase) {
    this.currentPhase = phase;
  },

  clearPendingAction() {
    this.pendingAction = null;
    this.currentPhase = BATTLE_PHASES.IDLE;
  }
};
