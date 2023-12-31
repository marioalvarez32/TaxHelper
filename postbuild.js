const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname, 'release');

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      fs.rmdirSync(filePath, { recursive: true });
    } else if ((!filePath.includes('Tax-Helper-Setup') && !filePath.endsWith('.exe')) || filePath.endsWith('.blockmap')) {
      fs.unlinkSync(filePath);
    }
  });
});
