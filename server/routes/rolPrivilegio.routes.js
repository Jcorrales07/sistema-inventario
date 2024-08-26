const {Router} = require('express');
const rolPrivilegioController = require('../controllers/rolPrivilegio.controllers');

const router = Router();
router.get('/',rolPrivilegioController.rolPrivilegioSelectAllController);
router.post('/',rolPrivilegioController.rolPrivilegioCreateController);
router.put('/:id',rolPrivilegioController.rolPrivilegioUpdateController);
router.delete('/:id',rolPrivilegioController.rolPrivilegioDeleteController);
router.get('/:id',rolPrivilegioController.rolPrivilegioSelectByIdController); 
router.get('/rol/:id',rolPrivilegioController.rolPrivilegioSelectByRolController);

module.exports = router;