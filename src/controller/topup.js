const modelTopup = require("../model/topup");

module.exports = {
  getAllTopup: async function (req, res) {
    try {
      const result = await modelTopup.getAllTopup();
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of Topup`,
          data: newData,
        });
      } else {
        res.status(400).send({
          message: `There are no topup data`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
 
};
