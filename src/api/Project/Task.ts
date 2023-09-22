// Task 생성
import {
  DragTaskIndexBody,
  FailTask,
  MenuTasks,
  StatusTaskData,
  TaskBody,
  TaskData,
  TaskStatus,
  UpdateTaskBody,
} from '@/typings/task.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';
import { commonResponse } from '@/typings';

// task 생성
export const createTask = async (data: TaskBody) => {
  try {
    const res: AxiosResponse<commonResponse | FailTask> = await instance.post('/tasks', data);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'create task fail';
  }
};

// task 삭제
export const deleteTask = async (taskId: number) => {
  try {
    const res: AxiosResponse<commonResponse | FailTask> = await instance.delete(`/tasks/${taskId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'delete task fail';
  }
};

// task status별 조회
export const statusTaskList = async (taskStatus: TaskStatus, projectId: number) => {
  try {
    const res: AxiosResponse<TaskData[]> = await instance.get(`/tasks/${taskStatus}/status`, {
      params: { projectId },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get task status list fail';
  }
};

// task 단일 조회
export const eachTask = async (taskId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.get(`/tasks/${taskId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'get each task fail';
  }
};

// task status 모두 조회
export const allStatusTaskList = async (projectId: number) => {
  try {
    const res: AxiosResponse<StatusTaskData> = await instance.get(
      `/tasks/allByStatus/${projectId}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'get all task status list fail';
  }
};

// task status로 나누지 않고 모두 조회
export const allTaskList = async (projectId: number) => {
  try {
    const res: AxiosResponse<TaskData[]> = await instance.get(`/tasks/allByStatus/${projectId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'get all task list fail';
  }
};

// 메뉴별로 task 전체 조회
export const menuTaskList = async (menuId: number) => {
  try {
    const res: AxiosResponse<MenuTasks> = await instance.get(`/menus/${menuId}/tasks`);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'get menu task list fail';
  }
};

// task 수정
export const editTask = async (data: UpdateTaskBody, taskId: number) => {
  try {
    const res: AxiosResponse<commonResponse | FailTask> = await instance.patch(
      `/tasks/${taskId}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task fail';
  }
};

export const updateTaskIndex = async (data: DragTaskIndexBody, taskStatus: TaskStatus) => {
  try {
    const res: AxiosResponse<TaskData[]> = await instance.patch(`/tasks/${taskStatus}/index`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'update task index fail';
  }
};
