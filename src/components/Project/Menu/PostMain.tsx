import { useState } from 'react';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { eachMenuPost } from '@/recoil/Project/Post.ts';
import { useRecoilState } from 'recoil';
import { Post } from '@/typings/project.ts';
import { FaUserCircle } from 'react-icons/fa';

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
              <div className={'flex-col w-full h-[3.8rem] ml-4 border border-red-400'}>
                <span
                  className={'flex h-1/2 font-bold text-[1.4rem] mb-1.5'}
                >{`${post.authorInfoDTO.nickname}(${post.authorInfoDTO.name})`}</span>
                <span className={'flex h-1/2 text-[0.8rem]'}>{post.createTime}</span>
              </div>
            </div>
          </article>
        );
      })}

      <article
        className={'flex-col justify-start w-full h-auto border-base py-[1.8rem] px-[3.3rem]'}
      >
        <div className={''}>df</div>
        <div className={''}>df</div>
      </article>
    </section>
  );
}
