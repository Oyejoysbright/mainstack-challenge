import express, {NextFunction, Request, Response} from 'express';
import {schemaValidationMDW} from '@tawol-tech/tinnie/middlewares/schemaValidation';
import {ResponseService} from '@tawol-tech/tinnie/response/ResponseService';
import UserRoutes from '../routes/UserRoutes';
import {UserJoiSchema} from '../joi_schemas/UserJoiSchema';
import {AuthConfigs} from '../configs/auth';
import UserService from '../services/UserService';

const UserController = express.Router();

UserController.post(UserRoutes.REGISTER,
    schemaValidationMDW(UserJoiSchema.register),
    async (req, res, next) => {
      try {
        const rPayload = await UserService.register(req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

UserController.post(UserRoutes.LOGIN,
    schemaValidationMDW(UserJoiSchema.login),
    async (req, res, next) => {
      try {
        const rPayload = await UserService.login(req.body);
        res.cookie(AuthConfigs.COOKIE_KEY, rPayload.data.token, {
          signed: true,
          httpOnly: true,
        });
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

UserController.get(UserRoutes.REFRESH_TOKEN,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const rPayload = await UserService.refreshToken(req.params.token);
        res.cookie(AuthConfigs.COOKIE_KEY, rPayload.data.token, {
          signed: true,
          httpOnly: true,
        });
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

UserController.post(UserRoutes.LOGOUT,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const rPayload = await UserService.logout(req.body);
        res.cookie(AuthConfigs.COOKIE_KEY, '', {
          signed: true,
          httpOnly: true,
        });
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

UserController.put(UserRoutes.UPDATE,
    schemaValidationMDW(UserJoiSchema.updateProfile),
    async (req, res, next) => {
      try {
        const rPayload = await UserService.updateUserProfile(req.signedCookies, req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

export default UserController;
