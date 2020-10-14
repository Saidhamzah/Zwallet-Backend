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
  },
  getTopupId: async function (req, res) {
    try {
      const {id} = req.params
      const result = await modelTopup.getTopupId(id);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get of Topup id ${id} `,
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
  },
  postTopup: async function (req, res) {
    try {
      const result = await modelTopup.postTopup(req.body);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success create Topup`,
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
  patchTopup: async function (req, res) {
    try {
      const { id } = req.params;
      let newData = req.body;
      const result = await modelUser.patchUserById(id, newData);
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
  deleteTopup: async function (req, res) {
    try {
      const { id } = req.params;
      await modelUser.deleteTopup(id);
      res.status(200).send({
        message: `Success delete a topup`,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
