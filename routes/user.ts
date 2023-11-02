import { Router } from 'express';
import { consultUser, saveUser, consultUserByNameUser, updatePassword, assignRol, modifyData, deleteUser, consultActiveUser } from '../controllers/user';
import validateJWT from '../helpers/validate-jwt';
const router = Router();


router.get('/consultar-usuarios', /*validateJWT,*/ consultUser);
router.get('/consultar-usuarios-activos', consultActiveUser); 
router.get('/consultar-usuario-por-nombreUsuario/:nameUser', consultUserByNameUser);
router.post('/guardar-usuarios', saveUser);
router.put('/cambiar-contrasenia', updatePassword);
router.put('/asignar-rol', assignRol);
router.put('/modificar-datos-a-gestores/:id', modifyData);
router.delete('/eliminar-usuario/:id', deleteUser);

router.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Error 404 | page not found'
    })
})

export default router;