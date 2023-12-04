import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import Rol from '../models/rol';
import { validateNameUser, validateEmail} from '../helpers/validations';


export const consultUser = async (req: Request, res: Response) =>{

    const user = await User.findAll({
        attributes: ['id', 'names', 'nameUser', 'email', 'password', 'state'],
        include: [{
            model: Rol,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });
    
    res.status(200).json({
        msg: 'Bienvenido a la ventana de usuarios',
        user
    })
}

export const consultActiveUser = async (req: Request, res: Response) =>{

    const user = await User.findAll({
        attributes: ['id', 'names', 'nameUser', 'email', 'password'],
        include: [{
            model: Rol,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });
    
    res.status(200).json({
        msg: 'Bienvenido a la ventana de usuarios activos',
        user
    })
}

export const consultUserById = async (req: Request, res: Response) =>{ //buscar por nombre de usuario

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.status(200).json({
            user
        })
    }
    else {
        res.status(400).json({
            msg: `El usuario con el id ${id} no existe`
        })
    }
}

export const saveUser = async (req: Request, res: Response) =>{ //creacion de usuarios
        
    let { names, nameUser, email, password, id_rol} = req.body;
    
    const salt = bcrypt.genSaltSync();
    password =  bcrypt.hashSync(password, salt);

    const user = await User.create({ names, nameUser, email, password, id_rol });

    res.status(200).json({
        msg: `Se ha creado el usuario ${nameUser} correctamente!!`
    })

} 


export const updatePassword = async (req: Request, res: Response) => { //cambio de contrasenia de un usuario

    let {id, password} = req.body;
 
    const salt = bcrypt.genSaltSync();
    password =  bcrypt.hashSync(password, salt);

    const user = await User.update({ password },{ 
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `la contraseña fue cambiada correctamente!`
    })
}

export const assignRol = async (req: Request, res: Response) => { //asignación de rol de admin a usuarios

    const { nameUser, id_rol } = req.body;

    const changeRol = () => {
        const user = User.update({id_rol}, {
            where:{
                nameUser
            }
        })
    }

    if (id_rol == 1) {
        res.status(200).json({
            msg: `Ahora el usuario ${nameUser} es administrador`      
        })
        changeRol()
    }

    else if (id_rol == 2) {
        res.status(200).json({
            msg: `Ahora el usuario ${nameUser} es gestor`
        })
        changeRol()
    }

    else{
        res.status(404).json({
            msg: `El rol que intentas asignar no existe`
        })
    }   
}

export const modifyData = async (req: Request, res: Response) => { //modificación de datos de un admin a gestores

    const {id, names, nameUser, email, password, id_rol } = req.body; 

    const user = await User.update({ names, nameUser, email, password, id_rol }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `Los datos fueron modificados`
    })
}

export const deleteUser = async (req:Request, res: Response) => {

    const { id } = req.params;
      
    const state = 0;
    await User.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `El usuario con el id ${id} ha sido eliminado `
    })
}

