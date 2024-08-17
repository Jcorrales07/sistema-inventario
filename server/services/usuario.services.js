const Usuario = require("../modelos/Usuario");
const Socio = require("../modelos/Socio");
const sequelize = require("../database");

exports.usuarioCreateService = async (usuario) => {
  try {
    return await Usuario.create(usuario);
  } catch (error) {
    throw error;
  }
};

exports.usuarioUpdateService = async (id, values) => {
  try {
    const usuarioEditado = await Usuario.update(values, {
      where: { id: id },
    });

    return usuarioEditado;
  } catch (error) {
    throw error;
  }
};

exports.usuarioDeleteService = async (id) => {
  try {
    const usuarioEliminado = await Usuario.destroy({
      where: { id: id },
    });

    return usuarioEliminado;
  } catch (error) {
    throw error;
  }
};

exports.usuarioSelectAllService = async () => {
  try {
    return await Usuario.findAll();
  } catch (error) {
    throw error;
  }
};

exports.usuarioSelectByIdService = async (id) => {
  try {
    return await Usuario.findByPk(id);
  } catch (error) {
    throw error;
  }
};

exports.createUsuarioSocioService = async (usuario, socio) => {
  const t = await sequelize.transaction();
  try {
    const nuevoSocio = await Socio.create(socio, { transaction: t });

    usuario.id_socio = nuevoSocio.id;

    const nuevoUsuario = await Usuario.create(usuario, { transaction: t });

    await t.commit();

    return nuevoUsuario;
  } catch (error) {
    await t.rollback();

    throw new Error("Error al crear el usuario y socio\n" + error);
  }
};
