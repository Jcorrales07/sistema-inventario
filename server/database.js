const {Sequelize} = require('sequelize');

const db = new Sequelize(
    "inventario",
    "postgres",
    "elote200",
    {
        host: "44.204.47.57",
        port: "5432",
        dialect: "postgres",
        logging: console.log,
    }
)

module.exports = db;