export const AttackAnimations = {
  playMeleeAttack(attackerToken, targetToken, type = 'slash') {
    console.log(`[PLACEHOLDER] Playing melee attack animation: ${type}`);
  },

  playProjectile(from, to, projectileType = 'arrow') {
    console.log(`[PLACEHOLDER] Playing projectile animation: ${projectileType}`);
  },

  playAreaEffect(centerToken, radius, effectType = 'explosion') {
    console.log(`[PLACEHOLDER] Playing area effect: ${effectType}`);
  }
};
