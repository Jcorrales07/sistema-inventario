const { DataTypes } = require("sequelize");

const Usuario = require("./Usuario");
const Rol = require("./Rol");

const db = require("../database");

const Usuario_Rol = db.define(
  "Usuario_Rol",
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
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "usuario_rol",
  }
);

Usuario.hasMany(Usuario_Rol, {
  foreignKey: "id_usuario",
});

Usuario_Rol.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});

Rol.hasMany(Usuario_Rol, {
  foreignKey: "id_rol",
});

Usuario_Rol.belongsTo(Rol, {
  foreignKey: "id_rol",
});

module.exports = Usuario_Rol;
