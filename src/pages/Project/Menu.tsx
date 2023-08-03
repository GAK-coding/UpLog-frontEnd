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
    { id: 2, name: '요구시힝' },
    { id: 3, name: '개발' },
    { id: 4, name: '배포' },
    { id: 5, name: '개발2' },
    { id: 6, name: '배포2' },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
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
          <div
            className={'flex-row-center w-full h-[5rem] border-b border-gray-border bg-amber-100'}
          >
            {/*{menuList.map((menu, index) => (*/}
            {/*  <NavLink*/}
            {/*    key={index}*/}
            {/*    to={`/workspace/${product}/${project}/menu/${menu.name}`}*/}
            {/*    className={({ isActive }) =>*/}
            {/*      `w-1/5 h-full border-r border-gray-border ${isActive && 'bg-orange'}`*/}
            {/*    }*/}
            {/*  ></NavLink>*/}
            {/*))}*/}
            <div className={'w-[85%] h-full items-center justify-center border border-red-400'}>
              <Slider {...settings}>
                {menuList.map((menu, index) => (
                  <div className={'flex-row-center h-full w-1/5 bg-amber-400'} key={index}>
                    <span className={'flex-row-center h-full w-full border border-red-400 '}>
                      {menu.name}
                    </span>
                  </div>
                ))}
                <div className={'flex-row-center h-full w-1/5 bg-amber-400'}>
                  <IoIosArrowForward className={'text-[2rem] text-gray-light'} />
                </div>
              </Slider>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
