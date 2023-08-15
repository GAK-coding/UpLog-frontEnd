import { BsFillMegaphoneFill } from 'react-icons/bs';
import { Post } from '@/typings/post.ts';
import PostEach from '@/components/Project/Post/PostEach.tsx';
import { useQuery } from 'react-query';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useParams } from 'react-router-dom';
import { menuPostList } from '@/api/Project/Post.ts';
import { useState } from 'react';
import { useGetMenuList } from '@/components/Project/hooks/useGetMenuList.ts';
import { useRecoilValue } from 'recoil';

export default function PostMain() {
  const { product, project, menutitle } = useParams();
  const proejctId = 10; // TODO : 현재 project id 값으로 바꾸기
  //메뉴별로 Post 조회한 데이터
  const [noticePostInfo, setNoticePostInfo] = useState<Post>();
  const [posts, setPosts] = useState<Post[]>();

  const menuList = useRecoilValue(menuListData);
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;

  const { data } = useQuery(['menuPostData', menuId], () => menuPostList(menuId!), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        setPosts(data['posts']);
        if (data.noticePost !== undefined) {
          setNoticePostInfo(data.noticePost);
        }
      }
    },
  });

  return (
    <section className={'flex-col-center justify-start w-[75%] h-auto mb-12 '}>
      {/*공지글이 존재할 때 확성기 추가*/}
      {noticePostInfo && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-gray-light'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}
      {noticePostInfo && <PostEach post={noticePostInfo} />}

      {/*noticePost id가 맨 첫번째 id와 같다면 보여주지 않음 posts 배열 map*/}
      {noticePostInfo &&
        posts &&
        posts.map((post, index) =>
          index === 0 && post.id === noticePostInfo.id ? null : (
            <PostEach key={post.id} post={post} />
          )
        )}

      {/*noticePost가 없으면 그냥 posts만 보여줌*/}
      {posts && posts.map((post) => <PostEach key={post.id} post={post} />)}
    </section>
  );
}
