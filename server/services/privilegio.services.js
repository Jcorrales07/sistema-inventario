const Privilegio = require("../modelos/Privilegio");

exports.privilegioCreateService = async (privilegioData, res) => {
  try {
    const privilegio = await Privilegio.create(privilegioData);
    return privilegio;
  } catch (error) {
    res.status(400).json({ message: "Error durante la creación de privilegio" });
  }
};

exports.privilegioUpdateService = async (id, privilegioUpdate, res) => {
  try {
    const privilegioUpdateService = await Privilegio.update(privilegioUpdate, { where: { id } });
    if (!privilegioUpdateService) {
      return null;
    }
    return await Privilegio.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.privilegioDeleteService = async (id, res) => {
  try {
    const deleteprivilegio = await Privilegio.findByPk(id);

    if (!deleteprivilegio) {
      return null;
    }

    await deleteprivilegio.destroy();

    return deleteprivilegio;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.privilegioSelectAllService = async (res) => {
  try {
    const privilegios = await Privilegio.findAll();
    return privilegios;
  } catch (error) {
    res.status(204).json({ message: "No hay registros" });
  }
};

exports.privilegioSelectByIdService = async (id, res) => {
  try {
    const privilegio = await Privilegio.findByPk(id);
    return privilegio;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

