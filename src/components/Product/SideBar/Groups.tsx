import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoMdSettings } from 'react-icons/io';
import CreateGroupModal from '@/components/Product/SideBar/CreateGroupModal.tsx';
import { ChildGroup, ChildTeamInfoDTO, ParentGroupWithStates, Project } from '@/typings/project.ts';
import { useGetProjectGroups } from '@/components/Project/hooks/useGetProjectGroups.ts';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';
import { useGetChildGroups } from '@/components/Product/hooks/useGetChildGroups.ts';

export default function Groups() {
  const { product, project, parentgroup, childgroup } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nowProject: Project = JSON.parse(sessionStorage.getItem('nowProject')!);
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const [parentGroups, setParentGroups] = useState<ParentGroupWithStates[]>([]);
  const [nowParentGroupId, setNowParentGroupId] = useState(-1);
  const [nowParentGroupIdx, setNowParentGroupIdx] = useState(-1);
  // 자식 그룹 없는 useEffect에서 사용
  const [change, setChange] = useState(false);

  const getParentGroups = useGetProjectGroups(nowProject.id, (data) => {
    if (data && typeof data !== 'string') {
      const temp: ParentGroupWithStates[] = data.map((group) => {
        return { ...group, isOpen: false, isHover: false };
      });

      return temp;
    }
  }) as ParentGroupWithStates[];

  const onChangeNowParentId = useCallback((id: number) => {
    setNowParentGroupId(id);
  }, []);

  const onChangeNowParentGroupIdx = useCallback((idx: number) => {
    setNowParentGroupIdx(idx);
  }, []);

  const onSuccessGetChildGroup = useCallback(
    (data: { childTeamInfoDTOList: ChildGroup[] } | 'fail getProjectTeams') => {
      if (typeof data !== 'string' && data.childTeamInfoDTOList.length === 0) {
        setMessageInfo({ type: 'warning', content: '하위 그룹이 없습니다!' });

        const temp = [...parentGroups];

        setParentGroups(
          temp.map((group) => {
            return { ...group, isOpen: false };
          })
        );

        return;
      }

      const temp = [...parentGroups];
      setParentGroups(
        temp.map((group) => {
          if (group.id === nowParentGroupId) return { ...group, isOpen: true };
          else return { ...group, isOpen: false };
        })
      );
    },
    [parentGroups, nowParentGroupId]
  );

  const [getChildGroup, refetch] = useGetChildGroups(
    nowParentGroupId,
    false,
    onSuccessGetChildGroup
  );

  /** 설정 이모티콘 지금 hover된거만 보이게 하는 함수*/
  const onShowSettingIcon = useCallback(
    (num: number) => {
      const temp: ParentGroupWithStates[] = JSON.parse(JSON.stringify(parentGroups));

      setParentGroups(
        temp.map((group) => {
          if (group.id === num) group.isHover = true;
          else group.isHover = false;

          return group;
        })
      );
    },
    [parentGroups]
  );

  /**설정 이모티콘 안보이게 하는 함수*/
  const onLeave = useCallback(
    (num: number) => {
      const temp: ParentGroupWithStates[] = JSON.parse(JSON.stringify(parentGroups));
      temp[num].isHover = false;
      setParentGroups(temp);
    },
    [parentGroups]
  );

  const onClickSetting = useCallback((e: React.MouseEvent<SVGElement>, group: string) => {
    e.preventDefault();
    navigate(`/workspace/${product}/${project}/group/${group}/setting`);
  }, []);

  const onSetNowGroupId = useCallback((id: number) => {
    sessionStorage.setItem('nowGroupId', id.toString());
  }, []);

  useEffect(() => {
    if (getParentGroups) {
      sessionStorage.setItem('nowTeamId', getParentGroups[0]?.id.toString());
      setParentGroups(getParentGroups);
    }
  }, [getParentGroups]);

  useEffect(() => {
    const temp: ParentGroupWithStates[] = JSON.parse(JSON.stringify(parentGroups));

    // 여기선 자식 그룹을 조회한 상황
    if (temp[nowParentGroupIdx]?.isOpen) {
      temp[nowParentGroupIdx].isOpen = false;
      setParentGroups(temp);
      return;
    }

    // 여기선 자식 그룹을 조회하지 않은 상황
    if (nowParentGroupId !== -1) {
      refetch();
    }
  }, [nowParentGroupId, nowParentGroupIdx, change]);

  return (
    <section className={'px-10'}>
      <div className={'h-20 flex-row-center justify-between'}>
        <header className={'text-[1.4rem] font-bold'}>Group</header>
        {/* 그룹 최대 개수 30개 */}
        {parentGroups.length <= 30 && (
          <span className={'cursor-pointer'} onClick={onOpen}>
            <AiOutlinePlus className={'text-2xl fill-gray-light'} />
          </span>
        )}
      </div>
      <div>
        <NavLink
          to={`/workspace/${product}/${project}`}
          className={({ isActive }) =>
            `flex items-center font-bold text-[1.1rem] mb-4 ${
              isActive && !parentgroup && !childgroup && 'text-orange-sideBar'
            }`
          }
          onClick={() => onSetNowGroupId(+sessionStorage.getItem('nowTeamId')!)}
        >
          <BsDot /> 전체
        </NavLink>
        {(parentGroups as ParentGroupWithStates[])?.map((parent, index) => {
          if (index === 0) return;

          return (
            <div key={`${parent.teamName}-${index}`}>
              <div className={'flex items-center mb-4'}>
                <NavLink
                  to={`/workspace/${product}/${project}/group/${parent.teamName}`}
                  className={({ isActive }) =>
                    `w-[90%] flex justify-between items-center font-bold text-[1.1rem] ${
                      isActive && !pathname.includes('setting') && 'text-orange-sideBar'
                    }`
                  }
                  onMouseEnter={() => onShowSettingIcon(parent.id)}
                  onMouseLeave={() => onLeave(index)}
                  onClick={() => onSetNowGroupId(parent.id)}
                >
                  <span className={'flex items-center h-full'}>
                    <BsDot /> {parent.teamName}
                    {parent.isHover && (
                      <IoMdSettings
                        className={'ml-2 fill-gray-light text-[1.4rem]'}
                        onClick={(e) => onClickSetting(e, parent.teamName)}
                      />
                    )}
                  </span>
                </NavLink>

                <span
                  className={'w-[10%]'}
                  onClick={() => {
                    onChangeNowParentId(parent.id);
                    onChangeNowParentGroupIdx(index);
                    setChange(!change);
                  }}
                >
                  <IoIosArrowDown
                    className={`fill-gray-dark text-xl cursor-pointer ${
                      parent.isOpen ? 'arrowDown' : 'arrowUp'
                    }`}
                  />
                </span>
              </div>

              {parent.isOpen && (
                <div className={'mb-2'}>
                  <Collapse in={parent.isOpen} startingHeight={20}>
                    {typeof getChildGroup !== 'string' &&
                      (
                        getChildGroup as { childTeamInfoDTOList: ChildGroup[] }
                      )?.childTeamInfoDTOList?.map((child, idx) => (
                        <NavLink
                          to={`/workspace/${product}/${project}/group/${parent.teamName}/${child.teamName}`}
                          key={`${parent.teamName}-${child.teamName}-${idx}`}
                          className={({ isActive }) =>
                            `w-[90%] flex justify-between items-center font-bold text-[1.1rem] ml-4 mb-4 ${
                              isActive && 'text-orange-sideBar'
                            }`
                          }
                        >
                          <span className={'flex items-center'}>
                            <BsDot /> {child.teamName}
                          </span>
                        </NavLink>
                      ))}
                  </Collapse>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <CreateGroupModal
        isOpen={isOpen}
        onClose={onClose}
        setMessageInfo={setMessageInfo}
        parentGroups={parentGroups}
        setParentGroups={setParentGroups}
      />
    </section>
  );
}
