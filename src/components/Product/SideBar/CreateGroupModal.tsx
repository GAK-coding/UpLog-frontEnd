import React, { ChangeEvent, useCallback } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import useInput from '@/hooks/useInput.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ isOpen, onClose }: Props) {
  // TODO: 그룹 이름 중복 안되게 해야됨
  const [groupName, onChangeGroupName, setGroupName] = useInput('');

  const [emails, , setEmails] = useInput('');
  const onChangeEmails = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmails(e.target.value);
  }, []);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent
        maxW={'41rem'}
        h={'40rem'}
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
          그룹 생성
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <section className={'flex flex-col justify-evenly items-start w-h-full'}>
            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>그룹 이름</span>
              <div className={'flex items-center'}>
                <input
                  className={`border-base mt-4 mb-2 w-[29rem] h-14 rounded-xl px-4 py-2 text-[1.1rem] text-black `}
                  type="text"
                  value={groupName}
                  onChange={onChangeGroupName}
                  placeholder={'그룹 이름을 작성해주세요.'}
                  maxLength={10}
                />
              </div>
            </div>

            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>초대 멤버</span>

              <div className={'flex items-center w-[29rem] h-[14rem] mt-4'}>
                <Textarea
                  value={emails}
                  onChange={onChangeEmails}
                  border={'1px solid var(--border-line)'}
                  height={'100%'}
                  maxLength={1000}
                  focusBorderColor={'none'}
                  placeholder="이메일은 쉼표(,)로 구분해 주세요."
                  resize={'none'}
                />
              </div>
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
            onClick={() => {}}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
