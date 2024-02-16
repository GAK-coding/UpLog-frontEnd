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
  httpStatus: string;
  message: string;
}

export interface UserInfo extends Omit<GetUserInfo, 'accessToken' | 'refreshToken'> {}

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

// mypage에서 정보 수정
export interface NewUserInfo {
  newName: string | null;
  newNickname: string | null;
  image: string | null;
}

// mypage에서 비밀번호 변경
export interface EditPassword {
  newPassword: string;
  password: string;
}
