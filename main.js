require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { taskSchema } = require("./schemas");
const bodyParser = require("body-parser");

// Conexion con la Base de Datos
mongoose.connect(process.env.MONGO_URI, console.log("BD esta conectada..."));

mongoose.connection.on("error", (err) => {
  console.log("No se pudo conectar la BD");
  console.log(err.message);
});

//middleware
app.use(bodyParser.urlencoded({ extended: false })); //Parsear HTML req para obtener datos

//Routers

// GET all the task
app.get("/", function (req, res) {
  res.send("Aqui retornan todas las tareas creadas");
});

// POST one new task
app.post("/", function (req, res) {
  res.send(
    "Aqui se crea una nueva tarea y se envia un mensaje {Success, Task Added}"
  );
});

// inicializacion del servidor

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("El servidor esta escuchando en el puerto: ", PORT);
});
