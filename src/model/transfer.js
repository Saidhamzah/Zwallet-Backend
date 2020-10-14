const db = require("../helper/db");
// const { search } = require("../route/user");

module.exports = {
  getAllTransfer: function () {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from transfer`,
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
  getAllTransferById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.*,concat(p1.firstName,' ',p1.lastName) as sender,
        concat(p2.firstName,' ',p2.lastName) as receiveBy from transfer 
       inner join profile as p1 on transfer.sendBy=p1.id 
       inner join profile as p2 on transfer.receiver=p2.id
       where sendBy=${id} or receiver=${id} order by dateTransfer desc;`,
        // `select * from transfer where sendBy=${id} or receiver=${id} order by dateTransfer desc`,
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
  postTransfer: function (id, newData) {
    return new Promise((resolve, reject) => {
      db.query(`insert into transfer set?`, newData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  getTransactionByMonthk: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`select transfer.*,concat(p1.firstName,' ',p1.lastName) as sender,
      concat(p2.firstName,' ',p2.lastName) as receiveBy from transfer 
     inner join profile as p1 on transfer.sendBy=p1.id 
     inner join profile as p2 on transfer.receiver=p2.id
     where sendBy=${id} or receiver=${id} and DATEDIFF(CURRENT_DATE ,dateTransfer)<30 order by dateTransfer desc;`),
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        };
    });
  },
  getTransactionByWeek: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`select transfer.*,concat(p1.firstName,' ',p1.lastName) as sender,
      concat(p2.firstName,' ',p2.lastName) as receiveBy from transfer 
     inner join profile as p1 on transfer.sendBy=p1.id 
     inner join profile as p2 on transfer.receiver=p2.id
     where sendBy=${id} or receiver=${id} and DATEDIFF(CURRENT_DATE ,dateTransfer)<8 order by dateTransfer desc;`),
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        };
    });
  },
  patchTransfer: function (id, newData) {
    return new Promise((resolve, reject) => {
      db.query(
        ` update transfer set ? where id=${id}`,
        [newData],
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
      db.query(`delete from transfer where id=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
