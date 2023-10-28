import { Request, Response } from 'express';
import Product from '../models/product';


export const consultProduct = async (req: Request, res: Response) =>{

    const product = await Product.findAll();

    res.status(200).json({
        msg: 'Bienvenido a la ventana de productos',
        product
    })
}

export const consultActiveProduct = async (req: Request, res: Response) =>{

    const product = await Product.findAll({
        where: {
            state: 1
    }
})

    res.status(200).json({
        msg: 'Bienvenido a la ventana de productos',
        product
    })
}

export const consultProductByCode = async (req: Request, res: Response) => {

    const { code } = req.params;

    const product = await Product.findAll({
        where: {
            code
        }
    })

    if (product.length > 0) {
        res.status(200).json({
            product
        })
    }
    else{
        res.status(404).json({
            msg: `El producto con el código ${code} no existe aún`
        })
    }
}

export const saveProduct = async (req:Request, res: Response) => {

    const { type, description, code, price, amount } = req.body;

    const product = await Product.create({ type, description, code, price, amount });

    res.status(200).json({
        msg: `Se ha creado el producto con codigo ${code} exitosamente, su id es ${product.dataValues.id}`
    })
}

export const modifyProduct = async (req: Request, res: Response) => {

    const { type, description, code, price, amount, state } = req.body;

    const product = await Product.update({ type, description, price, amount, state },
        {
            where: {
                code
            }
        })

    res.status(200).json({
        msg: `El producto se ha modificado con éxito`
    })
}


export const deleteProduct = async(req: Request, res: Response) => {

    const { id } = req.params;
    const state = 0;
    
    Product.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({
        msg: `El producto con el id ${id} ha sido eliminado`
    })
}