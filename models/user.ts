import { DataTypes } from 'sequelize';
import db from '../db/conection';
import Rol from './rol';

const User = db.define('user', {
    names: {
        type: DataTypes.STRING
    },
    
    nameUser: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.BOOLEAN
    },

    id_rol: {
        type: DataTypes.BIGINT
    }
}) 

User.belongsTo(Rol, {
    foreignKey: "id_rol"
})

export default User;