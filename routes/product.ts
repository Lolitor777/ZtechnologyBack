import { Router } from 'express';
import { consultActiveProduct, consultProduct, consultProductById, deleteProduct, modifyProduct, saveProduct } from '../controllers/product';
const router = Router();

router.get('/consultar-productos', consultProduct);
router.get('/consultar-productos-activos', consultActiveProduct);
router.get('/consultar-producto-por-id/:id', consultProductById);
router.post('/guardar-productos', saveProduct);
router.put('/modificar-producto', modifyProduct);
router.delete('/eliminar-producto/:id', deleteProduct)

router.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Error 404 | page not found'
    })
})

export default router;