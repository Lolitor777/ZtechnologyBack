import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs'

async function validateData(data: string, columnName: string) {
    return await User.findOne({
        where: {
            columnName: data
        }
    })
}

export const consultUser = async (req: Request, res: Response) =>{

    const user = await User.findAll();
    
    res.status(200).json({
        msg: 'Bienvenido a la ventana de usuarios',
        user
    })
}

export const consultActiveUser = async (req: Request, res: Response) =>{

    const user = await User.findAll({
        where: {
            state: 1
        }
    });
    
    res.status(200).json({
        msg: 'Bienvenido a la ventana de usuarios',
        user
    })
}

export const consultUserByNameUser = async (req: Request, res: Response) =>{ //buscar por nombre de usuario

    const { nameUser } = req.params;
    const user = await User.findAll({
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
        res.status(404).json({
            msg: `El usuario con el nombre ${nameUser} no existe`
        })
    }
}

export const saveUser = async (req: Request, res: Response) =>{ //creacion de usuarios

    try {
        
        let { names, nameUser, email, password, id_rol } = req.body;

        const userExist = await validateData(nameUser, 'nameUser')
        console.log("datos" + userExist)
        console.log(names, nameUser, email, password, id_rol);
        

        if (userExist) {
            return res.status(200).json({
                msg: `El nombre de usuario que eligió ya existe`
            })
        }

        if (!names || !nameUser || !email || !password || !id_rol) {
            return res.status(200).json({
                msg: `Por favor complete todos los datos`
            })
        }

        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const user = await User.create({ names, nameUser, email, password, id_rol });

        res.status(200).json({
            msg: `Se ha creado el usuario ${nameUser} correctamente!!`
        })

    } catch (error) {
        console.error(`error al crear usuario`)
        res.status(500).json({
            msg: `error al crear usuario`
        })
    }
}

export const updatePassword = async (req: Request, res: Response) => { //cambio de contrasenia de un usuario

    let {nameUser, password} = req.body;

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

    const { names, nameUser, email, password, state } = req.body;

    const user = await User.update({ names, email, password, state }, {
        where: {
            nameUser
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
        msg: `El usuario ha sido eliminado`
    })
}

