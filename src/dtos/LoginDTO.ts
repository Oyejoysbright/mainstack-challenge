import {UserEntity} from '../interfaces/UserInterfaces';

export default class LoginDTO {
  fullName: string;
  username: string;
  isVerified: boolean;
  token: string;
  refreshToken: string;
  firstName: string;
  lastName: string;

  constructor(data: UserEntity) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.fullName = data.lastName +' '+ data.firstName;
    this.username = data.email;
    this.token = data.token ?? '';
    this.refreshToken = data.refreshToken ?? '';
    this.isVerified = data.isVerified;
  }
}
