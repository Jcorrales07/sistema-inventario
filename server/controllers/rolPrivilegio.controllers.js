const rolPrivilegio = require("../services/rolPrivilegio.services");

exports.rolPrivilegioCreateController = async (req, res) => {
  try {
    const nuevorolPrivilegio = await rolPrivilegio.rolPrivilegioCreateService(
      req.body
    );
    res.status(201).json({ Data: nuevorolPrivilegio });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de rolPrivilegio" });
  }
};

exports.rolPrivilegioUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRol = req.body;
    const rolUpdate = await rolPrivilegio.rolPrivilegioUpdateService(
      id,
      updatedRol
    );

    if (!rolUpdate) {
      return res
        .status(404)
        .json({ message: "Error al editar el rolPrivilegio" });
    }
    return res.status(201).json({ Data: rolUpdate });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.rolPrivilegioDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleterol = await rolPrivilegio.rolPrivilegioDeleteService(id);
    res.status(201).json({
      message: "rolPrivilegio eliminado exitosamente",
      Data: deleterol,
    });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.rolPrivilegioSelectAllController = async (req, res) => {
  try {
    const rolPrivilegios = await rolPrivilegio.rolPrivilegioSelectAllService();
    if (rolPrivilegios != "") {
      res.json({ Data: rolPrivilegios });
    } else {
      res.status(204).json({ message: "No hay registros" });
    }
  } catch (error) {
    res.status(204).json({ message: "No hay registro" });
  }
};

exports.rolPrivilegioSelectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const rolPrivilegios = await rolPrivilegio.rolPrivilegioSelectByIdService(
      id
    );
    res.json({ Data: rolPrivilegios });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.rolPrivilegioSelectByRolController = async (req, res) => {
  try {
    const { id } = req.params;
    const rolPrivilegios =
      await rolPrivilegio.rolPrivilegioSelectByIdRolService(id);
    res.json({ Data: rolPrivilegios });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
