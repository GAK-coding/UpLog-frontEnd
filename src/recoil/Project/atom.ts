import { atom } from 'recoil';
import { GroupMember, Release } from '@/typings/project.ts';

// 그룹 멤버 리스트

// 프로젝트들
export const eachProductProjects = atom<Release[]>({ key: 'eachProductProjects', default: [] });
