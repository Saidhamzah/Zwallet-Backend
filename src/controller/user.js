const modelUser = require("../model/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const validation = validationResult.withDefaults({
  formatter: (error) => {
    return {
      error: error.location,
    };
  },
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    cb(null, newFileName);
  },
});

let limits = {
  fileSize: 5 * 1024 * 1024,
};

let fileFilter = (req, file, cb) => {
  const mime = /jpg|webp|gif|png|jpeg|svg/;
  const extName = mime.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, limits, fileFilter });

module.exports = {
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
      const { id } = req.params;
      const result = await modelUser.getSearch(id, search);
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
      const erro = validation(req).array();
      if (!erro.length) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        let newData = { ...req.body, password: hash };
        // console.log(newData);
        const result = await modelUser.postUserData(newData);

        res.status(201).send({
          message: "Success created an user data",
          rowsAffected: result.affectedRows,
        });
      } else {
        res.send({
          message: "Please input email format correctly",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  patchUserById: async function (req, res) {
    try {
      if (req.body.email) {
        const erro = validation(req).array();
        if (erro.length) {
          res.send("Please input email correctly");
        }
      }
      const { id } = req.params;
      let newData = req.body;
      if (req.body.password) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        newData = { ...newData, password: hash };
      }
      const result = await modelUser.patchUserById(id, newData);
      res.status(201).send({
        message: "Success edit an user",
        rowsAffected: result.affectedRows,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  deleteUserById: async function (req, res) {
    try {
      const { id } = req.params;
      await modelUser.deleteUserById(id);
      res.status(200).send({
        message: `Success delete an user`,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  uploadImage: (req, res) => {
    const uploadImage = upload.single("image");
    const { id } = req.params;
    uploadImage(req, res, async function (err) {
      try {
        const imgName = 
         {img : `${req.file.filename}`};

        if (!req.file) {
          res.status(400).send({
            success: false,
            message: "File isn't an Image",
          });
        } else {
          if (!err) {
            await modelUser.uploadImage(id, imgName);
            res.status(201).send({
              success: true,
              image: `${process.env.BASE_URI}/images/${req.file.filename}`,
            });
          } else {
            res.status(400).send({
              error: err,
            });
          }
        }
      } catch (error) {
        res.status(500).send({
          message: error.message,
        });
      }
    });
  },
};
