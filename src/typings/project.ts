import { ChangeLogBody } from '@/typings/product.ts';

export interface SubGroup {
  [key: string]: string[];
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

export interface Project {
  id: number;
  version: string;
  projectStatus: 'PROGRESS_IN' | 'PROGRESS_COMPLETE';
  endDate: string;
}

export interface FailProject {
  httpStatus: string;
  message: string;
}

export interface Release extends Project {
  // TODO: 백엔드에서 날짜 보내주면 받아야됨
  date?: string;
  contents?: ChangeLogBody[];
  // id: number;
  // version: string;
  // projectStatus: 'PROGRESS_IN' | 'PROGRESS_COMPLETE';
}

export interface ParentGroup {
  id: number;
  teamName: string;
  depth: number;
}

export interface ParentGroupMember {
  memberId: number;
  memberEmail: string;
  memberName: string;
  memberNickname: string;
  powerType: string;
  delStatus?: boolean;
}

export interface ChildTeamInfoDTO {
  teamId: number;
  teamName: string;
  depth: number;
}

export interface ChildGroup {
  teamId: number;
  teamName: string;
  depth: number;
  childTeamInfoDTOList: ChildTeamInfoDTO[];
}

export interface ParentGroupWithStates extends ParentGroup {
  isHover: boolean;
  isOpen: boolean;
}

export interface SaveProjectInfo extends Project {}

// 자식 팀의 멤버 조회
export interface ChildGroupMember {
  id: number;
  image: string | null;
  name: string;
  nickname: string;
}

//채팅
export interface ChatMessage {
  image: string | null;
  name: string;
  nickname: string;
  time: string;
  message: string;
}

export interface ChatList {
  name: string;
  chats: {
    date: string;
    messages: ChatMessage[];
  }[];
}
