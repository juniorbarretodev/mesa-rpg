export const DiceSystem = {
  parse(notation) {
    const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) throw new Error(`Notação inválida: ${notation}`);
    
    return {
      count: parseInt(match[1]),
      sides: parseInt(match[2]),
      modifier: match[3] ? parseInt(match[3]) : 0
    };
  },

  rollSingle(sides) {
    return Math.floor(Math.random() * sides) + 1;
  },

  roll(notation) {
    const { count, sides, modifier } = this.parse(notation);
    const results = [];
    
    for (let i = 0; i < count; i++) {
      results.push(this.rollSingle(sides));
    }
    
    const total = results.reduce((sum, val) => sum + val, 0) + modifier;
    
    return {
      results,
      modifier,
      total,
      notation,
      isCritical: results.every(r => r === sides),
      isFumble: results.every(r => r === 1)
    };
  },

  async rollWithAnimation(notation, container, options = {}) {
    const { animate = true, sound = true } = options;
    const { results, modifier, total, isCritical, isFumble } = this.roll(notation);
    
    if (animate && container) {
      await this.animate(container, notation);
    }
    
    if (sound) {
      this.playSound(isCritical ? 'crit' : isFumble ? 'fail' : 'land');
    }
    
    return { results, modifier, total, isCritical, isFumble };
  },

  async animate(container, notation) {
    const { sides } = this.parse(notation);
    const animationDuration = 1500;
    const intervalTime = 80;
    const iterations = animationDuration / intervalTime;
    
    container.classList.add('dice-rolling');
    
    for (let i = 0; i < iterations; i++) {
      container.textContent = this.rollSingle(sides);
      await new Promise(resolve => setTimeout(resolve, intervalTime));
    }
    
    container.classList.remove('dice-rolling');
  },

  playSound(phase) {
    const sounds = {
      roll: '/sounds/dice/roll.wav',
      land: '/sounds/dice/land.wav',
      crit: '/sounds/dice/land.wav',
      fail: '/sounds/dice/land.wav'
    };

    const soundFile = sounds[phase];
    if (!soundFile) return;

    try {
      const audio = new Audio(soundFile);
      audio.volume = phase === 'crit' ? 1 : 0.7;
      audio.play().catch(() => {});
    } catch (e) {}
  },

  formatResult(rollResult) {
    let text = rollResult.results.join(' + ');
    if (rollResult.modifier !== 0) {
      text += rollResult.modifier > 0 ? ` + ${rollResult.modifier}` : ` - ${Math.abs(rollResult.modifier)}`;
    }
    text += ` = ${rollResult.total}`;
    
    if (rollResult.isCritical) text += ' CRÍTICO!';
    if (rollResult.isFumble) text += ' FALHA CRÍTICA!';
    
    return text;
  }
};
