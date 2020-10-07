const modelUser = require("../model/user");

module.exports = {
  getAllUserById: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await modelUser.getAllUserById(id);
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of user id ${id}`,
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
  getSearch: async function (req, res) {
    try {
      const { search } = req.query;
      const { id} = req.params;
      const result = await modelUser.getSearch(id,search);
      if (result.length > 0) {
        res.status(200).send({
          data: result,
        });
      } else {
        res.status(400).send({
          message: "Data Not Found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  getAllUser: async function (req, res) {
    try {
      const result = await modelUser.getAllUser();
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of user`,
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
  postUserData: async function (req, res) {
    try {
      const newData = req.body;
      console.log(newData)
      const result = await modelUser.postUserData(newData);

      res.status(201).send({
          message:'Success created an user data',
          rowsAffected: result.affectedRows
      })
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
  },
  patchUserById: async function(req,res){
      try {
          const{id}= req.params
          const newData = req.body
          const result = await userModel.patchUserById(id, newData)
            res.status(201).send({
                message: 'Success edit an user',
                rowsAffected: result.affectedRows
            })
      } catch (error) {
        res.status(500).send({
            message:error.message
        })
      }
  },
  deleteUserById: async function (req, res){
      try {
          const {id} = req.params
          await modelUser.deleteUserById(id)
          res.status(200).send(({
              message: `Success delete an user`
          }))
      } catch (error) {
          res.status(500).send({
              message: error.message
          })          
      }
  }
};
