import {ObjectId} from 'mongodb';
import {IUserRegisterReq, IUserUpdateReq} from '../interfaces/UserInterfaces';
import {UserModel} from '../models/UserModel';

export default class UserRepo {
  static async getByEmail(email: string) {
    return UserModel.findOne({email: email});
  }

  static async create(payload: IUserRegisterReq, isVerified?: boolean) {
    return UserModel.create({...payload, isVerified: isVerified});
  }

  static async update(id: ObjectId, data: IUserUpdateReq) {
    return UserModel.findByIdAndUpdate(id, data).lean();
  }

  static async getByRefreshToken(token: string) {
    return UserModel.findOne({refreshToken: token});
  }

  static async getByToken(token: string) {
    return UserModel.findOne({token: token});
  }
}
