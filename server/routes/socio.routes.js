const {Router} = require('express');
const socioController = require('../controllers/socio.controllers');

const router = Router();
router.get('/socio',socioController.socioSelectAllController);
router.post('/socio',socioController.socioCreateController);
router.put('/socio/:id',socioController.socioUpdateController);
router.delete('/socio/:id',socioController.socioDeleteController);
router.get('/socio/:id',socioController.socioSelectByIdController); 

module.exports = router;