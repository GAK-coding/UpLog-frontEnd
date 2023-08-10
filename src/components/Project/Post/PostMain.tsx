import { ChangeEvent, KeyboardEventHandler, useCallback, useState } from 'react';
import { BsChat, BsFillMegaphoneFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import { eachMenuPost } from '@/recoil/Project/Post.ts';
import { useRecoilState } from 'recoil';
import { Post } from '@/typings/project.ts';
import { FaUserCircle } from 'react-icons/fa';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GoKebabHorizontal } from 'react-icons/go';
import PostComment from '@/components/Project/Post/PostComment.tsx';
import DeleteDialog from '@/components/Common/DeleteDialog.tsx';
import { useDisclosure } from '@chakra-ui/react';
import PostModal from '@/components/Project/Post/PostModal.tsx';
import useInput from '@/hooks/useInput.ts';

export default function PostMain() {
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();

  //메뉴별로 Post 조회한 데이터
  const [postData, setPostListData] = useRecoilState(eachMenuPost);

  // 공지글이 존재하는지
  const noticePostInfo = postData.noticePost as Post;
  const posts = postData.posts as Post[];

  // TODO : 좋아요, 스크랩 클릭 초기 값 멤버마다 다르게 설정해서 해야함
  const [isLikeClick, setIsLikeClick] = useState<{ [key: number]: boolean }>({});
  const [isScrapClick, setIsScrapClick] = useState<{ [key: number]: boolean }>({});
  const [isClickKebab, setIsClickKebab] = useState<{ [key: number]: boolean }>({});

  const [commentValue, onChangeCommentValue, setCommentValue] = useInput('');

  // 좋아요 눌렀을 때
  const onClickLike = useCallback(
    (postId: number) => {
      setIsLikeClick((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));

      //TODO : 좋아요 취소, 좋아요 눌렀을 때 api 요청 보내기
    },
    [isLikeClick]
  );

  // 스크랩 눌렀을 때
  const onClickScrap = useCallback(
    (postId: number) => {
      setIsScrapClick((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));

      //TODO : 스크랩 취소, 좋아요 눌렀을 때 api 요청 보내기
    },
    [isScrapClick]
  );

  // 공지글로 등록
  const onClickNotice = useCallback((postId: number) => {
    // TODO : 해당 post id값으로 메뉴 공지글로 등록하는 api 요청 보내기
    console.log(postId);
  }, []);

  // 댓글 작성
  const onSubmit = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // TODO : 댓글 작성 api 요청 보내기
      console.log(commentValue);
      setCommentValue('');
    }
  }, []);

  return (
    <section className={'flex-col-center justify-start w-[75%] h-auto mb-12 '}>
      {/*공지글이 존재할 때 확성기 추가*/}
      {noticePostInfo.id !== 0 && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-gray-light'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}

      {/* TODO : noticePost는 따로 값 넣어주기*/}
      {/*posts 배열 map*/}
      {posts.map((post, index) => {
        return (
          <article
            key={index}
            className={
              'flex-col-center justify-start w-full h-auto border-base py-[1.8rem] px-[3.3rem] mb-12'
            }
          >
            {/*작성자 정보 + 작성일자 시간*/}
            <div className={'flex-row-center justify-start w-full h-[5.8rem]'}>
              {post.authorInfoDTO.image === '' ? (
                <FaUserCircle className={'flex text-[3rem] fill-gray-dark'} />
              ) : (
                <img
                  src={post.authorInfoDTO.image}
                  alt="userprofile"
                  className={'flex w-[3rem] fill-gray-dark'}
                />
              )}
              <div className={'flex-col w-auto h-[3.8rem] ml-4'}>
                <span
                  className={'flex h-1/2 font-bold text-[1.2rem] mb-1.5'}
                >{`${post.authorInfoDTO.nickname}(${post.authorInfoDTO.name})`}</span>
                <span className={'flex h-1/2 text-[0.8rem]'}>
                  {formatCreteaDate(post.createTime)}
                </span>
              </div>
            </div>

            {/*Post 제목 + 메뉴 정보*/}
            <div className={'flex-col-center justify-start w-[75%] h-[5rem] py-2'}>
              <div className={'flex-row-center justify-start w-full h-1/2 text-[1.1rem] font-bold'}>
                <span className={'text-gray-light'}>Title</span>
                <div
                  className={'mx-3 h-4 border-solid border-r border-[0.5px] border-gray-light'}
                />
                {post.postType !== null && (
                  <span className={'text-[1.2rem] text-orange mr-2'}>[{post.postType}]</span>
                )}
                <span className={'text-[1.2rem]'}>{post.title}</span>
              </div>
              <div className={'flex-row-center justify-start w-full h-1/2'}>
                <div
                  className={'flex-row-center justify-start w-full h-1/2 text-[1.1rem] font-bold'}
                >
                  <span className={'text-gray-light ml-1'}>메뉴</span>
                  <div
                    className={'mx-3 h-4 border-solid border-r border-[0.5px] border-gray-light'}
                  />
                  <span className={'text-[1.2rem]'}>{post.menuName}</span>
                </div>
              </div>
            </div>
            <div className={'w-[75%] border-b border-gray-spring'} />

            {/*post content랑 태그 내용*/}
            <div
              className={
                'flex-col-center justify-start w-[75%] min-h-[7rem] h-auto my-6 text-[1.1rem]'
              }
            >
              <div className={'w-[85%] h-auto mb-[2rem] font-bold'}>{post.content}</div>
              <div className={'w-[90%] h-auto flex-row-center justify-start'}>
                {post.tagList.map((tag, index) => {
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
                {isLikeClick[post.id] ? (
                  <BsHeartFill
                    className={'flex text-[1.5rem] text-[#FF5733] mr-1.5 mt-1 cursor-pointer'}
                    onClick={() => onClickLike(post.id)}
                  />
                ) : (
                  <BsHeart
                    className={'flex text-[1.5rem] text-gray-light mr-1.5 mt-1 cursor-pointer'}
                    onClick={() => onClickLike(post.id)}
                  />
                )}
                <span className={'flex mr-4'}>{post.likeCount}</span>
                <BsChat className={'flex text-[1.5rem] text-gray-light mr-1.5'} />
                <span className={'flex mr-3'}>{post.commentCount}</span>
              </div>
              <div className={'relative flex-row-center w-1/2 h-full justify-end cursor-pointer'}>
                {isScrapClick[post.id] ? (
                  <AiFillStar
                    className={'flex text-[1.5rem] text-[#FFA41B] ml-1.5'}
                    onClick={() => onClickScrap(post.id)}
                  />
                ) : (
                  <AiOutlineStar
                    className={'flex text-[1.5rem] text-gray-light ml-1.5'}
                    onClick={() => onClickScrap(post.id)}
                  />
                )}
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
                      'absolute top-[2.2rem] flex-col-center w-[4rem] h-[5.5rem] bottom-5 task-detail-border cursor-pointer text-[0.5rem] text-gray-dark'
                    }
                  >
                    <button
                      className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                      onClick={() => onOpenModal()}
                    >
                      수정
                    </button>
                    <PostModal
                      isOpen={isOpenModal}
                      onClose={onCloseModal}
                      post={post.id}
                      isEdit={true}
                    />
                    <button
                      className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                      onClick={() => onClickNotice(post.id)}
                    >
                      공지
                    </button>
                    <button
                      className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}
                      onClick={() => onOpenDialog()}
                    >
                      삭제
                    </button>
                    <DeleteDialog
                      isOpen={isOpenDialog}
                      onClose={onCloseDialog}
                      post={post.id}
                      isTask={false}
                    />
                  </section>
                )}
              </div>
            </div>

            {/*댓글*/}
            <PostComment postId={post.id} />
          </article>
        );
      })}
    </section>
  );
}
