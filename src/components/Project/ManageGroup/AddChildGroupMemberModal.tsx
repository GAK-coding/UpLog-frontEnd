import React, { useCallback } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import useInput from '@/hooks/useInput.ts';
import { createProjectTeam } from '@/api/Project/Version.ts';
import { ChildGroup } from '@/typings/project.ts';
import { useMutation, useQueryClient } from 'react-query';
import { message } from '@/recoil/Common/atom.ts';
import { useParams } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  getChildGroup: { childTeamInfoDTOList: ChildGroup[] };
}

export default function AddChildGroupMemberModal({ isOpen, onClose, getChildGroup }: Props) {
  const [teamName, onChangeTeamName, setTeamName] = useInput('');
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const nowParentGroupId = +sessionStorage.getItem('nowGroupId')!;
  const { project } = useParams();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(createProjectTeam, {
    onSuccess: (data) => {
      if (typeof data === 'string' && data === '프로젝트 내에서 팀 이름이 중복됩니다.') {
        setMessageInfo({ type: 'warning', content: '프로젝트 내에서 팀 이름이 중복됩니다.' });
        return;
      } else if (typeof data !== 'string') {
        setMessageInfo({ type: 'success', content: '그룹이 생성되었습니다.' });
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['childGroup', nowParentGroupId]);

      const snapshot = queryClient.getQueryData(['childGroup', nowParentGroupId]);

      console.log('여기가 전: ', snapshot);

      queryClient.setQueriesData(['childGroup', nowParentGroupId], () => {
        const temp: { childTeamInfoDTOList: ChildGroup[] } = { ...getChildGroup };
        console.log('여기가 후: ', temp);

        temp['childTeamInfoDTOList'].push({
          teamId: -1,
          teamName,
          depth: 2,
          childTeamInfoDTOList: [],
        });
      });

      setTeamName('');

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(['childGroup', nowParentGroupId], context?.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['childGroup', nowParentGroupId]);
    },
  });

  const onClickCreateTeam = useCallback(() => {
    mutate({
      projectId: +project!,
      memberIdList: [],
      name: teamName,
      parentTeamId: nowParentGroupId,
      link: '',
    });
  }, [project, nowParentGroupId, teamName]);

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
          그룹 생성
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
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>그룹 이름</span>
              <div className={'flex items-center'}>
                <input
                  className={`border-base mt-4 mb-2 w-[29rem] h-14 rounded-xl px-4 py-2 text-[1.1rem] text-black `}
                  type="text"
                  value={teamName}
                  onChange={onChangeTeamName}
                  placeholder={'그룹 이름을 작성해주세요.'}
                  maxLength={10}
                />
              </div>
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
            onClick={() => {
              onClickCreateTeam();
              onClose();
            }}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
