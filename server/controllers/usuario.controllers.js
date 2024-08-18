const usuarioServices = require("../services/usuario.services");

exports.usuarioCreateController = async (req, res) => {
  try {
    const usuario = req.body;
    const nuevoUsuario = await usuarioServices.usuarioCreateService(usuario);

    return res.status(201).json({ Data: nuevoUsuario });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.usuarioUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const values = req.body;
    const usuarioEditado = await usuarioServices.usuarioUpdateService(
      id,
      values
    );

    if (!usuarioEditado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json({ Data: usuarioEditado });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.usuarioDeleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioEliminado = await usuarioServices.usuarioDeleteService(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ Data: usuarioEliminado });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.usuarioSelectAllController = async (req, res) => {
  try {
    const usuarios = await usuarioServices.usuarioSelectAllService();

    if (usuarios.length === 0) {
      return res
        .status(201)
        .json({ message: "No hay usuarios registrados", Data: [] });
    }

    return res.status(200).json({ Data: usuarios });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.usuarioSelectByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await usuarioServices.usuarioSelectByIdService(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ Data: usuario });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.createUsuarioSocioController = async (req, res) => {
  try {
    const { usuario, socio } = req.body;

    const nuevoUsuario = await usuarioServices.createUsuarioSocioService(
      usuario,
      socio
    );

    if (!nuevoUsuario) {
      return res
        .status(404)
        .json({
          error:
            "Ocurrio algun problema durante la creacion de Usuario y socio",
        });
    }

    return res.status(201).json({ Data: nuevoUsuario });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
