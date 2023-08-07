export interface SignUpInfo {
  email: string;
  password: string;
  nickname: string;
  name: string;
  position: 'INDIVIDUAL' | 'COMPANY';
  loginType: 'UPLOG' | 'GOOGLE';
}
