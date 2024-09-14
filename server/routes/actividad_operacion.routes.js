const { Router } = require('express')
const actividadController = require('../controllers/actividad_operacion.controller')

const router = Router()
router.get('/', actividadController.actividadSelectAllController)
router.post('/', actividadController.actividadCreateController)
router.put('/:id', actividadController.actividadUpdateController)
router.delete('/:id', actividadController.actividadDeleteController)
router.get('/:id', actividadController.actividadSelectByIdController)

module.exports = router