import { DataTypes } from 'sequelize';
import db from '../db/conection';

const Product = db.define('product', {
    type: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    },

    code: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.INTEGER
    },

    amount: {
        type: DataTypes.INTEGER
    },

    state: {
        type: DataTypes.BOOLEAN
    }
})

export default Product;