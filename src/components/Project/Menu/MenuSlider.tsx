import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MenuInfo } from '@/typings/project.ts';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styled from '@emotion/styled';

interface Props {
  product: string;
  project: string;
  menuList: MenuInfo[];
}

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;

const CustomPrevSlider = styled.div`
  left: 3px;
  z-index: 99;
`;

const CustomNextSlider = styled.div`
  right: 3px;
  z-index: 99;
`;

export default function MenuSlider({ product, project, menuList }: Props) {
  // slide settings 커스텀
  const settings = {
    dots: false, // 밑에 점으로 표시되는 것
    infinite: false, // loop 만들지 결정 여부
    speed: 800, // 넘어가는 속도
    slidesToShow: 5, // 하나의 슬라이드에서 보여줄 개수
    slidesToScroll: 5, // 슬라이드 넘길 시 몇개의 아이템을 넘길지
    prevArrow: (
      <CustomPrevSlider>
        <IoIosArrowBack className={'text-[2rem] text-gray-border'} />
      </CustomPrevSlider>
    ),
    nextArrow: (
      <CustomNextSlider>
        <IoIosArrowForward className={'text-[2rem] text-gray-border'} />
      </CustomNextSlider>
    ),
  };

  return (
    <StyledSlider {...settings} className={'w-h-full text-[1.25rem] font-bold text-gray-border'}>
      {/*결과물 menu (defult)*/}
      <NavLink
        to={`/workspace/${product}/${project}/menu/main`}
        className={({ isActive }) =>
          `flex-row-center h-[5rem] w-1/5 border-r border-gray-border ${
            isActive && 'bg-orange text-black'
          }`
        }
      >
        <span className={'flex-row-center h-full w-full'}>{menuList[0].name}</span>
      </NavLink>
      {/*menuList 데이터*/}
      {menuList.slice(1).map((menu, index) => (
        <NavLink
          to={`/workspace/${product}/${project}/menu/${menu.name}`}
          className={({ isActive }) =>
            `flex-row-center h-[5rem] w-1/5 border-r border-gray-border ${
              isActive && 'bg-orange text-black'
            }`
          }
          key={index}
        >
          <span className={'flex-row-center h-full w-full'}>{menu.name}</span>
        </NavLink>
      ))}
      {menuList.length < 15 && (
        <div className={'flex-row-center h-[5rem] w-1/5'}>
          <IoIosArrowForward className={'text-[2rem] text-gray-light'} />
        </div>
      )}
    </StyledSlider>
  );
}
