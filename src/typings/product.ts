export interface ProductInfo {
  id: number;
  draggableId: string;
  name: string;
  image?: string;
  // TODO : master, client type user info로 변경하기
  master: string;
  client: string;
}

// ReleaseNote.tsx에서 사용
export type changeType = 'Feature' | 'Changed' | 'Deprecated' | 'New' | 'Fixed';

export interface changeLog {
  type: changeType;
  content: string;
}

export interface Release {
  status: string;
  version: string;
  date: string;
  contents: changeLog[];
}

export interface ProductMember {
  position: 'master' | 'leader' | 'member';
  profile: string | null;
  nickName: string;
  name: string;
  email: string;
  // 케밥 버튼을 위한 변수이며 프론트에서 추가해줘야됨
  isOpen: boolean;
}
