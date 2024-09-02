const producto = require('../services/producto.service')

exports.productoCreateController = async (req, res) => {
    try {
        const nuevoProducto = await producto.productoCreateService(req.body)
        res.status(201).json({ Data: nuevoProducto })
    } catch (error) {
        res.status(400).json({
            message: 'Error durante la creación de Producto',
        })
    }
}

exports.productoUpdateController = async (req, res) => {
    try {
        const id = req.params.id
        const updatedProducto = req.body
        console.log('id', id, 'updatedProducto', updatedProducto);
        const productoUpdate = await producto.productoUpdateService(
            id,
            updatedProducto
        )

        if (!productoUpdate) {
            return res
                .status(404)
                .json({ message: 'Error al editar el producto' })
        }
        return res.status(201).json({ Data: productoUpdate })
    } catch (error) {
        res.status(404).json({
            message: 'Id invalido, no existe u ocrurrio algún error',
        })
    }
}

exports.productoDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const deleteProducto = await producto.productoDeleteService(id)
        res.status(201).json({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}

exports.productoSelectAllController = async (req, res) => {
    try {
        const productos = await producto.productoSelectAllService()
        if (productos != '') {
            res.json({ Data: productos })
        } else {
            res.status(204).json({ message: 'No hay productos' })
        }
    } catch (error) {
        res.status(204).json({ message: 'No hay productos' })
    }
}

exports.productoSelectByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const productos = await producto.productosSelectByIdService(id)
        res.json({ Data: productos })
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
