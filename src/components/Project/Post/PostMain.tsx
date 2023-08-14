import { BsFillMegaphoneFill } from 'react-icons/bs';
import { eachMenuPost } from '@/recoil/Project/Post.ts';
import { useRecoilState } from 'recoil';
import { PostData } from '@/typings/postData.ts';
import PostEach from '@/components/Project/Post/PostEach.tsx';

export default function PostMain() {
  //메뉴별로 Post 조회한 데이터
  const [postData, setPostListData] = useRecoilState(eachMenuPost);

  // 공지글이 존재하는지
  const noticePostInfo: PostData = postData.noticePost;
  const posts: PostData[] = postData.posts;

  return (
    <section className={'flex-col-center justify-start w-[75%] h-auto mb-12 '}>
      {/*공지글이 존재할 때 확성기 추가*/}
      {noticePostInfo.id !== 0 && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-gray-light'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}

      <PostEach post={noticePostInfo} />

      {/* noticePost id가 맨 첫번째 id와 같다면 보여주지 않음 */}
      {/*posts 배열 map*/}
      {posts.map((post, index) =>
        index === 0 && post.id === noticePostInfo.id ? null : <PostEach key={post.id} post={post} />
      )}
    </section>
  );
}
