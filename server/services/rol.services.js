const Rol = require("../modelos/Rol");
const Privilegio = require("../modelos/Privilegio");
const Rol_Privilegio = require("../modelos/Rol_Privilegio");

exports.rolCreateService = async (rolData, res) => {
  try {
    const rol = await Rol.create(rolData);
    return rol;
  } catch (error) {
    res.status(400).json({ message: "Error durante la creación de rol" });
  }
};

exports.rolUpdateService = async (id, rolUpdate, res) => {
  try {
    const rolUpdateService = await Rol.update(rolUpdate, { where: { id } });
    if (!rolUpdateService) {
      return null;
    }
    return await Rol.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.rolDeleteService = async (id, res) => {
  try {
    const deleterol = await Rol.findByPk(id);

    if (!deleterol) {
      return null;
    }

    await deleterol.destroy();

    return deleterol;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.rolSelectAllService = async (res) => {
  try {
    const rols = await Rol.findAll({
      include: {
        model: Rol_Privilegio,
        include: {
          model: Privilegio,
        },
      },
    });
    return rols;
  } catch (error) {
    res.status(204).json({ message: "No hay registros" });
  }
};

exports.rolSelectByIdService = async (id, res) => {
  try {
    const rol = await Rol.findByPk(id, {
      include: {
        model: Rol_Privilegio,
        include: {
          model: Privilegio,
        },
      },
    });
    return rol;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
