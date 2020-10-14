const db = require("../helper/db");

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
  },
  getTopup: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`select * from topup_instruction where stepNumber=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  postTopup: function (newData) {
    return new Promise((resolve, reject) => {
      db.query(` insert into topup set?`, newData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  patchTopup: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        ` update topup set ? where id=${id}`,
        [newData, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteTopup: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`delete from topup where id=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
