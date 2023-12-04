import { Router } from "express";
import { login, logout, validateToken } from "../controllers/login";
import validateJWT from "../helpers/validate-jwt";
const router = Router()

router.post('/iniciar-sesion', login);
router.post('/cerrar-sesion', validateJWT, logout);
router.post('/validate-sesion', validateJWT, validateToken);

export default router