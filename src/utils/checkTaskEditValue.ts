import { UpdateTaskBody } from '@/typings/task.ts';

export function checkTaskEditValue(editTask: UpdateTaskBody): boolean {
  if (editTask.updateTaskName === '') {
    return false;
  }
  if (editTask.updateTargetMemberId && editTask.updateTargetMemberId === 0) {
    return false;
  }
  if (editTask.updateMenuId === 0) {
    return false;
  }
  if (editTask.updateTeamId === 0) {
    return false;
  }
  if (editTask.updateStartTime === '' || editTask.updateEndTime === '') {
    return false;
  }

  return true;
}
