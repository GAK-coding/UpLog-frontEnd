import { instance } from '@/api';
import { AxiosResponse } from 'axios';
import {
  ChildGroup,
  ChildGroupMember,
  FailProject,
  ParentGroup,
  ParentGroupMember,
  Project,
} from '@/typings/project.ts';
import { ChangeLogBody, ChangeLogData, FailProduct } from '@/typings/product.ts';

export const getAllProductProjects = async (productId: number) => {
  const res: AxiosResponse<Project> = await instance.get(`/products/${productId}/projects`);
  return res.data;
};

export const createProject = async (data: { productId: number; version: string; link: string }) => {
  const { productId, version, link } = data;
  const res: AxiosResponse<Project | FailProject> = await instance.post(
    `/products/${productId}/projects`,
    {
      version,
      link,
    }
  );

  return res.data;
};

export const completeProject = async (data: { projectId: number; version: string }) => {
  const { projectId, version } = data;

  const res: AxiosResponse<{ version: string }> = await instance.patch(`/projects/${projectId}`, {
    version,
  });

  return res.data;
};

export const getParentGroups = async (projectId: number) => {
  try {
    const res: AxiosResponse<ParentGroup[]> = await instance.get(`/projects/${projectId}/teams`);

    return res.data;
  } catch (err) {
    return 'fail getProjectGroups';
  }
};

export const getParentGroupMembers = async (teamId: number) => {
  try {
    const res: AxiosResponse<ParentGroupMember[]> = await instance.get(`/teams/${teamId}/members`);

    return res.data;
  } catch (err) {
    return 'fail getParentGroupMembers';
  }
};

export const getChildGroups = async (teamId: number) => {
  try {
    const res: AxiosResponse<{ childTeamInfoDTOList: ChildGroup[] }> = await instance.get(
      `/teams/${teamId}/child-team`
    );

    return res.data;
  } catch (err) {
    return 'fail getProjectTeams';
  }
};

export const getChildGroupMembers = async (teamId: number) => {
  try {
    const res: AxiosResponse<{ verySimpleMemberInfoDTOList: ChildGroupMember[] }> =
      await instance.get(`/teams/${teamId}/child-team/members`);

    return res.data;
  } catch (err) {
    return 'fail getChildGroupMembers';
  }
};

export const createProjectTeam = async (data: {
  projectId: number;
  memberIdList: string[];
  name: string;
  parentTeamId: number | null;
  link: string;
}) => {
  try {
    const { projectId, memberIdList, name, parentTeamId, link } = data;

    const res: AxiosResponse<{ id: number; message?: string }> = await instance.post(
      `/projects/${projectId}/teams`,
      {
        memberIdList,
        name,
        parentTeamId,
        link,
      }
    );

    if (res.data.message === '프로젝트 내에서 팀 이름이 중복됩니다.') {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === '프로젝트 내에서 팀 이름이 중복됩니다.') return err.message;
      else return 'fail createProjectTeam';
    }
  }
};

export const addGroupMembers = async (data: {
  teamId: number;
  addMemberIdList: number[];
  link: string;
  memberInfo?: ParentGroupMember;
}) => {
  try {
    const { teamId, addMemberIdList, link } = data;
    const res: AxiosResponse<{ duplicatedMemberList: number[] }> = await instance.patch(
      `/teams/${teamId}`,
      {
        addMemberIdList,
        link,
      }
    );

    return res.data.duplicatedMemberList.length;
  } catch (err) {
    return 'fail addParentGroupMembers';
  }
};

// 변경이력 생성
export const createNewChangeLog = async (data: ChangeLogBody, projectId: number) => {
  try {
    const res: AxiosResponse<ChangeLogBody | FailProduct> = await instance.post(
      `/changedIssues/${projectId}`,
      data
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return 'fail createNewChangeLog';
  }
};

// 변경이력 조회
export const getChangeLogEachProject = async (projectId: number) => {
  const res: AxiosResponse<ChangeLogData[]> = await instance.get(
    `/changedIssues/${projectId}/issue`
  );

  return res.data;
};
