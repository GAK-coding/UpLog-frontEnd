import { BsFillMegaphoneFill } from 'react-icons/bs';
import { CommentLikeList, Post, PostLikeList, Posts } from '@/typings/post.ts';
import PostEach from '@/components/Project/Post/PostEach.tsx';
import { useQuery } from 'react-query';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useParams } from 'react-router-dom';
import { commentLikeList, menuPostList, postLikeList } from '@/api/Project/Post.ts';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SaveProjectInfo } from '@/typings/project.ts';

export default function PostMain() {
  const { product, project, menutitle } = useParams();

  //메뉴별로 Post 조회한 데이터
  const [noticePostInfo, setNoticePostInfo] = useState<Post>();
  const [posts, setPosts] = useState<Post[]>();
  const [likeList, setLikeList] = useState<PostLikeList[]>();
  // const [commentLike, setCommentLike] = useState<CommentLikeList[]>();

  // menuId 찾기
  const menuList = useRecoilValue(menuListData);
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;

  // menu별로 post 조회
  const { refetch } = useQuery(['menuPostData', menuId], () => menuPostList(menuId!), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        // const reversePosts = [...data['posts']].reverse();
        // setPosts(reversePosts);
        setPosts(data['posts']);
        if (data.noticePost !== undefined) {
          setNoticePostInfo(data.noticePost);
        }
      }
    },
    enabled: false,
  });

  // 좋아요 post list
  const { data } = useQuery(['postLikeList'], () => postLikeList(), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        setLikeList(data);
      }
    },
  });

  // 멤버 댓글 좋아요 리스트
  // const { data: commentList } = useQuery(['commentLikeList'], () => commentLikeList(), {
  //   onSuccess: (data) => {
  //     if (typeof data !== 'string') {
  //       setCommentLike(data);
  //     }
  //   },
  // });

  useEffect(() => {
    if (menuId !== undefined) refetch();
  }, [menutitle, menuId]);

  return (
    <section className={'flex-col-center justify-start w-[75%] h-auto mb-12 '}>
      {/*공지글이 존재할 때 확성기 추가*/}
      {noticePostInfo && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-[#FF5733]'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}
      {noticePostInfo && (
        <PostEach
          post={noticePostInfo}
          menuId={menuId!}
          likeList={likeList!}
          noticeId={noticePostInfo.id}
        />
      )}

      {/*noticePost id가 맨 첫번째 id와 같다면 보여주지 않음 posts 배열 map*/}
      {noticePostInfo &&
        posts &&
        posts.map((post, index) =>
          index === 0 && post.id === noticePostInfo.id ? null : (
            <PostEach
              key={post.id}
              post={post}
              menuId={menuId!}
              likeList={likeList!}
              noticeId={noticePostInfo.id}
            />
          )
        )}

      {/*noticePost가 없으면 그냥 posts만 보여줌*/}
      {posts &&
        posts.map((post) => (
          <PostEach key={post.id} post={post} menuId={menuId!} likeList={likeList!} />
        ))}
    </section>
  );
}
