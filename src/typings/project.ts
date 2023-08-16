import { changeLog } from '@/typings/product.ts';

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
}

export interface Release extends Project {
  // TODO: 백엔드에서 날짜 보내주면 받아야됨
  date?: string;
  contents?: changeLog[];
  // id: number;
  // version: string;
  // projectStatus: 'PROGRESS_IN' | 'PROGRESS_COMPLETE';
}

export interface ProjectGroup {
  id: number;
  teamName: string;
  depth: number;
}

export interface SaveProjectInfo extends Project {}
