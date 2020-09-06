import express from 'express';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser'

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.json({limit: '50mb'}));

app.use(routes);

app.listen(3333);
