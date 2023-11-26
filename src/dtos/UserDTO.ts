import {UserEntity} from '../entities/UserEntity';

export default class UserDTO {
  userId: string;
  firstName: string;
  lastName: string;

  constructor(user: UserEntity) {
    this.userId = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
