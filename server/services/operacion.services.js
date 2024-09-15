const Operacion = require("../modelos/Operacion");
const { Op } = require("sequelize");
const Sequelize = require("../database");

const Socios = require("../modelos/Socio");
const OperacionProducto = require("../modelos/Operacion_Producto");
const actividad_operacion = require("../modelos/actividad_operacion");
const Producto = require("../modelos/Producto");
const Almacen = require("../modelos/Almacenes");

exports.operacionCreateService = async (operacionData, res) => {
  try {
    const t = await Sequelize.transaction();
    const operacion = await Operacion.create(operacionData, { transaction: t });

    const actividad_operacio = await actividad_operacion.create(
      {
        id_operacion: operacion.id,
        id_socio: operacionData.id_responsable,
        texto: "Ha creado la operacion",
        fecha: new Date().toISOString(),
      },
      { transaction: t }
    );

    await t.commit();

    return operacion;
  } catch (error) {
    console.log(error);
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

const findDesdeHasta = async (operaciones) => {
  const operacionesConDesdeHasta = await Promise.all(
    operaciones.map(async (operacion) => {
      let desde;
      let hasta;

      if (operacion.dataValues.tipo === 0) {
        desde = operacion.dataValues.from
          ? await Socios.findByPk(operacion.dataValues.from)
          : null;
        hasta = operacion.dataValues.to
          ? await Almacen.findByPk(operacion.dataValues.to)
          : null;
      } else {
        desde = operacion.dataValues.from
          ? await Almacen.findByPk(operacion.dataValues.from)
          : null;
        hasta = operacion.dataValues.to
          ? await Socios.findByPk(operacion.dataValues.to)
          : null;
      }

      const op = {
        ...operacion.toJSON(),
        desde: desde ? desde.toJSON() : null,
        hasta: hasta ? hasta.toJSON() : null,
      };

      return op;
    })
  );

  return operacionesConDesdeHasta;
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

    const operacionesConDesdeHasta = await findDesdeHasta(operacions);
    return operacionesConDesdeHasta;
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

const calTotalOperaciones = async (operaciones) => {
  const totalOperaciones = await Promise.all(
    operaciones.map(async (operacion) => {
      let desde;
      let hasta;

      if (operacion.dataValues.tipo === 0) {
        desde = await Socios.findByPk(operacion.dataValues.from);
        hasta = await Almacen.findByPk(operacion.dataValues.to);
      } else {
        desde = await Almacen.findByPk(operacion.dataValues.from);
        hasta = await Socios.findByPk(operacion.dataValues.to);
      }

      const op = {
        ...operacion.toJSON(),
        cantidad: operacion.dataValues.Operacion_Productos[0].cantidad,
        desde: desde.toJSON(),
        hasta: hasta.toJSON(),
      };

      return op;
    })
  );

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

    const his = await calTotalOperaciones(operaciones);

    return his;
  } catch (error) {
    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};

exports.getSiguienteOperacionService = async (res) => {
  try {
    const operacionesEntrada = await Operacion.findAndCountAll({
      where: {
        tipo: 0,
      },
    });

    const operacionesSalida = await Operacion.findAndCountAll({
      where: {
        tipo: 1,
      },
    });

    return {
      entrada: operacionesEntrada.count + 1,
      salida: operacionesSalida.count + 1,
    };
  } catch (error) {
    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};

const actualizarInStockProductosEntregas = async (operacionProductos, t) => {
  for (const op of operacionProductos) {
    let cantidad_entrega = op.dataValues.cantidad;

    const operacionesProductoRecibido = await Operacion.findAll({
      where: {
        estado: 3,
        tipo: 0,
      },
      include: [
        {
          model: OperacionProducto,
          where: {
            id_producto: op.dataValues.id_producto,
            in_stock: {
              [Op.gt]: 0,
            },
          },
        },
      ],
    });

    for (const opRecibido of operacionesProductoRecibido) {
      const opRecibidoProducto = opRecibido.dataValues.Operacion_Productos.find(
        (opRec) => opRec.id_producto === op.id_producto
      );

      if (opRecibidoProducto.in_stock >= cantidad_entrega) {
        opRecibidoProducto.in_stock -= cantidad_entrega;
        cantidad_entrega = 0;
      } else {
        cantidad_entrega -= opRecibidoProducto.in_stock;
        opRecibidoProducto.in_stock = 0;
      }

      await OperacionProducto.update(
        { in_stock: opRecibidoProducto.in_stock },
        {
          where: {
            id: opRecibidoProducto.id,
          },
          transaction: t,
        }
      );

      if (cantidad_entrega === 0) {
        break;
      }
    }
  }
};

exports.validarOperacionEntregaService = async (idOperacion, res = null) => {
  try {
    const t = await Sequelize.transaction();

    const operacion = await Operacion.findByPk(
      idOperacion,
      {
        include: [
          {
            model: OperacionProducto,
            attributes: ["in_stock", "id", "cantidad", "id_producto"],
          },
        ],
      },
      { transaction: t }
    );

    if (!operacion) {
      return new Error("Operación no encontrada");
    }

    const operacionProductos = operacion.dataValues.Operacion_Productos;

    await actualizarInStockProductosEntregas(operacionProductos, t);

    await Operacion.update(
      { estado: 3 },
      {
        where: {
          id: idOperacion,
        },
        transaction: t,
      }
    );

    await t.commit();

    return operacion;
  } catch (error) {
    await t.rollback();

    console.log(error);
    res.satatus(500).json({ message: "No hay registros", error });
  }
};
