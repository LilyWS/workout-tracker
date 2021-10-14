const router = require('express').Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

router.put('/workouts/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id)
  db.Workout.findByIdAndUpdate(req.params.id, {$push : {exercises: req.body}}, {new: true})
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    })
});

router.post('/workouts', ({ body }, res) => {
  console.log("nice!")
  db.Workout.create({})
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/workouts', (req, res) => {
  db.Workout.aggregate([
    {
        $addFields: {
            totalDuration:
                { $sum: '$exercises.duration' }
        },
    }
  ])
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
        $addFields: {
            totalDuration:
                { $sum: '$exercises.duration' }
        },
    }
  ])
    .then(workouts => {
      res.json(workouts.slice(-7));
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;