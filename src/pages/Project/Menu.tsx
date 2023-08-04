import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';
import { useState } from 'react';
import TaskMain from '@/components/Project/Menu/TaskMain.tsx';
import PostMain from '@/components/Project/Menu/PostMain.tsx';

export default function Menu() {
  const { product, project, menutitle } = useParams();
  const navigate = useNavigate();

  // post, task 구분
  const [isPost, setIsPost] = useState(false);

  return (
    <section className={'flex-col-center justify-start w-noneSideBar h-full'}>
      <section className={'flex-row-center h-[5rem] w-full'}>
        {/*프로젝트 페이지로 이동하는 버튼*/}
        <BsChevronCompactUp
          className={'text-[4rem] text-gray-light cursor-pointer'}
          onClick={() => navigate(`/workspace/${product}/${project}`)}
        />
      </section>
      {/*메뉴 보드 Wrapper*/}
      <section className={'flex-col w-[80%] min-w-[80rem] h-menu pt-6'}>
        {/*post, task 메뉴보드*/}
        <section className={'flex-col-center w-h-full border-base border-b-0 border-gray-border'}>
          {/*메뉴 list*/}
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border '}>
            <div className={'w-full min-w-[70rem] h-full items-center justify-center'}>
              <MenuSlider product={product!} project={project!} menuTitle={menutitle!} />
            </div>
          </div>
          <div className={'flex-col-center w-full h-content pt-8 overflow-y-auto'}>
            {/*post, task 선택*/}
            <section className={'flex-row-center w-full h-[6rem] pt-[2.5rem]'}>
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
                  className={`text-[1.4rem] ${
                    !isPost ? 'text-black font-bold' : 'text-gray-border font-semibold'
                  }transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
                >
                  Task
                </span>
              </button>
            </section>
            {isPost ? <PostMain /> : <TaskMain />}
          </div>
        </section>
      </section>
    </section>
  );
}
