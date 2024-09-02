const { DataTypes } = require('sequelize')

const db = require('../database')

const Producto = db.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(191),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('servicio', 'consumible'),
    },
    codigo_barra: {
        type: DataTypes.STRING(25),
    },
    precio_venta: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    coste: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    puede_vender: {
        type: DataTypes.BOOLEAN,    
    },
    puede_comprar: {
        type: DataTypes.BOOLEAN,
    },
    notas_internas: {
        type: DataTypes.TEXT,
    },
    imagen_url: {
        type: DataTypes.TEXT,
    },
    volumen: {
        type: DataTypes.DOUBLE,
    },
    plazo_entrega_cliente: {
        type: DataTypes.INTEGER,
    },
    descripcion_recepcion: {
        type: DataTypes.TEXT,
    },
    descripcion_entrega: {
        type: DataTypes.TEXT,
    },
},
{
    tableName:"producto"
}
)


module.exports = Producto
