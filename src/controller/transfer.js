const modelTransfer = require("../model/transfer");

module.exports = {
  getAllTransferById: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await modelTransfer.getAllTransferById(id);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of transfer id ${id}`,
          data: newData,
        });
      } else {
        res.status(400).send({
          message: `There are no user`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
