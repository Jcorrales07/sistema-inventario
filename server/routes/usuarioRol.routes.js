const {Router} = require('express');
const usuarioRolController = require('../controllers/usuarioRol.controllers');

const router = Router();
router.get('/',usuarioRolController.usuarioRolSelectAllController);
router.post('/',usuarioRolController.usuarioRolCreateController);
router.put('/:id',usuarioRolController.usuarioRolUpdateController);
router.delete('/:id',usuarioRolController.usuarioRolDeleteController);
router.get('/:id',usuarioRolController.usuarioRolSelectByIdController); 
router.get('/usuario/:id',usuarioRolController.usuarioRolSelectByUsuarioController);

module.exports = router;