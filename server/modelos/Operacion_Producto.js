const { DataTypes } = require("sequelize");

const db = require("../database");

const Producto = require("./Producto");
const Operacion = require("./Operacion");

const Operacion_Producto = db.define(
  "Operacion_Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_operacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "operacion_producto",
  }
);

Producto.hasMany(Operacion_Producto, {
  foreignKey: "id_producto",
});

Operacion_Producto.belongsTo(Producto, {
  foreignKey: "id_producto",
});

Operacion.hasMany(Operacion_Producto, {
  foreignKey: "id_operacion",
});

Operacion_Producto.belongsTo(Operacion, {
  foreignKey: "id_operacion",
});

module.exports = Operacion_Producto;
