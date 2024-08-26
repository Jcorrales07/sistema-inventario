const {DataTypes} = require("sequelize");

const db = require("../database");

const Rol = db.define(
    "Rol",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre_rol: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: true,
        tableName: "rol",
    }
);

module.exports = Rol;