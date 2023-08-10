import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import { FaUserCircle } from 'react-icons/fa';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useCallback, useState } from 'react';
import { CommentInfo } from '@/typings/project.ts';

interface Props {
  commentList: CommentInfo[];
  commentId: number;
  isChildClick: boolean;
}
export default function PostChildComment({ commentList, commentId, isChildClick }: Props) {
  const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  const [countChildLike, setCountChildLike] = useState<{ [key: number]: number }>({});

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
  return (
    <div className={'flex-col-center justify-start w-h-full'}>
      {commentList
        .filter((child) => child.parentId === commentId)
        .map((child, index) => {
          return (
            <div key={index} className={'flex-col justify-start w-[85%] my-1.5'}>
              {/*유저 정보 + 댓글 작성시간*/}
              <div className={'flex-row-center justify-start items-start w-full h-auto mb-2'}>
                {child.image === '' ? (
                  <FaUserCircle className={'flex text-[2rem] fill-gray-dark'} />
                ) : (
                  <img
                    src={child.image}
                    alt="userprofile"
                    className={'flex w-[2rem] fill-gray-dark'}
                  />
                )}
                <div className={'flex-col w-auto h-auto ml-3'}>
                  <span
                    className={'flex h-1/2 text-[0.93rem]'}
                  >{`${child.nickname}(${child.name})`}</span>
                  <span className={'flex h-1/2 text-[0.8rem] text-gray-light'}>
                    {formatCreteaDate(child.createTime)}
                  </span>
                </div>
              </div>

              {/*댓글 내용*/}
              <span className={'flex w-full ml-[2.8rem] mb-1 text-[1rem] font-bold'}>
                {child.content}
              </span>

              {/* 좋아요 + 답글 달기 */}
              <div className={'flex-row-center justify-start w-full h-auto ml-[2.8rem] mb-3'}>
                <div
                  className={'flex-row-center justify-start cursor-pointer'}
                  onClick={() => onClickLike(child.id)}
                >
                  <span className={'flex text-gray-light text-[0.7rem] mr-1'}>좋아요</span>
                  {isLikeClick[child.id] ? (
                    <BsHeartFill
                      className={'flex text-[0.8rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer'}
                    />
                  ) : (
                    <BsHeart
                      className={'flex text-[0.8rem] text-gray-light mr-1.5 mt-1 cursor-pointer'}
                    />
                  )}
                  {countChildLike[child.id] !== undefined && (
                    <span className={'text-[0.8rem] text-gray-light ml-0.5'}>{`${
                      countChildLike[child.id]
                    }개`}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
