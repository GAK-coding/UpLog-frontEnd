import React, { useCallback, useState } from 'react';
import { ProductMember } from '@/typings/product.ts';
import { Scrollbars } from 'react-custom-scrollbars';
import { addGroupMembers } from '@/api/Project/Version.ts';
import { useMutation, useQueryClient } from 'react-query';
import { ParentGroupMember } from '@/typings/project.ts';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';

interface Props {
  childGroupAllMembers: number[];
  productMembers: ProductMember[];
  onCloseMemberAdd: () => void;
}
export default function AddParentGroupMemberModal({
  childGroupAllMembers,
  productMembers,
  onCloseMemberAdd,
}: Props) {
  const nowParentGroupId = +sessionStorage.getItem('nowGroupId')!;
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const [selectMember, setSelectMember] = useState<Map<number, ParentGroupMember>>(new Map());

  const onClickMember = useCallback(
    (info: ProductMember) => {
      const { memberId, memberEmail, memberName, memberNickName, powerType } = info;

      if (Array.from(selectMember.keys()).includes(memberId)) {
        setSelectMember((prev) => {
          prev.delete(memberId);
          return new Map(prev);
        });
      } else {
        setSelectMember((prev) =>
          new Map(prev).set(memberId, {
            memberId,
            memberEmail,
            memberName,
            memberNickname: memberNickName,
            powerType,
          })
        );
      }
    },
    [selectMember]
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addGroupMembers, {
    onMutate: async () => {
      await queryClient.cancelQueries(['childGroupAllMembers', nowParentGroupId]);

      const snapshot: ParentGroupMember[] | undefined = queryClient.getQueryData([
        'childGroupAllMembers',
        nowParentGroupId,
      ]);

      onCloseMemberAdd();
      setMessageInfo({ type: 'success', content: '멤버가 추가되었습니다!' });

      queryClient.setQueryData(['childGroupAllMembers', nowParentGroupId], () => {
        return snapshot ? [...snapshot, ...selectMember.values()] : [...selectMember.values()];
      });

      return { snapshot };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['childGroupAllMembers', nowParentGroupId], context?.snapshot);
      setMessageInfo({ type: 'error', content: '멤버 추가를 실패하였습니다.' });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['childGroupAllMembers', nowParentGroupId]);
    },
  });

  const onClickAddMember = useCallback(() => {
    if (selectMember.size === 0) {
      setMessageInfo({ type: 'warning', content: '멤버를 선택해주세요.' });
      return;
    }

    mutate({
      teamId: nowParentGroupId,
      addMemberIdList: Array.from(selectMember.keys()),
      link: '',
    });
  }, [nowParentGroupId, selectMember]);

  return (
    <div
      className={'absolute top-[3rem] right-0 w-48 z-20 bg-white shadow-sign-up rounded-t-[0.3rem]'}
      onClick={(e) => e.stopPropagation()}
    >
      <Scrollbars
        style={{ width: '100%' }}
        autoHide
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
        autoHeight
        autoHeightMin={40}
        autoHeightMax={250}
      >
        {(productMembers as ProductMember[])?.map((member) => {
          if (childGroupAllMembers?.includes(member.memberId) || !childGroupAllMembers) {
            return;
          }

          const isSelect = Array.from(selectMember.keys()).includes(member.memberId);

          return (
            <div
              key={member.memberId}
              className={`flex p-2 cursor-pointer ${isSelect && 'bg-orange-light'}`}
              onClick={() => onClickMember(member)}
            >
              <img
                src={member.image ? member.image : '/images/test_userprofile.png'}
                alt={`${member.memberNickName}의 프로필 서진`}
                className={'w-10 h-10 mr-4 rounded-[50%]'}
              />
              <div className={'flex flex-col justify-center text-ms font-bold text-gray-dark'}>
                <span className={'ellipsis'}>
                  {member.memberNickName} ({member.memberName})
                </span>
              </div>
            </div>
          );
        })}
      </Scrollbars>
      <div
        className={
          'flex-row-center w-full h-12 text-white font-bold bg-orange rounded-b-[0.3rem] cursor-pointer'
        }
        onClick={onClickAddMember}
      >
        추가하기
      </div>
    </div>
  );
}
