const { DataTypes } = require("sequelize");

const db = require("../database");

const Socio = db.define(
  "Socio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },

    tipo: {
      type: DataTypes.ENUM("individuo", "empresa"),
      allowNull: false,
    },

    nombre_empresa: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    pais: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    departamento: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    ciudad: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    direccion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    rtn: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true,
    },

    telefono: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true,
    },

    puesto_trabajo: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    sitio_web: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    titulo: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    nota: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "socio",
  }
);

module.exports = Socio;
