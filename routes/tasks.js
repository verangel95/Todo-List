const express = require("express");
const router = express.Router();

const {
  addOneTask,
  deleteTask,
  getAllTask,
  getOneTask,
  editOneTask,
} = require("../Controllers/tasks");

router.route("/").get(getAllTask).post(addOneTask).delete(deleteTask);

router.route("/task_id").get(getOneTask).put(editOneTask);

module.exports = router;
