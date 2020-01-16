import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

class App {
    constructor() {
        this.server = express();
        this.database();
        this.middlewares();
        this.cors();
        this.routes();
    }

    database() {
        mongoose.connect('mongodb+srv://brunobannwart:semanaomnistack@omnistack-a2zas.mongodb.net/omm?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    middlewares() {
        this.server.use(express.json());
    }

    cors() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;