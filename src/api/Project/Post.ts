import { AxiosResponse } from 'axios';
import { FailPost, PostBody, Post, Posts, UpdatePostBody, NoticeMenu } from '@/typings/post.ts';
import { instance } from '@/api';

// post 생성
export const createPost = async (data: PostBody) => {
  try {
    const res: AxiosResponse<Post | FailPost> = await instance.post('/posts', data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'create post fail';
  }
};

// post 단일조회
export const eachPost = async (postId: number) => {
  try {
    const res: AxiosResponse<Post> = await instance.get(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get each post fail';
  }
};

// post menu별 조회
export const menuPostList = async (menuId: number) => {
  try {
    const res: AxiosResponse<Posts> = await instance.get(`/menus/${menuId}/posts`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get menu posts fail';
  }
};

// post 삭제
export const deletePost = async (postId: number) => {
  try {
    const res: AxiosResponse<string | FailPost> = await instance.delete(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'delete post fail';
  }
};

// post 수정
export const updatePost = async (postId: number, data: UpdatePostBody) => {
  try {
    const res: AxiosResponse<Post | FailPost> = await instance.patch(`/posts/${postId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'update post fail';
  }
};

// post 공지 등록
export const noticePost = async (menuId: number, updateNoticePostId: number) => {
  try {
    const res: AxiosResponse<NoticeMenu | FailPost> = await instance.patch(
      `/menus/${menuId}/notice-post`,
      { updateNoticePostId: updateNoticePostId }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'notice post fail';
  }
};

// post 공지 해제
