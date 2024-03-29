import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/react';
import { useGetChildGroups } from '@/components/Product/hooks/useGetChildGroups.ts';
import { ChildGroup, ChildGroupMember, ParentGroupMember } from '@/typings/project.ts';
import { useQueries, useQuery } from 'react-query';
import { getChildGroupMembers, getParentGroupMembers } from '@/api/Project/Version.ts';
import AddParentGroupMemberModal from '@/components/Project/ManageGroup/AddParentGroupMemberModal.tsx';
import GroupMembers from '@/components/Project/ManageGroup/GroupMembers.tsx';
import { useGetProductMembers } from '@/pages/Product/hooks/useGetProductMembers.ts';
import { ProductInfo, ProductMember } from '@/typings/product.ts';
import AddChildGroupMemberModal from '@/components/Project/ManageGroup/AddChildGroupMemberModal.tsx';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { UserInfo } from '@/typings/member.ts';
import { v4 as uuidv4 } from 'uuid';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';

export default function ManageGroup() {
  const { parentgroup } = useParams();
  const [isClickMemberAdd, setIsClickMemberAdd] = useState(false);
  const nowParentGroupId = +sessionStorage.getItem('nowGroupId')!;
  const [getChildGroup] = useGetChildGroups(nowParentGroupId);
  const [childGroupIds, setChildGroupIds] = useState<number[]>([]);
  const { productId }: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSeeMores, setIsSeeMores] = useState<boolean[]>([]);
  const [isInclude, setIsInclude] = useState(false);
  const userInfo: UserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  // 제품 전체 멤버
  const [productMembers, isSuccess] = useGetProductMembers(productId);

  const { data: childGroupAllMembers } = useQuery(
    ['childGroupAllMembers', nowParentGroupId],
    () => getParentGroupMembers(nowParentGroupId),
    {
      staleTime: 300000, // 5분
      cacheTime: 600000, // 10분
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
      select: (data) => {
        if (typeof data !== 'string') {
          const temp = data?.map((member) => member.memberId);
          return [data, temp];
        }
      },
    }
  );

  const childGroupMembers = useQueries(
    childGroupIds?.map((id) => ({
      queryKey: ['childGroupMembers', id],
      queryFn: () => getChildGroupMembers(id),
      staleTime: 300000, // 5분
      cacheTime: 600000, // 10분
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
      enabled: !!getChildGroup && !!childGroupIds,
      select: (data: { verySimpleMemberInfoDTOList: ChildGroupMember[] } | string) => {
        if (typeof data !== 'string') {
          const memberIds: number[] = data.verySimpleMemberInfoDTOList.map((member) => member.id);
          return [data.verySimpleMemberInfoDTOList, memberIds];
        }
      },
    }))
  );

  const onClickMemberAdd = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsClickMemberAdd((prev) => !prev);
  }, []);

  const onCloseMemberAdd = useCallback(() => {
    setIsClickMemberAdd(false);
  }, []);

  const onClickSeeMore = useCallback(
    (idx: number) => {
      setIsSeeMores((prev) => {
        const temp = [...prev];
        temp[idx] = !temp[idx];
        return temp;
      });
    },
    [isSeeMores]
  );

  useEffect(() => {
    if (getChildGroup) {
      const temp = (
        getChildGroup as { childTeamInfoDTOList: ChildGroup[] }
      )?.childTeamInfoDTOList.map((group) => group.teamId);

      setChildGroupIds(temp);
      setIsSeeMores(temp?.map(() => false) ?? []);
    }
  }, [getChildGroup]);

  // 내가 이 그룹에 있는지
  useEffect(() => {
    if (childGroupAllMembers && userInfo) {
      const temp: number[] = JSON.parse(JSON.stringify(childGroupAllMembers[1]));
      setIsInclude(temp.includes(userInfo.id));
    }
  }, [childGroupAllMembers]);

  return (
    <section className={'w-full px-20 py-20'} onClick={onCloseMemberAdd}>
      <article
        className={
          'mx-auto flex justify-between w-[64rem] pb-4 border-b border-gray-light relative'
        }
      >
        <div className={'flex items-center font-bold'}>
          <h1 className={'text-3xl mr-4 mb-2'}>{parentgroup}</h1>
          <h2 className={'text-[1.5rem] text-gray-dark'}>그룹 관리</h2>
        </div>
        <div className={'flex'}>
          <button
            className={
              'bg-orange rounded font-bold text-white w-[6.5rem] h-10 flex-row-center mr-6'
            }
            onClick={() => {
              if (
                (getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.childTeamInfoDTOList
                  .length > 10
              ) {
                setMessageInfo({
                  type: 'warning',
                  content: '그룹은 최대 10개까지 생성 가능합니다.',
                });
                return;
              }
              onOpen();
            }}
          >
            <AiOutlinePlus className={'text-xl mr-1'} /> 그룹 추가
          </button>
          <button
            className={'bg-orange rounded font-bold text-white w-[6.5rem] h-10 flex-row-center'}
            onClick={onClickMemberAdd}
          >
            <AiOutlinePlus className={'text-xl mr-1'} /> 멤버 추가
          </button>
        </div>

        <AddChildGroupMemberModal
          isOpen={isOpen}
          onClose={onClose}
          getChildGroup={getChildGroup as { childTeamInfoDTOList: ChildGroup[] }}
        />

        {isClickMemberAdd && (
          <AddParentGroupMemberModal
            onCloseMemberAdd={onCloseMemberAdd}
            productMembers={productMembers as ProductMember[]}
            childGroupAllMembers={childGroupAllMembers?.[1] as number[]}
          />
        )}
      </article>

      <article className={'w-[50rem] mx-auto mt-12'}>
        <GroupMembers
          productMembers={productMembers as ProductMember[]}
          childGroupAllMembers={childGroupAllMembers?.[0] as ParentGroupMember[]}
          getChildGroup={getChildGroup as { childTeamInfoDTOList: ChildGroup[] }}
          isInclude={isInclude}
        />

        {(getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.['childTeamInfoDTOList'].map(
          (group, index) => {
            const membersId: number[] = JSON.parse(
              JSON.stringify(childGroupMembers?.[index]?.data?.[1] ?? [])
            );

            return (
              <div key={`child-${group['teamId']}`} className={'mb-12'}>
                <div
                  className={
                    'flex justify-between items-center border-b border-gray-light pb-2 mb-4'
                  }
                >
                  <div className={'font-bold text-[1.4rem]'}>
                    {group['teamName']}({childGroupMembers?.[index]?.['data']?.[0].length ?? 0}명)
                  </div>
                  {isInclude && membersId.includes(userInfo.id) && (
                    <button
                      className={
                        'bg-orange rounded font-bold text-white text-sm w-16 h-8 flex-row-center'
                      }
                      onClick={() => {}}
                    >
                      나가기
                    </button>
                  )}
                </div>
                {childGroupMembers?.map((members, idx) => {
                  // 이거 안해두면 모든 하위 팀의 멤버들이 합쳐져서 보임
                  if (index !== idx) return;

                  const memberList = (members?.['data']?.[0] as ChildGroupMember[]) ?? [];

                  return (
                    <div key={`${group['teamId']}-${idx}`}>
                      {(memberList.length > 5 && !isSeeMores[index]
                        ? memberList.slice(0, 5)
                        : memberList
                      ).map((member) => {
                        return (
                          <div
                            key={uuidv4()}
                            className={'flex justify-between items-center px-8 mb-6'}
                          >
                            <div className={'flex'}>
                              <img
                                src={
                                  member?.['image']
                                    ? member?.['image']
                                    : '/images/test_userprofile.png'
                                }
                                alt={`${member?.['nickname']}의 프로필 서진`}
                                className={'w-12 h-12 mr-4 rounded-[50%]'}
                              />
                              <div
                                className={'flex flex-col justify-center font-bold text-gray-dark'}
                              >
                                <span>
                                  {userInfo.id === member?.['id'] && '(나)'} {member?.['nickname']}{' '}
                                  ({member?.['name']})
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {memberList.length > 5 && (
                        <div>
                          {isSeeMores[index] ? (
                            <MdKeyboardArrowUp
                              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
                              onClick={() => onClickSeeMore(index)}
                            />
                          ) : (
                            <MdKeyboardArrowDown
                              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
                              onClick={() => onClickSeeMore(index)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }
        )}
      </article>
    </section>
  );
}
