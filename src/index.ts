import express, { Request, Response } from 'express';
import cookie from 'cookie-session';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie({ keys: ['lalass'] }));

app.use(router);
app.use(AppRouter.getInstance());

app.listen(5000, () => console.log('app listening on port 5000'));
