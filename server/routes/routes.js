const {Router} = require('express')

const rutasU =  require('./usuario.routes');
const rutasS = require ('./socio.routes');
const rutasP = require('./producto.route');
const rutasRol = require('./rol.routes');
const rutasAuth = require ('./auth.routes');
const rutasRolPrivilegio = require('./rolPrivilegio.routes');   
const rutasPrivilegio = require('./privilegio.routes');
const rutasCategoria = require('./categoria_routes');   
const rutasProductoCategoria = require('./producto_categoria_routes.js');

const router = Router();
router.use('/rolPrivilegio',rutasRolPrivilegio);
router.use('/usuario',rutasU);
router.use('/socio',rutasS);
router.use('/producto',rutasP);
router.use('/auth',rutasAuth);
router.use('/rol',rutasRol);
router.use('/privilegio',rutasPrivilegio);
router.use(rutasCategoria);
router.use(rutasProductoCategoria);
module.exports= router;
