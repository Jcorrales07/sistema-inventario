const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const Operacion = require("./Operacion.js");
const Socio = require("./Socio.js");
const actividad_operacion = sequelize.define("actividad_operacion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_operacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_socio: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  texto:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  fecha:{
    type:DataTypes.TIME,
    allowNull:false
  },
  
},
{
    timestamps: true,
    tableName: "actividad_operacion",
  });
  actividad_operacion.belongsTo(Operacion, {
    foreignKey: "id_operacion",
  });
  Operacion.hasMany(actividad_operacion,{foreignKey:"id_operacion"});
  actividad_operacion.belongsTo(Socio, {
    foreignKey: "id_socio",
  });
  Socio.hasMany(actividad_operacion,{foreignKey:'id_socio'})
module.exports = actividad_operacion;
