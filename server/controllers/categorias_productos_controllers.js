const  producto_categoria = require("../modelos/producto_categoria_modelo.cjs");

exports.getProducto_categoria = async (req,res) =>{
    try{
    const producto_categorias = await producto_categoria.findAll()
    res.json(producto_categorias)
    }
    catch(error){
        res.status(400).json({ message: 'Error al obtener producto categoria', error: error.message });
    }
}

exports.getProducto_CategoriaUnica = async (req, res) => {
    try {
        const { categoria } = req.params; 
        const producto_categoriaUnica = await  producto_categoria.findOne({
            where: { categoria } 
        });

        if ( producto_categoriaUnica) {
            res.json( producto_categoriaUnica); 
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' }); 
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el producto categoría', error: error.message });
    }
};


exports.deleteProducto_Categoria = async (req, res) =>{
    try{
          const {categoria} = req.params// osea no lo vamos a borrar por el primary key que, en este caso es no natural
          await categoria.destroy ({
              where:{
                  categoria,
              },
          });
          res.sendStatus(204)
      }// fin del try
      catch(error){
          return res.status(500).json({ message: 'Error al borrar el producto categoría', error: error.message });
      }
     
  }// fin de la clase
  




exports.deleteALLProducto_Categoria = async (req, res) =>{
    try{
          await producto_categoria.destroy ({
              where:{   },
          });
          res.sendStatus(204)
      }// fin del try
      catch(error){
          return res.status(500).json({ message: 'Error al borrar el producto_categoría', error: error.message });
      }
     
  }// fin de la clase