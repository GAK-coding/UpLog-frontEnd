import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MenuInfo } from '@/typings/project.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack, IoIosClose } from 'react-icons/io';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { Editable, EditableInput, EditablePreview, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { menuListData } from '@/recoil/Project/Task.ts';
import { useCallback, useState } from 'react';
import { useMessage } from '@/hooks/useMessage.ts';
import DeleteMenuDialog from '@/components/Project/Menu/DeleteMenuDialog.tsx';

interface Props {
  product: string;
  project: string;
  menuTitle: string;
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
  z-index: 3;
`;

const CustomNextSlider = styled.div`
  right: 3px;
  z-index: 3;
`;

export default function MenuSlider({ product, project, menuTitle }: Props) {
  const { showMessage, contextHolder } = useMessage();
  const [menuList, setMenuList] = useRecoilState(menuListData);
  const [plusMenu, setPlusMenu] = useState(false);
  const navigate = useNavigate();
  const [deleteMenu, setDeleteMenu] = useState('name');
  const [editMenu, setEditMenu] = useState('menuName');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      const updatedMenuList = menuList.map((menu) =>
        menu.id === menuId ? { ...menu, name: nextValue } : menu
      );

      setMenuList(updatedMenuList);
      setEditMenu(nextValue);
    },
    [editMenu]
  );

  const onSubmitMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      // 빈 문자열인 경우
      if (editMenu === '') {
        showMessage('warning', '메뉴 이름을 입력해주세요.');
        const updatedMenuList = menuList.map((menu) =>
          menu.id === menuId ? { ...menu, name: `menu ${menu.id}` } : menu
        );

        setMenuList(updatedMenuList);
        navigate(`/workspace/${product}/${project}/menu/menu ${menuId}`);

        return;
      }

      // 변경된 값의 menu id랑 같은 menu 값을 찾기
      const updatedMenuList = menuList.map((menu) =>
        menu.id === menuId ? { ...menu, name: nextValue } : menu
      );

      setMenuList(updatedMenuList);
      // 바뀐 name에 맞게 주소값도 다시 설정
      navigate(`/workspace/${product}/${project}/menu/${nextValue}`);
    },
    [menuList, setMenuList]
  );

  // menu 추가
  const onAddMenu = useCallback(
    (nextValue: string) => {
      // 아무런 값을 입력하지 않았으면 추가하지 않고 다시 + 버튼으로 변경함
      if (nextValue === '') {
        setPlusMenu(false);
        return;
      }

      // 값을 입력했으면 새로운 값으로 메뉴 list에 추가
      if (editMenu !== '') {
        const newMenu: MenuInfo = {
          id: Math.max(...menuList.map((menu) => menu.id)) + 1,
          name: nextValue,
        };
        const updatedMenuList = [...menuList, newMenu];

        setMenuList(updatedMenuList);
        setPlusMenu(false);
      }
    },
    [menuList, editMenu]
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
        <IoIosArrowBack className={'text-[2rem] text-menu-arrow hover:text-gray-light'} />
      </CustomPrevSlider>
    ),
    nextArrow: (
      <CustomNextSlider>
        <IoIosArrowForward className={'text-[2rem] text-menu-arrow hover:text-gray-light'} />
      </CustomNextSlider>
    ),
  };

  return (
    <StyledSlider {...settings} className={'w-h-full text-[1.25rem] font-bold text-gray-border'}>
      {/*결과물 menu (defult)*/}
      <NavLink
        to={`/workspace/${product}/${project}/menu/결과물`}
        className={({ isActive }) =>
          `flex-row-center justify-start  m-auto h-[5rem] w-1/5 border-r border-gray-border ${
            isActive && 'bg-orange text-black'
          }`
        }
      >
        <span className={'flex-row-center h-full w-full'}>
          {menuList[0].name}
          {contextHolder}
        </span>
        <DeleteMenuDialog isOpen={isOpen} onClose={onClose} menu={deleteMenu} />
      </NavLink>

      {/*menuList 데이터*/}
      {menuList.slice(1).map((menu, index) => (
        <NavLink
          to={`/workspace/${product}/${project}/menu/${menu.name}`}
          className={({ isActive }) =>
            `flex items-center justify-start self-start m-auto h-[5rem] w-1/5 relative border-r border-gray-border ${
              isActive && 'bg-orange text-black'
            }`
          }
          key={index}
        >
          {menuTitle === menu.name && (
            <IoIosClose
              className={
                'absolute right-2 top-0.5 text-transparent text-[2rem] hover:text-gray-dark'
              }
              onClick={() => {
                setDeleteMenu(menu.name);
                onOpen();
              }}
            />
          )}
          <span className={'flex-row-center h-full w-full'}>
            {/*클릭해서 값 변경*/}
            <Editable
              value={menu.name}
              placeholder={menu.name}
              onChange={onChangeMenuName(menu.id)}
              onSubmit={onSubmitMenuName(menu.id)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </span>
        </NavLink>
      ))}
      {menuList.length < 15 && (
        <div className={'flex-row-center h-[5rem] w-1/5'}>
          {plusMenu ? (
            <div className={'flex-row-center h-full text-[1.25rem] font-semibold text-black'}>
              <Editable placeholder={'메뉴 이름 입력'} onSubmit={onAddMenu}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </div>
          ) : (
            <AiOutlinePlus
              className={'flex-row-center h-full self-center m-auto text-[2rem] text-gray-border'}
              onClick={() => {
                setPlusMenu(true);
              }}
            />
          )}
        </div>
      )}
    </StyledSlider>
  );
}
