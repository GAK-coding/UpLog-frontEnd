import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import { MenuInfo } from '@/typings/project.ts';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';

export default function Menu() {
  const { product, project } = useParams();
  const navigate = useNavigate();

  const menuList: MenuInfo[] = [
    { id: 1, name: '결과물' },
    { id: 2, name: '요구사항' },
    { id: 3, name: '개발' },
    { id: 4, name: '배포' },
    { id: 5, name: '개발2' },
    { id: 6, name: '배포2' },
  ];

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
        <section className={'w-h-full border-base border-b-0 border-gray-border'}>
          {/*메뉴 list*/}
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border '}>
            <div className={'w-full min-w-[70rem] h-full items-center justify-center'}>
              <MenuSlider product={product!} project={project!} menuList={menuList} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
