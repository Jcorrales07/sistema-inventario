const { Router } = require("express");
const operacionProductoController = require("../controllers/operacionProducto.controllers");

const router = Router();
router.get(
  "/",
  operacionProductoController.operacionProductoSelectAllController
);
router.post("/", operacionProductoController.operacionProductoCreateController);

router.post(
  "/changeProducts/:id",
  operacionProductoController.operacionProductoChangeProductoControlloer
);

router.put(
  "/:id",
  operacionProductoController.operacionProductoUpdateController
);
router.delete(
  "/:id",
  operacionProductoController.operacionProductoDeleteController
);
router.get(
  "/:id",
  operacionProductoController.operacionProductoSelectByIdController
);

module.exports = router;
