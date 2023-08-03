import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MenuInfo } from '@/typings/project.ts';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
  product: string;
  project: string;
  menuList: MenuInfo[];
}
export default function MenuSlider({ product, project, menuList }: Props) {
  // slide settings 커스텀
  const settings = {
    dots: false, // 밑에 점으로 표시되는 것
    infinite: false, // loop 만들지 결정 여부
    speed: 800, // 넘어가는 속도
    slidesToShow: 5, // 하나의 슬라이드에서 보여줄 개수
    slidesToScroll: 5, // 슬라이드 넘길 시 몇개의 아이템을 넘길지
  };

  return (
    <Slider {...settings} className={'w-h-full text-[1.25rem] font-bold text-gray-border'}>
      <NavLink
        to={`/workspace/${product}/${project}/menu/main`}
        className={({ isActive }) =>
          `flex-row-center h-[5rem] w-1/5 ${isActive && 'bg-orange text-black'}`
        }
      >
        <span className={'flex-row-center h-full w-full'}>{menuList[0].name}</span>
      </NavLink>
      {menuList.slice(1).map((menu, index) => (
        <NavLink
          to={`/workspace/${product}/${project}/menu/${menu.name}`}
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
  );
}
