const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./database");

const Socio = require("./modelos/Socio");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const initApp = async () => {
  console.log("Conectando a la base de datos...");

  try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    console.error("Parent error:", error.parent);
    console.error("Detalles error:", error);
  }
};


db.sync({ force: true, alter: false })
  .then(() => {
    console.log("Database synced without altering existing schema!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error.message);
    console.error("Parent error:", error.parent);
    console.error("Error details:", error);
  });

app.get("/", (req, res) => {
  res.send("¡Hola mundo!");
});


initApp();
