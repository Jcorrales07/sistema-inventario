import  categoria  from "../modelos/categoria_modelo.js";

export const getCategoria = async (req,res) =>{
    try{
    const categorias = await categoria.findAll()
    res.json(categorias)
    }
    catch(error){
        res.status(400).json({ message: 'Error al obtener categoria', error: error.message });
    }
}


export const getCategoriaUnica = async (req, res) => {
    try {
        const { nombre } = req.params; 
        const categoriaUnica = await categoria.findOne({
            where: { nombre } 
        });

        if (categoriaUnica) {
            res.json(categoriaUnica);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' }); 
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener la categoría', error: error.message });
    }
};

// export const createCategoria = (req,res) =>{
// res.send('creando categorias')

// }

// import categoria from '../services/categoria_services.js'

// export const  createCategoria = async (req, res) => {
//     try {
//         const nuevacategoria = await categoria.createCategoria(req.body);
//         res.status(201).json({Data:nuevacategoria});
//     } catch (error) {
//         res.status(400).json({ message: 'Error durante la creación de Producto' });
//     }
// }

export const createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nueva_categoria = await categoria.create({
            nombre
        });
        res.send('Categoría creada exitosamente');
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
    }
}; // Ensure this closing brace and semicolon exist


export const updateCategoria = async (req, res) => {
    try {
        const { nombre } = req.params; 
        const { nuevoNombre } = req.body; 

        // Find the category by its current name
        const categoriaToUpdate = await categoria.findOne({
            where: { nombre }
        });

        if (!categoriaToUpdate) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Update the category's name
        categoriaToUpdate.nombre = nuevoNombre;
        await categoriaToUpdate.save(); 

        res.json({ message: 'Categoría actualizada exitosamente', categoria: categoriaToUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
};



export const deleteCategoria = async (req, res) =>{
  try{
        const {nombre} = req.params// osea no lo vamos a borrar por el primary key que, en este caso es no natural
        await categoria.destroy ({
            where:{
                nombre,
            },
        });
        res.sendStatus(204)
    }// fin del try
    catch(error){
        return res.status(500).json({ message: 'Error al borrar la categoría', error: error.message });
    }
   
}// fin de la clase


export const deleteALLCategoria = async (req, res) =>{
    try{
          await categoria.destroy ({
              where:{   },
          });
          res.sendStatus(204)
      }// fin del try
      catch(error){
          return res.status(500).json({ message: 'Error al borrar la categoría', error: error.message });
      }
     
  }// fin de la clase