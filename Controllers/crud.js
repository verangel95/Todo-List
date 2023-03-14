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

module.exports = { agregar, obtenerVarias, obtenerUna, editaruna, borrarruna };
