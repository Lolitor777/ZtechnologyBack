import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req:Request, res:Response, next: ()=> void) =>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    } 

    try {
        const resToken: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY || ' ' )
        req.body.id = resToken?.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

export default validateJWT