const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: String,
});

module.exports = mongoose.model("task", taskSchema);
