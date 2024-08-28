const Usuario = require("../modelos/Usuario");
const Socio = require("../modelos/Socio");
const Rol = require("../modelos/Rol");
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

    if (!usuarioEditado) {
      return null;
    }

    return await Usuario.findByPk(id);
  } catch (error) {
    throw error;
  }
};

exports.usuarioDeleteService = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    await usuario.destroy();

    return usuario;
  } catch (error) {
    throw error;
  }
};

exports.usuarioSelectAllService = async () => {
  try {
    return await Usuario.findAll({ include: [Socio, Rol] });
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

exports.usuarioSelectByNicknameService = async (nickname) => {
  try {
    return await Usuario.findOne({
      where: { nickname: nickname },
      include: Socio,
    });
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
