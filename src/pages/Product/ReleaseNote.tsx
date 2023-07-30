import React, { useCallback, useRef, useState } from 'react';
import { Release } from '@/typings/product.ts';
import { Table, TableContainer, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import Tables from '@/components/Product/ReleaseNote/Tables.tsx';
import ProjectModal from '@/components/Product/ReleaseNote/ProjectModal.tsx';
export default function ReleaseNote() {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  // 모달 프로젝트 추가로 띄울건지, 프로젝트 완료로 띄울건지
  const [isAdd, setIsAdd] = useState(true);
  const [isClickKebab, setIsClickKebab] = useState(false);
  // 프로젝트 완료에서 임시 이름 저장하는 state
  const [tempVersion, setTempVersion] = useState('');

  /** 케밥 버튼 모달*/
  const onClickKebab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsClickKebab((prev) => !prev);
  }, []);

  const onCloseKebab = useCallback(() => {
    setIsClickKebab(false);
  }, []);

  // 프로젝트 모달
  const onClickProjectModal = useCallback((modalType: 'add' | 'complete') => {
    setIsAdd(modalType === 'add');
    onOpen();
  }, []);

  return (
    <section className={'w-h-full min-w-[50em] py-32 px-14 xl:px-56'} onClick={onCloseKebab}>
      <div className={'min-w-[30em] flex justify-between mb-4'}>
        <span className={'flex items-center'}>
          <img src="/images/test.jpeg" alt={'제품 사진'} className={'w-14 h-14 mr-4'} />
          <span className={'text-[2.6rem] font-bold'}>AllFormU</span>
        </span>
        <button
          className={'mr-2 text-gray-dark font-bold underline self-end'}
          onClick={() => {
            setTempVersion('');
            onClickProjectModal('add');
          }}
        >
          프로젝트 추가하기
        </button>
      </div>

      <div>
        <TableContainer overflow={'hidden'} minHeight={'12rem'}>
          <Table fontSize={'1.2rem'} fontWeight={700}>
            <Thead>
              <Tr>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'20%'}
                  color={'var(--black)'}
                >
                  버전
                </Th>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'20%'}
                  color={'var(--black)'}
                >
                  날짜
                </Th>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'60%'}
                  color={'var(--black)'}
                >
                  변경이력
                </Th>
              </Tr>
            </Thead>
            {dummy.length > 0 && (
              <Tables
                isClickKebab={isClickKebab}
                onClickKebab={onClickKebab}
                onClickComplete={onClickProjectModal}
                setTempVersion={setTempVersion}
              />
            )}
          </Table>
          {dummy.length === 0 && (
            <div
              className={'flex-row-center mt-6 text-gray-light text-2xl font-bold cursor-pointer'}
              onClick={onOpen}
            >
              <AiOutlinePlus className={'mr-4 text-3xl'} /> 프로젝트 시작하기
            </div>
          )}
        </TableContainer>
      </div>

      {/* 프로젝트 추가 모달 */}
      <ProjectModal isOpen={isOpen} onClose={onClose} isAdd={isAdd} versionName={tempVersion} />
    </section>
  );
}
