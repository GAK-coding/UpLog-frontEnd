import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MenuInfo } from '@/typings/project.ts';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { menuListData } from '@/recoil/Project/atom.tsx';
import { useCallback } from 'react';

interface Props {
  product: string;
  project: string;
  // menuListData: MenuInfo[];
}

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const CustomPrevSlider = styled.div`
  left: 3px;
`;

const CustomNextSlider = styled.div`
  right: 3px;
`;

export default function MenuSlider({ product, project }: Props) {
  const [menuList, setMenuList] = useRecoilState(menuListData);

  const onChangeMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      // 변경된 값의 menu id랑 같은 menu 값을 찾기
      const updatedMenuList = menuList.map((menu) =>
        menu.id === menuId ? { ...menu, name: nextValue } : menu
      );

      // 바뀐 name으로 다시 정렬하기
      setMenuList(updatedMenuList);
      console.log(menuList);
    },
    [menuList, setMenuList]
  );
  // slide settings 커스텀
  const settings = {
    dots: false, // 밑에 점으로 표시되는 것
    infinite: false, // loop 만들지 결정 여부
    speed: 700, // 넘어가는 속도
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
          <span className={'flex-row-center h-full w-full'}>
            {/*클릭해서 값 변경*/}
            <Editable defaultValue={menu.name} onSubmit={onChangeMenuName(menu.id)}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </span>
        </NavLink>
      ))}
      {menuList.length < 15 && (
        <div className={'flex-row-center h-[5rem] w-1/5'}>
          <AiOutlinePlus
            className={'flex-row-center h-full self-center m-auto text-[2rem] text-gray-border'}
          >
            <Editable defaultValue={'ddd'} textAlign="center">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </AiOutlinePlus>
        </div>
      )}
    </StyledSlider>
  );
}
