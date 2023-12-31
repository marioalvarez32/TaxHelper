import { glob } from 'glob';
import { rimraf } from 'rimraf';

glob('release/*').then((files) => {
  files.forEach((file) => {
    if ((!file.includes('Tax-Helper-Setup') && !file.endsWith('exe')) || file.endsWith('blockmap')) {
      rimraf.sync(file);
    }
  });
});
