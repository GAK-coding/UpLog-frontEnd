import { AxiosResponse } from 'axios';
import { FailPost, PostBody, PostData, Posts } from '@/typings/postData.ts';
import { instance } from '@/api';

// post 생성
export const createPost = async (data: PostBody) => {
  try {
    const res: AxiosResponse<PostData | FailPost> = await instance.post('/posts', data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'create post fail';
  }
};

// post 단일조회
export const eachPost = async (postId: number) => {
  try {
    const res: AxiosResponse<PostData> = await instance.get(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get each post fail';
  }
};

// post menu별 조회
export const menuPostList = async (menuId: number) => {
  try {
    const res: AxiosResponse<Posts> = await instance.get(`/posts/menus/${menuId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get menu posts fail';
  }
};
// post 삭제
export const deletePost = async (postId: number) => {
  try {
    const res: AxiosResponse<string> = await instance.delete(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'delete post fail';
  }
};
