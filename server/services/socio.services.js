const Socio = require('../modelos/Socio');

exports.socioCreateService = async (socioData, res) => {
    try {
        const socio = await Socio.create(socioData);
        return socio;
    } catch (error) {
        res.status(400).json({ message: 'Error durante la creación de Socio' });
    }
}

exports.socioUpdateService = async (id, socioUpdate, res) => {
    try {
        const socioUpdateService = await Socio.update(socioUpdate);
        if (socioUpdateService) {
            const edited = await Socio.findOne(id);
            return edited;
        }
    } catch (error) {
        res.status(404).json({ message: 'Id invalido, no existe u ocrurrio algún error' })
    }
}


exports.socioDeleteService = async (id, res) => {
    try {
        const deleteSocio = await Socio.destroy(id);
        return deleteSocio;

    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' });
    }
};

exports.socioSelectAllService = async (res) => {
    try {
        const socios = await Socio.findAll();
        return socios;
    } catch (error) {
        res.status(204).json({ message: 'No hay registros' })
    }
}

exports.socioSelectByIdService = async (id, res) => {
    try {
        const socio = await Socio.findByPk(id);
        return socio;
    } catch (error) {
        res.status(404).json({ message: 'Id no encontrado' })
    }
}
