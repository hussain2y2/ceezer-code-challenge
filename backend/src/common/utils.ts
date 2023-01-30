import * as crypto from 'crypto';

const random = (len = 20) => {
  return crypto.randomBytes(len).toString('hex');
};

const typeModifier = (attackerType, defenderType) => {
  const typeModifiers = [
    { type: 'Electric/Water', value: 2 },
    { type: 'Electric/Rock', value: 0.5 },
  ];

  const typeModifier = typeModifiers[`${attackerType}/${defenderType}`];

  return typeModifier ? typeModifier.value : 1;
};

export { random, typeModifier };