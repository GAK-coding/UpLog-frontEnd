import { TaskData } from '@/typings/task.ts';

export function checkTaskEditValue(editTask: TaskData): boolean {
  if (editTask.taskName === '') {
    return false;
  }
  if (editTask.targetMember.id === 0) {
    return false;
  }
  if (editTask.menuId === 0) {
    return false;
  }
  if (editTask.projectTeamId === 0) {
    return false;
  }
  if (editTask.startTime === '' || editTask.endTime === '') {
    return false;
  }

  return true;
}
