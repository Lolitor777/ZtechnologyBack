import { Request, Response } from 'express';
import Customer from '../models/customer';


export const consultCustomer = async (req: Request, res: Response) =>{  //consultar todos los clientes

    const customer = await Customer.findAll({
        attributes: ['id', 'name', 'document_number', 'email', 'state'],
        
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de clientes',
        customer
    })
}

export const consultActiveCustomer = async (req: Request, res: Response) =>{ //consultar clientes activos

    const customer = await Customer.findAll({
        attributes: ['id', 'name', 'document_number', 'email'],    
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de clientes',
        customer
    })
}

export const consultCustomerByDocument = async (req: Request, res: Response) =>{ // consultar cliente por numero de documento

    const { document_number } = req.params;

    const validateDocument = await Customer.findOne({
        where: {
            document_number
        }
    })

    if (!validateDocument) {
        return res.status(200).json({
            msg: `El numero de documento ${document_number} no se encuentra registrado`
        })
    }

    const customer = await Customer.findAll({     
        attributes: ['id', 'name', 'document_number', 'email', 'state'], 
       where: {
           document_number
       }
   });

   if (customer.length > 0) {
       res.status(200).json({
       customer
       })
   }
   else {
       res.status(404).json({
           msg: `El cliente con el documento ${document_number} no existe`
       })
   }
    
}

export const saveCustomer = async (req: Request, res: Response) => { //crear un cliente

    let { name, document_number, email } = req.body;

    if (!name || !document_number || !email) {
        return res.status(200).json({
            msg: `Por favor rellene todos los campos`
        })
    }

    const validateDocument = await Customer.findOne({
        where: {
            document_number
        }
    })

    if (validateDocument) {
        return res.status(200).json({
            msg: `El numero de documento ${document_number} ya está registrado`
        })
    }

    const validateEmail = await Customer.findOne({
        where: {
            email
        }
    })

    if (validateEmail) {
        return res.status(200).json({
            msg: `El correo electrónico ${email} ya está en uso`
        })
    }

    const customer = await Customer.create({ name, document_number, email});  

    res.status(200).json({
        msg: `El cliente ${name} fué creado con exitos`,
    })   
}

export const modifyCustomer = async(req: Request, res: Response) => { //modificar los datos de un cliente

    const { name, document_number, email, state } = req.body;

    const validateDocument = await Customer.findOne({
        where: {
            document_number
        }
    })

    if (validateDocument) {

        const validateEmail = await Customer.findOne({
            where: {
                email
            }
        })
    
        if (validateEmail) {
            return res.status(200).json({
                msg: `El correo electrónico ${email} no está disponible`
            })
        }
        else {
            const customer = await Customer.update({ name, email, state }, 
                {
                    where: {
                        document_number
                    }
                })
            res.status(200).json({
                msg: `La cuenta ha sido modificada correctamente`
            })
        }  
    } 
    else {
        res.status(200).json({
            msg: `El numero de documento ${document_number} no se encuentra registrado`
        })
    }

    
}


export const deleteCustomer = async(req: Request, res: Response) => { //Eliminar un cliente

    const { id } = req.params;

    const validateId = await Customer.findOne({
        where: {
            id
        }
    })

    if (!validateId) {
        return res.status(200).json({
            msg: `El cliente con el id ${id} no existe`
        })
    }

    const state = 0; 
    Customer.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `El cliente con el id ${id} ha sido eliminado`
    })
}