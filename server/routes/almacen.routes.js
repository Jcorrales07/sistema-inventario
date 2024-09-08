const { Router } = require('express')
const almacenController = require('../controllers/almacen.controllers')

const router = Router()
router.get('/', almacenController.almacenSelectAllController)
router.post('/', almacenController.alamcenCreateController)
router.put('/:id', almacenController.almacenUpdateController)
router.delete('/:id', almacenController.almacenDeleteController)
router.get('/:id', almacenController.almacenSelectByIdController)

module.exports = router