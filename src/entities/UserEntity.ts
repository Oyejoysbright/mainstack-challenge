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
