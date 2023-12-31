const { glob } = require('glob');
const { rimraf } = require('rimraf');

const start = async () => {
  const globPromise = glob('release/*');
  console.log('🚀 ~ file: postbuild.js:6 ~ start ~ globPromise:', globPromise);
  if (globPromise) {
    globPromise.then((files) => {
      files.forEach((file) => {
        if ((!file.includes('Tax-Helper-Setup') && !file.endsWith('exe')) || file.endsWith('blockmap')) {
          rimraf.sync(file);
        }
      });
    });
  }
};

start();
