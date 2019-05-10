var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var user = sequelize.import("../models/user-model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

//Sign up//
router.post("/signup", (req, res) => {
  user
    .create({
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 10),
      fullName: req.body.user.fullName,
      email: req.body.user.email,
      isAdmin: false
    })
    .then(
      (createSuccess = user => {
        let token = jwt.sign(
          { id: user.id, user: user.username },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        res
          .status(200)
          .json({ message: "user created", user: user, sessionToken: token });
      }),
      (createdError = err => {
        res.send(500, err.message);
      })
    );
});

//Sign In//
router.post("/login", (req, res) => {
  user.findOne({ where: { username: req.body.username } }).then(
    user => {
      console.log(user);
      if (user) {
        console.log("step 2");
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign(
              { id: user.id, username: user.username },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 }
            );

            res.status(200).json({
              user: user,
              message: "logged in",
              sessionToken: token
            });
          } else {
            res.status(502).send("Auth failed");
          }
        });
      }
    },
    err => res.status(502).json("Username unmatched")
  );
});

//Admin User Delete
router.delete("/adminuserdelete/:id", validateSession, (req, res) => {
  user.destroy({ where: { id: req.params.id } }).then(
    (deleteSuccess = userDeleted => {
      res.status(200).json({ message: `${userDeleted} user(s) deleted` });
    }),
    (deleteFail = err => {
      res.status(500).json({ message: "Failed to delete", error: err });
    })
  );
});

//Get all Users
router.get("/allusers", validateSession, (req, res) => {
  user
    .findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
