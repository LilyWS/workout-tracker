const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});