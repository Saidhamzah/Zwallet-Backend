const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./src/helper/db");

app.use(bodyParser.urlencoded({ extended: false }));

// Top Up
//CREATE
app.post('/topup', (req, res) => {
  const { stepNumber, instruction } = req.body
  console.log(req.body)
  if(stepNumber && instruction){

      db.query(`insert into topup_instruction (stepNumber, instruction) values 
      (${stepNumber},'${instruction}')`,
       (err, result, fields) => {
        if (!err) {
          res.status(201).send({
              success: true,
            message: 'Success add topup data',
            data: result,
          });
        } else {
          console.log(err)
          res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: []
          });
          db.end()          
        }
      });
  }
  else {
      res.status(400).send({
        success: false,
        message: 'Data must be filled',
        data: []
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
      }else{
          res.status(500).send({
              success:false,
              message: 'Failed to fetch top up data',
              data:[]
          })
      }
    }
  );
});

//update(patch)
app.patch("/topup/:id", (req, res) => {
  const { id } = req.params;
  const {
    stepNumber= '',
    instruction = ""
  } = req.body;

  if (
    stepNumber.trim() ||
    instruction.trim()
  ) {
    db.query(`select * from topup_instruction where id=${id}`, (err, result, fields) => {
      if (!err) {
        if (result.length) {
          const data = Object.entries(req.body).map((item) => {
            return parseInt(item[1]) > 0
              ? `${item[0]}=${item[1]}`
              : `${item[0]}='${item[1]}'`;
          });
          console.log(data)
          let query = `update topup_instruction set ${data} where id=${id}`;
          db.query(query, (err, result, fields) => {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: `User ${id} Succesfully updated`
              });
            } else {
              res.status(400).send({
                success: false,
                message: "Failed update user",
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
          message: "Failed update user",
        });
      }
    });
  }
});

//delete
app.delete('/topup/:id', (req, res) => {
  const {id} = req.params
      db.query(
          `delete from topup_instruction where id=${id}`,
          (err, result, fields) => {
        if (!err) {
          res.status(200).send({
            success: true,
            message: 'Success delete top up data'
          });
        } else {
            console.log(err)
          res.status(500).send({
            success: false,
            message: 'Failed delete top up Data',
            data: []
          });
        }
      });
    });



// Profile

//CREATE
app.post('/profile', (req, res) => {
  const { firstName, lastName, email, password, pin, phoneNumber, balance, img } = req.body
  console.log(req.body)
  if(firstName && lastName && email && password && pin && phoneNumber && balance && img){

      db.query(`insert into profile (firstName, lastName, email, password, pin, phoneNumber, balance, img) values 
      ('${firstName}','${lastName}','${email}','${password}','${pin}',${phoneNumber},'${balance}','${img}')`,
       (err, result, fields) => {
        if (!err) {
          res.status(201).send({
              success: true,
            message: 'Success add users profile data',
            data: result,
          });
        } else {
          res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: []
          });
          db.end()          
        }
      });
  }
  else {
      res.status(400).send({
        success: false,
        message: 'Data must be filled',
        data: []
      });         
    }
});



//get all
app.get("/profile", (req, res) => {
  db.query(
    `select * from profile`,
    (err, result, fields) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: "Success get all user profile",
          data: result,
        });
      }else{
          res.status(500).send({
              success:false,
              message: 'Failed to fetch user profile data',
              data:[]
          })
      }
    }
  );
});



//update
app.patch("/profile/:id", (req, res) => {
  const { id } = req.params;
  const {
    firstName= '',
    lastName = "",
    email = "",
    password = "",
    pin = "",
    phoneNumber = "",
    balance = "",
    img = "",
  } = req.body;

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
    db.query(`SELECT * FROM profile where id=${id}`, (err, result, fields) => {
      if (!err) {
        if (result.length) {
          const data = Object.entries(req.body).map((item) => {
            return parseInt(item[1]) > 0
              ? `${item[0]}=${item[1]}`
              : `${item[0]}='${item[1]}'`;
          });
          console.log(data)
          let query = `update profile set ${data} where id=${id}`;
          db.query(query, (err, result, fields) => {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: `User ${id} Succesfully updated`
              });
            } else {
              res.status(400).send({
                success: false,
                message: "Failed update user",
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
          message: "Failed update user",
        });
      }
    });
  }
});


//delete
app.delete('/profile/:id', (req, res) => {
  const {id} = req.params
      db.query(
          `delete from profile where id=${id}`,
          (err, result, fields) => {
        if (!err) {
          res.status(200).send({
            success: true,
            message: 'Success delete profile data'
          });
        } else {
            console.log(err)
          res.status(500).send({
            success: false,
            message: 'Failed delete profile data',
            data: []
          });
        }
      });
    });


//Transfer

//create
app.post('/transfer', (req, res) => {
  const { sendBy, amountTransfer, receiver, status} = req.body
  console.log(req.body)
  if(sendBy && amountTransfer && receiver && status){

      db.query(`insert into transfer (sendBy, amountTransfer, receiver,  status) values 
      (${sendBy},${amountTransfer},${receiver}, '${status}')`,
       (err, result, fields) => {
        if (!err) {
          res.status(201).send({
              success: true,
            message: 'Success add users profile data',
            data: result,
          });
        } else {
          res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: []
          });
          db.end()          
        }
      });
  }
  else {
      res.status(400).send({
        success: false,
        message: 'Data must be filled',
        data: []
      });         
    }
});


//getAll
app.get("/transfer", (req, res) => {
    db.query(
      `select transfer.id, sendBy, concat(profile1.firstName,' ', profile1.lastName) as sender, amountTransfer, receiver, 
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
        }else{
            res.status(500).send({
                success:false,
                message: 'Failed to fetch transfer data',
                data:[]
            })
        }
      }
    );
  });




//update
app.patch("/transfer/:id", (req, res) => {
  const { id } = req.params;
  const {
    sendBy= '',
    amountTransfer = "",
    receiver = "",
    status = ""
  } = req.body;

  if (
    sendBy.trim() ||
    amountTransfer.trim() ||
    receiver.trim() ||
    status.trim() 
  ) {
    db.query(`SELECT * FROM transfer where id=${id}`, (err, result, fields) => {
      if (!err) {
        if (result.length) {
          const data = Object.entries(req.body).map((item) => {
            return parseInt(item[1]) > 0
              ? `${item[0]}=${item[1]}`
              : `${item[0]}='${item[1]}'`;
          });
          console.log(data)
          let query = `update transfer set ${data} where id=${id}`;
          db.query(query, (err, result, fields) => {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: `Transfer ${id} Succesfully updated`
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
    });
  }
});

//delete
app.delete('/transfer/:id', (req, res) => {
  const {id} = req.params
      db.query(
          `delete from transfer where id=${id}`,
          (err, result, fields) => {
        if (!err) {
          res.status(200).send({
            success: true,
            message: 'Success delete transfer data'
          });
        } else {
            console.log(err)
          res.status(500).send({
            success: false,
            message: 'Failed delete transfer data',
            data: []
          });
        }
      });
    });



app.listen(7000, () => {
    console.log('Server running on port 7000');
  });
  