import React, { useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoMdSettings } from 'react-icons/io';
import CreateGroupModal from '@/components/Product/SideBar/CreateGroupModal.tsx';
import { useGetProjectGroups } from '@/components/Project/hooks/useGetProjectGroups.ts';
import { Project } from '@/typings/project.ts';

export default function Groups() {
  const { product, project, parentgroup, childgroup } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nowProject: Project = JSON.parse(sessionStorage.getItem('nowProject')!);

  const [parentGroups, setParentGroups] = useState<
    Array<{ name: string; isOpen: boolean; isHover: boolean }>
  >([
    // { name: '개발팀', isOpen: false, isHover: false },
    // { name: '마케팅팀', isOpen: false, isHover: false },
    // { name: '홍보팀', isOpen: false, isHover: false },
    // { name: '바보팀', isOpen: false, isHover: false },
    // { name: '멍청이팀', isOpen: false, isHover: false },
    // { name: '똥개팀', isOpen: false, isHover: false },
    // { name: '젠킨스팀', isOpen: false, isHover: false },
  ]);

  const childGroups: string[][] = [
    // ['프론트엔드', '백엔드', '풀스택'],
    // ['콘텐츠', '디자인'],
    // ['SNS', '기사'],
    // ['김윤정'],
    // ['박은령'],
    // ['오채영'],
    // ['장준'],
  ];

  const groups = useGetProjectGroups(nowProject?.id);

  console.log(groups);

  /** 부모 집합 펼치는 함수 */
  const onToggle = useCallback(
    (id: number) => {
      const temp = [...parentGroups];
      temp[id].isOpen = !temp[id].isOpen;
      setParentGroups(temp);
    },
    [parentGroups]
  );

  /** 설정 이모티콘 보이게 하는 함수*/
  const onHover = useCallback(
    (num: number) => {
      const temp = JSON.parse(JSON.stringify(parentGroups));
      temp[num].isHover = true;
      setParentGroups(temp);
    },
    [parentGroups]
  );

  /**설정 이모티콘 안보이게 하는 함수*/
  const onLeave = useCallback(
    (num: number) => {
      const temp = JSON.parse(JSON.stringify(parentGroups));
      temp[num].isHover = false;
      setParentGroups(temp);
    },
    [parentGroups]
  );

  const onClickSetting = useCallback((e: React.MouseEvent<SVGElement>, group: string) => {
    e.preventDefault();
    navigate(`/workspace/${product}/${project}/group/${group}/setting`);
  }, []);

  return (
    <section className={'px-10'}>
      <div className={'h-20 flex-row-center justify-between'}>
        <header className={'text-[1.4rem] font-bold'}>Group</header>
        <span className={'cursor-pointer'} onClick={onOpen}>
          <AiOutlinePlus className={'text-2xl fill-gray-light'} />
        </span>
      </div>
      <div>
        <NavLink
          to={`/workspace/${product}/${project}`}
          className={({ isActive }) =>
            `flex items-center font-bold text-[1.1rem] mb-4 ${
              isActive && !parentgroup && !childgroup && 'text-orange-sideBar'
            }`
          }
        >
          <BsDot /> 전체
        </NavLink>
        {parentGroups.map((parent, index) => (
          <div key={`${parent.name}-${index}`}>
            <div className={'flex items-center mb-4'}>
              <NavLink
                to={`/workspace/${product}/${project}/group/${parent.name}`}
                className={({ isActive }) =>
                  `w-[90%] flex justify-between items-center font-bold text-[1.1rem] ${
                    isActive && !pathname.includes('setting') && 'text-orange-sideBar'
                  }`
                }
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onLeave(index)}
              >
                <span className={'flex items-center h-full'}>
                  <BsDot /> {parent.name}
                  {parent.isHover && (
                    <IoMdSettings
                      className={'ml-2 fill-gray-light text-[1.4rem]'}
                      onClick={(e) => onClickSetting(e, parent.name)}
                    />
                  )}
                </span>
              </NavLink>

              <span className={'w-[10%]'} onClick={() => onToggle(index)}>
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
                  {childGroups[index].map((child, idx) => (
                    <NavLink
                      to={`/workspace/${product}/${project}/group/${parent.name}/${child}`}
                      key={`${parent.name}-${child}-${idx}`}
                      className={({ isActive }) =>
                        `w-[90%] flex justify-between items-center font-bold text-[1.1rem] ml-4 mb-4 ${
                          isActive && 'text-orange-sideBar'
                        }`
                      }
                    >
                      <span className={'flex items-center'}>
                        <BsDot /> {child}
                      </span>
                    </NavLink>
                  ))}
                </Collapse>
              </div>
            )}
          </div>
        ))}
      </div>
      <CreateGroupModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
