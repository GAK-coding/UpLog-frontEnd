import { BsExclamationCircle, BsFillMegaphoneFill } from 'react-icons/bs';
import { Post, PostLikeList, PostPaging, Posts } from '@/typings/post.ts';
import PostEach from '@/components/Project/Post/PostEach.tsx';
import { useInfiniteQuery, useQuery } from 'react-query';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { useParams } from 'react-router-dom';
import { menuPostList, postLikeList, postPagination } from '@/api/Project/Post.ts';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Scrollbars } from 'rc-scrollbars';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.ts';

export default function PostMain() {
  const { product, project, menutitle } = useParams();

  //메뉴별로 Post 조회한 데이터
  const [posts, setPosts] = useState<Posts>();
  const [likeList, setLikeList] = useState<PostLikeList[]>();
  // const [commentLike, setCommentLike] = useState<CommentLikeList[]>();

  // menuId 찾기
  const menuList = useRecoilValue(menuListData);
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;

  // menu별로 post 조회
  // const { refetch } = useQuery(['menuPostData', menuId], () => menuPostList(menuId!), {
  //   onSuccess: (data) => {
  //     if (typeof data !== 'string') {
  //       if (data.noticePost !== null) {
  //         if (data.noticePost!.id === data.posts[0].id) {
  //           setPosts({
  //             posts: data.posts.slice(1),
  //             noticePost: data.noticePost,
  //           });
  //         } else {
  //           setPosts({
  //             posts: data.posts,
  //             noticePost: data.noticePost,
  //           });
  //         }
  //       } else {
  //         setPosts({
  //           posts: data.posts,
  //         });
  //       }
  //     }
  //   },
  //   enabled: false,
  // });

  // post pagination
  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['postPages', menuId],
    ({ pageParam = 0 }) => postPagination(menuId!, pageParam, 10),
    {
      getNextPageParam: (lastPage) => {
        if (typeof lastPage !== 'string') {
          return lastPage.nextPage ? lastPage.currentPage + 1 : undefined;
        }
      },
      onSuccess: (data) => {
        if (typeof data.pages !== 'string') {
          console.log(data.pages);
          const postData: Post[] = (data.pages as PostPaging[]).flatMap((page) => page.posts);
          const notice = (data.pages[0] as PostPaging).noticePost;

          // noticePost 가 존재할 때
          if (notice !== undefined) {
            if (notice.id === postData[0].id) {
              setPosts({
                posts: postData.slice(1),
                noticePost: notice,
              });
            } else {
              setPosts({
                posts: postData,
                noticePost: notice,
              });
            }
          } else {
            setPosts({
              posts: postData,
            });
          }
        }
      },
      enabled: false,
    }
  );

  // custom hook 에서 받는 setTarget 값
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
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
    <section className={'flex-col-center justify-start w-full h-full mb-12 '}>
      <Scrollbars
        style={{ width: '100%', height: '100%' }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <article className={'px-[10rem]'}>
          {/*공지글이 존재할 때 확성기 추가*/}
          {posts && posts.noticePost && (
            <div className={'flex items-center w-full h-[4.8rem]'}>
              <BsFillMegaphoneFill className={'flex text-[2.5rem] text-[#FF5733]'} />
              <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
            </div>
          )}

          {/*공지글이 존재할 때 공지글 보여주기*/}
          {posts && posts.noticePost && (
            <PostEach
              post={posts.noticePost}
              menuId={menuId!}
              likeList={likeList!}
              noticeId={posts.noticePost.id}
            />
          )}

          {/*posts만 보여줌*/}
          {posts &&
            posts.posts.map((post: Post) => (
              <PostEach key={post.id} post={post} menuId={menuId!} likeList={likeList!} />
            ))}
        </article>
        {/*posts가 없을 때*/}
        {posts && posts.posts.length === 0 && (
          <div className={'flex-col-center'}>
            <BsExclamationCircle className={'flex mt-[10rem] text-[4.5rem] fill-[#E06469]'} />
            <span className={'flex mt-[2rem] text-[1.3rem] text-gray-dark'}>
              작성된 Post가 없습니다.
            </span>
          </div>
        )}
        <div ref={setTarget} className={'flex h-[1rem]'} />
      </Scrollbars>
    </section>
  );
}
