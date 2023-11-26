/* eslint-disable no-invalid-this */
import {Schema} from 'mongoose';
import {UserEntity} from '../entities/UserEntity';

export const UserSchema = new Schema<UserEntity>({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: {type: String, required: true, unique: true},
  city: String,
  state: String,
  country: String,
  postalCode: String,
  password: String,
  token: String,
  refreshToken: String,
  isVerified: {type: Boolean, default: false},
  hasAccess: {type: Boolean, default: true},
}, {
  timestamps: true,
});

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});
