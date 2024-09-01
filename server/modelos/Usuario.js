const { DataTypes } = require("sequelize");
const Socio = require("./Socio");
const Rol = require("./Rol");

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
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

Rol.hasMany(Usuario, {
  foreignKey: "id_rol",
});

Usuario.belongsTo(Rol, {
  foreignKey: "id_rol",
});

Usuario.belongsTo(Socio, {
  foreignKey: "id_socio",
});

module.exports = Usuario;
