import { FaUserCircle } from 'react-icons/fa';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import { useCallback, useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import useInput from '@/hooks/useInput.ts';
import PostChildComment from '@/components/Project/Post/PostChildComment.tsx';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createComment, postCommentList } from '@/api/Project/Post.ts';
import { CommentBody, CommentInfo } from '@/typings/post.ts';
import { useMessage } from '@/hooks/useMessage.ts';

interface Props {
  postId: number;
}

export default function PostComment({ postId }: Props) {
  const { showMessage, contextHolder } = useMessage();
  // 댓글 value
  const [commentValue, onChangeCommentValue, setCommentValue] = useInput('');
  const [check, setCheck] = useState<boolean>(false);
  //댓글 생성 body data
  const [createData, setCreateData] = useState<CommentBody>({
    parentId: null,
    content: '',
  });

  const [commentList, setCommentList] = useState<CommentInfo[]>();

  const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  const [isChildClick, setIsChildClick] = useState<{ [key: number]: boolean }>({});
  const [countChildLike, setCountChildLike] = useState<{ [key: number]: number }>({});
  const [childCommentValue, setChildCommentValue] = useState<{ [key: number]: string }>({});

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
      if (typeof data !== 'string') {
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
      return queryClient.invalidateQueries(['commentList', postId]);
    },
  });

  // 댓글 조회
  const { data } = useQuery(['commentList', postId], () => postCommentList(postId), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        setCommentList(data);
      }
    },
  });

  // 댓글 좋아요 눌렀을 때
  const onClickLike = useCallback(
    (commentId: number) => {
      // TODO : 좋아요 누른건지, 취소한건지 구별어떻게하지
      setIsLikeClick((prevState) => ({
        ...prevState,
        [commentId]: !prevState[commentId],
      }));

      setCountChildLike((prevCountChildLike) => {
        if (isLikeClick[commentId]) {
          return {
            ...prevCountChildLike,
            [commentId]: (prevCountChildLike[commentId] || 0) + 1,
          };
        }
        return prevCountChildLike; // 값이 true가 아닐 때는 변경하지 않음
      });
      //TODO : 좋아요 취소, 좋아요 눌렀을 때 api 요청 보내기
    },
    [isLikeClick]
  );

  // 답글달기 눌렀을 때
  const onClickChild = useCallback((commentId: number) => {
    setIsChildClick((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  }, []);

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

      // TODO : 댓글 추가 api 요청 보내기
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
                <div className={'flex-row-center justify-start items-start w-full h-auto mb-2'}>
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
                {/*댓글 내용*/}
                <span className={'flex w-full ml-[5.5rem] mb-1 text-[1rem] font-bold'}>
                  {comment.content}
                </span>
                {/* 좋아요 + 답글 달기 */}
                <div className={'flex-row-center justify-start w-full h-auto ml-[5.5rem] mb-3'}>
                  <div
                    className={'flex-row-center justify-start cursor-pointer'}
                    onClick={() => onClickLike(comment.id)}
                  >
                    <span className={'flex text-gray-light text-[0.7rem] mr-1'}>좋아요</span>
                    {isLikeClick[comment.id] ? (
                      <BsHeartFill
                        className={'flex text-[0.8rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer'}
                      />
                    ) : (
                      <BsHeart
                        className={'flex text-[0.8rem] text-gray-light mr-1.5 mt-1 cursor-pointer'}
                      />
                    )}
                    {countChildLike[comment.id] !== undefined && (
                      <span className={'text-[0.8rem] text-gray-light ml-0.5'}>{`${
                        countChildLike[comment.id]
                      }개`}</span>
                    )}
                  </div>
                  <span
                    className={'flex text-gray-light ml-2 text-[0.7rem] cursor-pointer'}
                    onClick={() => onClickChild(comment.id)}
                  >
                    답글 달기
                  </span>
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
          'flex-row-center justify-between w-full h-[3rem] mt-4  border border-line rounded-2xl px-5'
        }
      >
        <input
          type="text"
          value={commentValue}
          onChange={onChangeCommentValue}
          placeholder={'댓글을 입력해주세요.'}
          maxLength={30}
          className={'flex w-full h-full outline-none rounded-2xl'}
          onKeyDown={(e) => activeEnter(e)}
        />
      </div>
    </div>
  );
}
