// Task 생성
import { FailTask, TaskBody, TaskData, TaskStatus } from '@/typings/task.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

// task 생성
export const createTask = async (data: TaskBody) => {
  try {
    const res: AxiosResponse<FailTask> = await instance.post('/tasks', data);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'create task fail';
  }
};

// task 삭제
export const deleteTask = async (taskId: number) => {
  try {
    const res: AxiosResponse<string> = await instance.delete(`/tasks/${taskId}`);

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
    return 'get task info fail';
  }
};

// task status 모두 조회

// task status로 나누지 않고 모두 조회

// task 수정 (date, title, taskTeam, target-Member, status, menu, content)
export const editTaskDate = async (
  taskId: number,
  updateStartTime: string,
  updateEndTime: string
) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/date`, {
      updateStartTime,
      updateEndTime,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task date fail';
  }
};

export const editTaskTitle = async (taskId: number, updatetaskName: string) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(
      `/tasks/${taskId}/title`,
      updatetaskName
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task title fail';
  }
};

export const editTaskTeam = async (taskId: number, updateTeamId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(
      `/tasks/${taskId}/title`,
      updateTeamId
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task team fail';
  }
};

export const editTaskTargetMember = async (taskId: number, updateTargetMemberId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(
      `/tasks/${taskId}/title`,
      updateTargetMemberId
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task target member fail';
  }
};

export const editTaskStatus = async (taskId: number, taskStatus: TaskStatus) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, taskStatus);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task status fail';
  }
};

export const editTaskMenu = async (taskId: number, updateMenuId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(
      `/tasks/${taskId}/title`,
      updateMenuId
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task menu fail';
  }
};

export const editTaskContent = async (taskId: number, updateContent: string) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(
      `/tasks/${taskId}/title`,
      updateContent
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task content fail';
  }
};
