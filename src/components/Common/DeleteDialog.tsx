import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask } from '@/api/Project/Task.ts';
import { taskAll } from '@/recoil/Project/Task.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { deletePost } from '@/api/Project/Post.ts';
import { message } from '@/recoil/Common/atom.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task?: number;
  post?: number;
  menuId?: number;
  isTask: boolean;
}

export default function DeleteDialog({ isOpen, onClose, task, post, menuId, isTask }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { product, project, menutitle } = useParams();
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const taskList = useRecoilValue(taskAll);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const taskId = task!;

  // task 삭제 api 연결
  const { mutate: deleteTaskMutate } = useMutation(() => deleteTask(taskId), {
    onMutate: async () => {
      // optimistic update를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
      await queryClient.cancelQueries(['getTaskEach', taskId]);

      const previousData = queryClient.getQueryData(['getTaskEach', taskId]);

      const newTaskData = taskList.filter((eachTask) => eachTask.id !== task);
      queryClient.setQueryData(['getTaskEach', taskId], newTaskData);

      return () => queryClient.setQueryData(['getTaskEach', taskId], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        if ('message' in data)
          setMessageInfo({ type: 'error', content: 'Task 삭제에 실패했습니다.' });
        else if ('id' in data) {
          setMessageInfo({ type: 'success', content: 'Task가 삭제되었습니다.' });
          onClose();
        }
      } else if (data === 'delete task fail')
        setMessageInfo({ type: 'error', content: 'Task 삭제에 실패했습니다.' });
    },
    onError: (error, value, rollback) => {
      if (rollback) {
        rollback();
        setMessageInfo({ type: 'error', content: 'Task 삭제에 실패했습니다.' });
      } else {
        setMessageInfo({ type: 'error', content: 'Task 삭제에 실패했습니다.' });
      }
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['getTaskEach', taskId]);
    },
  });

  // post 삭제 api 연결
  const { mutate: deletePostMutate } = useMutation(() => deletePost(post!), {
    onMutate: async () => {
      await queryClient.cancelQueries(['menuPostData', menuId]);

      const previousData = queryClient.getQueryData(['menuPostData', menuId]);

      const newPostData = taskList.filter((eachPost) => eachPost.id !== menuId);
      queryClient.setQueryData(['menuPostData', menuId], newPostData);

      return () => queryClient.setQueryData(['menuPostData', menuId], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data) {
        setMessageInfo({ type: 'success', content: 'Post가 삭제되었습니다.' });
        onClose();
        navigate(`/workspace/${product}/${project}/menu/${menutitle}`);
      } else {
        setMessageInfo({ type: 'error', content: 'Post 삭제에 실패했습니다.' });
      }
    },
    onError: (error, value, rollback) => {
      if (rollback) {
        rollback();
        setMessageInfo({ type: 'error', content: 'Post 삭제에 실패했습니다.' });
      } else {
        setMessageInfo({ type: 'error', content: 'Post 삭제에 실패했습니다.' });
      }
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
    },
  });

  const onClickDelete = useCallback(() => {
    if (isTask) {
      deleteTaskMutate();
    }

    if (!isTask) {
      deletePostMutate();
    }
  }, [post, task, isTask]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxW={'30rem'}>
          <AlertDialogHeader bgColor={'var(--white)'} color={'var(--black)'}>
            <span className={'text-[1.4rem] font-bold'}>{isTask ? 'Task 삭제' : 'Post 삭제'}</span>
          </AlertDialogHeader>

          <AlertDialogBody bgColor={'var(--white)'} color={'var(--black)'}>
            <span className={'text-[1.1rem] mb-4 ml-4'}>
              {isTask ? '해당 Task를 삭제하시겠습니까?' : '해당 Post를 삭제하시겠습니까?'}
            </span>
            <br />
          </AlertDialogBody>

          <AlertDialogFooter bgColor={'var(--white)'}>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button color={'var(--white)'} bgColor={'var(--orange)'} ml={3} onClick={onClickDelete}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
