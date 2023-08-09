import { useRecoilState } from 'recoil';
import { eachComment } from '@/recoil/Project/Post.ts';
import { FaUserCircle } from 'react-icons/fa';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import { useCallback, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props {
  postId: number;
}

export default function PostComment({ postId }: Props) {
  const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  const [isChildClick, setIsChildClick] = useState<{ [key: number]: boolean }>({});

  const [commentList, setCommentList] = useRecoilState(eachComment);

  // 댓글 좋아요 눌렀을 때
  const onClickLike = useCallback(
    (commentId: number) => {
      setIsLikeClick((prevState) => ({
        ...prevState,
        [commentId]: !prevState[commentId],
      }));

      //TODO : 좋아요 취소, 좋아요 눌렀을 때 api 요청 보내기
    },
    [isLikeClick]
  );

  // 답글달기 눌렀을 때
  const onClickChild = useCallback((commentId: number) => {}, []);

  return (
    <div className={'flex-col-center justify-start w-[60%] h-auto'}>
      {/*댓글 */}
      {commentList
        .filter((comment) => comment.parentId === null)
        .map((comment, index) => {
          return (
            <div
              key={index}
              className={'flex-col-center justify-start w-full h-auto pt-2 border border-red-400'}
            >
              {/*유저 정보 + 댓글 작성시간*/}
              <div className={'flex-row-center justify-start items-start w-full h-auto mb-2'}>
                {comment.image === '' ? (
                  <FaUserCircle className={'flex text-[2rem] fill-gray-dark'} />
                ) : (
                  <img
                    src={comment.image}
                    alt="userprofile"
                    className={'flex w-[2rem] fill-gray-dark'}
                  />
                )}
                <div className={'flex-col w-auto h-auto ml-4'}>
                  <span
                    className={'flex h-1/2 text-[0.93rem]'}
                  >{`${comment.nickname}(${comment.name})`}</span>
                  <span className={'flex h-1/2 text-[0.8rem] text-gray-light'}>
                    {formatCreteaDate(comment.createTime)}
                  </span>
                </div>
              </div>

              {/*댓글 내용*/}
              <span className={'flex w-full ml-[6rem] mb-0.5 text-[1rem] font-bold'}>
                {comment.content}
              </span>

              {/* 좋아요 + 답글 달기 */}
              <div className={'flex-row-center justify-start w-full h-auto ml-[6rem]'}>
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
                </div>
                <span
                  className={'flex text-gray-light ml-2 text-[0.7rem] cursor-pointer'}
                  onClick={() => onClickChild(comment.id)}
                >
                  답글 달기
                </span>
              </div>
              {commentList
                .filter((child) => child.parentId === comment.id)
                .map((child, index) => {
                  return <div key={index}>{child.content}</div>;
                })}
            </div>
          );
        })}
      {/*대댓글*/}
    </div>
  );
}
