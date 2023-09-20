import React, { ChangeEvent, useCallback, useState } from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { createProjectTeam } from '@/api/Project/Version.ts';
import { ChildGroup, ParentGroup } from '@/typings/project.ts';
import { useMutation, useQueryClient } from 'react-query';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import useInput from '@/hooks/useInput.ts';

interface Props {
  getChildGroup: { childTeamInfoDTOList: ChildGroup[] };
}

export default function AddChildGroup({ getChildGroup }: Props) {
  const queryClient = useQueryClient();
  const [name, onChangeName, setName] = useInput('');
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  // 프로젝트 Id
  const { project } = useParams();
  // 부모 팀 Id
  const nowParentGroupId = +sessionStorage.getItem('nowGroupId')!;

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

      queryClient.setQueriesData(['childGroup', nowParentGroupId], () => {
        const temp: { childTeamInfoDTOList: ChildGroup[] } = { ...getChildGroup };

        console.log(temp['childTeamInfoDTOList']);
        temp['childTeamInfoDTOList'].push({
          teamId: -1,
          teamName: '테스트',
          depth: 2,
          childTeamInfoDTOList: [],
        });
      });

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(['childGroup', nowParentGroupId], context?.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['childGroup', nowParentGroupId]);
    },
  });

  // const onSumbit = useCallback(
  //   (name: string) => {
  //     mutate({
  //       projectId: +project!,
  //       memberIdList: [],
  //       name: name,
  //       parentTeamId: nowParentGroupId,
  //       link: '',
  //     });
  //   },
  //   [project, nowParentGroupId]
  // );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (event.key === 'Enter') {
        mutate({
          projectId: +project!,
          memberIdList: [],
          name: name,
          parentTeamId: nowParentGroupId,
          link: '',
        });
      }
    },
    [project, nowParentGroupId]
  );

  // mutate({
  //   projectId: +project!,
  //   memberIdList: [],
  //   name: name,
  //   parentTeamId: nowParentGroupId,
  //   link: '',
  // });

  console.log('name', name);

  return (
    <Editable
      border={'1px solid var(--gray-light)'}
      borderRadius={'0.25rem'}
      height={'3.75rem'}
      placeholder={'서브그룹 추가하기'}
      padding={'0 2rem'}
      // onSubmit={(value) => {
      //   onSumbit(value);
      // }}
      // isPreviewFocusable={false}
      selectAllOnFocus={false}
    >
      {/*<div className={'border h-full flex-row-center justify-start'}>*/}
      <EditablePreview
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
      />
      {/*</div>*/}
      <EditableInput
        value={name}
        onChange={onChangeName}
        onKeyDown={handleKeyDown}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        _focus={{ outline: 'none', border: 'none' }}
      />
    </Editable>
  );
}
