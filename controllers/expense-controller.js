var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var expenses = sequelize.import("../models/expense-model");
const validateSession = require("../middleware/validate-session");

//Create Expense//
router.post("/createExpense/:tripId", validateSession, (req, res) => {
  expenses
    .create({
      date: req.body.expenses.date,
      description: req.body.expenses.description,
      amount: req.body.expenses.amount,
      tripId: req.params.id,
      userId: req.user.id
    })
    .then(
      (createSuccess = expenses => {
        res
          .status(200)
          .json({ message: "expense created", expenses: expenses });
      }),
      (createError = err => {
        res.status(500).json({ error: err });
      })
    );
});

//Update Expense//
router.put("/edit/:id", validateSession, (req, res) => {
  expenses
    .update(req.body.expenses, {
      where: { id: req.params.id, tripId: req.trip.id }
    }) ///params?

    .then(trip => res.status(200).json(trip)) ///trip??
    .catch(err => res.status(500).json({ error: err }));
});

//Get my Expenses//
router.get("/tripexpenses", validateSession, (req, res) => {
  expenses
    .findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]]
    })
    .then(expenses => res.status(200).json(expenses))
    .catch(err => res.status(500).json({ error: err }));
});

//Delete Expense
router.delete("/delete/:id", validateSession, (req, res) => {
  expenses
    .destroy({ where: { id: req.params.id, tripId: req.trip.id } }) ///params
    .then(
      (deleteSuccess = expenseChanged => {
        res
          .status(200)
          .json({ message: `${expenseChanged} record(s) changed.` });
      }),
      (deleteFail = err => {
        res.status(500).json({ message: "Failed to delete", error: err });
      })
    );
});

module.exports = router;
