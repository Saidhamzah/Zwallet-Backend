const db = require("../helper/db");
// const { search } = require("../route/user");

module.exports = {
  getAllUser: function () {
    return new Promise((resolve, reject) => {
      db.query(
        // `select *, concat(firstname,' ',lastName) as fullName from profile where id=${id}`,
        `select * from profile`,
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
  getAllUserById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        // `select *, concat(firstname,' ',lastName) as fullName from profile where id=${id}`,
        `select * from profile where id=${id}`,
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
  getSearch: function (id, search) {
    return new Promise((resolve, reject) => {
      db.query(
        `select concat(firstname,' ',lastName) as fullName, img, phoneNumber 
        from profile where id <> ${id} and roleId = 100 and concat(firstname,' ',lastName) 
        like '%${search}%' order by concat(firstname,' ',lastName) asc LIMIT 4`,
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
  getAllUser: function () {
    return new Promise((resolve, reject) => {
      db.query(`select* from profile`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  postUserData: function (newData) {
    return new Promise((resolve, reject) => {
      db.query(` insert into profile set?`, newData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  patchUserById: function (id, newData) {
    return new Promise((resolve, reject) => {
      db.query(
        ` update profile set ? where id=${id}`,
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
  deleteUserById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`delete from profile where id=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  uploadImage: function (id, imgName) {
    return new Promise((resolve, reject) => {
      db.query(
        `update profile set ? where id=${id}`,
        [imgName, id],
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
};
