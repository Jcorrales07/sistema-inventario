const { Router } = require("express");
const {
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  deleteALLCategoria,
  getCategoriaUnica,
} = require("../controllers/categoria_controllers.js");
const router = Router();

router.get("/categoria", getCategoria);
router.get("/categoria/:nombre", getCategoriaUnica);
router.post("/categoria", createCategoria);
router.put("/categoria/:nombre", updateCategoria);
router.delete("/categoria/:nombre", deleteCategoria);
router.delete("categoria", deleteALLCategoria);

module.exports = router;
