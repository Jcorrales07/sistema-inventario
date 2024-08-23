const usuarioServices = require("../services/usuario.services");

exports.loginController = async (req, res) => {
  try {
    const { nickname, contrasena} = req.body;
    const usuario = await usuarioServices.usuarioSelectByNicknameService(
      nickname
    );

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(402).json({ error: "Contraseña incorrecta" });
    }

    return res.status(201).json({ Data: usuario });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
