const {Router} = require('express');
const productoController = require('../controllers/producto.controllers');

const router = Router();
router.get('/',productoController.productoSelectAllController);
router.post('/',productoController.productoCreateController);
router.put('/:id',productoController.productoUpdateController);
router.delete('/:id',productoController.productoDeleteController);
router.get('/:id',productoController.productoSelectByIdController); 

module.exports = router;