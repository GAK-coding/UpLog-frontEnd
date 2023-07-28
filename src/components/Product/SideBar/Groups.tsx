import React, { useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Collapse, Fade, useDisclosure } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { NavLink, useParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

export default function Groups() {
  const { product, project, parentgroup, childgroup } = useParams();

  const [parentGroups, setParentGroups] = useState<Array<{ name: string; isOpen: boolean }>>([
    { name: '개발팀', isOpen: false },
    { name: '마케팅팀', isOpen: false },
    { name: '홍보팀', isOpen: false },
    { name: '바보팀', isOpen: false },
    { name: '멍청이팀', isOpen: false },
    { name: '똥개팀', isOpen: false },
    { name: '젠킨스팀', isOpen: false },
  ]);

  const childGroups: string[][] = [
    ['프론트엔드', '백엔드', '풀스택'],
    ['콘텐츠', '디자인'],
    ['SNS', '기사'],
    ['김윤정'],
    ['박은령'],
    ['오채영'],
    ['장준'],
  ];

  const onToggle = useCallback(
    (id: number) => {
      const temp = [...parentGroups];
      temp[id].isOpen = !temp[id].isOpen;
      setParentGroups(temp);
    },
    [parentGroups]
  );

  return (
    <section className={'px-10'}>
      <div className={'h-20 flex-row-center justify-between'}>
        <header className={'text-[1.4rem] font-bold'}>Group</header>
        <span>
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
                    isActive && 'text-orange-sideBar'
                  }`
                }
              >
                <span className={'flex items-center'}>
                  <BsDot /> {parent.name}
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
                      to={`/workspace/${product}/${project}/group/${parent.name}/${child}}`}
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
    </section>
  );
}
