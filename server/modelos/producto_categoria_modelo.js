import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import {categoria} from './categoria_modelo.js'
import {Producto} from './Producto_diego.js'

 export const producto_categoria = sequelize.define ('producto_categoria',{
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id',
    },
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: categoria,
      key: 'id',
    },
  },

})
// producto_categoria.hasMany(categoria, {
//     foreignKey: 'id',
//     sourceId: 'id_categoria',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
  
//   categoria.belongsTo(producto_categoria, {
//     foreignKey: 'id',
//     targetId : 'id_categoria',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
  
//   producto_categoria.hasMany(Producto, {
//     foreignKey: 'id',
//     sourceId: 'id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
  
//   Producto.belongsTo(producto_categoria, {
//     foreignKey: 'id',
//      targetId : 'id_producto',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
  
  
  