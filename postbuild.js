const { glob } = require('glob');
const { rimraf } = require('rimraf');

const start = async () => {
  await glob('release/*').then((files) => {
    files.forEach((file) => {
      if ((!file.includes('Tax-Helper-Setup') && !file.endsWith('exe')) || file.endsWith('blockmap')) {
        rimraf.sync(file);
      }
    });
  });
};

start();
