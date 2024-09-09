const { Router } = require("express");

const rutasU = require("./usuario.routes");
const rutasS = require("./socio.routes");
const rutasP = require("./producto.routes");
const rutasRol = require("./rol.routes");
const rutasAuth = require("./auth.routes");
const rutasRolPrivilegio = require("./rolPrivilegio.routes");
const rutasPrivilegio = require("./privilegio.routes");
const rutasCategoria = require("./categoria.routes");
const rutasProductoCategoria = require("./producto.categoria.routes");
const rutasUsuarioRol = require("./usuarioRol.routes");
const rutasAlmacen = require("./almacen.routes");
const rutasOperacion = require("./operacion.routes");
const rutasOperacionProducto = require("./operacionProducto.routes");

const router = Router();
router.use("/rolPrivilegio", rutasRolPrivilegio);
router.use("/usuario", rutasU);
router.use("/socio", rutasS);
router.use("/producto", rutasP);
router.use("/auth", rutasAuth);
router.use("/rol", rutasRol);
router.use("/privilegio", rutasPrivilegio);
router.use(rutasCategoria);
router.use(rutasProductoCategoria);
router.use("/usuarioRol", rutasUsuarioRol);
router.use("/operacion", rutasOperacion);
router.use("/operacionProducto", rutasOperacionProducto);

router.use("/almacen",rutasAlmacen);
module.exports = router;
