import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMessage } from '@/hooks/useMessage.ts';
import useInput from '@/hooks/useInput.ts';
import { Select } from 'antd';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { SelectMenu } from '@/typings/menu.ts';
import { Post, PostBody, Posts, PostType, UpdatePostBody } from '@/typings/post.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PostEditor from '@/components/Common/PostEditor.tsx';
import TagInput from '@/components/Project/Post/TagInput.tsx';
import { editorPost, themeState } from '@/recoil/Common/atom.ts';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPost, eachPost, updatePost } from '@/api/Project/Post.ts';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '@/typings/product.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post?: number;
  isEdit: boolean;
}

export default function PostModal({ isOpen, onClose, post, isEdit }: Props) {
  const { product, project, menutitle } = useParams();
  const { showMessage, contextHolder } = useMessage();
  const productInfo: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  // 메뉴 list
  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.menuName,
  }));

  // 타입 data
  const typeList: SelectMenu[] = [
    // {value : 'DEFAULT'}
    { value: 'REQUEST_REQUIREMENT', label: '요청' },
    { value: 'REQUEST_READ', label: '필독' },
  ];

  const updateTypeList: SelectMenu[] = [
    { value: 'DEFAULT', label: '기본' },
    { value: 'REQUEST_REQUIREMENT', label: '요청' },
    { value: 'REQUEST_READ', label: '필독' },
  ];

  const [darkMode, setDarkMode] = useRecoilState(themeState);

  // menuId 찾기
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;

  // 포스트 제목, 메뉴, 타입, 내용, 태그
  const [postName, onChangePostName, setPostName] = useInput('');
  const [postMenu, setPostMenu] = useState(-1);
  const [postType, setPostType] = useState<PostType>(null);
  const [postContent, setPostContent] = useRecoilState(editorPost);
  // const [postTag, setPostTag] = useRecoilState(postTagList);
  const [createData, setCreateData] = useState<PostBody>({
    title: '',
    menuId: -1,
    postType: null,
    content: '',
    productId: -1,
    projectId: -1,
  });
  const [updateData, setUpdateData] = useState<UpdatePostBody>({
    updatePostTitle: null,
    updatePostContent: null,
    updatePostType: null,
    updateMenuId: null,
  });

  // post 수정시 get 해오는 데이터를 저장하는 변수
  const [postData, setPostData] = useState<Post>();
  const [check, setCheck] = useState(false);

  const queryClient = useQueryClient();

  // post 생성
  const { mutate: createPostMutate } = useMutation((data: PostBody) => createPost(data), {
    onMutate: async (newData: PostBody) => {
      await queryClient.cancelQueries(['menuPostData', menuId]);

      const previousData: Posts | undefined = queryClient.getQueryData(['menuPostData', menuId]);

      queryClient.setQueryData(['menuPostData', menuId], newData);

      return () => queryClient.setQueryData(['menuPostData', menuId], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data) {
        showMessage('success', 'Post 생성에 성공했습니다.');
      } else if (typeof data !== 'string' && 'message' in data) {
        showMessage('warning', data.message);
      } else showMessage('error', 'Post 생성에 실패했습니다.');
    },
    onError: (error, newData, rollback) => {
      if (rollback) {
        rollback();
        showMessage('error', 'Post 생성에 실패했습니다.');
      } else {
        showMessage('error', 'Post 생성에 실패했습니다.');
      }
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
    },
  });

  // post 단일 조회
  const { refetch } = useQuery(['getEachPost', post], () => eachPost(post!), {
    onSuccess: (data) => {
      if (typeof data === 'object' && 'id' in data) {
        setPostData(data);
        setPostName(data.title);
        setPostMenu(data.menuId);
        setPostType(data.postType);
        setPostContent(data.content);
        // setPostTag(data.tagList);
      }
    },
    enabled: false,
  });

  // post 수정
  const { mutate: updatePostMutate } = useMutation(
    (data: UpdatePostBody) => updatePost(post!, data),

    {
      onMutate: async (newData: UpdatePostBody) => {
        await queryClient.cancelQueries(['menuPostData', menuId]);

        const previousData: Posts | undefined = queryClient.getQueryData(['menuPostData', menuId]);

        queryClient.setQueryData(['menuPostData', menuId], newData);

        return () => queryClient.setQueryData(['menuPostData', menuId], previousData);
      },
      onSuccess: (data) => {
        if (typeof data !== 'string' && 'id' in data) {
          showMessage('success', 'Post 수정에 성공했습니다.');
        } else if (typeof data !== 'string' && 'message' in data) {
          showMessage('warning', data.message);
        } else showMessage('error', 'Post 수정에 실패했습니다.');
      },
      onError: (error, newData, rollback) => {
        if (rollback) {
          rollback();
          showMessage('error', 'Post 수정에 실패했습니다.');
        } else {
          showMessage('error', 'Post 수정에 실패했습니다.');
        }
      },
      onSettled: () => {
        return queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
      },
    }
  );

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    if (type === 'menuId') {
      setPostMenu(+value.value);
      isEdit
        ? setUpdateData({ ...updateData, updateMenuId: +value.value })
        : setCreateData({ ...createData, menuId: +value.value });
    } else {
      setPostType(value.value as PostType);
      isEdit
        ? setUpdateData({ ...updateData, updatePostType: value.value as PostType })
        : setCreateData({ ...createData, postType: value.value as PostType });
    }
  };

  // 생성 버튼 클릭
  const handleFinishClick = useCallback(() => {
    // 빈 값이 있는지 예외처리
    if (postName === '') {
      showMessage('warning', 'Post 제목을 입력해주세요.');
      return;
    }

    if (postMenu === -1) {
      showMessage('warning', '메뉴를 선택해주세요.');
      return;
    }

    setCreateData({
      title: postName,
      menuId: postMenu,
      postType: postType === 'DEFAULT' ? null : postType,
      content: postContent,
      productId: productInfo.productId,
      projectId: 10,
    });

    setUpdateData({
      ...updateData,
      updatePostContent: postContent,
    });

    console.log('내용', postContent);
    setCheck(true);
  }, [postName, postMenu, postType, postContent]);

  // 자꾸 깜빡거리는거 방지
  useLayoutEffect(() => {
    const editorEl = document.getElementsByClassName('toastui-editor-defaultUI')[0];

    if (editorEl) {
      const shouldAddDarkClass = darkMode && !editorEl.classList.contains('toastui-editor-dark');
      const shouldRemoveDarkClass = !darkMode && editorEl.classList.contains('toastui-editor-dark');

      if (shouldAddDarkClass) {
        editorEl.classList.add('toastui-editor-dark');
      } else if (shouldRemoveDarkClass) {
        editorEl.classList.remove('toastui-editor-dark');
      }
    }
  }, [darkMode]);

  // postName
  useEffect(() => {
    isEdit
      ? setUpdateData({ ...updateData, updatePostTitle: postName })
      : setCreateData({ ...createData, title: postName });
  }, [postName]);

  // 생성, 수정 요청보냄
  useEffect(() => {
    if (check) {
      if (isEdit) {
        updatePostMutate(updateData);
      } else {
        createPostMutate(createData);
      }

      setCheck(false);
      setTimeout(() => {
        onClose();
        setPostContent('');
      }, 2000);
    }
  }, [check]);

  // 모달창이 새로 열릴 때 마다 값 초기화
  useEffect(() => {
    if (isEdit) {
      // post 정보 get (1개)
      refetch();
    } else {
      setPostName('');
      setPostType(null);
      setPostMenu(-1);
      // setPostContent('');
    }
  }, [isOpen, isEdit]);

  // 모달창이 닫히면 입력했던 내용이 사라짐
  useEffect(() => {
    isEdit
      ? setUpdateData({
          updatePostTitle: null,
          updatePostContent: null,
          updatePostType: null,
          updateMenuId: null,
        })
      : setCreateData({
          title: '',
          menuId: -1,
          postType: null,
          content: '',
          productId: -1,
          projectId: -1,
        });
  }, [onClose]);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      {contextHolder}
      <ModalOverlay />
      <ModalContent
        minW="65rem"
        h={'58rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          {isEdit ? 'Post 수정' : 'Post 생성'}
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section className={'flex-col-center justify-start w-[82%] h-full'}>
              {contextHolder}
              <section className={'flex-row-center justify-start w-full h-[4rem]'}>
                <input
                  value={postName}
                  onChange={onChangePostName}
                  type="text"
                  placeholder={'Post 제목'}
                  className={'w-full mt-6 mb-4 px-4 text-3xl font-bold bg-inherit'}
                  maxLength={20}
                />
              </section>
              <div className={'w-full border-b border-gray-spring'} />
              <section
                className={'flex-col justify-start items-start w-full h-[6rem] pl-[2rem] py-2'}
              >
                {/* 메뉴 | select */}
                <div
                  className={
                    'flex items-center justify-start w-[17rem] h-1/2 text-gray-light text-[1rem]'
                  }
                >
                  <div className={'flex w-[6rem] items-center justify-end h-auto'}>
                    <span>메뉴 (필수)</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  {isEdit && postData && (
                    <Select
                      labelInValue
                      defaultValue={{
                        value: `${postData!.menuId}`,
                        label: `${postData!.menuName}`,
                      }}
                      onChange={handleChange('menuId')}
                      style={{ width: 100 }}
                      bordered={false}
                      options={menuNameList}
                      dropdownStyle={{
                        backgroundColor: 'var(--gray-sideBar)',
                        color: 'var(--black)',
                        borderColor: 'var(--border-line)',
                      }}
                    />
                  )}

                  {!isEdit && (
                    <Select
                      labelInValue
                      defaultValue={{ value: '-1', label: '메뉴 선택' }}
                      onChange={handleChange('menuId')}
                      style={{ width: 100 }}
                      bordered={false}
                      options={menuNameList}
                      dropdownStyle={{
                        backgroundColor: 'var(--gray-sideBar)',
                        color: 'var(--black)',
                        borderColor: 'var(--border-line)',
                      }}
                    />
                  )}
                </div>

                {/* 타입 | select */}
                <div
                  className={
                    'flex items-center justify-start w-[17rem] h-1/2 text-gray-light text-[1rem]'
                  }
                >
                  <div className={'flex w-[6rem] items-center justify-end h-auto'}>
                    <span>타입 (선택)</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  {isEdit && postData && (
                    <Select
                      labelInValue
                      defaultValue={{
                        value: `${postData!.postType}`,
                        label: `${
                          postData!.postType === 'DEFAULT'
                            ? '타입 선택'
                            : postData!.postType === 'REQUEST_READ'
                            ? '필독'
                            : '요청'
                        }`,
                      }}
                      onChange={handleChange('type')}
                      style={{ width: 100 }}
                      bordered={false}
                      options={updateTypeList}
                      dropdownStyle={{
                        backgroundColor: 'var(--gray-sideBar)',
                        color: 'var(--black)',
                        borderColor: 'var(--border-line)',
                      }}
                    />
                  )}

                  {!isEdit && (
                    <Select
                      labelInValue
                      defaultValue={{ value: '', label: '타입 선택' }}
                      onChange={handleChange('type')}
                      style={{ width: 100 }}
                      bordered={false}
                      options={typeList}
                      dropdownStyle={{
                        backgroundColor: 'var(--gray-sideBar)',
                        color: 'var(--black)',
                        borderColor: 'var(--border-line)',
                      }}
                    />
                  )}
                </div>
              </section>
              <div className={'w-full border-b border-gray-spring'} />
              <section className={'flex-row-center w-[90%] h-[28rem] my-4'}>
                <PostEditor isPost={true} />
              </section>
              <div className={'w-full border-b border-gray-spring relative'} />
              <section className={'flex-row-center justify-start items-start w-full py-4 pl-10'}>
                <div className={'flex-row-center justify-start'}>
                  <span className={'text-gray-light text-[1rem]'}>태그 추가</span>
                  <div
                    className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                  />
                </div>
                <TagInput />
              </section>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'absolute bottom-10 right-16 fix w-[5rem] h-9 rounded bg-orange text-white'}
            onClick={handleFinishClick}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
