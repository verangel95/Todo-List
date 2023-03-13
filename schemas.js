const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: String,
  completed: Boolean,
});

module.exports = mongoose.model("task", taskSchema);
