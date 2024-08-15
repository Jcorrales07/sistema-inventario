const { DataTypes } = require("sequelize");
const Socio = require("./Socio");

const db = require("../database");

const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_socio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

Socio.hasOne(Usuario, {
  foreignKey: "id_socio",
});

Usuario.belongsTo(Socio, {
  foreignKey: "id_socio",
});

module.exports = Usuario;
