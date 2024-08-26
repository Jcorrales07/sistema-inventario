const { Router } =  require("express");
const router = Router()

router.get('/producto_categoria')
router.get('/producto_categoria/:categoria')
router.delete('/categoria_categoria/:categoria')
router.delete('/categoria_categoria')
module.exports = router;