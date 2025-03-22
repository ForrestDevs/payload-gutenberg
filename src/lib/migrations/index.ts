import * as migration_20250322_225436_init from './20250322_225436_init';
import * as migration_20250322_230746_blocks from './20250322_230746_blocks';

export const migrations = [
  {
    up: migration_20250322_225436_init.up,
    down: migration_20250322_225436_init.down,
    name: '20250322_225436_init',
  },
  {
    up: migration_20250322_230746_blocks.up,
    down: migration_20250322_230746_blocks.down,
    name: '20250322_230746_blocks'
  },
];
