import * as migration_20250322_225436_init from './20250322_225436_init';
import * as migration_20250322_230746_blocks from './20250322_230746_blocks';
import * as migration_20250323_005103_blocks2 from './20250323_005103_blocks2';
import * as migration_20250323_011412_pages2 from './20250323_011412_pages2';

export const migrations = [
  {
    up: migration_20250322_225436_init.up,
    down: migration_20250322_225436_init.down,
    name: '20250322_225436_init',
  },
  {
    up: migration_20250322_230746_blocks.up,
    down: migration_20250322_230746_blocks.down,
    name: '20250322_230746_blocks',
  },
  {
    up: migration_20250323_005103_blocks2.up,
    down: migration_20250323_005103_blocks2.down,
    name: '20250323_005103_blocks2',
  },
  {
    up: migration_20250323_011412_pages2.up,
    down: migration_20250323_011412_pages2.down,
    name: '20250323_011412_pages2'
  },
];
