import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { menuListData } from '@/recoil/Project/atom.ts';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task?: number;
  post?: number;
  isTask: boolean;
}

export default function DeleteDialog({ isOpen, onClose, task, post, isTask }: Props) {
  const cancelRef = useRef();
  const { product, project, menutitle } = useParams();
  const navigate = useNavigate();

  const onClickDelete = useCallback(() => {
    // TODO : Task 삭제 api 연결
    if (isTask) {
      console.log('task 삭제', task);
    }

    // TODO : Post 삭제 api 연결
    if (!isTask) {
      console.log('post 삭제', post);
    }

    navigate(`/workspace/${product}/${project}/menu/${menutitle}`);
  }, []);

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
