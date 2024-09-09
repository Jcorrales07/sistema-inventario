const { Router } = require("express");
const operacionController = require("../controllers/operacion.controllers");

const router = Router();
router.get("/", operacionController.operacionSelectAllController);
router.get(
  "/inventario",
  operacionController.operacionObtenerInventarioController
);
router.get(
  "/inventario/:id",
  operacionController.operacionObtenerInventarioPorAlmacenController
);

router.get(
  "/producto/:id",
  operacionController.operacionesObtenerPorProductoController
);
router.post("/", operacionController.operacionCreateController);
router.put("/:id", operacionController.operacionUpdateController);
router.delete("/:id", operacionController.operacionDeleteController);
router.get("/:id", operacionController.operacionSelectByIdController);

module.exports = router;
