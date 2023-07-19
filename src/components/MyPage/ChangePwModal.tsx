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
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useInput from '../../hooks/useInput.ts';
import { useMessage } from '../../hooks/useMessage.ts';
import show = Mocha.reporters.Base.cursor.show;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isClickPwChange: boolean;
}
export default function ChangePwModal({ isOpen, onClose, isClickPwChange }: Props) {
  const [nowPw, onChangeNowPw, setNowPw] = useInput('');
  const [newPw, onChangeNewPw, setPassword] = useInput('');
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const { showMessage, contextHolder } = useMessage();

  const onClickChangePw = useCallback(() => {
    if (!nowPw || !newPw) {
      showMessage('warning', '비밀번호를 입력해주세요.');
      return;
    }

    onClose();
  }, []);
  const onClickPwVisible = useCallback(() => setIsPwVisible((prev) => !prev), []);

  const resetPw = useCallback(() => {
    setNowPw('');
    setPassword('');
    onClose();
  }, [onClose]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    setIsCheckPw(regex.test(newPw));
  }, [newPw, isCheckPw]);

  return (
    <Modal isCentered onClose={resetPw} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="37.5rem"
        h={isClickPwChange ? '27rem' : '20rem'}
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
            <section className={'flex-col-center justify-evenly w-[22.5rem] h-full'}>
              {contextHolder}

              {/* 현재 비밀번호 */}
              <div className={'w-full text-[0.93rem] mb-4'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>현재 비밀번호</span>
                <input
                  type="password"
                  value={nowPw}
                  onChange={onChangeNowPw}
                  placeholder={'현재 비밀번호를 입력하세요.'}
                  maxLength={15}
                  className={
                    'tracking-[-0.1rem] w-full h-10 border-base border-gray-border rounded-xl mb-2 p-4 text-black'
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
                <div className={'w-full text-[0.93rem]'}>
                  <span className={'text-gray-dark font-bold mb-[0.93rem]'}>새로운 비밀번호</span>
                  <span
                    className={
                      'flex-row-center border-base border-gray-border rounded-xl h-10 pl-4 mb-2 bg-border'
                    }
                  >
                    <input
                      type={`${isPwVisible ? 'text' : 'password'}`}
                      value={newPw}
                      onChange={onChangeNewPw}
                      placeholder={'새로운 비밀번호를 입력하세요.'}
                      maxLength={15}
                      className={`w-[90%] h-full text-black
                    ${newPw && !isPwVisible && 'tracking-[-0.1rem]'}
                    `}
                    />
                    <span className={'w-[10%] text-2xl cursor-pointer'} onClick={onClickPwVisible}>
                      {isPwVisible ? (
                        <AiOutlineEyeInvisible className={'fill-gray-light'} />
                      ) : (
                        <AiOutlineEye className={'fill-gray-light'} />
                      )}
                    </span>
                  </span>
                  {!isCheckPw && newPw && (
                    <span className={'flex-row-center justify-start text-sm text-[#E06469]'}>
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
            className={`bg-orange rounded font-bold text-xs text-white
            ${isClickPwChange ? 'w-[4.5rem] h-9' : 'w-[6rem] h-9'}`}
            onClick={onClickChangePw}
          >
            {isClickPwChange ? '확인' : '계정 삭제'}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
