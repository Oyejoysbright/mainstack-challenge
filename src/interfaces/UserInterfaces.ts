export interface UserEntity {
    reference: string;
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    password: string;
    token: string;
    refreshToken: string;
    hasAccess: boolean;
    isVerified: boolean;
  }

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

