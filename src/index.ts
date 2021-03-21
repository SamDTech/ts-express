import express, { Request, Response } from 'express';
import cookie from 'cookie-session';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie({keys: ['lalass']}));

app.use('/', router);

app.listen(5000, () => console.log('app listening on port 5000'));
