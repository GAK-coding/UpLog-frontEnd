import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MenuInfo } from '@/typings/menu.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { Editable, EditableInput, EditablePreview, useDisclosure } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useCallback, useState } from 'react';
import { useMessage } from '@/hooks/useMessage.ts';
import DeleteMenuDialog from '@/components/Project/Menu/DeleteMenuDialog.tsx';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createMenu, editMenu, projectMenuList } from '@/api/Project/Menu.ts';

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
  const [createMenuName, setCreateMenuName] = useState('');
  const [deleteMenuName, setDeleteMenuName] = useState('menuName');
  const [editMenuName, setEditMenuName] = useState('menuName');
  const [menuId, setMenuId] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO : 현재 project id 값으로 바꾸기
  const projectId = 1;

  // menuList get
  const getMenuList = useQuery(['menuList', project], () => projectMenuList(projectId), {
    staleTime: 60000, // 10분
    cacheTime: 80000,
    refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  });

  if (getMenuList.isSuccess) {
    if (typeof getMenuList.data !== 'string' && 'id' in getMenuList.data) {
      const menuList: MenuInfo[] = getMenuList.data;
      setMenuList(menuList);
    }
  }

  const queryClient = useQueryClient();

  // menu create
  const { mutate: createMenuMutate } = useMutation(() => createMenu(projectId, createMenuName), {
    onMutate: async () => {
      console.log('요청', menuList);
      // optimistic update를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
      await queryClient.cancelQueries(['menuList']);

      // 이전 값 저장
      const previousData = queryClient.getQueryData(['menuList']);

      // 새로운 값으로 optimistic ui 적용
      queryClient.setQueryData(['menuList'], {
        id: Math.max(...menuList.map((menu) => menu.id)) + 1,
        menuName: createMenuName,
        projectId: projectId,
        version: '1.0.0',
      });

      // 에러가 난다면 원래것으로 설정
      return () => queryClient.setQueryData(['menuList'], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'menuName' in data) {
        showMessage('success', '메뉴가 생성되었습니다.');
      }
    },
    onError: (error, value, rollback) => {
      // rollback은 onMutate의 return값
      if (rollback) {
        rollback();
        showMessage('error', '메뉴 생성에 실패했습니다.');
      } else {
        showMessage('error', '메뉴 생성에 실패했습니다.');
      }
    },
    onSettled: () => {
      // success or error, invalidate해서 새로 받아옴
      return queryClient.invalidateQueries(['menuList']);
    },
  });

  // menu edit
  const { mutate: editMenuMutate } = useMutation(() => editMenu(menuId, editMenuName), {
    onMutate: async () => {
      // optimistic update를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제
      await queryClient.cancelQueries(['menuList']);

      // 이전 값 저장
      const previousData = queryClient.getQueryData(['menuList']);

      // 새로운 값으로 optimistic ui 적용
      queryClient.setQueryData(
        ['menuList'],
        menuList.map((menu) => (menu.id === menuId ? { ...menu, menuName: editMenuName } : menu))
      );

      // 에러가 난다면 원래것으로 설정
      return () => queryClient.setQueryData(['menuList'], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'menuName' in data) {
        showMessage('success', '메뉴 이름이 변경되었습니다.');
      }
    },
    onError: (error, value, rollback) => {
      // rollback은 onMutate의 return값
      if (rollback) {
        rollback();
        showMessage('error', '메뉴 변경에 실패했습니다.');
      } else {
        showMessage('error', '메뉴 변경에  실패했습니다.');
      }
    },
    onSettled: () => {
      // success or error, invalidate해서 새로 받아옴
      return queryClient.invalidateQueries(['menuList']);
    },
  });

  // 메뉴 이름 수정 onChange
  const onChangeMenuName = useCallback(
    (menuId: number) => (nextValue: string) => {
      const updatedMenuList = menuList.map((menu) =>
        menu.id === menuId ? { ...menu, menuName: nextValue } : menu
      );

      setMenuList(updatedMenuList);
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
        showMessage('warning', '메뉴 이름을 입력해주세요.');
        const updatedMenuList = menuList.map((menu) =>
          menu.id === menuId ? { ...menu, menuName: `menu ${menu.id}` } : menu
        );

        setMenuList(updatedMenuList);
        navigate(`/workspace/${product}/${project}/menu/menu ${menuId}`);

        return;
      }

      // 변경된 값의 menu id랑 같은 menu 값을 찾기
      const updatedMenuList = menuList.map((menu) =>
        menu.id === menuId ? { ...menu, menuName: nextValue } : menu
      );

      setMenuList(updatedMenuList);

      // 바뀐 menuName에 맞게 주소값도 다시 설정
      navigate(`/workspace/${product}/${project}/menu/${nextValue}`);
      // menu edit api 요청
      editMenuMutate();
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
      if (editMenuName !== '') {
        const newMenu: MenuInfo = {
          id: Math.max(...menuList.map((menu) => menu.id)) + 1,
          menuName: nextValue,
          projectId: 1,
          version: '1.0.0',
        };
        const updatedMenuList = [...menuList, newMenu];

        setCreateMenuName(nextValue);
        setMenuList(updatedMenuList);
        console.log('변경함', menuList);
        setPlusMenu(false);

        // create post api 요청
        createMenuMutate();
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
      <NavLink
        to={`/workspace/${product}/${project}/menu/결과물`}
        className={({ isActive }) =>
          `flex-row-center justify-start  m-auto h-[5rem] w-1/5 border-r border-gray-border ${
            isActive && 'bg-orange text-black'
          }`
        }
      >
        <span className={'flex-row-center h-full w-full'}>
          {menuList[0].menuName}
          {contextHolder}
        </span>
        <DeleteMenuDialog isOpen={isOpen} onClose={onClose} menu={deleteMenuName} menuId={menuId} />
      </NavLink>

      {/*menuList 데이터*/}
      {menuList.slice(1).map((menu) => (
        <NavLink
          to={`/workspace/${product}/${project}/menu/${menu.menuName}`}
          className={({ isActive }) =>
            `flex items-center justify-start self-start m-auto h-[5rem] w-1/5 relative border-r border-gray-border ${
              isActive && 'bg-orange text-black'
            }`
          }
          key={menu.id}
        >
          {menuTitle === menu.menuName && (
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
              value={menu.menuName}
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
