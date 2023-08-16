import { CommentLikeList, Post, PostLikeList } from '@/typings/post.ts';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import PostModal from '@/components/Project/Post/PostModal.tsx';
import DeleteDialog from '@/components/Common/DeleteDialog.tsx';
import PostComment from '@/components/Project/Post/PostComment.tsx';
import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GoKebabHorizontal } from 'react-icons/go';
import { useCallback, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import { Viewer } from '@toast-ui/react-editor';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { noticePost, postLike, postLikeCount, unNoticePost } from '@/api/Project/Post.ts';
import { useMessage } from '@/hooks/useMessage.ts';

interface Props {
  post: Post;
  menuId: number;
  likeList: PostLikeList[];
  noticeId?: number;
}
export default function PostEach({ post, menuId, likeList, noticeId }: Props) {
  const { showMessage, contextHolder } = useMessage();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();

  const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  const [isScrapClick, setIsScrapClick] = useState<{ [key: number]: boolean }>({});
  const [isClickKebab, setIsClickKebab] = useState<{ [key: number]: boolean }>({});

  const queryClient = useQueryClient();

  // 공지글 등록
  const { mutate: noticePostMutate } = useMutation(() => noticePost(menuId, post.id), {
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data) {
        showMessage('success', '공지글로 등록되었습니다.');
      } else showMessage('error', '공지글 등록에 실패했습니다.');
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
    },
  });

  // 공지글 해제
  const { mutate: unNoticePostMutate } = useMutation(() => unNoticePost(menuId), {
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'id' in data) {
        showMessage('success', '공지글이 해제 되었습니다.');
      } else showMessage('error', '공지글 해제에 실패했습니다.');
    },
    onSettled: () => {
      return queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
    },
  });

  // 좋아요 개수 get
  const { data: likeData, refetch } = useQuery(
    ['postLike', post.id],
    () => postLikeCount(post.id),
    {
      enabled: false,
    }
  );

  // 좋아요 클릭
  const { mutate: postLikeMutate } = useMutation(() => postLike(post.id), {
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'cnt' in data) {
        if (likeList.some((likePost) => likePost.id === post.id)) {
          showMessage('success', '🥲🥲');
        } else {
          showMessage('success', '😍️😍');
        }
      } else if (typeof data !== 'string' && 'message' in data) {
        showMessage('warning', data.message);
      } else {
        showMessage('error', '좋아요 실패');
      }
    },
    onSettled: () => {
      // 멤버가 누른 좋아요 리스트 다시 조회
      refetch();
      return queryClient.invalidateQueries(['postLikeList']);
    },
  });

  // 좋아요 눌렀을 때
  const onClickLike = useCallback(
    (postId: number) => {
      setIsLikeClick((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));

      postLikeMutate();
    },
    [isLikeClick]
  );

  // 스크랩 눌렀을 때
  // const onClickScrap = useCallback(
  //   (postId: number) => {
  //     setIsScrapClick((prevState) => ({
  //       ...prevState,
  //       [postId]: !prevState[postId],
  //     }));
  //
  //     // TODO : 스크랩 취소, 좋아요 눌렀을 때 api 요청 보내기
  //   },
  //   [isScrapClick]
  // );

  // 공지글로 등록
  const onClickNotice = useCallback((postId: number) => {
    noticeId === postId ? unNoticePostMutate() : noticePostMutate();
  }, []);

  return (
    <article
      className={
        'flex-col-center justify-start w-full h-auto border border-line bg-post-bg py-[1.8rem] px-[3.3rem] mb-12'
      }
    >
      {contextHolder}
      {/*작성자 정보 + 작성일자 시간*/}
      <div className={'flex-row-center justify-start w-full h-[5.8rem]'}>
        <FaUserCircle className={'flex text-[3rem] fill-gray-dark'} />
        {/*{post.authorInfoDTO.image === '' ? (*/}
        {/*  <FaUserCircle className={'flex text-[3rem] fill-gray-dark'} />*/}
        {/*) : (*/}
        {/*  <img*/}
        {/*    src={post.authorInfoDTO.image}*/}
        {/*    alt="userprofile"*/}
        {/*    className={'flex w-[3rem] fill-gray-dark'}*/}
        {/*  />*/}
        {/*)}*/}
        <div className={'flex-col w-auto h-[3.8rem] ml-4'}>
          <span
            className={'flex h-1/2 font-bold text-[1.2rem] mb-1.5'}
          >{`${post.authorInfoDTO.nickname}(${post.authorInfoDTO.name})`}</span>
          <span className={'flex h-1/2 text-[0.8rem]'}>{formatCreteaDate(post.createTime)}</span>
        </div>
      </div>

      {/*Post 제목 + 메뉴 정보*/}
      <div className={'flex-col-center justify-start w-[75%] h-[5rem] py-2'}>
        <div className={'flex-row-center justify-start w-full h-1/2 text-[1.1rem] font-bold'}>
          <span className={'text-gray-light'}>Title</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.5px] border-gray-light'} />
          {post.postType !== 'DEFAULT' && (
            <span className={'text-[1.2rem] text-orange mr-2'}>
              {post.postType === 'REQUEST_READ' ? '[필독]' : '[요청]'}
            </span>
          )}
          <span className={'text-[1.2rem]'}>{post.title}</span>
        </div>
        <div className={'flex-row-center justify-start w-full h-1/2'}>
          <div className={'flex-row-center justify-start w-full h-1/2 text-[1.1rem] font-bold'}>
            <span className={'text-gray-light ml-1'}>메뉴</span>
            <div className={'mx-3 h-4 border-solid border-r border-[0.5px] border-gray-light'} />
            <span className={'text-[1.2rem]'}>{post.menuName}</span>
          </div>
        </div>
      </div>
      <div className={'w-[75%] border-b border-gray-spring'} />

      {/*post content랑 태그 내용*/}
      <div
        className={'flex-col-center justify-start w-[75%] min-h-[7rem] h-auto my-6 text-[1.1rem]'}
      >
        <div className={'w-[85%] h-auto mb-[2rem] font-bold'}>
          <Viewer initialValue={post.content} />
        </div>
        <div className={'w-[90%] h-auto flex-row-center justify-start'}>
          {post.tagList &&
            post.tagList.map((tag, index) => {
              return (
                <div key={index} className={'w-auto h-auto text-gray-dark mx-3'}>
                  #{tag}
                </div>
              );
            })}
        </div>
      </div>
      <div className={'w-[75%] border-b border-gray-spring'} />

      {/*좋아요, 댓글, 스크랩, 케밥 버튼*/}
      <div className={'flex-row-center justify-between w-[75%] h-[2.5rem] px-2'}>
        <div className={'flex-row-center justify-start w-1/2 h-full text-gray-dark'}>
          {likeList.some((likePost) => likePost.id === post.id) ? (
            <BsHeartFill
              className={'flex text-[1.5rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer scale-110'}
              onClick={() => onClickLike(post.id)}
            />
          ) : (
            <BsHeart
              className={
                'flex text-[1.5rem] text-gray-light mr-1.5 mt-1 cursor-pointer hover:scale-110'
              }
              onClick={() => onClickLike(post.id)}
            />
          )}

          <span className={'flex mr-4'}>{likeData ?? post.likeCount}</span>
          <BsChat className={'flex text-[1.5rem] text-gray-light mr-1.5'} />
          <span className={'flex mr-3'}>{post.commentCount}</span>
        </div>
        <div className={'relative flex-row-center w-1/2 h-full justify-end cursor-pointer'}>
          {/*{isScrapClick[post.id] ? (*/}
          {/*  <AiFillStar*/}
          {/*    className={'flex text-[1.5rem] text-[#FFA41B] ml-1.5'}*/}
          {/*    onClick={() => onClickScrap(post.id)}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <AiOutlineStar*/}
          {/*    className={'flex text-[1.5rem] text-gray-light ml-1.5'}*/}
          {/*    onClick={() => onClickScrap(post.id)}*/}
          {/*  />*/}
          {/*)}*/}
          <GoKebabHorizontal
            className={'flex text-[1.3rem] text-gray-light ml-1.5'}
            onClick={() =>
              setIsClickKebab((prevState) => ({
                ...prevState,
                [post.id]: !prevState[post.id],
              }))
            }
          />
          {isClickKebab[post.id] && (
            <section
              className={
                'absolute top-[2.2rem] flex-col-center w-[5rem] h-[6rem] bottom-5 task-detail-border cursor-pointer text-[0.5rem] text-gray-dark'
              }
            >
              <button
                className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                onClick={() => onOpenModal()}
              >
                수정
              </button>
              <button
                className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                onClick={() => onClickNotice(post.id)}
              >
                {noticeId === post.id ? '공지 해제' : '공지'}
              </button>
              <button
                className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                onClick={() => onOpenDialog()}
              >
                삭제
              </button>
              <PostModal isOpen={isOpenModal} onClose={onCloseModal} post={post.id} isEdit={true} />
              <DeleteDialog
                isOpen={isOpenDialog}
                onClose={onCloseDialog}
                post={post.id}
                menuId={menuId}
                isTask={false}
              />
            </section>
          )}
        </div>
      </div>
      {/*댓글*/}
      <PostComment postId={post.id} menuId={menuId} />
    </article>
  );
}
