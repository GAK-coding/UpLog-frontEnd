// Task 생성
import {
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

// task 생성
export const createTask = async (data: TaskBody) => {
  try {
    const res: AxiosResponse<TaskData | FailTask> = await instance.post('/tasks', data);

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
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task fail';
  }
};

// task 수정 (date, title, taskTeam, target-Member, status, menu, content)
export const editTaskDate = async (
  taskId: number,
  updateStartTime: string,
  updateEndTime: string
) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/date`, {
      updateStartTime: updateStartTime,
      updateEndTime: updateEndTime,
    });

    console.log('taskDate', updateStartTime, updateEndTime);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task date fail';
  }
};

export const editTaskTitle = async (taskId: number, updatetaskName: string) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      updatetaskName: updatetaskName,
    });

    console.log('taskTitle', updatetaskName);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task title fail';
  }
};

export const editTaskTeam = async (taskId: number, updateTeamId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      updateTeamId: updateTeamId,
    });

    console.log('taskTeam', updateTeamId);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task team fail';
  }
};

export const editTaskTargetMember = async (taskId: number, updateTargetMemberId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      updateTargetMemberId: updateTargetMemberId,
    });

    console.log('tasktargetMember', updateTargetMemberId);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task target member fail';
  }
};

export const editTaskStatus = async (taskId: number, taskStatus: TaskStatus) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      taskStatus: taskStatus,
    });

    console.log('taskStatus', taskStatus);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task status fail';
  }
};

export const editTaskMenu = async (taskId: number, updateMenuId: number) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      updateMenuId: updateMenuId,
    });

    console.log('taskMenu', updateMenuId);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task menu fail';
  }
};

export const editTaskContent = async (taskId: number, updateContent: string) => {
  try {
    const res: AxiosResponse<TaskData> = await instance.patch(`/tasks/${taskId}/title`, {
      updateContent: updateContent,
    });

    console.log('taskContent', updateContent);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit task content fail';
  }
};
