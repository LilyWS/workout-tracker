const router = require('express').Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

router.put('/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {$push : {exercises: req.body}})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/workouts', ({ body }, res) => {
  db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/workouts', (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/workouts/range', (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;