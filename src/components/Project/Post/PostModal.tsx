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
import { Post, PostBody } from '@/typings/post.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PostEditor from '@/components/Common/PostEditor.tsx';
import TagInput from '@/components/Project/Post/TagInput.tsx';
import { editorPost, themeState } from '@/recoil/Common/atom.ts';
import { useMutation, useQuery } from 'react-query';
import { createPost, eachPost } from '@/api/Project/Post.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post?: number;
  isEdit: boolean;
}

interface PostType {
  postType: string | null;
}

export default function PostModal({ isOpen, onClose, post, isEdit }: Props) {
  const { showMessage, contextHolder } = useMessage();

  // TODO : post id로 post data 가져오는 api 연결해서 값 설정하는걸로 바꿀거임
  const [postData, setPostData] = useState<Post>();
  // const posts = postData.posts as Post[];
  // const filteredPost = posts.filter((item) => item.id === post)[0];
  // const filteredPost: Post | undefined = postData['posts'].find((item) => item.id === post);

  // 메뉴 list
  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.menuName,
  }));

  // 타입 data
  const typeList: SelectMenu[] = [
    { value: '1', label: '요청' },
    { value: '2', label: '필독' },
  ];

  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const recoilPostcontent = useRecoilValue(editorPost);
  // 포스트 제목, 메뉴, 타입, 내용, 태그
  const [postName, onChangePostName, setPostName] = useInput('');
  const [postMenu, setPostMenu] = useState(-1);
  const [postType, setPostType] = useState<PostType>({ postType: null });
  const [postContent, setPostContent] = useState<string>(recoilPostcontent);
  // const [postTag, setPostTag] = useRecoilState(postTagList);
  const [createData, setCreateData] = useState<PostBody>({
    title: '',
    menuId: -1,
    postType: '',
    content: '',
    productId: -1,
    projectId: -1,
  });
  const [check, setCheck] = useState(false);

  // post 생성
  const { mutate: createPostMutate } = useMutation((data: PostBody) => createPost(data), {
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data) {
        showMessage('success', 'Post 생성에 성공했습니다.');
      } else if (typeof data !== 'string' && 'message' in data) {
        showMessage('warning', data.message);
      } else showMessage('error', 'Post 생성에 실패했습니다.');
    },
  });

  // post 단일 조회
  const { refetch } = useQuery(['getEachPost', post], () => eachPost(post!), {
    onSuccess: (data) => {
      if (typeof data === 'object' && 'id' in data) {
        setPostData(data);
        setPostName(data.title);
        setPostMenu(data.menuId);
        setPostType({ postType: data.postType });
        setPostContent(data.content);
        // setPostTag(data.tagList);
      }
    },
    enabled: false,
  });
  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    if (type === 'menuId') {
      setPostMenu(+value.value);
    } else {
      setPostType({ postType: value.label as string });
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
      postType: postType.postType,
      content: recoilPostcontent,
      productId: 1,
      projectId: 10,
    });
    setCheck(true);
  }, [postName, postMenu]);

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

  useEffect(() => {
    if (check) {
      if (isEdit) {
        // TODO: Post 수정 api 연결
      } else {
        createPostMutate(createData);
      }
      setCheck(false);
      setTimeout(() => onClose(), 2000);
    }
  }, [check]);

  // 모달창이 새로 열릴 때 마다 값 초기화
  useEffect(() => {
    if (isEdit) {
      refetch;
      return;
    }

    setPostName('');
    setPostType({ postType: null });
    setPostMenu(-1);
    // setPostContent('');
    // setPostTag([]);
  }, [isOpen, isEdit, post]);

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
          Post 생성
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
                    <span>메뉴</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  <Select
                    labelInValue
                    defaultValue={
                      isEdit
                        ? {
                            value: `${postData!.menuId}`,
                            label: `${postData!.menuName}`,
                          }
                        : { value: '-1', label: '메뉴 선택' }
                    }
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
                </div>

                {/* 타입 | select */}
                <div
                  className={
                    'flex items-center justify-start w-[17rem] h-1/2 text-gray-light text-[1rem]'
                  }
                >
                  <div className={'flex w-[6rem] items-center justify-end h-auto'}>
                    <span>타입</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  <Select
                    labelInValue
                    defaultValue={
                      isEdit
                        ? {
                            value: `${postData!.postType}`,
                            label: `${postData!.postType ?? '타입 선택'}`,
                          }
                        : { value: '', label: '타입 선택' }
                    }
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
