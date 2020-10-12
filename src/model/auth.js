const connection = require("../helper/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  login: function (email) {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from user where email='${email}'`,
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
