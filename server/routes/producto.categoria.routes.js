const { Router } = require('express')
const router = Router()
const productoCategoriaContr = require('../controllers/categorias_productos_controllers.js')

router.get('/producto_categoria', productoCategoriaContr.getProducto_categoria)
router.get(
    '/producto_categoria/:categoria',
    productoCategoriaContr.getProducto_CategoriaUnica
)
router.delete(
    '/categoria_categoria/:categoria',
    productoCategoriaContr.deleteProducto_Categoria
)
router.delete(
    '/categoria_categoria',
    productoCategoriaContr.deleteALLProducto_Categoria
)
module.exports = router
