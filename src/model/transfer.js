const db = require("../helper/db");
// const { search } = require("../route/user");

module.exports = {
  getAllTransferById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
       `select transfer.*,concat(p1.firstName,' ',p1.lastName) as sender,
        concat(p2.firstName,' ',p2.lastName) as receiveBy from transfer 
       inner join profile as p1 on transfer.sendBy=p1.id 
       inner join profile as p2 on transfer.receiver=p2.id
       where sendBy=3 or receiver=3 order by dateTransfer desc;`,
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
};
