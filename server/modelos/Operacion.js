const { DataTypes } = require("sequelize");

const db = require("../database");

const Socio = require("./Socio");

const Operacion = db.define(
  "Operacion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_responsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    fecha_programada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_efectiva: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    documento_origen: {
      type: DataTypes.STRING(256),
    },
    nota: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "operacion",
  }
);

Socio.hasMany(Operacion, { foreignKey: "id_responsable" });

Operacion.belongsTo(Socio, { foreignKey: "id_responsable" });

module.exports = Operacion;
