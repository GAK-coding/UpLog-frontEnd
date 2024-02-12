import React, { useCallback, useEffect, useState } from 'react';
import { ChildGroup, ChildGroupMember, ParentGroupMember } from '@/typings/project.ts';
import { ProductMember } from '@/typings/product.ts';
import { AiFillCaretDown } from 'react-icons/ai';
import { Select } from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { UserInfo } from '@/typings/member.ts';
import { useMutation, useQueryClient } from 'react-query';
import { addGroupMembers } from '@/api/Project/Version.ts';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';

interface Props {
  childGroupAllMembers: ParentGroupMember[];
  productMembers: ProductMember[];
  getChildGroup: { childTeamInfoDTOList: ChildGroup[] };
  isInclude: boolean;
}
export default function GroupMembers({
  childGroupAllMembers,
  productMembers,
  getChildGroup,
  isInclude,
}: Props) {
  const [productMembersHash, setProductMembersHash] = useState<
    Map<number, { image: string | null }>
  >(new Map());
  const [isSeeMore, setIsSeeMore] = useState(false);
  const { parentgroup } = useParams();
  const userInfo: UserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  const onClickSeeMore = useCallback(() => {
    setIsSeeMore((prev) => !prev);
  }, []);

  const queryClient = useQueryClient();

  const { mutate: assignMemberMutate } = useMutation(addGroupMembers, {
    onSuccess: (data) => {
      if (typeof data === 'number' && data > 0) {
        setMessageInfo({ type: 'error', content: '이미 멤버가 속해 있습니다.' });
      } else setMessageInfo({ type: 'success', content: '멤버가 추가되었습니다!' });
    },
    onMutate: async ({ teamId, memberInfo }) => {
      await queryClient.cancelQueries(['childGroupMembers', teamId]);

      const snapshot = queryClient.getQueryData(['childGroupMembers', teamId]);

      queryClient.setQueriesData(['childGroupMembers', teamId], () => {
        const temp: { verySimpleMemberInfoDTOList: ChildGroupMember[] } = JSON.parse(
          JSON.stringify(snapshot)
        );

        const { memberId, memberName, memberNickname } = memberInfo!;

        temp.verySimpleMemberInfoDTOList.push({
          id: memberId,
          name: memberName,
          nickname: memberNickname,
          image: productMembersHash.get(memberId)?.image ?? null,
        });

        return temp;
      });

      return { snapshot };
    },
    onError: (error, variables, context) => {
      queryClient.setQueriesData(['childGroupMembers', variables.teamId], context?.snapshot);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(['childGroupMembers', variables.teamId]);
    },
  });

  const onClickAssignMember = useCallback((teamId: number, memberInfo: ParentGroupMember) => {
    // TODO: link 적용
    assignMemberMutate({ teamId, addMemberIdList: [memberInfo.memberId], link: '', memberInfo });
  }, []);

  // 제품 전체 멤버에서 사진 가져오려고 만듬
  useEffect(() => {
    if (productMembers) {
      productMembers.forEach((member) => {
        setProductMembersHash((prev) =>
          new Map(prev).set(member.memberId, { image: member?.image ?? null })
        );
      });
    }
  }, [productMembers]);

  useEffect(() => {
    setIsSeeMore(false);
  }, [parentgroup]);

  return (
    <div className={'mb-12'}>
      <div className={'flex justify-between items-center border-b border-gray-light pb-2 mb-4'}>
        <div className={' font-bold text-[1.4rem] '}>
          모든 멤버({childGroupAllMembers?.length ?? 0}명)
        </div>
        {isInclude && (
          <button
            className={'bg-orange rounded font-bold text-white text-sm w-16 h-8 flex-row-center'}
            onClick={() => {}}
          >
            나가기
          </button>
        )}
      </div>

      {(childGroupAllMembers?.length > 5 && !isSeeMore
        ? childGroupAllMembers.slice(0, 5)
        : childGroupAllMembers
      )?.map((member, index) => {
        return (
          <div
            key={`${member['memberId']}-${index}`}
            className={'flex justify-between items-center px-8 mb-6'}
          >
            <div className={'flex'}>
              <img
                src={
                  productMembersHash.get(member['memberId'])?.image ??
                  '/images/test_userprofile.png'
                }
                alt={`${member?.['memberNickname']}의 프로필 서진`}
                className={'w-12 h-12 mr-4 rounded-[50%]'}
              />
              <div className={'flex flex-col justify-center font-bold text-gray-dark'}>
                <span>
                  {userInfo.id === member?.['memberId'] && '(나)'} {member?.['memberNickname']} (
                  {member?.['memberName']})
                </span>
              </div>
            </div>
            <Select
              width={'9rem'}
              height={'1.7rem'}
              color={'var(--gray-dark)'}
              fontSize={'0.75rem'}
              icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
              onChange={(event) => {
                if (event.target.value === '하위 그룹 배정') return;
                else {
                  onClickAssignMember(+event.target.value, member);
                  event.target.value = '하위 그룹 배정';
                }
              }}
            >
              <option defaultValue={'하위 그룹 배정'}>하위 그룹 배정</option>
              {(getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.[
                'childTeamInfoDTOList'
              ]?.map((group) => {
                return (
                  <option key={group['teamId']} value={group['teamId']}>
                    {group['teamName']}
                  </option>
                );
              })}
            </Select>
          </div>
        );
      })}
      {childGroupAllMembers?.length > 5 && (
        <div>
          {isSeeMore ? (
            <MdKeyboardArrowUp
              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
              onClick={onClickSeeMore}
            />
          ) : (
            <MdKeyboardArrowDown
              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
              onClick={onClickSeeMore}
            />
          )}
        </div>
      )}
    </div>
  );
}
