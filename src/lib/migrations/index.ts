import * as migration_20250322_225436_init from './20250322_225436_init';

export const migrations = [
  {
    up: migration_20250322_225436_init.up,
    down: migration_20250322_225436_init.down,
    name: '20250322_225436_init'
  },
];
