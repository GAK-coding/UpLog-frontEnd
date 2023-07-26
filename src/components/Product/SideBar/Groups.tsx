import React, { useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Collapse, Fade, useDisclosure } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

export default function Groups() {
  const [parentGroups, setParentGroups] = useState<Array<{ name: string; isOpen: boolean }>>([
    { name: '개발팀', isOpen: false },
    { name: '마케팅팀', isOpen: false },
    { name: '홍보팀', isOpen: false },
  ]);

  const childGroups: string[] = [
    ['프론트엔드', '백엔드', '풀스택'],
    ['콘텐츠', '디자인'],
    ['SNS', '기사'],
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
        <NavLink to={``} className={'flex items-center font-bold text-[1.1rem] mb-4'}>
          <BsDot /> 전체
        </NavLink>
        {parentGroups.map((group, index) => (
          <>
            <div className={'flex'}>
              <NavLink
                to={``}
                key={index}
                className={
                  'w-[90%] flex justify-between items-center font-bold text-[1.1rem] mb-4 border-solid border'
                }
              >
                <span className={'flex items-center'}>
                  <BsDot /> {group.name}
                </span>
              </NavLink>

              <span className={'w-[10%] border-solid border'} onClick={() => onToggle(index)}>
                <IoIosArrowDown
                  className={`fill-gray-dark text-xl ${group.isOpen ? 'arrowDown' : 'arrowUp'}`}
                />
              </span>
            </div>

            {group.isOpen && (
              <Collapse in={group.isOpen} startingHeight={20}>
                Fade
              </Collapse>
            )}
          </>
        ))}
        {/*<Button onClick={onToggle}>Click Me</Button>*/}
        {/*<Fade in={isOpen}>Fade</Fade>*/}
      </div>
    </section>
  );
}
