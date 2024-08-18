const {Router} = require('express');
const socioController = require('../controllers/socio.controllers');

const router = Router();
router.get('/',socioController.socioSelectAllController);
router.post('/',socioController.socioCreateController);
router.put('/:id',socioController.socioUpdateController);
router.delete('/:id',socioController.socioDeleteController);
router.get('/:id',socioController.socioSelectByIdController); 

module.exports = router;