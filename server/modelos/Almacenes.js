const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const almacenes = sequelize.define("almacenes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  nombre_corto: {
    type: DataTypes.STRING(6),
    allowNull:false
  },
  direccion:{
    type: DataTypes.TEXT,
    allowNull:false
  }
});

module.exports = almacenes;
