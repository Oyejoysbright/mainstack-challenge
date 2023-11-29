import Bcrypt from '@tawol-tech/tinnie/encryptions/Bcrypt';
import CustomError from '@tawol-tech/tinnie/response/CustomError';
import {HttpStatus} from '@tawol-tech/tinnie/response/HttpStatus';
import {ResponseMessage} from '@tawol-tech/tinnie/response/ResponseMessage';
import JwtValidator from '@tawol-tech/tinnie/validators/JwtValidator';
import jwt from 'jsonwebtoken';
import UserRepo from '../repos/UserRepo';
import {AuthConfigs} from '../configs/auth';
import {ITokenData, UserEntity} from '../interfaces/UserInterfaces';

export default class {
  protected static async validateUser(email: string, password?: string) {
    const user = await UserRepo.getByEmail(email);
    if (!user) {
      throw new CustomError(ResponseMessage.USERNAME_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    if (password && !Bcrypt.isMatch(password, user.password)) {
      throw new CustomError(ResponseMessage.WRONG_PASSWORD, HttpStatus.CONFLICT);
    }
    return user;
  }

  static async getTokenUser(signedCookies: Record<string, string>) {
    const token = signedCookies[AuthConfigs.COOKIE_KEY];
    const userData = JwtValidator.verifyToken(token, AuthConfigs.TOKEN_KEY) as ITokenData;
    const user = await UserRepo.getByEmail(userData.username);
    if (!user) {
      throw new CustomError(ResponseMessage.USERNAME_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  protected static getTokenData<T = any>(token: string) {
    return JwtValidator.verifyToken(token, AuthConfigs.TOKEN_KEY) as T;
  }

  protected static generateUserToken = (
      user: UserEntity, withRereshToken?: boolean): UserEntity => {
    const tokenData: ITokenData = {username: user.email, userId: user.id};
    user.token = jwt.sign(tokenData,
        AuthConfigs.TOKEN_KEY,
        {
          expiresIn: AuthConfigs.TOKEN_EXPIRATION_TIME,
        });
    if (withRereshToken) {
      user.refreshToken = jwt.sign(tokenData,
          AuthConfigs.TOKEN_KEY,
          {
            expiresIn: AuthConfigs.REFRESH_TOKEN_EXPIRATION_TIME,
          });
    }
    return user;
  };
}
