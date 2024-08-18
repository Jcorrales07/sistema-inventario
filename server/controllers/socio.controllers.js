const socio = require('../services/socio.services');

exports.socioCreateController = async (req, res) => {
    try {
        const nuevoSocio = await socio.socioCreateService(req.body);
        res.status(201).json({Data:nuevoSocio});
    } catch (error) {
        res.status(400).json({ message: 'Error durante la creación de Socio' });
    }
}

exports.socioUpdateController = async (req, res) => {
    try {
        const  id  = req.params.id;
        const updatedSocio = req.body;
        const socioUpdate = await socio.socioUpdateService(id,updatedSocio);

        if(!socioUpdate){
            return res.status(404).json({message: 'Error al editar el socio'});
           
        }
        return res.status(201).json({Data:socioUpdate});
    } catch (error) {
        res.status(404).json({ message: 'Id invalido, no existe u ocrurrio algún error' })
    }
}

exports.socioDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteSocio = await socio.socioDeleteService(id);
        res.status(201).json({ message: 'Socio eliminado exitosamente' });

    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' });
    }
}

exports.socioSelectAllController = async (req, res) => {
    try {
        const socios = await socio.socioSelectAllService();
        if(socios != ''){
            res.json({Data:socios});
        }else{
            res.status(204).json({message:'No hay registros'});
        }
    } catch (error) {
        res.status(204).json({ message: 'No hay registro' });
    }
}

exports.socioSelectByIdController = async (req, res) => {
    try {
        const {id} = req.params
        const socios = await socio.socioSelectByIdService(id);
        res.json({Data:socios});
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}