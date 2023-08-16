import { FaUserCircle } from 'react-icons/fa';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import { useCallback, useEffect, useState } from 'react';
import useInput from '@/hooks/useInput.ts';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createComment,
  deleteComment,
  postCommentList,
  updateComment,
} from '@/api/Project/Post.ts';
import { CommentBody, CommentInfo } from '@/typings/post.ts';
import { useMessage } from '@/hooks/useMessage.ts';
import { SaveUserInfo } from '@/typings/member.ts';

interface Props {
  postId: number;
  menuId: number;
}

export default function PostComment({ postId, menuId }: Props) {
  const { showMessage, contextHolder } = useMessage();
  const userInfo: SaveUserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);

  // 댓글 value
  const [commentValue, onChangeCommentValue, setCommentValue] = useInput('');
  const [check, setCheck] = useState<boolean>(false);
  const [editCheck, setEditCheck] = useState<boolean>(false);
  //댓글 생성 body data
  const [createData, setCreateData] = useState<CommentBody>({
    parentId: null,
    content: '',
  });

  const [commentList, setCommentList] = useState<CommentInfo[]>();
  const [commentId, setCommentId] = useState<number>(0);
  // const [likeCnt, setLikeCnt] = useState<{ [key: number]: number }>({});

  // const [isEditComment, setIsEditComment] = useState<{ [key: number]: boolean }>({});
  // const [editCommentValue, setEditCommentValue] = useState<string>('');
  // const [editContent, onChangeEditContent, setEditContent] = useInput('');

  // const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  // const [isChildClick, setIsChildClick] = useState<{ [key: number]: boolean }>({});
  // const [childCommentValue, setChildCommentValue] = useState<{ [key: number]: string }>({});

  const queryClient = useQueryClient();

  // 댓글 생성
  const { mutate: createCommentMutate } = useMutation(() => createComment(postId, createData), {
    onMutate: async () => {
      await queryClient.cancelQueries(['commentList', postId]);

      const previousData: CommentInfo | undefined = queryClient.getQueryData([
        'commentList',
        postId,
      ]);

      const newCommentData = {
        ...previousData,
        content: createData.content,
      };
      queryClient.setQueryData(['commentList', postId], newCommentData);

      return () => queryClient.setQueryData(['commentList', postId], previousData);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && 'message' in data) {
        showMessage('warning', data.message);
      } else if (typeof data !== 'string') {
        showMessage('success', '댓글이 등록되었습니다.');
      } else showMessage('error', '댓글 등록에 실패했습니다.');
    },
    onError: (error, value, rollback) => {
      if (rollback) {
        rollback();
        showMessage('error', '댓글 등록에 실패했습니다.');
      } else {
        showMessage('error', '댓글 등록에 실패했습니다.');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['commentList', postId]);
      queryClient.invalidateQueries(['menuPostData', menuId], { refetchInactive: true });
    },
  });

  // 댓글 삭제
  const { mutate: deleteCommentMutate } = useMutation(
    (commentId: number) => deleteComment(commentId),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(['commentList', postId]);

        const previousData: CommentInfo[] | undefined = queryClient.getQueryData([
          'commentList',
          postId,
        ]);

        const newCommentData = previousData?.filter((comment) => comment.id !== commentId);
        queryClient.setQueryData(['commentList', postId], newCommentData);

        return () => queryClient.setQueryData(['commentList', postId], previousData);
      },
      onSuccess: (data) => {
        if (typeof data === 'string' && data === 'DELETE OK') {
          showMessage('success', '댓글이 삭제되었습니다.');
        }
      },
      onError: (error, value, rollback) => {
        if (rollback) {
          rollback();
          showMessage('error', '댓글 삭제에 실패했습니다.');
        } else {
          showMessage('error', '댓글 삭제에 실패했습니다.');
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['commentList', postId]);
      },
    }
  );

  // 댓글 좋아요
  // const { mutate: commentLikeMutate } = useMutation((commentId: number) => commentLike(commentId), {
  //   onSuccess: (data) => {
  //     if (typeof data !== 'string' && 'cnt' in data) {
  //       if (commentLikeData.some((like) => like.id === commentId)) {
  //         showMessage('success', '🥲🥲');
  //       } else {
  //         showMessage('success', '😍️😍');
  //       }
  //     }
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['commentLikeList']);
  //   },
  // });

  // 댓글 조회
  const { data } = useQuery(['commentList', postId], () => postCommentList(postId), {
    onSuccess: (data) => {
      if (data && typeof data !== 'string') {
        setCommentList(data);
      }
    },
  });

  // console.log('여기', data);
  // // 댓글 좋아요 개수
  // const commentLikeCnt = useQueries(
  //   commentList
  //     ? Array.from(commentList).map((comment) => ({
  //         queryKey: ['commentLikeCount', comment.id],
  //         queryFn: () => commentLikeCount(comment.id),
  //         onSuccess: (data: number | string) => {
  //           if (typeof data !== 'string') {
  //             setLikeCnt((prevState) => ({
  //               ...prevState,
  //               [comment.id]: data,
  //             }));
  //           }
  //         },
  //         // enabled: !!commentList,
  //       }))
  //     : []
  // );

  // console.log(commentLikeCnt);

  // 댓글 좋아요 개수
  // const { data: commentLikeCnt } = useQuery(
  //   ['commentLikeCount', commentId],
  //   () => commentLikeCount(commentId),
  //   {
  //     onSuccess: (data: number | string) => {
  //       if (typeof data !== 'string') {
  //         setLikeCnt((prevState) => ({
  //           ...prevState,
  //           [commentId]: data,
  //         }));
  //         console.log(commentId, data);
  //       }
  //     },
  //     // enabled: !!commentList,
  //   }
  // );

  // 댓글 좋아요 눌렀을 때
  // const onClickLike = useCallback(
  //   (commentId: number) => {
  //     setIsLikeClick((prevState) => ({
  //       ...prevState,
  //       [commentId]: !prevState[commentId],
  //     }));
  //     setCommentId(commentId);
  //     commentLikeMutate(commentId);
  //   },
  //   [isLikeClick]
  // );

  // 답글달기 눌렀을 때
  // const onClickChild = useCallback((commentId: number) => {
  //   setIsChildClick((prevState) => ({
  //     ...prevState,
  //     [commentId]: !prevState[commentId],
  //   }));
  // }, []);

  // Enter 입력 시 댓글 추가
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 짤림 방지
    if (e.nativeEvent.isComposing) return;

    // Enter 입력 시 댓글 추가
    if (e.key === 'Enter') {
      setCreateData({ ...createData, content: commentValue });
      setCheck(true);
      console.log(commentValue);
      setCommentValue('');
    }
  };

  // 댓글 생성요청 + 데이터 초기화
  useEffect(() => {
    if (check) {
      if (createData.content === '') {
        showMessage('warning', '댓글을 입력해주세요.');
        return;
      }

      createCommentMutate();

      setCheck(false);
      setCreateData({
        parentId: null,
        content: '',
      });
    }
  }, [check]);

  return (
    <div className={'flex-col-center justify-start w-[60%] h-auto'}>
      {contextHolder}
      {/*댓글 */}
      {commentList !== undefined &&
        Array.from(commentList)
          .filter((comment) => comment.parentId === null)
          .map((comment, index) => {
            return (
              <div key={index} className={'flex-col-center justify-start w-full h-auto pt-2 my-2'}>
                {/*유저 정보 + 댓글 작성시간*/}
                <div className={'flex-row-center justify-between items-start w-full h-auto mb-2'}>
                  <div className={'flex'}>
                    <FaUserCircle className={'flex text-[2rem] fill-gray-dark'} />
                    {/*{comment.image === '' ? (*/}
                    {/*  <FaUserCircle className={'flex text-[2rem] fill-gray-dark'} />*/}
                    {/*) : (*/}
                    {/*  <img*/}
                    {/*    src={comment.image}*/}
                    {/*    alt="userprofile"*/}
                    {/*    className={'flex w-[2rem] fill-gray-dark'}*/}
                    {/*  />*/}
                    {/*)}*/}
                    <div className={'flex-col w-auto h-auto ml-3'}>
                      <span
                        className={'flex h-1/2 text-[0.93rem]'}
                      >{`${comment.nickName}(${comment.name})`}</span>
                      <span className={'flex h-1/2 text-[0.8rem] text-gray-light'}>
                        {formatCreteaDate(comment.createTime)}
                      </span>
                    </div>
                  </div>
                  {userInfo.id === comment.memberId && (
                    <div className={'flex justify-between w-[4rem] text-[0.8rem] text-gray-light'}>
                      <span
                        className={'cursor-pointer hover:text-orange'}
                        onClick={() => deleteCommentMutate(comment.id)}
                      >
                        삭제
                      </span>
                    </div>
                  )}
                </div>
                {/*댓글 내용*/}
                <span className={'flex w-full ml-[5.5rem] mb-1 text-[1rem] font-bold'}>
                  {comment.content}
                </span>
                {/*<span className={'flex w-full ml-[5.5rem] mb-1 text-[1rem] font-bold'}>*/}
                {/*  {comment.content}*/}
                {/*</span>*/}
                {/* 좋아요 + 답글 달기 */}
                <div className={'flex-row-center justify-start w-full h-auto ml-[5.5rem] mb-3'}>
                  <div
                    className={'flex-row-center justify-start cursor-pointer'}
                    // onClick={() => onClickLike(comment.id)}
                  >
                    {/*<span className={'flex text-gray-light text-[0.7rem] mr-1'}>좋아요</span>*/}
                    {/*{isLikeClick[comment.id] ? (*/}
                    {/*  <BsHeartFill*/}
                    {/*    className={'flex text-[0.8rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer'}*/}
                    {/*  />*/}
                    {/*) : (*/}
                    {/*  <BsHeart*/}
                    {/*    className={'flex text-[0.8rem] text-gray-light mr-1.5 mt-1 cursor-pointer'}*/}
                    {/*  />*/}
                    {/*)}*/}

                    {/*{commentLikeData.some((like) => like.id === comment.id) ? (*/}
                    {/*  <BsHeartFill*/}
                    {/*    className={'flex text-[0.8rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer'}*/}
                    {/*  />*/}
                    {/*) : (*/}
                    {/*  <BsHeart*/}
                    {/*    className={'flex text-[0.8rem] text-gray-light mr-1.5 mt-1 cursor-pointer'}*/}
                    {/*  />*/}
                    {/*)}*/}
                    {/*<span className={'text-[0.8rem] text-gray-light ml-0.5'}>*/}
                    {/*{likeCnt[comment.id] !== undefined ? `${likeCnt[comment.id]}개` : ''}*/}
                    {/*</span>*/}
                    {/*{countChildLike[comment.id] !== undefined && (*/}
                    {/*  <span className={'text-[0.8rem] text-gray-light ml-0.5'}>{`${*/}
                    {/*    countChildLike[comment.id]*/}
                    {/*  }개`}</span>*/}
                    {/*)}*/}
                  </div>
                  {/*<span*/}
                  {/*  className={'flex text-gray-light ml-2 text-[0.7rem] cursor-pointer'}*/}
                  {/*  onClick={() => onClickChild(comment.id)}*/}
                  {/*>*/}
                  {/*  답글 달기*/}
                  {/*</span>*/}
                </div>
                {/*대댓글 */}
                {/*<PostChildComment*/}
                {/*  commentList={commentList}*/}
                {/*  commentId={comment.id}*/}
                {/*  isChildClick={isChildClick[comment.id]}*/}
                {/*/>*/}
              </div>
            );
          })}
      {/*댓글 작성 input */}
      <div
        className={
          'flex-row-center justify-between w-full h-[3rem] mt-4 border border-gray-light rounded-2xl px-5'
        }
      >
        <input
          type="text"
          value={commentValue}
          onChange={onChangeCommentValue}
          placeholder={'댓글을 입력해주세요.'}
          maxLength={30}
          className={'flex w-full h-full outline-none bg-transparent rounded-2xl'}
          onKeyDown={(e) => activeEnter(e)}
        />
      </div>
    </div>
  );
}
