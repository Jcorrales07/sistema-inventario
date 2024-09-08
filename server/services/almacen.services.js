const Almacen = require('../modelos/Almacenes')

exports.almacenCreateService = async (almacenData, res) => {
    try {
        const almacen = await Almacen.create(almacenData);
        return almacen;
    } catch (error) {
        return res.status(400).json({ message: 'Error durante la creación del almacen', error: error.message });
    }
}

exports.almacenUpdateService = async (id, almacenUpdate, res) => {
    try {
        const almacenUpdateService = await Almacen.update(almacenUpdate, { where: { id } });
        if (!almacenUpdateService) {
            return null;
        }
        return await Almacen.findByPk(id);
    } catch (error) {
        res.status(500).json({ message: 'Error durante la actualización del almacen', error: error.message });
    }
}


exports.almacenDeleteService = async (id, res) => {
    try {
        const deleteAlmacen = await Almacen.destroy({ where: { id } })
        
        if(deleteAlmacen == null){
            res.status(404).json({ message: 'Id no encontrado' })
        }
        return deleteAlmacen
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}

exports.almacenSelectAllService = async (res) => {
    try {
        const almacenes = await Almacen.findAll()
        return almacenes
    } catch (error) {
        res.status(204).json({ message: 'No hay almacenes' })
    }
}

exports.almacenesSelectByIdService = async (id, res) => {
    try {
        const almacenes = await Almacen.findByPk(id)
        if(almacenes== null){
        res.status(404).json({ message: 'Id no encontrado' })
        }
        return almacenes
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
