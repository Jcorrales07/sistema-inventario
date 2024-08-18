const { Router } = require("express");
const usuarioControllers = require("../controllers/usuario.controllers");

const router = Router();

router.get("/", usuarioControllers.usuarioSelectAllController);
router.post("/", usuarioControllers.usuarioCreateController);
router.put("/:id", usuarioControllers.usuarioUpdateController);
router.delete("/:id", usuarioControllers.usuarioDeleteController);
router.get("/:id", usuarioControllers.usuarioSelectByIdController);
router.post("/socio/", usuarioControllers.createUsuarioSocioController);

module.exports = router;
