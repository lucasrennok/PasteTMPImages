import express from 'express';
import routes from './routes';
import cors from 'cors';

//Express create an API
const app = express();
app.use(cors());

//Limit: 20MB
app.use(express.urlencoded({limit: '20mb', extended: true}))
app.use(express.json({limit: '20mb'}));

//Accept the routes at 'routes.ts'
app.use(routes);

//Port used
app.listen(3333);
