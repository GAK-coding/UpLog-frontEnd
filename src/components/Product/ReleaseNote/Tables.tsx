import React, { useCallback, useState } from 'react';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import { changeType, Release } from '@/typings/product.ts';
import { GoKebabHorizontal } from 'react-icons/go';

export default function Tables() {
  const bgColor: Record<changeType, string> = {
    Feature: 'bg-type-feature',
    Changed: 'bg-type-changed',
    Fixed: 'bg-type-fixed',
    New: 'bg-type-new',
    Deprecated: 'bg-type-deprecated',
  };

  // TODO: 리코일에서 받아 올 값
  const dummy: Release[] = [
    {
      status: 'going',
      version: 'v.1.1.4(임시)',
      date: '진행중',
      contents: [],
    },
    // {
    //   status: 'going',
    //   version: 'v.1.1.3',
    //   date: '2023.06.15',
    //   contents: [
    //     { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
    //     {
    //       type: 'Changed',
    //       content: '공통 Request Protocol',
    //     },
    //     {
    //       type: 'Fixed',
    //       content: '고침',
    //     },
    //     {
    //       type: 'New',
    //       content: '새거',
    //     },
    //     {
    //       type: 'Deprecated',
    //       content: '이제 못 씀',
    //     },
    //   ],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.1.2',
    //   date: '2023.06.12',
    //   contents: [
    //     { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
    //     {
    //       type: 'Changed',
    //       content: '공통 Request Protocol 추가',
    //     },
    //   ],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.1.1',
    //   date: '2023.05.12',
    //   contents: [{ type: 'Deprecated', content: '미사용 필드 삭제' }],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.1.0',
    //   date: '2023.03.25',
    //   contents: [{ type: 'Feature', content: 'Service Argent 채널 연결과 통신 관련 설명' }],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.0.0',
    //   date: '2023.02.18',
    //   contents: [
    //     { type: 'New', content: 'AI Service 기술 상세 설명' },
    //     { type: 'Fixed', content: '채널 통신 응답 기능 수정' },
    //   ],
    // },
  ];

  const [isClick, setIsClick] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onClickModal = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setIsClick((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsClick(false);
  }, []);

  const handleMouseEnter = useCallback((status: string) => {
    if (status === 'going') setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback((status: string) => {
    if (status === 'going') setIsHovering(false);
    setIsClick(false);
  }, []);

  return (
    <Tbody>
      {dummy.map((version, index) => {
        return (
          <Tr
            key={index}
            color={version.status === 'going' ? 'var(--gray-dark)' : ''}
            position={'relative'}
            onMouseEnter={() => handleMouseEnter(version.status)}
            onMouseLeave={() => handleMouseLeave(version.status)}
            onClick={onCloseModal}
          >
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              padding={'1.6rem 0'}
              textAlign={'center'}
            >
              {version.version}
            </Td>
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              textAlign={'center'}
            >
              {version.date}
            </Td>
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              marginY={'auto'}
            >
              {/* Contents of the table row */}
              {version.contents.map((content, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${version.contents.length - 1 !== idx && 'mb-5'} flex items-center`}
                  >
                    <span
                      className={`${
                        bgColor[content.type]
                      } text-[#292723] mr-4 p-2 rounded-[0.31rem]`}
                    >
                      {content.type}
                    </span>
                    {content.content}
                  </div>
                );
              })}
            </Td>

            {/* Buttons for the "going" status */}
            {version.status === 'going' && isHovering && (
              <Td
                position={'absolute'}
                top={'-0.5rem'}
                right={'-1rem'}
                backgroundColor={'inherit'}
                border={'none'}
              >
                <button onClick={(e) => onClickModal(e)}>
                  <GoKebabHorizontal className={'fill-gray-dark text-2xl cursor-pointer'} />
                </button>
                {isClick && (
                  <div
                    className={
                      'absolute top-10 right-6 flex flex-col w-[7.5rem] h-20 border-solid border-[0.5px] border-gray-spring rounded text-xs shadow-release bg-white'
                    }
                  >
                    <button
                      className={'h-1/2 hover:bg-orange-light-sideBar'}
                      onClick={() => {
                        console.log('클릭');
                      }}
                    >
                      변경이력 추가
                    </button>
                    <button
                      className={'h-1/2 hover:bg-orange-light-sideBar'}
                      onClick={() => {
                        console.log('완료');
                      }}
                    >
                      완료
                    </button>
                  </div>
                )}
              </Td>
            )}
          </Tr>
        );
      })}
    </Tbody>
  );
}
