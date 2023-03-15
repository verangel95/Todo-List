const mongoose = require("mongoose");
const { Task } = require("../Models/schemas");

// Definicion de funciones CRUD

async function agregar(newtask, status) {
  try {
    const mytask = new Task({
      task: newtask,
      completed: status,
    });
    await mytask.save();
    return "{Success, Task Added}";
  } catch (error) {
    console.log("No se ha podido crear registro. ", error.message);
  }
}

async function obtenerVarias() {
  try {
    const mytasks = await Task.find();
    return mytasks;
  } catch (e) {
    console.log("Falla al obtener las tareas creadas, ", e.message);
  }
}

async function obtenerUna(id) {
  try {
    const mytask = await Task.findOne({ _id: id });
    return mytask;
  } catch (e) {
    console.log("el parametro especificado no existe, intente de nuevo");
  }
}

async function editaruna(id, update) {
  try {
    const mytask = await Task.findByIdAndUpdate(
      { _id: id },
      { task: update.task, completed: update.completed },
      { new: true }
    );
    return "{edit succesfull}";
  } catch (e) {
    return "el parametro especificado no existe, intente de nuevo";
  }
}

async function borrarruna(id) {
  try {
    const mytask = await Task.findByIdAndDelete({ _id: id });
    return "{Task eliminated}";
  } catch (e) {
    console.log(
      "el parametro especificado no existe, intente de nuevo",
      e.message
    );
  }
}

// Definicion de controllers

const AddTask = async function (req, res) {
  const newtask = req.body;
  if (
    (typeof newtask.task === "string") &
    (typeof newtask.completed === "boolean")
  ) {
    const insercion = await agregar(newtask.task, newtask.completed);
    res.json(insercion);
  } else {
    res.json(
      "Parametros introducidos incorrectos, por favor vuelva a intentar"
    );
  }
};

// controllers

const addOneTask = async function (req, res) {
  const newtask = req.body;
  if (
    (typeof newtask.task === "string") &
    (typeof newtask.completed === "boolean")
  ) {
    const insercion = await agregar(newtask.task, newtask.completed);
    res.json(insercion);
  } else {
    res.json(
      "Parametros introducidos incorrectos, por favor vuelva a intentar"
    );
  }
};

const getAllTask = async function (req, res) {
  const allTasks = await obtenerVarias();
  res.json(allTasks);
};

const deleteTask = async function (req, res) {
  const erased = req.body._id;
  const borrar = await borrarruna(erased);
  res.json("Task eliminated");
};

const getOneTask = async function (req, res) {
  const onetask = req.query._id;
  const consulta = await obtenerUna(onetask);
  res.json(consulta);
};

const editOneTask = async function (req, res) {
  const qid = req.query._id;
  const update = req.body;
  const consulta = await editaruna(qid, update);
  res.json(consulta);
};

module.exports = {
  addOneTask,
  deleteTask,
  getAllTask,
  getOneTask,
  editOneTask,
};
