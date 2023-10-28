import { Router } from "express";
import { login } from "../controllers/login";
const router = Router()

router.post('/iniciar-sesion', login);

export default router