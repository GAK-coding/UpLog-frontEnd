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
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMenu } from '@/api/Project/Menu.ts';
import { useMutation, useQueryClient } from 'react-query';
import { useMessage } from '@/hooks/useMessage.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menu: string;
  menuId: number;
}
export default function DeleteMenuDialog({ isOpen, onClose, menu, menuId }: Props) {
  const { product, project } = useParams();
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [menuList, setMenuList] = useRecoilState(menuListData);
  const queryClient = useQueryClient();
  const projectId = 10;

  // menu delete
  const { mutate: deleteMenuMutate } = useMutation(() => deleteMenu(menuId), {
    onMutate: async () => {
      // optimistic update를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
      await queryClient.cancelQueries(['menuList', projectId]);

      // 이전 값 저장
      const previousData = queryClient.getQueryData(['menuList', projectId]);

      // 새로운 값으로 optimistic ui 적용
      queryClient.setQueryData(
        ['menuList', projectId],
        menuList.filter((eachMenu) => eachMenu.id !== menuId)
      );

      // 에러가 난다면 원래것으로 설정
      return () => queryClient.setQueryData(['menuList', projectId], previousData);
    },
    onSuccess: (data) => {
      if (data === 'delete menu fail') {
        showMessage('error', '메뉴 삭제에 실패했습니다.');
        setTimeout(() => onClose(), 1000);
      } else if (data === 'delete') {
        showMessage('success', '해당 메뉴가 삭제되었습니다.');
        setTimeout(() => onClose(), 1000);
      }
    },
    onError: (error, value, rollback) => {
      // rollback은 onMutate의 return값
      if (rollback) {
        rollback();
        showMessage('error', '메뉴 삭제에 실패했습니다.');
      } else {
        showMessage('error', '메뉴 삭제에  실패했습니다.');
      }
    },
    onSettled: () => {
      // success or error, invalidate해서 새로 받아옴
      return queryClient.invalidateQueries(['menuList', projectId]);
    },
  });

  const onClickDelete = useCallback(() => {
    const updatedMenuList = menuList.filter((eachMenu) => eachMenu.menuName !== menu);
    setMenuList(updatedMenuList);

    deleteMenuMutate();
    navigate(`/workspace/${product}/${project}/menu/결과물`);
  }, [menuList, setMenuList, menu]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered={true}
    >
      {contextHolder}
      <AlertDialogOverlay>
        <AlertDialogContent maxW={'30rem'}>
          <AlertDialogHeader bgColor={'var(--white)'} color={'var(--black)'}>
            <span className={'text-[1.4rem] font-bold'}>메뉴 삭제</span>
          </AlertDialogHeader>

          <AlertDialogBody bgColor={'var(--white)'} color={'var(--black)'}>
            <span className={'text-[1.1rem] mb-4 ml-4'}>해당 메뉴를 삭제하시겠습니까?</span>
            <br />

            <span className={'text-[0.93rem] ml-6 text-gray-dark mt-4'}>
              * 메뉴 삭제시, 관련된 모든 정보가 삭제됩니다.
            </span>
          </AlertDialogBody>

          <AlertDialogFooter bgColor={'var(--white)'}>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button color={'var(--white)'} bgColor={'var(--orange)'} onClick={onClickDelete} ml={3}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
