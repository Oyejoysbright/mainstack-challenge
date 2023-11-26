import {model} from 'mongoose';
import {UserSchema} from '../schemas/UserSchema';

export const userModelName = 'user';
export const userTokenModelName = 'user_token';

export const UserModel = model(userModelName, UserSchema);
