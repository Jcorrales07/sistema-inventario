const {Router} = require('express')

const rutasU =  require('./usuario.routes');
const rutasS = require ('./socio.routes');
const rutasP = require('./producto.route');
const rutasAuth = require ('./auth.routes');

const router = Router();
router.use('/usuario',rutasU);
router.use('/socio',rutasS);
router.use('/producto',rutasP);
router.use('/auth',rutasAuth);
module.exports= router;
