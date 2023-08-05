import React, { useCallback, useState } from 'react';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import { changeType, Release } from '@/typings/product.ts';
import { GoKebabHorizontal } from 'react-icons/go';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { typeBgColors } from '@/recoil/Product/ReleaseNote.ts';

interface Props {
  isClickKebab: boolean;
  setIsClickKebab: React.Dispatch<React.SetStateAction<boolean>>;
  onClickKebab: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickComplete: (modalType: 'add' | 'complete') => void;
  setTempVersion: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tables({
  isClickKebab,
  setIsClickKebab,
  onClickKebab,
  onClickComplete,
  setTempVersion,
}: Props) {
  const bgColor = useRecoilValue(typeBgColors);

  // TODO: 리코일에서 받아 올 값
  const dummy: Release[] = [
    {
      status: 'going',
      version: 'v.1.1.4(임시)',
      date: '진행중',
      contents: [],
    },
    {
      status: 'done',
      version: 'v.1.1.3',
      date: '2023.06.15',
      contents: [
        { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
        {
          type: 'Changed',
          content: '공통 Request Protocol',
        },
        {
          type: 'Fixed',
          content: '고침',
        },
        {
          type: 'New',
          content: '새거',
        },
        {
          type: 'Deprecated',
          content: '이제 못 씀',
        },
      ],
    },
    {
      status: 'done',
      version: 'v.1.1.2',
      date: '2023.06.12',
      contents: [
        { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
        {
          type: 'Changed',
          content: '공통 Request Protocol 추가',
        },
      ],
    },
    {
      status: 'done',
      version: 'v.1.1.1',
      date: '2023.05.12',
      contents: [{ type: 'Deprecated', content: '미사용 필드 삭제' }],
    },
    {
      status: 'done',
      version: 'v.1.1.0',
      date: '2023.03.25',
      contents: [{ type: 'Feature', content: 'Service Argent 채널 연결과 통신 관련 설명' }],
    },
    {
      status: 'done',
      version: 'v.1.0.0',
      date: '2023.02.18',
      contents: [
        { type: 'New', content: 'AI Service 기술 상세 설명' },
        { type: 'Fixed', content: '채널 통신 응답 기능 수정' },
      ],
    },
  ];

  const navigate = useNavigate();
  const { product, projectId } = useParams();

  // 마우스 올렸을 때, kebab 버튼 나타남
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback((status: string) => {
    if (status === 'going') setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback((status: string) => {
    if (status === 'going') {
      setIsHovering(false);
      setIsClickKebab(false);
    }
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
              fontSize={'1.1rem'}
            >
              {version.contents.length > 0 ? (
                version.contents.map((content, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`${
                        version.contents.length - 1 !== idx && 'mb-5'
                      } flex items-center`}
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
                })
              ) : (
                <button
                  className={
                    'flex items-center text-[1.2rem] text-gray-light font-bold cursor-pointer'
                  }
                  onClick={() => navigate(`/workspace/${product}/newchange`)}
                >
                  <AiOutlinePlus className={'text-[1.6rem] mr-3'} /> 변경이력 추가
                </button>
              )}
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
                <button onClick={onClickKebab}>
                  <GoKebabHorizontal className={'fill-gray-dark text-2xl cursor-pointer'} />
                </button>
                {isClickKebab && (
                  <div
                    className={
                      'absolute top-10 right-6 flex flex-col w-[7.5rem] h-20 border-solid border-[0.5px] border-gray-spring rounded text-xs shadow-release bg-white z-50'
                    }
                  >
                    <button
                      className={'h-1/2 hover:bg-orange-light-sideBar'}
                      onClick={() => navigate(`/workspace/${product}/newchange`)}
                    >
                      변경이력 추가
                    </button>
                    <button
                      className={'h-1/2 hover:bg-orange-light-sideBar'}
                      onClick={() => {
                        onClickComplete('complete');
                        setTempVersion(version.version);
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
