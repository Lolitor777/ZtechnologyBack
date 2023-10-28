import { Op, Model, DataTypes } from 'sequelize';
import db from '../db/conection';


const Customer = db.define('customer', {
    name: {
        type: DataTypes.STRING
    },

    document_number: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.BOOLEAN
    }
})

export default Customer;