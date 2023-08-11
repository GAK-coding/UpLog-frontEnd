// Task 생성
import { FailTask, TaskBody } from '@/typings/task.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

export const createTask = async (data: TaskBody) => {
  try {
    const res: AxiosResponse<FailTask> = await instance.post('/tasks', data);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'create task fail';
  }
};
