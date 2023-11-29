import { Router } from "express";
import { login, logout } from "../controllers/login";
const router = Router()

router.post('/iniciar-sesion', login);
router.post('/cerrar-sesion', logout);

export default router