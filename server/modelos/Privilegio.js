const {DataTypes} = require('sequelize');

const db = require('../database');

const Privilegio = db.define(
    'Privilegio',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_privilegio: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: true,
        tableName: 'privilegio'
    }
);

module.exports = Privilegio;