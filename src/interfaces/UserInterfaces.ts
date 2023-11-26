
export interface IUserUpdateReq {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}

export interface IUserRegisterReq extends IUserUpdateReq {
    password: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IUpdatePersonalProfileReq {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface ITokenData {
    username: string;
    userId: string;
  }

