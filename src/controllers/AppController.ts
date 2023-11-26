import express from 'express';
import {AppRoutes} from '../routes/AppRoutes';
import UserController from './UserController';
import LovController from './LovController';

const AppController = express.Router();

AppController.use(AppRoutes.USER, UserController);
AppController.use(AppRoutes.LOV, LovController);

export default AppController;
