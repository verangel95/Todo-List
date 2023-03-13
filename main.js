require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { Task } = require("./schemas");
const {
  agregar,
  obtenerVarias,
  obtenerUna,
  editaruna,
  borrarruna,
} = require("./crud");
const bodyParser = require("body-parser");

// Conexion con la Base de Datos
mongoose.connect(process.env.MONGO_URI, console.log("BD esta conectada..."));

mongoose.connection.on("error", (err) => {
  console.log("No se pudo conectar la BD");
  console.log(err.message);
});

//middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Parsear HTML req para obtener datos
app.use(bodyParser.json()); // Parsear JSON
//routers

app
  .route("/")

  // GET all the task
  .get(async function (req, res) {
    const allTasks = await obtenerVarias();
    res.json(allTasks);
  })

  // POST one new task
  .post(async function (req, res) {
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
  })

  // DELETE one task
  .delete(async function (req, res) {
    const erased = req.body._id;
    const borrar = await borrarruna(erased);
    res.json("Task eliminated");
  });

app
  .route("/task_id")

  // GET one task
  .get(async function (req, res) {
    const onetask = req.query._id;
    const consulta = await obtenerUna(onetask);
    res.json(consulta);
  })

  // edit one task
  .put(async function (req, res) {
    const qid = req.query._id;
    const update = req.body;
    const consulta = await editaruna(qid, update);
    res.json(consulta);
  });

// inicializacion del servidor

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("El servidor esta escuchando en el puerto: ", PORT);
});
