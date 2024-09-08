const almacen = require('../services/almacen.services')

exports.alamcenCreateController = async (req, res) => {
    try {
        const nuevoAlmacen = await almacen.almacenCreateService(req.body)
        res.status(201).json({ Data: nuevoAlmacen })
    } catch (error) {
        res.status(400).json({
            message: 'Parametros incompletos'
        })
    }
}

exports.almacenUpdateController = async (req, res) => {
    try {
        const id = req.params.id
        const updatedAlmacen = req.body
        const almacenUpdate = await almacen.almacenUpdateService(
            id,
            updatedAlmacen
        )

        if (!almacenUpdate) {
            return res
                .status(404)
                .json({ message: 'El id es invalido' })
        }
        return res.status(201).json({ Data:almacenUpdate })
    } catch (error) {
        res.status(404).json({
            message: 'Id invalido, no existe u ocrurrio algún error',
        })
    }
}

exports.almacenDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        const deleteAlmacen = await almacen.almacenDeleteService(id);
        
        if(deleteAlmacen== null){
            res.status(404).json({ message: 'Id no encontrado' })
        }
        res.status(201).json({ message: 'Almacen eliminado exitosamente' })
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}

exports.almacenSelectAllController = async (req, res) => {
    try {
        const almacenes = await almacen.almacenSelectAllService();
        console.log(almacenes);
        if (almacenes.length>0) {
            res.json({ Data: almacenes })
        } else {
            res.status(204).json({ message: 'No hay almacenes' })
        }
    } catch (error) {
        res.status(204).json({ message: 'Ocurrio un error' })
    }
}

exports.almacenSelectByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const almacenes = await almacen.almacenesSelectByIdService(id);
        res.json({ Data: almacenes });
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
