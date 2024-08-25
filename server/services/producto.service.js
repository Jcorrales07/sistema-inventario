const Producto = require('../modelos/Producto');

exports.productoCreateService =async(productoData,res) =>{
    try {
        const producto = Producto.create(productoData);
        return producto;
    } catch (error) {
        res.status(400).json({ message: 'Error durante la creación de Socio' });
    }
}

exports.productoUpdateService = async (id, productoUpdate, res) => {
    try {
        const productoUpdateService = await Producto.update(productoUpdate,{where:{id}});
        if(!productoUpdateService){
            return null
        }
            return await Producto.findByPk(id);
    } catch (error) {
        res.status(404).json({ message: 'Id invalido, no existe u ocrurrio algún error' })
    }
}

exports.productoDeleteService = async (id, res) => {
    try {
        const deleteProducto = await Producto.destroy({where:{id}});
        return deleteProducto;
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' });
    }
};

exports.productoSelectAllService = async (res) => {
    try {
        const productos = await Producto.findAll();
        return productos;
    } catch (error) {
        res.status(204).json({ message: 'No hay productos' })
    }
}

exports.productosSelectByIdService = async (id, res) => {
    try {
        const producto = await Producto.findByPk(id);
        return producto;
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
