import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import { Select } from '@chakra-ui/react';
import { Scrollbars } from 'rc-scrollbars';
import { useGetChildGroups } from '@/components/Product/hooks/useGetChildGroups.ts';
import { ChildGroup, ChildGroupMember } from '@/typings/project.ts';
import { useQueries, useQuery } from 'react-query';
import { getChildGroupMembers } from '@/api/Project/Version.ts';
import AddChildGroup from '@/components/Project/ManageGroup/AddChildGroup.tsx';

export default function ManageGroup() {
  const { parentgroup } = useParams();
  const [isClickMemberAdd, setIsClickMemberAdd] = useState(false);
  const nowParentGroupId = +sessionStorage.getItem('nowGroupId')!;
  const [getChildGroup, refetch] = useGetChildGroups(nowParentGroupId);
  const [childGroupIds, setChildGroupIds] = useState<number[]>([]);

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
          return data.verySimpleMemberInfoDTOList;
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

  useEffect(() => {
    if (getChildGroup) {
      const temp = (
        getChildGroup as { childTeamInfoDTOList: ChildGroup[] }
      )?.childTeamInfoDTOList.map((group) => group.teamId);

      setChildGroupIds(temp);
    }
  }, [getChildGroup]);

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
        <button
          className={'bg-orange rounded font-bold text-white w-[6.5rem] h-10 flex-row-center'}
          onClick={onClickMemberAdd}
        >
          <AiOutlinePlus className={'text-xl mr-1'} /> 멤버 추가
        </button>

        {isClickMemberAdd && (
          <div
            className={
              'absolute top-[3rem] right-0 w-48 h-80 z-20 bg-white shadow-sign-up rounded-[0.3rem]'
            }
          >
            <Scrollbars
              style={{ width: '100%', height: '100%' }}
              autoHide
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              {/*{addMemberList.map((member, idx) => {*/}
              {/*  return (*/}
              {/*    <div key={idx} className={'flex p-2 mb-1 cursor-pointer hover:bg-orange-light'}>*/}
              {/*      <img*/}
              {/*        src={member.profile ? member.profile : '/images/test_userprofile.png'}*/}
              {/*        alt={`${member.nickName}의 프로필 서진`}*/}
              {/*        className={'w-10 h-10 mr-4 rounded-[50%]'}*/}
              {/*      />*/}
              {/*      <div*/}
              {/*        className={'flex flex-col justify-center text-xs font-bold text-gray-dark'}*/}
              {/*      >*/}
              {/*        <span>*/}
              {/*          {member.nickName} ({member.name})*/}
              {/*        </span>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  );*/}
              {/*})}*/}
            </Scrollbars>
          </div>
        )}
      </article>

      <article className={'w-[50rem] mx-auto mt-12'}>
        {(getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.['childTeamInfoDTOList'].map(
          (group, index) => {
            return (
              <div key={`child-${group['teamId']}`} className={'mb-12'}>
                <div className={'border-b border-gray-light font-bold text-[1.4rem] pb-2 mb-4'}>
                  {group['teamName'] ?? '미소속'}
                </div>
                {childGroupMembers?.map((members, idx) => {
                  if (index !== idx) return;

                  return members?.['data']?.map((member) => {
                    return (
                      <div
                        key={member['id']}
                        className={'flex justify-between items-center px-8 mb-6'}
                      >
                        <div className={'flex'}>
                          <img
                            src={
                              member?.['image'] ? member?.['image'] : '/images/test_userprofile.png'
                            }
                            alt={`${member?.['nickname']}의 프로필 서진`}
                            className={'w-12 h-12 mr-4 rounded-[50%]'}
                          />
                          <div className={'flex flex-col justify-center font-bold text-gray-dark'}>
                            <span>
                              {member?.['nickname']} ({member?.['name']})
                            </span>
                          </div>
                        </div>

                        <Select
                          width={'8rem'}
                          height={'1.6rem'}
                          color={'var(--gray-dark)'}
                          fontSize={'0.75rem'}
                          defaultValue={group['teamName'] ?? '미소속'}
                          icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
                        >
                          {!group['teamName'] && <option value={'미소속'}>미소속</option>}
                          {(getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.[
                            'childTeamInfoDTOList'
                          ]?.map((group) => {
                            return (
                              <option key={group['teamId']} value={group['teamName']}>
                                {group['teamName']}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                    );
                  });
                })}
              </div>
            );
          }
        )}

        <AddChildGroup getChildGroup={getChildGroup as { childTeamInfoDTOList: ChildGroup[] }} />
      </article>
    </section>
  );
}
