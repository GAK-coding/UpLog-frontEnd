export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignUpInfo extends LoginInfo {
  nickname: string;
  name: string;
  position: 'INDIVIDUAL' | 'COMPANY';
  loginType: 'UPLOG';
}

export interface GetUserInfo extends Omit<SignUpInfo, 'loginType' | 'password'> {
  id: number;
  image: string | null;
  accessToken: string;
}

export interface FailResponse {
  httpStatus: 'CONFLICT';
  message: string;
}

export interface SaveUserInfo extends Omit<GetUserInfo, 'accessToken' | 'refreshToken'> {}

export interface targetMemberInfo {
  id: number;
  name: string;
  nickname: string;
  image?: string | null;
}

export interface EmailInfo {
  email: string;
  type: number;
  link?: string;
  powerType?: string;
}
