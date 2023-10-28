import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";


export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
      //verifica la existencia del email
      const login = await User.findOne({
        where: {
            email
        }
      }) 
      
      if (!login) {
        return res.status(400).json({
            msg: `El email ${email} no existe`
        })
      }

      const validPassword = bcrypt.compareSync(password, login.dataValues.password);

      if (!validPassword) {
        return res.status(400).json({
            msg: `El usuario o contraseña son incorrectos`
        }) 
      }

      if (!login.dataValues.state) {
        return res.status(400).json({
            msg: `El usuario está inactivo`
        }) 
      }

      return res.status(200).json({
        user: login  
      })

    } catch (error) {
        console.log(error);
        
    }
}