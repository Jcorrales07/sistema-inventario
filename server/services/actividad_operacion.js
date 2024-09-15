const actividad_operacion = require("../modelos/actividad_operacion");
const Socio = require("../modelos/Socio");

exports.actividadCreateService = async (actividadData, res) => {
  try {
    const actividad = await actividad_operacion.create(actividadData);
    return actividad;
  } catch (error) {
    console.log(error);
    return new Error(error.message);
  }
};

exports.actividadUpdateService = async (id, actividadnUpdate, res) => {
  try {
    const actividadUpdateService = await actividad_operacion.update(
      actividadnUpdate,
      { where: { id } }
    );
    if (!actividadUpdateService) {
      return null;
    }
    return await actividad_operacion.findByPk(id);
  } catch (error) {
    res.status(500).json({
      message: "Error durante la actualización de la actividad",
      error: error.message,
    });
  }
};

exports.actividadDeleteService = async (id, res) => {
  try {
    const deleteActividad = await actividad_operacion.destroy({
      where: { id },
    });

    if (deleteAlmacen == null) {
      res.status(404).json({ message: "Id no encontrado" });
    }
    return deleteAlmacen;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.actividadSelectAllService = async (res) => {
  try {
    const actividades = await actividad_operacion.findAll();
    return actividades;
  } catch (error) {
    res.status(204).json({ message: "No hay actividades" });
  }
};

exports.actividadSelectByIdService = async (id, res) => {
  try {
    const actividad = await actividad_operacion.findByPk(id);
    if (actividad == null) {
      res.status(404).json({ message: "Id no encontrado" });
    }
    return actividad;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.actividadSelectByOperacionService = async (id_operacion, res) => {
  try {
    const actividades = await actividad_operacion.findAll({
      where: { id_operacion },
      include: [
        {
          model: Socio,
          attributes: ["nombre", "email", "telefono"],
        },
      ],
      order: [["fecha", "ASC"]],
    });
    return actividades;
  } catch (error) {
    console.log(error);
    res.status(204).json({ message: "No hay actividades" });
  }
};
