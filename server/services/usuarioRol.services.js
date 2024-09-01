const UsuarioRol = require("../modelos/Usuario_Rol");
const Rol = require("../modelos/Rol");

exports.usuarioRolCreateService = async (rolData, res) => {
  try {
    const rolPrivilegio = await UsuarioRol.create(rolData);
    return rolPrivilegio;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de usuarioRol" });
  }
};

exports.usuarioRolUpdateService = async (id, rolUpdate, res) => {
  try {
    const usuarioRolUpdateService = await UsuarioRol.update(rolUpdate, {
      where: { id },
    });
    if (!usuarioRolUpdateService) {
      return null;
    }
    return await UsuarioRol.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.usuarioRolDeleteService = async (id, res) => {
  try {
    const deleteusuarioRol = await UsuarioRol.findByPk(id);

    if (!deleteusuarioRol) {
      return null;
    }

    await deleteusuarioRol.destroy();

    return deleteusuarioRol;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.usuarioRolSelectAllService = async (res) => {
  try {
    const usuarioRols = await UsuarioRol.findAll();
    return usuarioRols;
  } catch (error) {
    res.status(204).json({ message: "No hay registros" });
  }
};

exports.usuarioRolSelectByIdService = async (id, res) => {
  try {
    const usuarioRol = await UsuarioRol.findByPk(id);
    return usuarioRol;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.usuarioRolSelectByIdUsuarioService = async (idUsuario, res) => {
  try {
    const usuarioRol = await UsuarioRol.findAll({
      where: { id_usuario: idUsuario },
      include: [{ model: Rol }],
    });
    return usuarioRol;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
