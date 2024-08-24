const rol = require('../services/rol.services');

exports.rolCreateController = async (req, res) => {
    try {
        const nuevorol = await rol.rolCreateService(req.body);
        res.status(201).json({Data:nuevorol});
    } catch (error) {
        res.status(400).json({ message: 'Error durante la creación de rol' });
    }
}

exports.rolUpdateController = async (req, res) => {
    try {
        const  id  = req.params.id;
        const updatedRol = req.body;
        const rolUpdate = await rol.rolUpdateService(id,updatedRol);

        if(!rolUpdate){
            return res.status(404).json({message: 'Error al editar el rol'});
           
        }
        return res.status(201).json({Data:rolUpdate});
    } catch (error) {
        res.status(404).json({ message: 'Id invalido, no existe u ocrurrio algún error' })
    }
}

exports.rolDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleterol = await rol.rolDeleteService(id);
        res.status(201).json({ message: 'rol eliminado exitosamente', Data: deleterol });

    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' });
    }
}

exports.rolSelectAllController = async (req, res) => {
    try {
        const rols = await rol.rolSelectAllService();
        if(rols != ''){
            res.json({Data:rols});
        }else{
            res.status(204).json({message:'No hay registros'});
        }
    } catch (error) {
        res.status(204).json({ message: 'No hay registro' });
    }
}

exports.rolSelectByIdController = async (req, res) => {
    try {
        const {id} = req.params
        const rols = await rol.rolSelectByIdService(id);
        res.json({Data:rols});
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}