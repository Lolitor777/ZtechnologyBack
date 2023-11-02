import { Request, Response } from 'express';
import Quote from '../models/quote';
import Product from '../models/product';
import Customer from '../models/customer';
import User from '../models/user';


export const consultQuote = async (req: Request, res: Response) =>{ //consultar cotizaciones

    const quote = await Quote.findAll({
       attributes: ['numeration', 'shipping_price', 'state', 'amount_discount', 'porcentage_discount', 'sub_total', 'total'],
       include: [{
            model: Product,
            attributes: ['description']
       },
        {
            model: User,
            attributes: ['names']
        },
        {
            model: Customer,
            attributes: ['name']
        }]
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de cotizaciones',
        quote
    })
}

export const consultActiveQuote = async (req: Request, res: Response) =>{

    const quote = await Quote.findAll({
        attributes: ['numeration', 'shipping_price', 'amount_discount', 'porcentage_discount', 'sub_total', 'total'],
       include: [{
            model: Product,
            attributes: ['description']
       },
        {
            model: User,
            attributes: ['names']
        },
        {
            model: Customer,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de cotizaciones',
        quote
    })
}

export const consultQuoteById = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    const quote = await Quote.findAll({
        where: {
            id
        }
    })

    if (quote.length > 0) {
        res.status(200).json({
            quote
        })
    }
    else {
        res.status(404).json({
            msg: `Este usuario no tiene cotizaciones`
        })
    }
}

export const saveQuote = async (req: Request, res: Response) => {

    let { numeration, 
        shipping_price,  
        state, 
        amount_discount, 
        porcentage_discount,
        total,
        id_product, 
        id_user,
        id_customer 
    } = req.body;
    


    const quote = await Quote.create({ numeration, shipping_price, state, amount_discount, porcentage_discount, total, 
        id_product, id_user, id_customer });

    res.status(200).json({
        msg: `La cotización número ${numeration} se ha creado exitosamente`
    })
}

export const modifyQuote = async (req: Request, res: Response) => {

    const { 
            id,
            numeration, 
            shipping_price, 
            sub_total, 
            total, 
            state, 
            amount_discount, 
            porcentage_discount, 
            id_product, 
            id_user,
            id_customer 
        } = req.body;

    const quote = await Quote.update({ numeration, shipping_price, sub_total, total, state, amount_discount, porcentage_discount, 
        id_product, id_user, id_customer }, 
        {
            where:{
                id
            }
        });

    res.status(200).json({
        msg: `La cotización se ha modificado exitosamente`
    })

}

export const deleteQuote = async(req: Request, res: Response) => {

    const { id } = req.params;
    const state = 0;
    
    Quote.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `La cotizacion con id ${id} se ha eliminado`
    })
}