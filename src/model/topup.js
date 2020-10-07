const db = require("../helper/db");
const { patch } = require("../route/user");

module.exports = {
  getAllTopup: function () {
    return new Promise((resolve, reject) => {
      db.query(`select * from topup_instruction where stepNumber<9`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
