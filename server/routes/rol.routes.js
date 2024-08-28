const {Router} = require('express');
const rolController = require('../controllers/rol.controllers');

const router = Router();
router.get('/',rolController.rolSelectAllController);
router.post('/',rolController.rolCreateController);
router.put('/:id',rolController.rolUpdateController);
router.delete('/:id',rolController.rolDeleteController);
router.get('/:id',rolController.rolSelectByIdController); 

module.exports = router;