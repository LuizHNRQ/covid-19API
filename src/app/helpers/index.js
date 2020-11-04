const bcrypt = require('bcryptjs');
const path = require('path');

const fs = require('fs');

require('dotenv').config();

function encryptPassword(password) {
  return bcrypt.hash(password, 8);
}

const imageFilter = (ext) => {
  const regex = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
  return Boolean(regex.test(ext));
};

async function saveImage(tempPath, targetPath, originalName, newName) {
  return new Promise((resolve, reject) => {
    if (imageFilter(path.extname(originalName))) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(
          `${process.env.APP_HOST}/uploads/${newName}${path.extname(
            originalName,
          )}`,
        );
      });
    } else {
      return reject(new Error('Only jpg, png and gif allowed'));
    }
  });
}

module.exports = {
  encryptPassword,
  saveImage,
};
