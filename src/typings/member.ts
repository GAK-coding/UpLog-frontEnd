export interface SignUpInfo {
  email: string;
  password: string;
  nickname: string;
  name: string;
  position: 'INDIVIDUAL' | 'COMPANY';
  loginType: 'UPLOG' | 'GOOGLE';
}

export interface targetMemberInfo {
  id: number;
  name: string;
  nickname: string;
  image: string;
}
