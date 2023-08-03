const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://127.0.0.1/shopboom',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

};
