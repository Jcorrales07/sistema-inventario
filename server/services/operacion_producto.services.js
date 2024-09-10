const OperacionProducto = require("../modelos/Operacion_Producto");
const sequelize = require("../database");

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

exports.operacionProductoChangeProductoService = async (
  idOperacion,
  productos
) => {
  try {
    const t = await sequelize.transaction();

    console.log(productos);
    console.log(idOperacion);
    await OperacionProducto.destroy(
      {
        where: {
          id_operacion: idOperacion,
        },
      },
      { transaction: t }
    );

    let prods = [];

    for (const element of productos) {
      const p = {
        id_operacion: idOperacion,
        id_producto: element.id,
        cantidad: element.demanda,
        in_stock: element.demanda,
      };

      const operacionProducto = await OperacionProducto.create(p, {
        transaction: t,
      });

      prods.push(operacionProducto);
    }

    await t.commit();

    return prods;
  } catch (error) {
    console.log(error);
    t.rollback();

    return null;
  }
};
