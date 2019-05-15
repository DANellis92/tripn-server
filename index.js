require("dotenv").config();
var express = require("express");
var app = express();
var expenses = require("./controllers/expense-controller");
var user = require("./controllers/user-controller");
var trips = require("./controllers/trip-controller");
var sequelize = require("./db");
var bodyParser = require("body-parser");

sequelize.sync();

app.use(bodyParser.json());

app.use(require("./middleware/headers"));

app.use("/user", user);

app.use("/trips", trips);

app.use("/expenses", expenses);

app.listen(process.env.PORT, () => console.log("Running"));
