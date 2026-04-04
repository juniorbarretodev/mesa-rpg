export const SoundManager = {
  sounds: {},
  muted: false,
  volume: 0.7,

  SPELL_SOUNDS: {
    fire: 'sounds/combat/magic_cast.wav',
    ice: 'sounds/combat/magic_cast.wav',
    heal: 'sounds/combat/magic_cast.wav',
    thunder: 'sounds/combat/magic_cast.wav'
  },

  DEATH_SOUNDS: {
    player: 'sounds/combat/death_hero.wav',
    enemy: 'sounds/combat/death_enemy.wav',
    monster: 'sounds/combat/death_monster.wav'
  },

  async preload() {
    // Sons ZapSplat ainda não adicionados
    // Adicionar arquivos .wav em /sounds/ quando disponíveis
    // Por enquanto, retornar silenciosamente para evitar erros 404
    return;
  },

  play(soundKey, options = {}) {
    if (this.muted) return;

    const { volume = this.volume, loop = false, fadeIn = false } = options;

    let audio = this.sounds[soundKey];
    if (!audio) {
      audio = new Audio(soundKey);
      audio.preload = 'auto';
    }

    audio.volume = 0;
    audio.loop = loop;
    audio.play().catch(() => { });

    if (fadeIn) {
      const step = volume / 20;
      const fadeInterval = setInterval(() => {
        if (audio.volume < volume) {
          audio.volume = Math.min(audio.volume + step, volume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    } else {
      audio.volume = volume;
    }
  },

  playDiceRoll() {
    this.play('dice_roll');
  },

  playDiceLand() {
    this.play('dice_land');
  },

  playSpellCast(type) {
    const soundFile = this.SPELL_SOUNDS[type] || 'sounds/combat/magic_cast.wav';
    this.play(soundFile);
  },

  playDeath(type) {
    const soundFile = this.DEATH_SOUNDS[type] || 'sounds/combat/death_enemy.wav';
    this.play(soundFile, { volume: 1 });
  },

  playButtonClick() {
    this.play('ui_button_click');
  },

  playNotification() {
    this.play('ui_notification');
  },

  playBattleStart() {
    this.play('ui_battle_start', { volume: 1 });
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }
};
