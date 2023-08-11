import { StatusTaskData, Tasks } from '@/typings/task.ts';
import { useState } from 'react';

export function convertAddDragId(tasks: StatusTaskData): Tasks {
  const [convertedTasks, setConvertedTasks] = useState<Tasks>({
    PROGRESS_BEFORE: [],
    PROGRESS_IN: [],
    PROGRESS_COMPLETE: [],
  });

  const beforeStatusTasks = tasks.PROGRESS_BEFORE.map((task) => ({
    ...task,
    dragId: task.id.toString(), // dragId 값을 문자열로 변환하여 할당
  }));

  setConvertedTasks({
    ...convertedTasks,
    PROGRESS_BEFORE: beforeStatusTasks,
  });

  const inStatusTasks = tasks.PROGRESS_IN.map((task) => ({
    ...task,
    dragId: task.id.toString(), // dragId 값을 문자열로 변환하여 할당
  }));

  setConvertedTasks({
    ...convertedTasks,
    PROGRESS_IN: inStatusTasks,
  });

  const completeStatusTasks = tasks.PROGRESS_COMPLETE.map((task) => ({
    ...task,
    dragId: task.id.toString(), // dragId 값을 문자열로 변환하여 할당
  }));

  setConvertedTasks({
    ...convertedTasks,
    PROGRESS_COMPLETE: completeStatusTasks,
  });

  return convertedTasks;
}
