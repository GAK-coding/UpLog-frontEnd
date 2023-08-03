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
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border'}>
            <div className={'w-[90%] min-w-[70rem] h-full items-center justify-center'}>
              <Slider
                {...settings}
                className={'w-h-full text-[1.25rem] font-bold text-gray-border'}
              >
                <NavLink
                  to={`/workspace/${product}/${project}/menu/${menuList[0].name}`}
                  className={({ isActive }) =>
                    `flex-row-center h-[5rem] w-1/5 ${isActive && 'bg-orange text-black'}`
                  }
                >
                  <span className={'flex-row-center h-full w-full'}>{menuList[0].name}</span>
                </NavLink>
                {menuList.slice(1).map((menu, index) => (
                  <NavLink
                    to={`/workspace/${product}/${project}/menu/title/${menu.name}`}
                    className={({ isActive }) =>
                      `flex-row-center h-[5rem] w-1/5 ${isActive && 'bg-orange text-black'}`
                    }
                    key={index}
                  >
                    <span className={'flex-row-center h-full w-full'}>{menu.name}</span>
                  </NavLink>
                ))}
                <div className={'flex-row-center h-[5rem] w-1/5'}>
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
