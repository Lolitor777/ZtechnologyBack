import dotenv from 'dotenv';
import express, { Application }  from 'express';
import db from '../db/conection';

import userRoutes from '../routes/user';
import customerRoutes from '../routes/customer';
import productRoutes from '../routes/product';
import quoteRoutes from '../routes/quote';
import loginRoutes from '../routes/login';
import { json } from 'sequelize';
dotenv.config();

class Server {
    private app: Application;
    private port: string | undefined;
    private apiPaths = {
        user: '/api/user',
        customer: '/api/customer',
        product: '/api/product',
        quote: '/api/quote',
        login: '/api/login'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConection();
        this.middlewares();
        this.routes();
    }

    async dbConection() {
        try {
            await db.authenticate()
            console.log('database online');          
        } catch (error) {
            console.log(error);          
        }
    }

    middlewares() {
        //lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.customer, customerRoutes);
        this.app.use(this.apiPaths.product, productRoutes);
        this.app.use(this.apiPaths.quote, quoteRoutes);
        this.app.use(this.apiPaths.login, loginRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
        console.log(`Corriendo en el puerto: ${this.port}`);
        });
    }
}

export default Server;