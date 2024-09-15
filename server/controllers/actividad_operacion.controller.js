const actividad = require("../services/actividad_operacion");

exports.actividadCreateController = async (req, res) => {
  try {
    
    const nuevaActividad = await actividad.actividadCreateService(req.body);
    res.status(201).json({ Data: nuevaActividad });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Parametros incompletos",
    });
  }
};

exports.actividadUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedActividad = req.body;
    const actividadUpdate = await actividad.actividadUpdateService(
      id,
      updatedActividad
    );

    if (!actividadUpdate) {
      return res.status(404).json({ message: "El id es invalido" });
    }
    return res.status(201).json({ Data: actividadUpdate });
  } catch (error) {
    res.status(404).json({
      message: "Id invalido, no existe u ocrurrio algún error",
    });
  }
};

exports.actividadDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteActividad = await actividad.actividadDeleteService(id);

    if (deleteActividad == null) {
      res.status(404).json({ message: "Id no encontrado" });
    }
    res.status(201).json({ message: "Actividad eliminado exitosamente" });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.actividadSelectAllController = async (req, res) => {
  try {
    const actividades = await actividad.actividadSelectAllService();
    console.log(actividades);
    if (almacenes.length > 0) {
      res.json({ Data: actividades });
    } else {
      res.status(204).json({ message: "No hay actividades" });
    }
  } catch (error) {
    res.status(204).json({ message: "Ocurrio un error" });
  }
};

exports.actividadSelectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const actividades = await actividad.actividadSelectByIdService(id);
    res.json({ Data: actividades });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.actividadSelectByOperacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const actividades = await actividad.actividadSelectByOperacionService(id);
    res.json(actividades);
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
