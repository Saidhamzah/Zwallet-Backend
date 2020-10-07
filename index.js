const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors")

const app = express();
const db = require("./src/helper/db");
// const e = require("express");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

const userRoute = require("./src/route/user");
const topupRoute = require("./src/route/topup");

app.use("/user", userRoute);
app.use("/topup", topupRoute);


app.listen(process.env.PORT, () => {
  console.log("Server running on port 7000");
});
