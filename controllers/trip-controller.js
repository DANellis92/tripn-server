var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var trip = sequelize.import("../models/user-trip-model");
const validateSession = require("../middleware/validate-session");

//Create//
router.post("/create", validateSession, (req, res) => {
  trip
    .create({
      tripName: req.body.trip.tripName,
      startDate: req.body.trip.startDate,
      endDate: req.body.trip.endDate,
      distance: req.body.trip.distance,
      userId: req.user.id
    })
    .then(
      (createSuccess = trip => {
        res.status(200).json({ message: "trip created", trip: trip });
      }),
      (createError = err => {
        res.status(500).json({ error: err });
      })
    );
});

//Get my trips//
router.get("/mytrips", validateSession, (req, res) => {
  trip
    .findAll({
      where: { userId: req.user.id }
    })
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json({ error: err }));
});
//Get One trip//
router.get("/thistrip/:id", validateSession, (req, res) => {
  trip
    .findOne({
      where: { userId: req.user.id, id: req.params.id }
    })
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json({ error: err }));
});

//Get all trips//
router.get("/alltrips", validateSession, (req, res) => {
  trip
    .findAll()
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json({ error: err }));
});

//Update//
router.put("/edit/:id", validateSession, (req, res) => {
  trip
    .update(req.body.trip, {
      where: { id: req.params.id, userId: req.user.id }
    })

    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(500).json({ error: err }));
});

//Delete Trip //
router.delete("/deletetrip/:id", validateSession, (req, res) => {
  trip.destroy({ where: { id: req.params.id, userId: req.user.id } }).then(
    (deleteSuccess = tripDeleted => {
      res.status(200).json({ message: `${tripDeleted} trip(s) deleted.` });
    }),
    (deleteFail = err => {
      res.status(500).json({ message: "Failed to delete", error: err });
    })
  );
});

//Admin Trip Delete//
router.delete("/admindeltrip/:id/:userId", validateSession, (req, res) => {
  trip
    .destroy({ where: { id: req.params.id, userId: req.params.userId } })
    .then(
      (deleteSuccess = tripDeleted => {
        res.status(200).json({ message: `${tripDeleted} trip(s) deleted.` });
      }),
      (deleteFail = err => {
        res.status(500).json({ message: "Failed to delete", error: err });
      })
    );
});

module.exports = router;
