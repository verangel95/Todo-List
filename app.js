require("dotenv").config();
const { databaseconnect } = require("./DB/connect");
const express = require("express");
const app = express();
const {
  agregar,
  obtenerVarias,
  obtenerUna,
  editaruna,
  borrarruna,
} = require("./Controllers/tasks");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");

// Conexion con la Base de Datos

databaseconnect();

//middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Parsear HTML req para obtener datos
app.use(bodyParser.json()); // Parsear JSON

//routers

app.use("/api/v1/tasks", tasks);

// inicializacion del servidor

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("El servidor esta escuchando en el puerto: ", PORT);
});
