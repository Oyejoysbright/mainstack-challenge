import Joi from 'joi';
import {JoiValidator} from '@tawol-tech/tinnie/validators/JoiValidator';
import {
  ILoginRequest,
  IUserRegisterReq,
  IUserUpdateReq,
} from '../interfaces/UserInterfaces';

export const UserJoiSchema = {
  register: Joi.object<IUserRegisterReq>({
    city: Joi.string(),
    country: Joi.string(),
    email: Joi.custom(JoiValidator.emailAddress).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.custom(JoiValidator.password).required(),
    phoneNumber: Joi.custom(JoiValidator.phoneNumber),
    postalCode: Joi.custom(JoiValidator.postalCode),
    state: Joi.string(),
  }),

  login: Joi.object<ILoginRequest>({
    username: Joi.custom(JoiValidator.emailAddress).required(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object<IUserUpdateReq>({
    city: Joi.string(),
    country: Joi.string(),
    email: Joi.custom(JoiValidator.emailAddress),
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.custom(JoiValidator.phoneNumber),
    postalCode: Joi.custom(JoiValidator.postalCode),
    state: Joi.string(),
  }),
};
