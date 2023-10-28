import { Request, Response } from 'express';
import Customer from '../models/customer';


export const consultCustomer = async (req: Request, res: Response) =>{

    const customer = await Customer.findAll();

    res.status(200).json({
        msg: 'Bienvenido a la ventana de clientes',
        customer
    })
}

export const consultActiveCustomer = async (req: Request, res: Response) =>{

    const customer = await Customer.findAll({
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de clientes',
        customer
    })
}

export const consultCustomerByDocument = async (req: Request, res: Response) =>{

    const { document_number } = req.params;
    const customer = await Customer.findAll({
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

export const saveCustomer = async (req: Request, res: Response) => {

    const { name, document_number, email } = req.body;


    const customer = await Customer.create({ name, document_number, email});  

    res.status(200).json({
        msg: `El cliente ${name} fué creado con exitos`,
    })  
   
}

export const modifyCustomer = async(req: Request, res: Response) => {

    const { name, document_number, email, state } = req.body;

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


export const deleteCustomer = async(req: Request, res: Response) => {

    const { id } = req.params;
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