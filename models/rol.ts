import { DataTypes } from 'sequelize';
import db from '../db/conection';

const Rol = db.define('role', {
    name: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.INTEGER
    }
})

export default Rol;