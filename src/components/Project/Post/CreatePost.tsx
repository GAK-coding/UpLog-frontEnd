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
import { menuListData } from '@/recoil/Project/Task.ts';
import { SelectMenu } from '@/typings/project.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PostEditor from '@/components/Common/PostEditor.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import TagInput from '@/components/Project/Post/TagInput.tsx';
import { editorPost, themeState } from '@/recoil/Common/atom.ts';
import { postTagList } from '@/recoil/Project/Post.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePost({ isOpen, onClose }: Props) {
  const { product, project, menutitle } = useParams();
  const { showMessage, contextHolder } = useMessage();

  const navigate = useNavigate();

  // 메뉴 list
  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.name,
  }));

  // 타입 data
  const typeList: SelectMenu[] = [
    { value: '1', label: '요청' },
    { value: '2', label: '필독' },
  ];

  const [darkMode, setDarkMode] = useRecoilState(themeState);

  // 포스트 제목, 메뉴, 타입, 내용, 태그
  const [postName, onChangePostName, setPostName] = useInput('');
  const [postMenu, setPostMenu] = useState(-1);
  const [postType, setPostType] = useState('');
  const [postContent, setPostContent] = useRecoilState(editorPost);
  const postTag = useRecoilValue(postTagList);

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    if (type === 'menuId') {
      setPostMenu(+value.value);
    } else {
      setPostType(value.label as string);
    }
  };

  // 생성 버튼 클릭
  const createPost = useCallback(() => {
    // 빈 값이 있는지 예외처리
    if (postName === '') {
      showMessage('warning', 'Post 제목을 입력해주세요.');
      return;
    }

    if (postMenu === -1) {
      showMessage('warning', '메뉴를 선택해주세요.');
      return;
    }

    // TODO: Post 생성 api 연결
    onClose();
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

  // 모달창이 새로 열릴 때 마다 값 초기화
  useEffect(() => {
    setPostName('');
    setPostType('');
    setPostMenu(-1);
    setPostContent('');
  }, [isOpen]);
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
            onClick={createPost}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
