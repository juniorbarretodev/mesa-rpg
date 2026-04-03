import { SoundManager } from '../sounds.js';

export const MagicSounds = {
  playCast(spellSoundType) {
    console.log(`[PLACEHOLDER] Playing cast sound for type: ${spellSoundType}`);
    SoundManager.playSpellCast(spellSoundType);
  },

  playImpact(spellSoundType) {
    console.log(`[PLACEHOLDER] Playing impact sound for type: ${spellSoundType}`);
  },

  playFail(spellSoundType) {
    console.log(`[PLACEHOLDER] Playing fail sound for type: ${spellSoundType}`);
  }
};
