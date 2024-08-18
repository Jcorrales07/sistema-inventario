const {Router} = require('express')

const rutasU =  require('./usuario.routes');
const rutasS = require ('./socio.routes');

const router = Router();
router.use('/usuario',rutasU);
router.use('/socio',rutasS);
module.exports= router;
