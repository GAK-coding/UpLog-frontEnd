export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignUpInfo extends LoginInfo {
  nickname: string;
  name: string;
  position: 'INDIVIDUAL' | 'COMPANY';
  loginType: 'UPLOG' | 'GOOGLE';
}

export interface GetUserInfo extends Omit<SignUpInfo, 'loginType' | 'password'> {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface SaveUserInfo extends Omit<GetUserInfo, 'accessToken' | 'refreshToken'> {}

export interface targetMemberInfo {
  id: number;
  name: string;
  nickname: string;
  image: string;
}
