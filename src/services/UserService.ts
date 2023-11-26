import Bcrypt from '@tawol-tech/tinnie/encryptions/Bcrypt';
import CustomError from '@tawol-tech/tinnie/response/CustomError';
import {HttpStatus} from '@tawol-tech/tinnie/response/HttpStatus';
import {ResponseBuilder} from '@tawol-tech/tinnie/response/ResponseBody';
import {ResponseMessage} from '@tawol-tech/tinnie/response/ResponseMessage';
import {
  ILoginRequest,
  IUserRegisterReq,
  IUserUpdateReq,
} from '../interfaces/UserInterfaces';
import UserHelperService from './UserHelperService';
import UserRepo from '../repos/UserRepo';
import LoginDTO from '../dtos/LoginDTO';
import UserDTO from '../dtos/UserDTO';

export default class UserService extends UserHelperService {
  static async register(payload: IUserRegisterReq) {
    let user = await UserRepo.getByEmail(payload.email);
    if (user) {
      throw CustomError.alreadyExist();
    }
    payload.password = Bcrypt.encryptSync(payload.password);
    user = await UserRepo.create(payload);
    return ResponseBuilder.getInstance().created(ResponseMessage.REGISTERED, new UserDTO(user));
  }

  static async login(data: ILoginRequest): Promise<ResponseBuilder> {
    const user = await UserRepo.getByEmail(data.username);
    if (user && Bcrypt.isMatch(data.password, user.password)) {
      if (!user.hasAccess) {
        throw CustomError.restricted();
      }
      this.generateUserToken(user, true);
      await user.save();
      return ResponseBuilder.getInstance().ok(ResponseMessage.LOGIN_SUCCEED, new LoginDTO(user));
    } else {
      throw new CustomError(ResponseMessage.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }
  }

  static async refreshToken(token: string): Promise<ResponseBuilder> {
    const user = await UserRepo.getByRefreshToken(token);
    if (user) {
      this.generateUserToken(user, true);
      await user.save();
      return ResponseBuilder.getInstance().ok('Token Refresh', new LoginDTO(user));
    } else {
      throw new CustomError(ResponseMessage.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
    }
  }

  static async logout(token: string): Promise<ResponseBuilder> {
    const user = await UserRepo.getByToken(token);
    if (user) {
      user.token = '';
      user.refreshToken = '';
      await user.save();
      return ResponseBuilder.getInstance().ok('Logout successful', new LoginDTO(user));
    } else {
      throw new CustomError(ResponseMessage.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
    }
  }

  static async updateUserProfile(signedCookies: any, payload: IUserUpdateReq) {
    const user = await this.getTokenUser(signedCookies);
    await UserRepo.update(user.id, payload);
    return ResponseBuilder.getInstance().ok(ResponseMessage.ACCOUNT_UPDATED);
  }
}
