module.exports = {
  serve: (req, res) => {
    const fs = require('fs');

    const app = sails.config.appPath + '/assets/index.html';
    //sails.log(app);
    fs.createReadStream(app).pipe(res);
  }
};
