import express from 'express';
import IdController from './controllers/IdController';

const routes = express.Router();
const idController = new IdController();

//Here are the routes that can be accessed
routes.post('/', idController.create);
routes.get('/', idController.index);

export default routes;
