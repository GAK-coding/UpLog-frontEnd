import { TaskData } from '@/typings/task.ts';

export function setClipBoardUrl(task: TaskData, location: string): string {
  const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
  const DEV_FRONTEND_URL = import.meta.env.VITE_DEV_FRONTEND_URL;
  const DEPLOYMENT_FRONTEND_URL = import.meta.env.VITE_DEPLOYMENT_FRONTEND_URL;

  const baseURL = isDeployment ? DEPLOYMENT_FRONTEND_URL : DEV_FRONTEND_URL;

  return `${baseURL}${location}/menu/${task.menuName}/task/${task.id}`;
}
