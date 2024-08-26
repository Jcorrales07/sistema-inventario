const { DataTypes } = require("sequelize");

const Rol = require("./Rol");
const Privilegio = require("./Privilegio");

const db = require("../database");

const Rol_Privilegio = db.define(
  "Rol_Privilegio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_privilegio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "rol_privilegio",
  }
);

Rol.hasMany(Rol_Privilegio, {
  foreignKey: "id_rol",
});

Rol_Privilegio.belongsTo(Rol, {
  foreignKey: "id_rol",
});

Privilegio.hasMany(Rol_Privilegio, {
  foreignKey: "id_privilegio",
});

Rol_Privilegio.belongsTo(Privilegio, {
  foreignKey: "id_privilegio",
});

module.exports = Rol_Privilegio;
