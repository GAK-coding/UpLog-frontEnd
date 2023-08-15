import React, { useCallback, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
type MessageType = 'success' | 'error' | 'warning';

interface Props {
  isOut: boolean;
  isOpen: boolean;
  onClose: () => void;
  nickName: string;
  onClickChangeRoleLeader: (memberId: number) => void;
  nowSelectedMemberId: number;
  showMessage: (type: MessageType, content: string) => void;
}
export default function MemberListManageAlert({
  isOut,
  isOpen,
  onClose,
  nickName,
  onClickChangeRoleLeader,
  nowSelectedMemberId,
  showMessage,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClickChange = useCallback(() => {
    onClickChangeRoleLeader(nowSelectedMemberId);
    onClose();
    showMessage('success', '권한이 변경되었습니다.');
  }, [nowSelectedMemberId]);

  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent
          maxW={'41rem'}
          h={'16rem'}
          shadow={'boxShadow-sign-up'}
          rounded={'none'}
          p={'1.2rem'}
          bg={'var(--white)'}
        >
          <AlertDialogHeader
            fontSize={'1.8rem'}
            fontWeight={700}
            bg={'var(--white)'}
            color={'var(--black)'}
          >
            {isOut ? '멤버 방출' : '권한 위임'}
          </AlertDialogHeader>

          <AlertDialogBody color={'var(--black)'} fontSize={'1.2rem'}>
            {isOut
              ? `${nickName}님을 방출하시겠습니까?`
              : `${nickName}님에게 권한을 부여하시겠습니까?`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button backgroundColor={'var(--orange)'} onClick={onClickChange} ml={3}>
              {isOut ? '방출' : '권한 부여'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
