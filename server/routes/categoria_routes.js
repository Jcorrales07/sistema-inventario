import { Router } from "express";
import { getCategoria, createCategoria, updateCategoria, deleteCategoria, deleteALLCategoria, getCategoriaUnica } from '../controllers/categoria_controllers.js'
const router = Router()

router.get('/categoria', getCategoria)
router.get('/categoria/:nombre', getCategoriaUnica)
router.post('/categoria', createCategoria)
router.put('/categoria/:nombre',updateCategoria)
router.delete('/categoria/:nombre',deleteCategoria)
router.delete('categoria',deleteALLCategoria)
export default router;