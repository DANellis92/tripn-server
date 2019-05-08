var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var trip = sequelize.import('../models/expense-model');
const validateSession = require('../middleware/validate-session');

//Create Expense//
router.post('/createexpense', validateSession, (req, res) => {
    expense.create({
        tripName: req.body.expenses.tripName,
        date: req.body.expenses.date,
        distance: req.body.expenses.distance
    })
    .then(

        createSuccess = expense => {
            res.status(200).json({message: 'expense created', expense: expense})
        },

    createError = err => {
        res.status(500).json({ error : err});
    })
    });

//Update Expense//
router.put('/edit/:id', validateSession, (req, res) => {
    expense.update(req.body.expense, {
        where : { id: req.params.id, owner : req.user.id}}) ///params?

    .then(trip => res.status(200).json(trip))  ///trip??
    .catch(err => res.status(500).json({ error : err}))
});


//Get my Expenses//
router.get('/tripexpenses', validateSession, (req, res) => {
    expense.findAll({
        where:
        { owner: req.user.id, }                    ///owner??
    })
    .then(expenses => res.status(200).json(expenses))
    .catch(err => res.status(500).json({ error : err}))
});

//Delete Expense
router.delete('/delete/:id', validateSession, (req,res) => {
    expense.destroy({ where: { id:req.params.id, owner : req.user.id }})  ///params
    .then(
        deleteSuccess = expenseChanged => {
            res.status(200).json({ message : `${expenseChanged} record(s) changed.`});
        },

        deleteFail = err => {
            res.status(500).json({ message : 'Failed to delete', error : err })
        });
    })   




module.exports = router;