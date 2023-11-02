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
        }]
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

export const consultUserByNameUser = async (req: Request, res: Response) =>{ //buscar por nombre de usuario

    const { nameUser } = req.params;
    const user = await User.findAll({
        attributes: ['id', 'names', 'nameUser', 'email', 'password', 'state'],
        include: [{
            model: Rol,
            attributes: ['name']
        }],
        where: {
            nameUser
        }
    });

    if (user.length > 0) {
        res.status(200).json({
            user
        })
    }
    else {
        res.status(200).json({
            msg: `El usuario con el nombre ${nameUser} no existe`
        })
    }
}

export const saveUser = async (req: Request, res: Response) =>{ //creacion de usuarios
        
    let { names, nameUser, email, password, id_rol } = req.body;
    
    if (!names || !nameUser || !email || !password || !id_rol) {
        return res.status(200).json({
            msg: `Por favor rellene todos los campos`
        })        
    }   

    let validationNameUser = await validateNameUser(nameUser, User)

    if (validationNameUser) {
        return res.status(400).json({
            msg: validationNameUser
        })
    }


    let validationEmail = await validateEmail(email, User)

    if (validationEmail) {
        return res.status(200).json({
            msg: validationEmail
        })
    }


    if (password.length < 8) {
        return res.status(200).json({
            msg: `Por favor digite una contraseña que contenga 8 dígitos o más`
        })
    }

    const salt = bcrypt.genSaltSync();
    password =  bcrypt.hashSync(password, salt);


    if (id_rol == 0 || id_rol > 2) {
        return res.status(200).json({
            msg: `El rol que está asignando no existe ${id_rol.typeOf}`
        })
    }

    const user = await User.create({ names, nameUser, email, password, id_rol });

    res.status(200).json({
        msg: `Se ha creado el usuario ${nameUser} correctamente!!`
    })

} 


export const updatePassword = async (req: Request, res: Response) => { //cambio de contrasenia de un usuario

    let {nameUser, password} = req.body;

    if(!nameUser || !password){
        return res.status(200).json({
            msg: `Por favor rellene ambos campos`
        })
    }
 
    let validationNameUser = await validateNameUser(nameUser, User)

    if (!validationNameUser) {
        return res.status(400).json({
            msg: `El nombre de usuario ${nameUser} no existe`
        })
    }

    if (password.length < 8) {
        return res.status(200).json({
            msg: `Por favor digite una contraseña que contenga 8 dígitos o más`
        })
    }

    const salt = bcrypt.genSaltSync();
    password =  bcrypt.hashSync(password, salt);

    const user = await User.update({ password },{ 
        where: {
            nameUser
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

    const { id } = req.params;
    const { names, nameUser, email, password, state, id_rol } = req.body; 

    const validationId = await User.findByPk(id)
    
    if (!validationId) {
        return res.status(200).json({
            msg: `El usuario con el id ${id} no existe`
        })    
    }

    const validationNameUser = await validateNameUser(nameUser, User)

    if (validationNameUser) {
        return res.status(200).json({
            msg: `El nombre de usuario ${nameUser} ya existe`
        })
    }

    const user = await User.update({ names, nameUser, email, password, state, id_rol }, {
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
    
    const validateId = await User.findByPk(id);

    if (!validateId) {
        return res.status(200).json({
            msg: `El usuario con el id ${id} no existe`
        })
    }
      
    const state = 0;
    await User.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `El usuario ha sido eliminado `
    })
}

