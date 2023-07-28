import React from 'react';
import { useMessage } from '@/hooks/useMessage.ts';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddModal({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      {contextHolder}
      <ModalOverlay />

      <ModalContent
        maxW={'41rem'}
        h={'22rem'}
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
          프로젝트 추가
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <section className={'flex flex-col justify-center items-start w-h-full'}>
            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>버전 입력</span>
              <input
                className={
                  'border-base mt-4 mb-2 w-[29rem] h-14 rounded-xl px-4 py-2 text-[1.1rem] text-black'
                }
                type="text"
                placeholder={'새로 생성할 버전을 입력해 주세요.'}
                maxLength={10}
              />
              <span className={'text-gray-light text-[0.6rem] ml-2'}>
                * 현재 생성되는 버전은 임시 버전이며, 완료 시 최종 버전명을 재설정할 수 있습니다.
              </span>
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-xs text-white w-[4.5rem] h-9'}
            onClick={() => {}}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
