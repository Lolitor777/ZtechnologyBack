import { DataTypes } from 'sequelize';
import db from '../db/conection';
import Product from './product';
import User from './user';
import Customer from './customer';

const Quote = db.define('quote', {
    numeration: {
        type: DataTypes.INTEGER
    },

    shipping_price: {
        type: DataTypes.INTEGER
    },

    state: {
        type: DataTypes.BOOLEAN
    },

    amount_discount: {
        type: DataTypes.INTEGER
    },

    porcentage_discount: {
        type: DataTypes.INTEGER
    },

    sub_total: {
        type: DataTypes.INTEGER
    },

    total: {
        type: DataTypes.INTEGER
    },

    id_product: {
        type: DataTypes.INTEGER
    },
    
    id_user: {
        type: DataTypes.INTEGER
    },

    id_customer: {
        type: DataTypes.INTEGER
    }
})


Quote.belongsTo(Product, {
    foreignKey: 'id_product'
})

Quote.belongsTo(User, {
    foreignKey: 'id_user'
})

Quote.belongsTo(Customer, {
    foreignKey: 'id_customer'
})

export default Quote;