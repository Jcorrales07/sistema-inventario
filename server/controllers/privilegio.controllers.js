const privilegio = require('../services/privilegio.services');

exports.privilegioCreateController = async (req, res) => {
    try {
        const nuevoprivilegio = await privilegio.privilegioCreateService(req.body);
        res.status(201).json({Data:nuevoprivilegio});
    } catch (error) {
        res.status(400).json({ message: 'Error durante la creación de privilegio' });
    }
}

exports.privilegioUpdateController = async (req, res) => {
    try {
        const  id  = req.params.id;
        const updatedprivilegio = req.body;
        const privilegioUpdate = await privilegio.privilegioUpdateService(id,updatedprivilegio);

        if(!privilegioUpdate){
            return res.status(404).json({message: 'Error al editar el privilegio'});
           
        }
        return res.status(201).json({Data:privilegioUpdate});
    } catch (error) {
        res.status(404).json({ message: 'Id invalido, no existe u ocrurrio algún error' })
    }
}

exports.privilegioDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteprivilegio = await privilegio.privilegioDeleteService(id);
        res.status(201).json({ message: 'privilegio eliminado exitosamente', Data: deleteprivilegio });

    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' });
    }
}

exports.privilegioSelectAllController = async (req, res) => {
    try {
        const privilegios = await privilegio.privilegioSelectAllService();
        if(privilegios != ''){
            res.json({Data:privilegios});
        }else{
            res.status(204).json({message:'No hay registros'});
        }
    } catch (error) {
        res.status(204).json({ message: 'No hay registro' });
    }
}

exports.privilegioSelectByIdController = async (req, res) => {
    try {
        const {id} = req.params
        const privilegios = await privilegio.privilegioSelectByIdService(id);
        res.json({Data:privilegios});
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}