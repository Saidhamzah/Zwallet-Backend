const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./src/helper/db");
// const e = require("express");

app.use(bodyParser.urlencoded({ extended: false }));

// Top Up
//CREATE
app.post("/topup", (req, res) => {
  const { stepNumber, instruction } = req.body;
  console.log(req.body);
  if (stepNumber && instruction) {
    db.query(
      `insert into topup_instruction (stepNumber, instruction) values 
      (${stepNumber},'${instruction}')`,
      (err, result, fields) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: "Success add topup data",
            data: result,
          });
        } else {
          console.log(err);
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
          db.end();
        }
      }
    );
  } else {
    res.status(400).send({
      success: false,
      message: "Data must be filled",
      data: [],
    });
  }
});

//get all (READ)
app.get("/topup", (req, res) => {
  db.query(
    "select * from topup_instruction order by stepNumber asc",
    (err, result, fields) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: "Success get all top Up data",
          data: result,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Failed to fetch top up data",
          data: [],
        });
      }
    }
  );
});

//update(patch)
app.patch("/topup/:id", (req, res) => {
  const { id } = req.params;
  const { stepNumber = "", instruction = "" } = req.body;
  let validation = req.body;
  if (
    validation.stepNumber != undefined ||
    validation.instruction != undefined
  ) {
    if (stepNumber.trim() || instruction.trim()) {
      db.query(
        `select * from topup_instruction where id=${id}`,
        (err, result, fields) => {
          if (!err) {
            if (result.length) {
              const data = Object.entries(req.body).map((item) => {
                return parseInt(item[1]) > 0
                  ? `${item[0]}=${item[1]}`
                  : `${item[0]}='${item[1]}'`;
              });
              console.log(data);
              let query = `update topup_instruction set ${data} where id=${id}`;
              db.query(query, (err, result, fields) => {
                if (result.affectedRows) {
                  res.status(200).send({
                    success: true,
                    message: `User ${id} Succesfully updated`,
                  });
                } else {
                  res.status(400).send({
                    success: false,
                    message: "Failed update topup",
                  });
                }
              });
            } else {
              res.status(400).send({
                success: false,
                message: "id not found",
              });
            }
          } else {
            console.log(err);
            res.status(500).send({
              success: false,
              message: "Failed update topup",
            });
          }
        }
      );
    }
  } else {
    console.log(validation.instruction)
    res.status(400).send({
      success: false,
      message: "Fill the data to update",
    });
  }
});

//delete
app.delete("/topup/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `select* from topup_instruction where id=${id}`,
    (err, result, fields) => {
      if (!err) {
        if (result.length) {
          db.query(
            `delete from topup_instruction where id=${id}`,
            (err, result, fields) => {
              if (!err) {
                res.status(200).send({
                  success: true,
                  message: "Success delete top up data",
                });
              } else {
                console.log(err);
                res.status(500).send({
                  success: false,
                  message: "Failed delete top up Data",
                  data: [],
                });
              }
            }
          );
        } else {
          res.status(400).send({
            success: false,
            message: "id not found",
          });
        }
      } else {
        res.status(500).send({
          success: false,
          message: "Failed delete topup",
        });
      }
    }
  );
});

// Profile
//CREATE
app.post("/profile", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    pin,
    phoneNumber,
    balance,
    img,
  } = req.body;
  console.log(req.body);
  if (
    firstName &&
    lastName &&
    email &&
    password &&
    pin &&
    phoneNumber &&
    balance &&
    img
  ) {
    db.query(
      `insert into profile (firstName, lastName, email, password, pin, phoneNumber, balance, img) values 
      ('${firstName}','${lastName}','${email}','${password}','${pin}',${phoneNumber},'${balance}','${img}')`,
      (err, result, fields) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: "Success add users profile data",
            data: result,
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
          db.end();
        }
      }
    );
  } else {
    res.status(400).send({
      success: false,
      message: "Data must be filled",
      data: [],
    });
  }
});

//get all
app.get("/profile", (req, res) => {
  db.query(`select * from profile`, (err, result, fields) => {
    if (!err) {
      res.status(200).send({
        success: true,
        message: "Success get all user profile",
        data: result,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Failed to fetch user profile data",
        data: [],
      });
    }
  });
});

//update
app.patch("/profile/:id", (req, res) => {
  const { id } = req.params;
  const {
    firstName = "",
    lastName = "",
    email = "",
    password = "",
    pin = "",
    phoneNumber = "",
    balance = "",
    img = "",
  } = req.body;
  let vallidation = req.body;

  if (
    vallidation.firstName != undefined ||
    vallidation.lastName != undefined ||
    vallidation.email != undefined ||
    vallidation.password != undefined ||
    vallidation.pin != undefined ||
    vallidation.phoneNumber != undefined ||
    vallidation.balance != undefined ||
    vallidation.img != undefined
  ) {
    if (
      firstName.trim() ||
      lastName.trim() ||
      email.trim() ||
      password.trim() ||
      pin.trim() ||
      phoneNumber.trim() ||
      balance.trim() ||
      img.trim()
    ) {
      db.query(
        `SELECT * FROM profile where id=${id}`,
        (err, result, fields) => {
          if (!err) {
            if (result.length) {
              const data = Object.entries(req.body).map((item) => {
                return parseInt(item[1]) > 0
                  ? `${item[0]}=${item[1]}`
                  : `${item[0]}='${item[1]}'`;
              });
              console.log(data);
              let query = `update profile set ${data} where id=${id}`;
              db.query(query, (err, result, fields) => {
                if (result.affectedRows) {
                  res.status(200).send({
                    success: true,
                    message: `Profile ${id} Succesfully updated`,
                  });
                } else {
                  res.status(400).send({
                    success: false,
                    message: "Failed update profile",
                  });
                }
              });
            } else {
              res.status(400).send({
                success: false,
                message: "id not found",
              });
            }
          } else {
            console.log(err);
            res.status(500).send({
              success: false,
              message: "Failed update profile",
            });
          }
        }
      );
    }
  } else {
    console.log(req.body.firstName)
    res.status(400).send({
      success: false,
      message: "Fill the data to update",
    });
  }
});

//delete
app.delete("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.query(`select* from profile where id=${id}`, (err, result, fields) => {
    if (!err) {
      if (result.length) {
        db.query(
          `delete from profile where id=${id}`,
          (err, result, fields) => {
            if (!err) {
              res.status(200).send({
                success: true,
                message: "Success delete profile data",
              });
            } else {
              console.log(err);
              res.status(500).send({
                success: false,
                message: "Failed delete profile Data",
                data: [],
              });
            }
          }
        );
      } else {
        res.status(400).send({
          success: false,
          message: "id not found",
        });
      }
    } else {
      res.status(500).send({
        success: false,
        message: "Failed delete profile",
      });
    }
  });
});

//Transfer
//create
app.post("/transfer", (req, res) => {
  const { sendBy, amountTransfer, receiver, status } = req.body;
  console.log(req.body);
  let comparingId = req.body;
  if (comparingId.sendBy != comparingId.receiver) {
    if (sendBy && amountTransfer && receiver && status) {
      db.query(
        `insert into transfer (sendBy, amountTransfer, receiver,  status) values 
        (${sendBy},${amountTransfer},${receiver}, '${status}')`,
        (err, result, fields) => {
          if (!err) {
            res.status(201).send({
              success: true,
              message: "Success add transfer data",
              data: result,
            });
          } else {
            res.status(500).send({
              success: false,
              message: "Internal Server Error",
              data: [],
            });
            db.end();
          }
        }
      );
    } else {
      res.status(400).send({
        success: false,
        message: "Data must be filled",
        data: [],
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: "Sender and Receiver has same ID",
      data: [],
    });
  }
});

//getAll
app.get("/transfer", (req, res) => {
  db.query(
    `select transfer.*, sendBy, concat(profile1.firstName,' ', profile1.lastName) as sender,
        concat(profile2.firstName,' ', profile2.lastName) as received
        from transfer inner join profile as profile1 on transfer.sendBy= profile1.id 
        inner join profile as profile2 on transfer.receiver= profile2.id`,
    (err, result, fields) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: "Success get all transfer data",
          data: result,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Failed to fetch transfer data",
          data: [],
        });
      }
    }
  );
});

//update
app.patch("/transfer/:id", (req, res) => {
  const { id } = req.params;
  const {
    sendBy = "",
    amountTransfer = "",
    receiver = "",
    status = "",
  } = req.body;
  let comparingId = req.body;
  if (
    comparingId.sendBy != undefined ||
    comparingId.amountTransfer != undefined ||
    comparingId.receiver != undefined ||
    comparingId.status != undefined
  ) {
    if (comparingId.sendBy != comparingId.receiver) {
      if (
        sendBy.trim() ||
        amountTransfer.trim() ||
        receiver.trim() ||
        status.trim()
      ) {
        db.query(
          `SELECT * FROM transfer where id=${id}`,
          (err, result, fields) => {
            if (!err) {
              if (result.length) {
                const data = Object.entries(req.body).map((item) => {
                  return parseInt(item[1]) > 0
                    ? `${item[0]}=${item[1]}`
                    : `${item[0]}='${item[1]}'`;
                });
                console.log(data);
                let query = `update transfer set ${data} where id=${id}`;
                db.query(query, (err, result, fields) => {
                  if (result.affectedRows) {
                    res.status(200).send({
                      success: true,
                      message: `Transfer ${id} Succesfully updated`,
                    });
                  } else {
                    res.status(400).send({
                      success: false,
                      message: "Failed update transfer",
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: false,
                  message: "id not found",
                });
              }
            } else {
              console.log(err);
              res.status(500).send({
                success: false,
                message: "Failed update transfer",
              });
            }
          }
        );
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Sender and Receiver has same ID",
        data: [],
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: "Fill the data to update",
    });
  }
});

//delete
app.delete("/transfer/:id", (req, res) => {
  const { id } = req.params;
  db.query(`select* from transfer where id=${id}`, (err, result, fields) => {
    if (!err) {
      if (result.length) {
        db.query(
          `delete from transfer where id=${id}`,
          (err, result, fields) => {
            if (!err) {
              res.status(200).send({
                success: true,
                message: "Success delete transfer data",
              });
            } else {
              console.log(err);
              res.status(500).send({
                success: false,
                message: "Failed delete transfer data",
                data: [],
              });
            }
          }
        );
      } else {
        res.status(400).send({
          success: false,
          message: "id not found",
        });
      }
    } else {
      res.status(500).send({
        success: false,
        message: "Failed delete transfer",
      });
    }
  });
});

//as user
//transfer
//read--Search
app.get("/user/transfer/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `select concat(firstName, ' ' , lastName) as fullname, phoneNumber, img from profile where id <> ${id} order by fullname asc limit 4`,
    (err, result, fields) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: "Success get all profile",
          data: result,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Failed to fetch transfer data",
          data: [],
        });
      }
    }
  );
});
//Search
app.get("/user/transfer/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `select concat(firstName, ' ' , lastName) as fullname, phoneNumber, img from profile where id <> ${id} order by fullname asc limit 4`,
    (err, result, fields) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: "Success get all profile",
          data: result,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Failed to fetch transfer data",
          data: [],
        });
      }
    }
  );
});







app.listen(7000, () => {
  console.log("Server running on port 7000");
});
