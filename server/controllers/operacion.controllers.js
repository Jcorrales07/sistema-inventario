const operacion = require("../services/operacion.services");

exports.operacionCreateController = async (req, res) => {
  try {
    const nuevooperacion = await operacion.operacionCreateService(req.body);
    res.status(201).json({ Data: nuevooperacion });
  } catch (error) {
    res.status(400).json({ message: "Error durante la creación de operacion" });
  }
};

exports.operacionUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedoperacion = req.body;
    const operacionUpdate = await operacion.operacionUpdateService(
      id,
      updatedoperacion
    );

    if (!operacionUpdate) {
      return res.status(404).json({ message: "Error al editar el operacion" });
    }
    return res.status(201).json({ Data: operacionUpdate });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.operacionDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteoperacion = await operacion.operacionDeleteService(id);
    res.status(201).json({
      message: "operacion eliminado exitosamente",
      operacion: deleteoperacion,
    });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.operacionSelectAllController = async (req, res) => {
  try {
    const operacions = await operacion.operacionSelectAllService();
    if (operacions != "") {
      res.json({ Data: operacions });
    } else {
      res.status(204).json({ message: "No hay registros" });
    }
  } catch (error) {
    res.status(204).json({ message: "No hay registro" });
  }
};

exports.operacionSelectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const operacions = await operacion.operacionSelectByIdService(id);
    res.json({ Data: operacions });
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado aaaaaa" });
  }
};

exports.operacionObtenerInventarioController = async (req, res) => {
  try {
    const operacions = await operacion.operacionObtenerInventarioService(
      res,
      null
    );
    res.json({ Data: operacions });
  } catch (error) {
    res.status(404).json({ message: "Error durante el inventario", error });
  }
};

exports.operacionObtenerInventarioPorAlmacenController = async (req, res) => {
  try {
    const { id } = req.params;
    const operacions = await operacion.operacionObtenerInventarioService(
      res,
      id
    );
    console.log("Obtener inventario por almacen");
    res.json({ Data: operacions });
  } catch (error) {
    res.status(404).json({ message: "Error durante el inventario", error });
  }
};

exports.operacionesObtenerPorProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const operacions = await operacion.operacionesByProductoService(res, id);
    res.json({ Data: operacions });
  } catch (error) {
    res.status(404).json({ message: "Error durante el inventario", error });
  }
};

exports.getSiguienteOperacionController = async (req, res) => {
  try {
    const operacions = await operacion.getSiguienteOperacionService();
    res.json(operacions);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error al obtener la siguiente operacion" });
  }
};
