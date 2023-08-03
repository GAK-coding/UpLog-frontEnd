import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuListData } from '@/recoil/Project/atom.tsx';

export default function Menu() {
  const { product, project } = useParams();
  const navigate = useNavigate();

  const menuList = useRecoilValue(menuListData);

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
              <MenuSlider product={product!} project={project!} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
