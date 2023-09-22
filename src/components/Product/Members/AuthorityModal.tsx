import React, { useCallback, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { productMemberList } from '@/recoil/Product/atom.ts';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { AiFillCaretDown } from 'react-icons/ai';
type MessageType = 'success' | 'error' | 'warning';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClickChangeRoleLeader: (memberId: number) => void;
  onClickChangeRoleDefault: (memberId: number) => void;
  nowSelectedMemberId: number;
  setMessageInfo: SetterOrUpdater<{ type: MessageType; content: string } | null>;
}

export default function AuthorityModal({
  isOpen,
  onClose,
  onClickChangeRoleLeader,
  onClickChangeRoleDefault,
  nowSelectedMemberId,
  setMessageInfo,
}: Props) {
  const [members, setMembers] = useRecoilState(productMemberList);
  const [selectedMember, setSelectedMember] = useState('-1');
  const onSelectedMemberId = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(e.target.value);
  }, []);

  const onChangeDefault = useCallback(() => {
    onClickChangeRoleDefault(nowSelectedMemberId);
  }, [nowSelectedMemberId]);

  const onChangeLeader = useCallback(() => {
    onClickChangeRoleLeader(+selectedMember);
  }, [selectedMember]);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
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
          권한 위임
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
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>위임 멤버</span>
              <div className={'flex items-center'}>
                <Select
                  width={'25rem'}
                  marginTop={'1rem'}
                  border={'1px solid var(--gray-light)'}
                  borderRadius={'0.625rem'}
                  onChange={onSelectedMemberId}
                  icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
                  placeholder={'위임할 멤버를 선택해주세요.'}
                >
                  {members?.map((member) => (
                    <option
                      hidden={member.powerType !== 'DEFAULT'}
                      key={member.memberId}
                      value={member.memberId}
                    >
                      {member.memberNickName}({member.memberName})
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
            onClick={() => {
              onChangeDefault();
              setTimeout(() => {
                onChangeLeader();
              }, 500);
              onClose();
              setMessageInfo({ type: 'success', content: '권한이 변경되었습니다.' });
            }}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
