import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { Editable, EditableInput, EditablePreview, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useCallback, useState } from 'react';
import DeleteMenuDialog from '@/components/Project/Menu/DeleteMenuDialog.tsx';
import { useMutation, useQueryClient } from 'react-query';
import { createMenu, editMenu } from '@/api/Project/Menu.ts';
import { FailMenu, MenuInfo } from '@/typings/menu.ts';
import { useGetMenuList } from '@/components/Project/hooks/useGetMenuList.ts';
import { SaveProjectInfo } from '@/typings/project.ts';
import { message } from '@/recoil/Common/atom.ts';
import { commonResponse } from '@/typings';

interface Props {
  product: string;
  project: string;
  menutitle: string;
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

export default function MenuSlider({ product, project, menutitle }: Props) {
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  const [menuList, setMenuList] = useRecoilState(menuListData);
  const [plusMenu, setPlusMenu] = useState(false);
  const navigate = useNavigate();
  const [deleteMenuName, setDeleteMenuName] = useState('menuName');
  const [editMenuName, setEditMenuName] = useState('menuName');
  const [menuId, setMenuId] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const regex = /^[a-zA-Z가-힣\s]*$/;

  const nowProject: SaveProjectInfo = JSON.parse(sessionStorage.getItem('nowProject')!);
  const projectId = nowProject.id;
  const queryClient = useQueryClient();

  // menuList get
  const [getMenuList] = useGetMenuList(projectId);

  // menu create
  const { mutate: createMenuMutate } = useMutation(
    (nextValue: string) => createMenu(projectId, nextValue),
    {
      onSuccess: (data) => {
        if (typeof data !== 'string') {
          if ('message' in data) setMessageInfo({ type: 'error', content: data.message });
          else if ('id' in data)
            setMessageInfo({ type: 'success', content: '메뉴가 생성되었습니다.' });
        } else if (data === 'create menu fail')
          setMessageInfo({ type: 'error', content: '메뉴 생성에 실패하였습니다.' });
      },
      onSettled: () => {
        // success or error, invalidate해서 새로 받아옴
        return queryClient.invalidateQueries(['menuList', projectId]);
      },
    }
  );

  // menu edit
  const { mutate: editMenuMutate } = useMutation((newName: string) => editMenu(menuId, newName), {
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data)
        setMessageInfo({ type: 'success', content: '메뉴 이름이 변경되었습니다.' });
      else setMessageInfo({ type: 'error', content: '메뉴 이름 변경에 실패하였습니다.' });
    },
    onSettled: () => {
      // success or error, invalidate해서 새로 받아옴
      return queryClient.invalidateQueries(['menuList']);
    },
  });

  // 메뉴 이름 수정 onChange
  const onChangeMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      setEditMenuName(nextValue);
      setMenuId(menuId);
    },
    [editMenuName]
  );

  // 메뉴 이름 수정 완료 onSubmit
  const onSubmitMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      // 빈 문자열인 경우
      if (editMenuName === '') {
        setMessageInfo({ type: 'warning', content: '메뉴 이름을 입력해주세요.' });
        // 바뀐 menuName에 맞게 주소값도 다시 설정
        navigate(`/workspace/${product}/${project}/menu/menu${menuId}`);
        // menu edit api 요청
        editMenuMutate(`menu ${menuId}`);
        return;
      }

      const checkDuplicate = menuList.some((menu) => menu.menuName === nextValue);
      if (checkDuplicate) {
        setMessageInfo({ type: 'warning', content: '중복된 메뉴 이름입니다.' });

        const updatedMenuList = menuList.map((menu) =>
          menu.id === menuId ? { ...menu, menuName: nextValue } : menu
        );

        setMenuList(updatedMenuList);
        return;
      }
      // 바뀐 menuName에 맞게 주소값도 다시 설정
      navigate(`/workspace/${product}/${project}/menu/${nextValue}`);
      // menu edit api 요청
      editMenuMutate(nextValue);
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

      // 특수문자는 불가
      // if (!regex.test(nextValue)) {
      // setMessageInfo({ type: 'warning', content: '메뉴 이름은 한글, 영문만 가능합니다.' });
      //   setPlusMenu(false);
      //   return;
      // }

      if (editMenuName !== '') {
        // 값을 입력했으면 새로운 값으로 메뉴 list에 추가
        setPlusMenu(false);

        // create post api 요청
        createMenuMutate(nextValue);
      }
    },
    [menuList, editMenuName]
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
      {/*{menuList.length !== 0 && (*/}
      {/*  <NavLink*/}
      {/*    to={`/workspace/${product}/${project}/menu/${menuList[0].menuName}`}*/}
      {/*    className={({ isActive }) =>*/}
      {/*      `flex-row-center justify-start  m-auto h-[5rem] w-1/5 border-r border-gray-border ${*/}
      {/*        isActive && 'bg-orange text-black'*/}
      {/*      }`*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <span className={'flex-row-center h-full w-full'}>*/}
      {/*      {menuList[0].menuName}*/}
      {/*      {contextHolder}*/}
      {/*    </span>*/}
      {/*    <DeleteMenuDialog*/}
      {/*      isOpen={isOpen}*/}
      {/*      onClose={onClose}*/}
      {/*      menu={deleteMenuName}*/}
      {/*      menuId={menuId}*/}
      {/*    />*/}
      {/*  </NavLink>*/}
      {/*)}*/}
      {menuList.length !== 0 &&
        menuList.map((menu) => (
          <NavLink
            to={`/workspace/${product}/${project}/menu/${menu.menuName}`}
            className={({ isActive }) =>
              `flex items-center justify-start self-start m-auto h-[5rem] w-1/5 relative border-r border-gray-border ${
                isActive && 'bg-orange text-black'
              }`
            }
            key={menu.id}
          >
            {menutitle === menu.menuName && menu.menuName !== '결과물' && (
              <IoIosClose
                className={
                  'absolute right-2 top-0.5 text-transparent text-[2rem] hover:text-gray-dark'
                }
                onClick={() => {
                  setDeleteMenuName(menu.menuName);
                  setMenuId(menu.id);
                  onOpen();
                }}
              />
            )}
            <span className={'flex-row-center h-full w-full'}>
              {/*클릭해서 값 변경*/}
              <Editable
                placeholder={menu.menuName}
                onChange={onChangeMenuName(menu.id)}
                onSubmit={onSubmitMenuName(menu.id)}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </span>
          </NavLink>
        ))}
      {menuList.length < 15 && menuList.length !== 0 && (
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
          <DeleteMenuDialog
            isOpen={isOpen}
            onClose={onClose}
            menu={deleteMenuName}
            menuId={menuId}
          />
        </div>
      )}
    </StyledSlider>
  );
}
