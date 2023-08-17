import React, { useCallback, useState } from 'react';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import { GoKebabHorizontal } from 'react-icons/go';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { typeBgColors } from '@/recoil/Product/ReleaseNote.ts';
import { eachProductProjects } from '@/recoil/Project/atom.ts';
import { editorChangeLog } from '@/recoil/Common/atom.ts';
import { UseQueryResult } from 'react-query';
import { ChangeLogData, Product, ProductInfo } from '@/typings/product.ts';
import { SaveUserInfo } from '@/typings/member.ts';

interface Props {
  isClickKebab: boolean;
  setIsClickKebab: React.Dispatch<React.SetStateAction<boolean>>;
  onClickKebab: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickComplete: (modalType: 'add' | 'complete') => void;
  setTempVersion: React.Dispatch<React.SetStateAction<string>>;
  setNowProjectId: React.Dispatch<React.SetStateAction<number>>;
  eachProjectQueryResults: UseQueryResult<
    ChangeLogData[] | 'fail getChangeLogEachProject',
    unknown
  >[];
}

export default function Tables({
  isClickKebab,
  setIsClickKebab,
  onClickKebab,
  onClickComplete,
  setTempVersion,
  setNowProjectId,
  eachProjectQueryResults,
}: Props) {
  const [editChangeLog, setEditChangeLog] = useRecoilState(editorChangeLog);
  const reverseEachProjectQueryResults = [...eachProjectQueryResults].reverse();

  const [projects, setProjects] = useRecoilState(eachProductProjects);

  const navigate = useNavigate();
  const { product, project } = useParams();
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);

  // 마우스 올렸을 때, kebab 버튼 나타남
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback((status: string) => {
    if (status === 'PROGRESS_IN') setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback((status: string) => {
    if (status === 'PROGRESS_IN') {
      setIsHovering(false);
      setIsClickKebab(false);
    }
  }, []);

  return (
    <Tbody>
      {[...projects].reverse()?.map((version, index) => {
        return (
          <Tr
            key={index}
            color={version.projectStatus === 'PROGRESS_IN' ? 'var(--gray-dark)' : ''}
            position={'relative'}
            onMouseEnter={() => handleMouseEnter(version.projectStatus)}
            onMouseLeave={() => handleMouseLeave(version.projectStatus)}
          >
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              padding={'1.6rem 0'}
              textAlign={'center'}
              cursor={'pointer'}
              onClick={() => {
                const url = encodeURI(`/workspace/${product}/${version.id}`);
                sessionStorage.setItem('nowProject', JSON.stringify(version));
                {
                  nowProduct.powerType === 'CLIENT'
                    ? navigate(`${url}/menu/결과물`)
                    : navigate(url);
                }
              }}
            >
              {version.version}
            </Td>
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              textAlign={'center'}
            >
              {version.projectStatus === 'PROGRESS_IN' ? '진행 중' : version.endDate}
            </Td>
            <Td
              borderTop={'1px solid var(--gray-table)'}
              borderBottom={'1px solid var(--gray-table)'}
              marginY={'auto'}
              fontSize={'1.1rem'}
            >
              {eachProjectQueryResults[index]['data'] !== 'fail getChangeLogEachProject' &&
              Array.isArray(eachProjectQueryResults[index]['data']) ? (
                (
                  [
                    ...JSON.parse(JSON.stringify(eachProjectQueryResults?.[index]?.['data'])),
                  ] as ChangeLogData[]
                )?.map((content, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`${
                        eachProjectQueryResults[index]['data']!.length - 1 !== idx && 'mb-5'
                      } flex items-center`}
                    >
                      <span
                        className={`${content.issueStatus === 'FEATURE' && 'bg-type-FEATURE'}
                       ${content.issueStatus === 'NEW' && 'bg-type-NEW'} 
                       ${content.issueStatus === 'CHANGED' && 'bg-type-CHANGED'}
                       ${content.issueStatus === 'FIXED' && 'bg-type-FIXED'}
                       ${
                         content.issueStatus === 'DEPRECATED' && 'bg-type-DEPRECATED'
                       } text-[#292723] mr-4 p-2 rounded-[0.31rem]`}
                      >
                        {content.issueStatus}
                      </span>
                      {content.title}
                    </div>
                  );
                })
              ) : (
                <button
                  className={
                    'flex items-center text-[1.2rem] text-gray-light font-bold cursor-pointer'
                  }
                  onClick={() => {
                    navigate(`/workspace/${product}/newchange`);
                    sessionStorage.setItem('nowProject', JSON.stringify(version));
                    setEditChangeLog('');
                  }}
                >
                  {version.projectStatus === 'PROGRESS_IN' && (
                    <>
                      <AiOutlinePlus className={'text-[1.6rem] mr-3'} /> 변경이력 추가
                    </>
                  )}
                </button>
              )}
            </Td>

            {/* Buttons for the "going" status */}
            {nowProduct?.powerType === 'MASTER' &&
              version.projectStatus === 'PROGRESS_IN' &&
              isHovering && (
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
                        onClick={() => {
                          navigate(`/workspace/${product}/newchange`);
                          sessionStorage.setItem('nowProject', JSON.stringify(version));
                          setEditChangeLog('');
                        }}
                      >
                        변경이력 추가
                      </button>
                      <button
                        className={'h-1/2 hover:bg-orange-light-sideBar'}
                        onClick={() => {
                          onClickComplete('complete');
                          setTempVersion(version.version);
                          setNowProjectId(version.id);
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
