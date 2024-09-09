const OperacionProducto = require("../modelos/Operacion_Producto");

exports.operacionProductoCreateService = async (operacionProductoData, res) => {
  try {
    const operacionProducto = await OperacionProducto.create(
      operacionProductoData
    );
    return operacionProducto;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de OperacionProducto" });
  }
};

exports.operacionProductoUpdateService = async (
  id,
  operacionProductoUpdate,
  res
) => {
  try {
    const operacionProductoUpdateService = await OperacionProducto.update(
      operacionProductoUpdate,
      { where: { id } }
    );
    if (!operacionProductoUpdateService) {
      return null;
    }
    return await OperacionProducto.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.operacionProductoDeleteService = async (id, res) => {
  try {
    const operacionProducto = await OperacionProducto.findByPk(id);

    if (!operacionProducto) {
      return null;
    }

    await operacionProducto.destroy();

    return operacionProducto;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.operacionProductoSelectAllService = async (res) => {
  try {
    const operacionProductos = await OperacionProducto.findAll();
    return operacionProductos;
  } catch (error) {
    res.status(204).json({ message: "No hay registros" });
  }
};

exports.operacionProductoSelectByIdService = async (id, res) => {
  try {
    const operacionProducto = await OperacionProducto.findByPk(id);
    return operacionProducto;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
