import {UserEntity} from '../mongo/user.entities';

export default class LoginDTO {
  userId: string;
  fullName: string;
  username: string;
  isVerified: boolean;
  token: string;
  refreshToken: string;
  firstName: string;
  lastName: string;

  constructor(data: UserEntity) {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.fullName = data.lastName +' '+ data.firstName;
    this.username = data.email;
    this.token = data.token ?? '';
    this.refreshToken = data.refreshToken ?? '';
    this.isVerified = data.isVerified;
  }
}
