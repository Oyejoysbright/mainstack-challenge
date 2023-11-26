import express from 'express';
import cors from 'cors';
import {AppConfigs} from './configs/app';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import {AppRoutes} from './routes/AppRoutes';
import CustomErrorHandler from '@tawol-tech/tinnie/response/CustomErrorHandler';
import {getEnv} from './configs';
import AppController from './controllers/AppController';
import {AuthConfigs, webSecurity} from './configs/auth';

const App = express();
/* init */
App.use(cookieParser(AuthConfigs.COOKIE_PARSER_KEY));
App.use(express.json());
App.use(express.text());
App.use(express.raw());
App.use(
    cors({
      credentials: true,
      origin: getEnv('ALLOWED_ORIGINS').split(','),
    })
);

App.use(webSecurity.authenticate); // Intercept request for authentication
App.use(express.urlencoded({extended: false}));
App.use(AppConfigs.APP_ROUTE, AppController);

// Load swagger UI
App.use(AppRoutes.SWAGGER, swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Custom Error Handler
App.use(CustomErrorHandler);

export default App;
