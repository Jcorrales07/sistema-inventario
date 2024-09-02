const Producto = require('../modelos/Producto')

exports.productoCreateService = async (productoData, res) => {
    try {
        const producto = await Producto.create(productoData);
        return producto;
    } catch (error) {
        return res.status(400).json({ message: 'Error durante la creación del producto', error: error.message });
    }
}

exports.productoUpdateService = async (id, productoUpdate, res) => {
    try {
        if (productoUpdate.codigo_barra) {
            const existingProduct = await Producto.findOne({
                where: { codigo_barra: productoUpdate.codigo_barra, id: { [Op.ne]: id } }
            });
            if (existingProduct) {
                return res.status(400).json({ message: 'El código de barra ya existe en otro producto.' });
            }
        }

        const productoUpdateService = await Producto.update(productoUpdate, { where: { id } });
        if (!productoUpdateService) {
            return null;
        }
        return await Producto.findByPk(id);
    } catch (error) {
        res.status(500).json({ message: 'Error durante la actualización del producto', error: error.message });
    }
}


exports.productoDeleteService = async (id, res) => {
    try {
        const deleteProducto = await Producto.destroy({ where: { id } })
        return deleteProducto
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}

exports.productoSelectAllService = async (res) => {
    try {
        const productos = await Producto.findAll()
        return productos
    } catch (error) {
        res.status(204).json({ message: 'No hay productos' })
    }
}

exports.productosSelectByIdService = async (id, res) => {
    try {
        const producto = await Producto.findByPk(id)
        return producto
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
