import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoMdSettings } from 'react-icons/io';
import CreateGroupModal from '@/components/Product/SideBar/CreateGroupModal.tsx';
import { ChildTeamInfoDTO, ParentGroupWithStates, Project } from '@/typings/project.ts';
import { useGetProjectGroups } from '@/components/Project/hooks/useGetProjectGroups.ts';
import { useQuery } from 'react-query';
import { getChildGroups } from '@/api/Project/Version.ts';
import { message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';

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
  const [isShowSettingIcon, setIsShowSettingIcon] = useState(false);

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

  const onChnageNowParentGroupIdx = useCallback((idx: number) => {
    setNowParentGroupIdx(idx);
  }, []);

  const { data: getChildGroup, refetch } = useQuery(
    ['childGroup', nowParentGroupId],
    () => getChildGroups(nowParentGroupId),
    {
      enabled: false,
    }
  );

  /** 부모 집합 펼치는 함수 */
  const onToggle = useCallback(
    (id: number) => {
      const temp = [...parentGroups];
      temp[id].isOpen = !temp[id].isOpen;
      setParentGroups(temp);
    },
    [parentGroups]
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
      setIsShowSettingIcon(true);
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
    if (nowParentGroupId !== -1) {
      refetch();

      const temp = [...parentGroups].map((group) => {
        if (group.id === nowParentGroupId) group.isOpen = true;
        else group.isOpen = false;

        return group;
      });

      setParentGroups(temp);
    }
  }, [nowParentGroupId]);

  useEffect(() => {
    if (typeof getChildGroup !== 'string' && getChildGroup?.childTeamInfoDTOList.length === 0) {
      setMessageInfo({ type: 'warning', content: '하위 그룹이 없습니다!' });

      const temp = [...parentGroups];
      temp[nowParentGroupIdx]['isOpen'] = false;
      setParentGroups(temp);
    }
  }, [getChildGroup, nowParentGroupIdx, change]);

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
                    onToggle(index);
                    onChangeNowParentId(parent.id);
                    onChnageNowParentGroupIdx(index);
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
                      (getChildGroup?.childTeamInfoDTOList as ChildTeamInfoDTO[])?.map(
                        (child, idx) => (
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
                        )
                      )}
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
