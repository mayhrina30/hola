const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const app = express();

// Configura la base de datos
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "clientes",
};

// Middleware para conectar la base de datos
app.use(myconn(mysql, dbOptions, "single"));

app.set("port", process.env.PORT || 9000);

app.get("/", (req, res) => {
  res.send("Servidor corriendo en el puerto " + app.get("port"));
});

app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto " + app.get("port"));
});
