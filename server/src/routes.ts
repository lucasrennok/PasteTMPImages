import express from 'express';
import IdController from './controllers/IdController';

const routes = express.Router();
const idController = new IdController();

routes.post('/id', idController.create);

export default routes;
