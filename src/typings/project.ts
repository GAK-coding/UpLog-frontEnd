export interface SubGroup {
  [key: string]: string[];
}

export interface MenuInfo {
  id: number;
  name: string;
}

export interface SelectMenu {
  value: string;
  label: string;
}

export interface GroupMember {
  position: 'master' | 'leader' | 'member';
  profile: string | null;
  nickName: string;
  name: string;
  email: string;
  group: string | null;
}

export interface GroupInfo {
  id: number;
  name: string;
}
