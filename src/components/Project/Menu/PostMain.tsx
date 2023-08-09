import { useState } from 'react';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { eachMenuPost } from '@/recoil/Project/Post.ts';
import { useRecoilState } from 'recoil';
import { Post } from '@/typings/project.ts';
import { FaUserCircle } from 'react-icons/fa';
import { formatCreteaDate } from '@/utils/fotmatCreateDate.ts';

export default function PostMain() {
  const [postData, setPostListData] = useRecoilState(eachMenuPost);
  // 공지글이 존재하는지
  const noticePostInfo = postData.noticePost as Post;
  const posts = postData.posts as Post[];

  return (
    <section className={'flex-col-center justify-start w-[80%] h-auto mb-12 '}>
      {noticePostInfo.id !== 0 && (
        <div className={'flex items-center w-full h-[4.8rem]'}>
          <BsFillMegaphoneFill className={'flex text-[2.5rem] text-gray-light'} />
          <span className={'ml-4 font-bold text-[1.5rem] text-gray-dark'}>공지</span>
        </div>
      )}

      {/*TODO : noticePost는 따로 값 넣어주기*/}
      {/*posts 배열 map*/}
      {posts.map((post, index) => {
        console.log(post.authorInfoDTO);
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
              <div className={'flex-col w-auto h-[3.8rem] ml-4 border border-red-400'}>
                <span
                  className={'flex h-1/2 font-bold text-[1.2rem] mb-1.5'}
                >{`${post.authorInfoDTO.nickname}(${post.authorInfoDTO.name})`}</span>
                <span className={'flex h-1/2 text-[0.8rem]'}>
                  {formatCreteaDate(post.createTime)}
                </span>
              </div>
            </div>
            <div className={'flex-col-center justify-start w-[75%] h-[5rem] py-2'}>
              <div className={'flex-row-center justify-start w-full h-1/2 text-[1.1rem] font-bold'}>
                <span className={'text-gray-light'}>Title</span>
                <div
                  className={'mx-3 h-4 border-solid border-r border-[0.5px] border-gray-light'}
                />
                {post.postType !== null && (
                  <span className={'text-[1.3rem] text-orange mr-2'}>[{post.postType}]</span>
                )}
                <span className={'text-[1.3rem]'}>{post.title}</span>
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
          </article>
        );
      })}
    </section>
  );
}
