import express from 'express';
import IdController from './controllers/IdController';

const routes = express.Router();
const idController = new IdController();

routes.post('/', idController.create);
routes.get('/', idController.index);

export default routes;
