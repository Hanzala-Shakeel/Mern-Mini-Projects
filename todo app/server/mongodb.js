const mongoose = require("mongoose");
require('dotenv').config();  // This loads the variables from .env file

// mongoose.connect("mongodb://127.0.0.1:27017/mytodo");

mongoose.connect(process.env.MONGODB_URI);

let tasksSchema = mongoose.Schema({
  task: String,
  isDone:Boolean
})

module.exports = mongoose.model("tasks", tasksSchema);
