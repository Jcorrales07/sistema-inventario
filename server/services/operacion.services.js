const Operacion = require("../modelos/Operacion");
const { Op } = require("sequelize");

const Socios = require("../modelos/Socio");
const OperacionProducto = require("../modelos/Operacion_Producto");
const Producto = require("../modelos/Producto");

exports.operacionCreateService = async (operacionData, res) => {
  try {
    const operacion = await Operacion.create(operacionData);
    return operacion;
  } catch (error) {
    res.status(400).json({ message: "Error durante la creación de Operacion" });
  }
};

exports.operacionUpdateService = async (id, operacionUpdate, res) => {
  try {
    const operacionUpdateService = await Operacion.update(operacionUpdate, {
      where: { id },
    });
    if (!operacionUpdateService) {
      return null;
    }
    return await Operacion.findByPk(id);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Id invalido, no existe u ocrurrio algún error" });
  }
};

exports.operacionDeleteService = async (id, res) => {
  try {
    const deleteOperacion = await Operacion.destroy({ where: { id } });
    return deleteOperacion;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

exports.operacionSelectAllService = async (res) => {
  try {
    const operacions = await Operacion.findAll({
      include: [
        {
          model: Socios,
          attributes: ["nombre", "id"],
        },
        {
          model: OperacionProducto,
          include: [
            {
              model: Producto,
              attributes: ["nombre", "id"],
            },
          ],
        },
      ],
    });

    return operacions;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No hay registros", error });
  }
};

exports.operacionSelectByIdService = async (id, res) => {
  try {
    const operacion = await Operacion.findByPk(id);
    return operacion;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

const calTotalInventarioProducto = (producto, operaciones) => {
  let total = 0;

  operaciones.forEach((operacion) => {
    operacion.dataValues.Operacion_Productos.forEach((op) => {
      if (op.id_producto === producto.id) {
        total += op.in_stock;
      }
    });
  });

  return total;
};

const calTotalInventario = (productos, operaciones) => {
  const totalInventario = productos.map((producto) => {
    const operacionesProducto = operaciones.filter((operacion) =>
      operacion.dataValues.Operacion_Productos.some((op) => {
        return op.id_producto === producto.id;
      })
    );

    if (operacionesProducto.length === 0) {
      return { ...producto.toJSON(), in_stock: 0 };
    }

    const in_stock = calTotalInventarioProducto(producto, operacionesProducto);
    return { ...producto.toJSON(), in_stock };
  });

  return totalInventario;
};

exports.operacionObtenerInventarioService = async (res) => {
  try {
    const productos = await Producto.findAll();

    const operaciones = await Operacion.findAll({
      attributes: ["id"],
      where: {
        tipo: 0,
        estado: 3,
      },
      include: [
        {
          model: OperacionProducto,
          attributes: ["in_stock", "id", "cantidad", "id_producto"],
          where: {
            in_stock: {
              [Op.gt]: 0,
            },
          },
        },
      ],
    });

    //return operaciones;
    const totalInventario = calTotalInventario(productos, operaciones);

    return totalInventario;
  } catch (error) {
    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};
