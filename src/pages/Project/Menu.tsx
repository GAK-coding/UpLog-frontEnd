import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';
import TaskMain from '@/components/Project/Task/TaskMain.tsx';
import PostMain from '@/components/Project/Post/PostMain.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BiPencil } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import PostModal from '@/components/Project/Post/PostModal.tsx';
import { postMain } from '@/recoil/Project/Post.ts';
import { useEffect } from 'react';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { ProductInfo } from '@/typings/product.ts';
import { useGetMenuList } from '@/components/Project/hooks/useGetMenuList.ts';
import { SaveProjectInfo } from '@/typings/project.ts';

export default function Menu() {
  const { product, project, menutitle } = useParams();
  const productInfo: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const nowProject: SaveProjectInfo = JSON.parse(sessionStorage.getItem('nowProject')!);
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // post, task 구분
  const [isPost, setIsPost] = useRecoilState(postMain);

  const [getMenuList] = useGetMenuList(nowProject.id);
  const menuList = useRecoilValue(menuListData);

  // 존재하지 않는 메뉴 페이지로 이동하면 결과물 페이지로 이동하게 수정
  useEffect(() => {
    if (menutitle === undefined || !menuList.some((menu) => menu.menuName === menutitle)) {
      navigate(`/workspace/${product}/${project}/menu/결과물`);
    } else navigate(`/workspace/${product}/${project}/menu/${menutitle}`);
  }, [product, project, menutitle]);

  return (
    <section className={'flex-col-center justify-start w-full h-full'}>
      <section className={'flex-row-center h-[5rem] w-full'}>
        {/*프로젝트 페이지로 이동하는 버튼*/}

        {nowProject.projectStatus === 'PROGRESS_COMPLETE' ||
        nowProduct.powerType === 'CLIENT' ? null : (
          <BsChevronCompactUp
            className={'text-[4rem] text-gray-light cursor-pointer'}
            onClick={() => navigate(`/workspace/${product}/${project}`)}
          />
        )}
      </section>
      {/*메뉴 보드 Wrapper*/}
      <section className={'flex-col justify-start w-[80%] min-w-[80rem] h-menu pt-6'}>
        {/*post, task 메뉴보드*/}
        <section
          className={
            'flex-col-center justify-start w-h-full border-base border-b-0 border-gray-border relative'
          }
        >
          {/*메뉴 list*/}
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border '}>
            <div className={'w-full min-w-[70rem] h-full items-center justify-center'}>
              {productInfo.powerType === 'CLIENT' && menuList.length > 0 ? (
                <NavLink
                  to={`/workspace/${product}/${project}/menu/${menuList[0].menuName}`}
                  className={({ isActive }) =>
                    `flex-row-center justify-start  m-auto h-[5rem] w-full border-r border-gray-border ${
                      isActive && 'bg-orange text-black'
                    }`
                  }
                >
                  <span className={'flex-row-center h-full w-full text-[1.25rem] font-bold'}>
                    {menuList[0].menuName}
                  </span>
                </NavLink>
              ) : (
                <MenuSlider product={product!} project={project!} menutitle={menutitle!} />
              )}
            </div>
          </div>
          {menutitle !== '결과물' ? (
            <div className={'flex-col-center justify-start w-full h-content overflow-y-auto'}>
              {/*post, task 선택*/}
              <section className={'flex-row-center w-full min-h-[6rem]'}>
                <button type={'button'} onClick={() => setIsPost(true)}>
                  <span
                    className={`text-[1.4rem] ${
                      isPost ? 'text-black font-bold' : 'text-gray-border font-semibold'
                    }transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
                  >
                    Post
                  </span>
                </button>
                <div className={'mx-5 h-6 border-solid border-r border-[1px] border-gray-border'} />
                <button type={'button'} onClick={() => setIsPost(false)}>
                  <span
                    className={`text-[1.4rem] relative ${
                      isPost ? 'text-gray-border font-semibold' : 'text-black font-bold'
                    }transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
                  >
                    Task
                  </span>
                </button>
              </section>
              {isPost ? <PostMain /> : <TaskMain />}
            </div>
          ) : (
            <div className={'flex-col-center justify-start w-full h-content mt-12 overflow-y-auto'}>
              <PostMain />
            </div>
          )}
          {/*{(isPost && productInfo.powerType !== 'CLIENT') ||*/}
          {/*  (nowProject.projectStatus !== 'PROGRESS_COMPLETE' && (*/}
          {/*    <button*/}
          {/*      className={*/}
          {/*        'absolute flex justify-between items-center px-2.5 w-[5.5rem] h-[2rem] top-[6.5rem] right-10 text-[0.93rem] border border-line rounded'*/}
          {/*      }*/}
          {/*      onClick={() => onOpen()}*/}
          {/*    >*/}
          {/*      <BiPencil className={'flex text-gray-dark text-[1.2rem]'} />*/}
          {/*      <span className={'flex text-gray-dark'}>글쓰기</span>*/}
          {/*    </button>*/}
          {/*  ))}*/}

          {/*{(isPost && productInfo.powerType !== 'CLIENT') || (*/}
          <button
            className={
              'absolute flex justify-between items-center px-2.5 w-[5.5rem] h-[2rem] top-[6.5rem] right-10 text-[0.93rem] border border-line rounded'
            }
            onClick={() => onOpen()}
          >
            <BiPencil className={'flex text-gray-dark text-[1.2rem]'} />
            <span className={'flex text-gray-dark'}>글쓰기</span>
          </button>
          {/*)}*/}

          <PostModal isOpen={isOpen} onClose={onClose} isEdit={false} />
        </section>
      </section>
    </section>
  );
}
