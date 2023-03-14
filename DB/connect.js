const mongoose = require("mongoose");

function databaseconnect() {
  mongoose.connect(process.env.MONGO_URI, console.log("BD esta conectada..."));

  mongoose.connection.on("error", (err) => {
    console.log("No se pudo conectar la BD");
    console.log(err.message);
  });
}

module.exports = { databaseconnect };
