const operacionProducto = require("../services/operacion_producto.services");

exports.operacionProductoCreateController = async (req, res) => {
  try {
    const nuevooperacionProducto =
      await operacionProducto.operacionProductoCreateService(req.body);
    res.status(201).json({ Data: nuevooperacionProducto });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error durante la creación de operacionProducto" });
  }
};

exports.operacionProductoUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedoperacionProducto = req.body;
    const operacionProductoUpdate =
      await operacionProducto.operacionProductoUpdateService(
        id,
        updatedoperacionProducto
      );

    if (!operacionProductoUpdate) {
      return res
        .status(404)
        .json({ message: "Error al editar el operacionProducto" });
    }
    return res.status(201).json({ Data: operacionProductoUpdate });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.operacionProductoDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteoperacionProducto =
      await operacionProducto.operacionProductoDeleteService(id);
    res
      .status(201)
      .json({
        data: deleteoperacionProducto,
        message: "operacionProducto eliminado exitosamente",
      });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.operacionProductoSelectAllController = async (req, res) => {
  try {
    const operacionProductos =
      await operacionProducto.operacionProductoSelectAllService();
    if (operacionProductos != "") {
      res.json({ Data: operacionProductos });
    } else {
      res.status(204).json({ message: "No hay registros" });
    }
  } catch (error) {
    res.status(204).json({ message: "No hay registro" });
  }
};

exports.operacionProductoSelectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const operacionProductos =
      await operacionProducto.operacionProductoSelectByIdService(id);
    res.json({ Data: operacionProductos });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};
