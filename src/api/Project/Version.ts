import { instance } from '@/api';
import { AxiosResponse } from 'axios';
import { Project, ProjectGroup, ProjectTeams } from '@/typings/project.ts';

export const getAllProductProjects = async (productId: number) => {
  try {
    const res: AxiosResponse<Project> = await instance.get(`/products/${productId}/projects`);
    return res.data;
  } catch (err) {
    return 'fail get all product projects';
  }
};

export const createProject = async (data: { productId: number; version: string; link: string }) => {
  try {
    const { productId, version, link } = data;
    const res: AxiosResponse<Project> = await instance.post(`/products/${productId}/projects`, {
      version,
      link,
    });

    return res.data;
  } catch (err) {
    return 'fail create project';
  }
};

export const completeProject = async (data: { projectId: number; version: string }) => {
  try {
    const { projectId, version } = data;

    const res: AxiosResponse<{ version: string }> = await instance.patch(`/projects/${projectId}`, {
      version,
    });

    return res.data;
  } catch (err) {
    return 'fail complete project';
  }
};

export const getProjectGroups = async (projectId: number) => {
  try {
    const res: AxiosResponse<ProjectGroup[]> = await instance.get(`/projects/${projectId}/teams`);

    return res.data;
  } catch (err) {
    return 'fail getProjectGroups';
  }
};

export const getProjectTeams = async (teamId: number) => {
  try {
    const res: AxiosResponse<{ childTeamInfoDTOList: ProjectTeams[] }> = await instance.get(
      `/teams/${teamId}/child-team`
    );

    return res.data;
  } catch (err) {
    return 'fail getProjectTeams';
  }
};
