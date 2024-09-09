const Operacion = require("../modelos/Operacion");
const { Op } = require("sequelize");

const Socios = require("../modelos/Socio");
const OperacionProducto = require("../modelos/Operacion_Producto");
const Producto = require("../modelos/Producto");
const Almacen = require("../modelos/Almacen");
const Socio = require("../modelos/Socio");

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
    const operacion = await Operacion.findByPk(id, {
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
    return operacion;
  } catch (error) {
    res.status(404).json({ message: "Id no encontrado" });
  }
};

const calTotalInventarioProducto = (producto, operaciones, idAlmacen) => {
  let in_stock = 0;
  let entradas = 0;
  let salidas = 0;

  operaciones.forEach((operacion) => {
    console.log(operacion);
    operacion.dataValues.Operacion_Productos.forEach((op) => {
      if (op.id_producto === producto.id) {
        if (idAlmacen) {
          console.log("validando almacen", idAlmacen, operacion.dataValues.to);
          if (
            operacion.dataValues.tipo === 0 &&
            operacion.dataValues.to === idAlmacen
          ) {
            in_stock += op.in_stock;
            entradas += op.cantidad;
          }

          if (
            operacion.dataValues.tipo === 1 &&
            operacion.dataValues.from === idAlmacen
          ) {
            salidas += op.cantidad;
          }
        } else {
          if (operacion.dataValues.tipo === 0) {
            in_stock += op.in_stock;
            entradas += op.cantidad;
          }

          if (operacion.dataValues.tipo === 1) {
            salidas += op.cantidad;
          }
        }
      }
    });
  });

  return { in_stock, entradas, salidas };
};

const calTotalInventario = (productos, operaciones, idAlmacen) => {
  const totalInventario = productos.map((producto) => {
    const operacionesProducto = operaciones.filter((operacion) =>
      operacion.dataValues.Operacion_Productos.some((op) => {
        return op.id_producto === producto.id;
      })
    );

    if (operacionesProducto.length === 0) {
      return { ...producto.toJSON(), in_stock: 0, entradas: 0, salidas: 0 };
    }

    const calculos_p = calTotalInventarioProducto(
      producto,
      operacionesProducto,
      idAlmacen
    );
    return { ...producto.toJSON(), ...calculos_p };
  });

  return totalInventario;
};

exports.operacionObtenerInventarioService = async (res, idAlmacen) => {
  try {
    const productos = await Producto.findAll({
      attributes: ["id", "nombre"],
    });

    const operaciones = await Operacion.findAll({
      attributes: ["id", "tipo", "estado", "from", "to"],
      where: {
        estado: 3,
      },
      include: [
        {
          model: OperacionProducto,
          attributes: ["in_stock", "id", "cantidad", "id_producto"],
        },
      ],
    });

    //return operaciones;
    const totalInventario = calTotalInventario(
      productos,
      operaciones,
      parseInt(idAlmacen)
    );

    return totalInventario;
  } catch (error) {
    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};

const calTotalOperaciones = (operaciones) => {
  const totalOperaciones = operaciones.map((operacion) => {
    let desde;
    let hasta;

    if (operacion.dataValues.tipo === 0) {
      desde = Socios.findByPk(operacion.dataValues.from);
      hasta = Almacen.findByPk(operacion.dataValues.to);
    } else {
      desde = Almacen.findByPk(operacion.dataValues.from);
      hasta = Socios.findByPk(operacion.dataValues.to);
    }

    return {
      ...operacion.toJSON(),
      cantidad: operacion.dataValues.Operacion_Productos[0].cantidad,
      desde,
      hasta,
    };
  });

  return totalOperaciones;
};

exports.operacionesByProductoService = async (res, idProducto) => {
  try {
    const operaciones = await Operacion.findAll({
      attributes: ["id", "tipo", "estado", "from", "to"],
      where: {
        estado: 3,
      },
      include: [
        {
          model: OperacionProducto,
          attributes: ["in_stock", "id", "cantidad", "id_producto"],
          where: {
            id_producto: {
              [Op.eq]: idProducto,
            },
          },
        },
      ],
    });

    return calTotalOperaciones(operaciones);
  } catch (error) {
    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};
