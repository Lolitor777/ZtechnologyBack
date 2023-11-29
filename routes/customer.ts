import { Router } from 'express';
import { consultActiveCustomer, consultCustomer, consultCustomerById, deleteCustomer, modifyCustomer, saveCustomer } from '../controllers/customer';
const router = Router();

router.get('/consultar-clientes', consultCustomer);
router.get('/consultar-clientes-activos', consultActiveCustomer);
router.get('/consultar-cliente-por-id/:id', consultCustomerById);
router.post('/guardar-clientes', saveCustomer);
router.put('/modificar-cliente', modifyCustomer);
router.delete('/eliminar-cliente/:id', deleteCustomer);

router.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Error 404 | page not found'
    })
})

export default router;