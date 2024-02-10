import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ProductInfo } from '@/typings/product.ts';
import { Table, TableContainer, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import Tables from '@/components/Product/ReleaseNote/Tables.tsx';
import ProjectModal from '@/components/Product/ReleaseNote/ProjectModal.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAllProduct } from '@/components/Product/hooks/useGetAllProduct.ts';
import { useQueries, useQuery } from 'react-query';
import { getAllProductProjects, getChangeLogEachProject } from '@/api/Project/Version.ts';
import { useRecoilState } from 'recoil';
import { eachProductProjects } from '@/recoil/Project/atom.ts';
import { FaUserCircle } from 'react-icons/fa';
import { message } from '@/recoil/Common/atom.ts';
export default function ReleaseNote() {
  const [projects, setProjects] = useRecoilState(eachProductProjects);
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const { product } = useParams();

  const queryResults = useQueries([
    {
      queryKey: ['getAllProductProjects', nowProduct?.productId],
      queryFn: () => getAllProductProjects(nowProduct?.productId),
      staleTime: 300000, // 5분
      cacheTime: 600000, // 10분
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
      enabled: !!nowProduct?.productId,
    },
  ]);

  const eachProjectQueryResults = useQueries(
    projects.map((project) => ({
      queryKey: ['getChangeLog', project.id],
      queryFn: () => getChangeLogEachProject(project.id),
      enabled: !!projects,
    }))
  );

  const navigate = useNavigate();
  const [productList, refetch, isFetching] = useGetAllProduct()!;
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  const { isOpen, onOpen, onClose } = useDisclosure();
  // 모달 프로젝트 추가로 띄울건지, 프로젝트 완료로 띄울건지
  const [isAdd, setIsAdd] = useState(true);
  const [isClickKebab, setIsClickKebab] = useState(false);
  // 프로젝트 완료에서 임시 이름 저장하는 state
  const [tempVersion, setTempVersion] = useState('');
  const [nowProjectId, setNowProjectId] = useState(-1);

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

  useEffect(() => {
    const projectList = queryResults[0].data;
    if (projectList && typeof projectList !== 'string') {
      const temp = JSON.parse(JSON.stringify(projectList));
      setProjects([...temp]);
    }
  }, [queryResults[0].data]);

  // 로그인 페이지에서 넘어왔을 경우
  useLayoutEffect(() => {
    if (isFetching) return;

    if (product === '-1' && productList?.length > 0) {
      sessionStorage.setItem('nowProduct', JSON.stringify(productList[0]));
      navigate(`/workspace/${productList[0].productId}`);
    } else if (product === '-1' && productList.length === 0) {
      navigate('/');
    }
  }, [product, productList, isFetching]);

  return (
    <section className={'w-full min-w-[50em] py-32 px-14 xl:px-56'} onClick={onCloseKebab}>
      <div className={'min-w-[30em] flex justify-between mb-4'}>
        <span className={'flex items-center'}>
          {nowProduct?.productImage ? (
            <img src={nowProduct?.productImage} alt={'제품 사진'} className={'w-12 h-12 mr-4'} />
          ) : (
            <FaUserCircle className={'w-12 h-12 mr-4 ml-2 text-3xl'} />
          )}
          <span className={'text-[2.4rem] font-bold'}>{nowProduct?.productName}</span>
        </span>
        <button
          className={'mr-2 text-gray-dark font-bold underline self-end'}
          onClick={() => {
            if (projects?.[0].projectStatus === 'PROGRESS_IN') {
              setMessageInfo({ type: 'warning', content: '현재 진행 중인 프로젝트가 있습니다.' });
              return;
            }

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
            {projects?.length > 0 && (
              <Tables
                isClickKebab={isClickKebab}
                setIsClickKebab={setIsClickKebab}
                onClickKebab={onClickKebab}
                onClickComplete={onClickProjectModal}
                setTempVersion={setTempVersion}
                setNowProjectId={setNowProjectId}
                eachProjectQueryResults={eachProjectQueryResults.reverse()}
              />
            )}
          </Table>
          {projects?.length === 0 && (
            <div
              className={'flex-row-center mt-6 text-gray-light text-2xl font-bold cursor-pointer'}
              onClick={onOpen}
            >
              <AiOutlinePlus className={'mr-4 text-3xl'} /> 프로젝트 시작하기
            </div>
          )}
        </TableContainer>
      </div>

      {/* 프로젝트 추가 완료 모달 */}
      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        isAdd={isAdd}
        versionName={tempVersion}
        setMessageInfo={setMessageInfo}
        nowProjectId={nowProjectId}
      />
    </section>
  );
}
