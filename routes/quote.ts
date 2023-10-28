import { Router } from 'express';
import { consultActiveQuote, consultQuote, consultQuoteById, deleteQuote, modifyQuote, saveQuote } from '../controllers/quote';
const router = Router();

router.get('/consultar-cotizaciones', consultQuote);
router.get('/consultar-cotizaciones-activas', consultActiveQuote);
router.get('/consultar-cotizacion-por-id/:id', consultQuoteById);
router.post('/guardar-cotizacion', saveQuote);
router.put('/modificar-cotizacion', modifyQuote);
router.delete('/eliminar-cotizacion/:id', deleteQuote);

router.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Error 404 | page not found'
    })
})

export default router;