const RolPrivilegio = require("../modelos/Rol_Privilegio");
const privilegio = require("../modelos/Privilegio");

exports.rolPrivilegioCreateService = async (rolData, res) => {
  try {
    const rolPrivilegio = await RolPrivilegio.create(rolData);
    return rolPrivilegio;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de rolPrivilegio" });
  }
};

exports.rolPrivilegioUpdateService = async (id, rolUpdate, res) => {
  try {
    const rolPrivilegioUpdateService = await RolPrivilegio.update(rolUpdate, {
      where: { id },
    });
    if (!rolPrivilegioUpdateService) {
      return null;
    }
    return await RolPrivilegio.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.rolPrivilegioDeleteService = async (id, res) => {
  try {
    const deleterolPrivilegio = await RolPrivilegio.findByPk(id);

    if (!deleterolPrivilegio) {
      return null;
    }

    await deleterolPrivilegio.destroy();

    return deleterolPrivilegio;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.rolPrivilegioSelectAllService = async (res) => {
  try {
    const rolPrivilegios = await RolPrivilegio.findAll();
    return rolPrivilegios;
  } catch (error) {
    res.status(204).json({ message: "No hay registros" });
  }
};

exports.rolPrivilegioSelectByIdService = async (id, res) => {
  try {
    const rolPrivilegio = await RolPrivilegio.findByPk(id);
    return rolPrivilegio;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.rolPrivilegioSelectByIdRolService = async (idRol, res) => {
  try {
    const rolPrivilegio = await RolPrivilegio.findAll({
      where: { id_rol: idRol },
      include: [{ model: privilegio }],
    });
    return rolPrivilegio;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
