export const SoundManager = {
  sounds: {},
  muted: false,
  volume: 0.7,

  SPELL_SOUNDS: {
    fire: '/sounds/combat/magic_cast.wav',
    ice: '/sounds/combat/magic_cast.wav',
    heal: '/sounds/combat/magic_cast.wav',
    thunder: '/sounds/combat/magic_cast.wav'
  },

  DEATH_SOUNDS: {
    player: '/sounds/combat/death_hero.wav',
    enemy: '/sounds/combat/death_enemy.wav',
    monster: '/sounds/combat/death_monster.wav'
  },

  async preload() {
    // Sons ZapSplat ainda não adicionados
    // Adicionar arquivos .wav em /sounds/ quando disponíveis
    // Por enquanto, retornar silenciosamente para evitar erros 404
    return;
  },

  play(soundKey, options = {}) {
    if (this.muted) return;

    const { volume = this.volume, loop = false, fadeIn = false, extensions = ['.wav', '.ogg', '.mp3'] } = options;

    let audio = this.sounds[soundKey];
    if (!audio) {
      // Try with extension if file doesn't have one
      const tryExtensions = !soundKey.match(/\.(wav|mp3|ogg|aiff?|flac)$/i);
      if (tryExtensions) {
        // Try with each extension until one works
        const playOne = (index) => {
          if (index >= extensions.length) return null;
          const url = soundKey + extensions[index];
          const testAudio = new Audio(url);
          testAudio.load();
          return testAudio.play()
            .then(() => testAudio)
            .catch(() => playOne(index + 1));
        };
        const playPromise = playOne(0);
        if (playPromise) {
          playPromise.then(foundAudio => {
            if (!foundAudio) return;
            if (fadeIn) {
              const step = volume / 20;
              foundAudio.volume = 0;
              foundAudio.loop = loop;
              this.sounds[soundKey] = foundAudio;
              const fadeInterval = setInterval(() => {
                if (foundAudio.volume < volume) {
                  foundAudio.volume = Math.min(foundAudio.volume + step, volume);
                } else {
                  clearInterval(fadeInterval);
                }
              }, 50);
            } else {
              foundAudio.volume = volume;
              foundAudio.loop = loop;
              this.sounds[soundKey] = foundAudio;
            }
          }).catch(() => {});
        }
        return;
      } else {
        audio = new Audio(soundKey);
        audio.preload = 'auto';
      }
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
    this.play('/sounds/dice/roll.wav');
  },

  playDiceLand() {
    this.play('/sounds/dice/land.wav');
  },

  playSpellCast(type) {
    const soundFile = this.SPELL_SOUNDS[type] || '/sounds/combat/magic_cast.wav';
    this.play(soundFile);
  },

  playDeath(type) {
    const soundFile = this.DEATH_SOUNDS[type] || '/sounds/combat/death_enemy.wav';
    this.play(soundFile, { volume: 1 });
  },

  playButtonClick() {
    this.play('/sounds/ui/button_click');
  },

  playNotification() {
    this.play('/sounds/ui/notification');
  },

  playBattleStart() {
    this.play('/sounds/ui/battle_start', { volume: 1 });
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }
};
