const usuarioRol = require("../services/usuarioRol.services");

exports.usuarioRolCreateController = async (req, res) => {
  try {
    const nuevousuarioRol = await usuarioRol.usuarioRolCreateService(req.body);
    res.status(201).json({ Data: nuevousuarioRol });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de usuarioRol" });
  }
};

exports.usuarioRolUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRol = req.body;
    const rolUpdate = await usuarioRol.usuarioRolUpdateService(id, updatedRol);

    if (!rolUpdate) {
      return res.status(404).json({ message: "Error al editar el usuarioRol" });
    }
    return res.status(201).json({ Data: rolUpdate });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.usuarioRolDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleterol = await usuarioRol.usuarioRolDeleteService(id);
    res.status(201).json({
      message: "usuarioRol eliminado exitosamente",
      Data: deleterol,
    });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.usuarioRolSelectAllController = async (req, res) => {
  try {
    const usuarioRols = await usuarioRol.usuarioRolSelectAllService();
    if (usuarioRols != "") {
      res.json({ Data: usuarioRols });
    } else {
      res.status(204).json({ message: "No hay registros" });
    }
  } catch (error) {
    res.status(204).json({ message: "No hay registro" });
  }
};

exports.usuarioRolSelectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioRols = await usuarioRol.usuarioRolSelectByIdService(id);
    res.json({ Data: usuarioRols });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.usuarioRolSelectByUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioRols = await usuarioRol.usuarioRolSelectByIdUsuarioService(id);
    res.json({ Data: usuarioRols });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
