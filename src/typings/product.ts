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
