import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

class App {
    constructor() {
        this.server = express();
        this.database();
        this.middlewares();
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

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;