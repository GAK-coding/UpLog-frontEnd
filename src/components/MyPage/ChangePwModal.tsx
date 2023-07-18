import React from 'react';
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function ChangePwModal({ isOpen, onClose }: Props) {
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="37.5rem"
        h={'27rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
      >
        <ModalHeader fontSize={'1.8rem'} fontWeight={700}>
          비밀번호 변경
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
              {/* 현재 비밀번호 */}
              <div className={'w-full text-[0.93rem] mb-4'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>현재 비밀번호</span>
                <input
                  type="password"
                  placeholder={'현재 비밀번호를 입력하세요.'}
                  maxLength={30}
                  className={
                    'tracking-[-0.1rem] w-full h-10 border-base border-gray-border rounded-xl mb-2 p-4'
                  }
                />
                <div className={'flex-row-center justify-start pl-4 text-sm text-gray-light'}>
                  <span>비밀번호를 잊으셨나요?</span>
                  <Link to={'/pwinquiry'} className={'ml-2 underline'}>
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
              {/* 새로운 비밀번호 */}
              <div className={'w-full text-[0.93rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>새로운 비밀번호</span>
                <input
                  type="password"
                  placeholder={'현재 비밀번호를 입력하세요.'}
                  maxLength={30}
                  className={
                    'tracking-[-0.1rem] w-full h-10 border-base border-gray-border rounded-xl mb-2 p-4'
                  }
                />
                <span className={'flex-row-center justify-start pl-4 text-sm text-[#E06469]'}>
                  영문/숫자/특수문자 포함, 8~15자로 입력해주세요.
                </span>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button className={'bg-orange w-[4.5rem] h-9 rounded font-bold text-xs text-white'}>
            확인
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
