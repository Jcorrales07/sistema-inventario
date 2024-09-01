const Usuario = require("../modelos/Usuario");
const Socio = require("../modelos/Socio");
const UsuarioRol = require("../modelos/Usuario_Rol");
const RolPrivilegio = require("../modelos/Rol_Privilegio");
const Privilegio = require("../modelos/Privilegio");
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
    const t = await sequelize.transaction();

    const usuarioEditado = await Usuario.update(values, {
      where: { id: id },
      transaction: t,
    });

    if (!usuarioEditado) {
      await t.commit();
      return null;
    }

    if (values.roles) {
      await UsuarioRol.destroy({
        where: { id_usuario: id },
        transaction: t,
      });

      for (let i = 0; i < values.roles.length; i++) {
        const usuarioRol = {
          id_usuario: id,
          id_rol: values.roles[i].id,
        };

        await UsuarioRol.create(usuarioRol, { transaction: t });
      }
    }

    await t.commit();

    return await Usuario.findByPk(id);
  } catch (error) {
    await t.rollback();
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
    return await Usuario.findAll({
      include: [
        {
          model: Socio,
        },
        {
          model: UsuarioRol,
          include: [
            {
              model: Rol,
              include: [
                {
                  model: RolPrivilegio,
                  include: [
                    {
                      model: Privilegio,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
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

exports.createUsuarioSocioService = async (usuario, socio, roles) => {
  const t = await sequelize.transaction();
  try {
    const nuevoSocio = await Socio.create(socio, { transaction: t });

    usuario.id_socio = nuevoSocio.id;

    const nuevoUsuario = await Usuario.create(usuario, { transaction: t });

    for (let i = 0; i < roles.length; i++) {
      const usuarioRol = {
        id_usuario: nuevoUsuario.id,
        id_rol: roles[i].id,
      };

      await UsuarioRol.create(usuarioRol, { transaction: t });
    }

    await t.commit();

    return nuevoUsuario;
  } catch (error) {
    await t.rollback();

    throw new Error("Error al crear el usuario y socio " + error);
  }
};
