import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
export const categoria = sequelize.define ('categoria',{
id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
nombre:{
    type: DataTypes.STRING(190),
    allowNull: false
}
})
export default categoria;
