const modelTransfer = require("../model/transfer");

module.exports = {
  getAllTransfer: async function (req, res) {
    try {
      const result = await modelTransfer.getAllTransfer();
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of transfer`,
          data: result,
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
  getAllTransferById: async function (req, res) {
    try {
      const {id} = req.params
      const result = await modelTopup.getTopupId(id);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get transaction id ${id} `,
          data: newData,
        });
      } else {
        res.status(400).send({
          message: `There are no transaction data`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  postTransfer: async function (req, res) {
    try {
      const result = await modelTopup.postTransfer(req.body);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success create Transaction`,
          data: newData,
        });
      } else {
        res.send({
          message: `Failed create`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  patchTransfer: async function (req, res) {
    try {
      const { id } = req.params;
      let newData = req.body;
      const result = await modelUser.patchTransfer(id, newData);
      res.status(201).send({
        message: "Success edit topup",
        rowsAffected: result.affectedRows,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  deleteTransfer: async function (req, res) {
    try {
      const { id } = req.params;
      await modelUser.deleteTopup(id);
      res.status(200).send({
        message: `Success delete a transfer`,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
