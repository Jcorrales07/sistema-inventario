const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const categoria = sequelize.define("categoria", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(190),
    allowNull: false,
  },
});

module.exports = categoria;
