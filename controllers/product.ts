import { Request, Response } from 'express';
import Product from '../models/product';


export const consultProduct = async (req: Request, res: Response) =>{ //consultar todos los productos

    const product = await Product.findAll({
        attributes: ['id', 'type', 'description', 'code', 'price', 'amount', 'state'],
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: 'Bienvenido a la ventana de productos',
        product
    })
}

export const consultActiveProduct = async (req: Request, res: Response) =>{ //consultar los productos que no se han agotado 

    const product = await Product.findAll({
        attributes: ['id', 'type', 'description', 'code', 'price', 'amount'],
        where: {
            state: 1
    }
})

    res.status(200).json({
        msg: 'Bienvenido a la ventana de productos',
        product
    })
}

export const consultProductById = async (req: Request, res: Response) => { //consultar producto por id

    const { id } = req.params;

    const product = await Product.findByPk(id)

    if (product) {
        res.status(200).json({
            product
        })
    }
    else{
        res.status(404).json({
            msg: `El producto con el id ${id} no existe aún`
        })
    }
}

export const saveProduct = async (req:Request, res: Response) => { //crear un producto

    const { type, description, code, price, amount } = req.body;

    const product = await Product.create({ type, description, code, price, amount });

    res.status(200).json({
        msg: `Se ha creado el producto exitosamente, su id es ${product.dataValues.id}`
    })
}

export const modifyProduct = async (req: Request, res: Response) => { //modificar un producto

    const { id, type, description, price, amount} = req.body;
    
    const product = await Product.update({ type, description, price, amount},{
        where: {
            id
        }
    })
    
    res.status(200).json({
        msg: `El producto se ha modificado con éxito`
    })
    
}


export const deleteProduct = async(req: Request, res: Response) => { //eliminar un producto

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