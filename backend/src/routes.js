import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.get('/users', UserController.index);

routes.get('/search', SearchController.index);

export default routes;