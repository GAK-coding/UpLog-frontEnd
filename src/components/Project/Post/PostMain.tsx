import { BsFillMegaphoneFill } from 'react-icons/bs';
import { eachMenuPost } from '@/recoil/Project/Post.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostData } from '@/typings/postData.ts';
import PostEach from '@/components/Project/Post/PostEach.tsx';
import { useQuery } from 'react-query';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useParams } from 'react-router-dom';
import { menuPostList } from '@/api/Project/Post.ts';
import { useState } from 'react';
import { useGetMenuList } from '@/components/Project/hooks/useGetMenuList.ts';

export default function PostMain() {
  const { product, project, menutitle } = useParams();
  const proejctId = 10; // TODO : 현재 project id 값으로 바꾸기
  //메뉴별로 Post 조회한 데이터
  const [postData, setPostListData] = useRecoilState(eachMenuPost);
  const [noticePostInfo, setNoticePostInfo] = useState<PostData>();

  const [getMenuList] = useGetMenuList(proejctId);
  const menuId = getMenuList.filter((menu) => menu.menuName === menutitle)[0]?.id;

  const { data } = useQuery(['menuPostData', menuId], () => menuPostList(+menuId!), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        setPostListData(data);

        if (data.noticePost !== undefined) {
          setNoticePostInfo(data.noticePost);
        }
      }
    },
  });

  const posts: PostData[] = postData.posts;

  return (
    <section className={'flex-col-center justify-start w-[75%] h-auto mb-12 '}>
      {/*공지글이 존재할 때 확성기 추가*/}
      {noticePostInfo && noticePostInfo.id !== 0 && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-gray-light'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}
      {noticePostInfo && <PostEach post={noticePostInfo} />}

      {/* noticePost id가 맨 첫번째 id와 같다면 보여주지 않음 */}
      {/*posts 배열 map*/}
      {noticePostInfo
        ? posts.map((post, index) =>
            index === 0 && post.id === noticePostInfo.id ? null : (
              <PostEach key={post.id} post={post} />
            )
          )
        : posts.map((post) => <PostEach key={post.id} post={post} />)}
    </section>
  );
}
