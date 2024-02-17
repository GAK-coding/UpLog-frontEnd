import React, { useCallback, useEffect, useState } from 'react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useInput from '@/hooks/useInput.ts';
type MessageType = 'success' | 'error' | 'warning';
import { useMutation } from 'react-query';
import { changePassword, deleteAccount } from '@/api/Members/mypage.ts';
import { user } from '@/recoil/User/atom.ts';
import { SetterOrUpdater, useRecoilState } from 'recoil';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isClickPwChange: boolean;
  setMessageInfo: SetterOrUpdater<{ type: MessageType; content: string } | null>;
}
export default function UserManageModal({
  isOpen,
  onClose,
  isClickPwChange,
  setMessageInfo,
}: Props) {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [password, onChangePassword, setPassword] = useInput('');
  const [newPassword, onChangeNewPassword, setNewPassword] = useInput('');
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const navigator = useNavigate();

  const resetPw = useCallback(() => {
    setPassword('');
    setNewPassword('');
    onClose();
  }, [onClose]);

  const { mutate: changePasswordMutate } = useMutation(changePassword, {
    onSuccess: (data) => {
      if ('message' in data) {
        setMessageInfo({ type: 'warning', content: data.message });
        return;
      }

      resetPw();
      setMessageInfo({ type: 'success', content: '비밀번호 변경 완료!' });
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '다시 시도해주세요.' });
    },
  });

  const { mutate: deleteAccountMutate } = useMutation(deleteAccount, {
    onSuccess: (data) => {
      if ('httpStatus' in data) {
        setMessageInfo({ type: 'warning', content: data.message });
        return;
      }

      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('nowProduct');
      sessionStorage.removeItem('nowProject');
      sessionStorage.removeItem('nowTeamId');
      sessionStorage.removeItem('nowGroupId');
      setUserInfo(null);

      setMessageInfo({ type: 'success', content: '로그아웃 되었습니다.' });
      navigator('/');
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '다시 시도해주세요.' });
    },
  });

  const onClickChangePassword = useCallback(() => {
    if (!password || !newPassword) {
      setMessageInfo({ type: 'warning', content: '비밀번호를 입력해주세요.' });
      return;
    }

    if (!isCheckPw) {
      setMessageInfo({ type: 'warning', content: '올바른 새로운 비밀번호를 입력해주세요.' });
      return;
    }

    changePasswordMutate({ newPassword, password });
  }, [password, newPassword, userInfo, isCheckPw]);

  const onClickDeleteAccount = useCallback(() => {
    if (!password) {
      setMessageInfo({ type: 'warning', content: '비밀번호를 입력해주세요.' });
      return;
    }

    deleteAccountMutate({ password });
  }, [password, userInfo]);

  const onClickPwVisible = useCallback(() => setIsPwVisible((prev) => !prev), []);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    setIsCheckPw(regex.test(newPassword));
  }, [newPassword, isCheckPw]);

  return (
    <Modal isCentered onClose={resetPw} isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent
        maxW="37.5rem"
        h={isClickPwChange ? '29rem' : '20rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          {isClickPwChange ? '비밀번호 변경' : '계정 삭제'}
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section className={'flex-col-center justify-evenly w-[24rem] h-full'}>
              {/* 현재 비밀번호 */}
              <div className={'w-full text-[1rem] mb-4'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>현재 비밀번호</span>
                <input
                  type="password"
                  data-cy={'nowPasswordInput'}
                  value={password}
                  onChange={onChangePassword}
                  placeholder={'현재 비밀번호를 입력하세요.'}
                  maxLength={15}
                  className={
                    'w-full h-11 border-base border-gray-border text-[0.93rem] rounded-xl mb-2 p-4 text-black'
                  }
                />
                {isClickPwChange && (
                  <div className={'flex-row-center justify-start pl-4 text-sm text-gray-light'}>
                    <span>비밀번호를 잊으셨나요?</span>
                    <Link to={'/pwinquiry'} className={'ml-2 underline'}>
                      비밀번호 찾기
                    </Link>
                  </div>
                )}
              </div>
              {/* 새로운 비밀번호 */}
              {isClickPwChange && (
                <div className={'w-full text-[1rem]'}>
                  <span className={'text-gray-dark font-bold mb-[0.93rem]'}>새로운 비밀번호</span>
                  <span
                    className={
                      'flex-row-center border-base border-gray-border rounded-xl h-11 pl-4 mb-2 bg-border'
                    }
                  >
                    <input
                      type={`${isPwVisible ? 'text' : 'password'}`}
                      data-cy={'newPasswordInput'}
                      value={newPassword}
                      onChange={onChangeNewPassword}
                      placeholder={'새로운 비밀번호를 입력하세요.'}
                      maxLength={15}
                      className={'w-[90%] h-full text-[0.93rem] text-black'}
                    />
                    <span className={'w-[10%] text-2xl cursor-pointer'} onClick={onClickPwVisible}>
                      {isPwVisible ? (
                        <AiOutlineEyeInvisible className={'fill-gray-light'} />
                      ) : (
                        <AiOutlineEye className={'fill-gray-light'} />
                      )}
                    </span>
                  </span>
                  {!isCheckPw && newPassword && (
                    <span className={'flex-row-center justify-start text-sm text-[#E06469] pl-4'}>
                      영문/숫자/특수문자 포함, 8~15자로 입력해주세요.
                    </span>
                  )}
                </div>
              )}
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={`bg-orange rounded font-bold text-sm text-white
            ${isClickPwChange ? 'w-[4.5rem] h-9' : 'w-[6rem] h-9'}`}
            data-cy={'changePasswordButton'}
            onClick={() => {
              isClickPwChange ? onClickChangePassword() : onClickDeleteAccount();
            }}
          >
            {isClickPwChange ? '확인' : '계정 삭제'}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
