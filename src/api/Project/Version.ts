import { instance } from '@/api';
import { AxiosResponse } from 'axios';
import { Products } from '@/typings/project.ts';

export const getAllProductProjects = async (productId: number) => {
  try {
    const res: AxiosResponse<Products> = await instance.get(`/products/${productId}/projects`);
    return res.data;
  } catch (err) {
    return 'fail get all product projects';
  }
};

export const createProject = async (data: { productId: number; version: string; link: string }) => {
  try {
    const { productId, version, link } = data;
    const res: AxiosResponse<Products> = await instance.post(`/products/${productId}/projects`, {
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
