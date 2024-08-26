import app from './app.js'
import { sequelize } from '../database/database.js'
import '../modelos/categoria_modelo.js'
import '../modelos/producto_categoria_modelo.js'

async function main(){
    try{
        await sequelize.sync({force: false})
    console.log ("Conexion establecida correctamente");
    app.listen (3000)
    console.log ("Server is listening on port 3000")
    }
    catch(error){
        console.error ("No se pudo conectar a la base de datos!")
    }
}
main();