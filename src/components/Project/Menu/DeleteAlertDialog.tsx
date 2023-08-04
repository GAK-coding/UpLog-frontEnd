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
import { menuListData } from '@/recoil/Project/atom.tsx';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menu: string;
}
export default function DeleteAlertDialog({ isOpen, onClose, menu }: Props) {
  const { product, project } = useParams();
  const navigate = useNavigate();
  const cancelRef = useRef();
  const [menuList, setMenuList] = useRecoilState(menuListData);

  const onClickDelete = useCallback(() => {
    const updatedMenuList = menuList.filter((eachMenu) => eachMenu.name !== menu);
    setMenuList(updatedMenuList);
    onClose();

    navigate(`/workspace/${product}/${project}/menu/결과물`);
  }, [menuList, setMenuList, menu]);

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
