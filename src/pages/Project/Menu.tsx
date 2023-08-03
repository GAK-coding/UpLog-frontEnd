import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import { MenuInfo } from '@/typings/project.ts';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';
import Slider from 'react-slick';
import { IoIosArrowForward } from 'react-icons/io';

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

  // slide settings 커스텀
  const settings = {
    dots: false, // 밑에 점으로 표시되는 것
    infinite: false, // loop 만들지 결정 여부
    speed: 800, // 넘어가는 속도
    slidesToShow: 5, // 하나의 슬라이드에서 보여줄 개수
    slidesToScroll: 5, // 슬라이드 넘길 시 몇개의 아이템을 넘길지
  };

  return (
    <section className={'flex-col-center justify-start w-noneSideBar h-full'}>
      <section className={'flex-row-center h-[5rem] w-full'}>
        <BsChevronCompactUp
          className={'text-[4rem] text-gray-light cursor-pointer'}
          onClick={() => navigate(`/workspace/${product}/${project}`)}
        />
      </section>
      <section className={'flex-col w-[80%] min-w-[80rem] h-menu pt-6'}>
        <section className={'w-h-full border-base border-b-0 border-gray-border'}>
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border'}>
            <div className={'w-[90%] min-w-[70rem] h-full items-center justify-center'}>
              <MenuSlider product={product} project={project} menuList={menuList} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
