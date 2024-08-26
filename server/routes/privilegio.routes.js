const {Router} = require('express');
const privilegioController = require('../controllers/privilegio.controllers');

const router = Router();
router.get('/',privilegioController.privilegioSelectAllController);
router.post('/',privilegioController.privilegioCreateController);
router.put('/:id',privilegioController.privilegioUpdateController);
router.delete('/:id',privilegioController.privilegioDeleteController);
router.get('/:id',privilegioController.privilegioSelectByIdController); 

module.exports = router;