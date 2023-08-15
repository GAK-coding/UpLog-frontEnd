import { AxiosResponse } from 'axios';
import {
  CommentBody,
  CommentInfo,
  FailPost,
  NoticeMenu,
  Post,
  PostBody,
  LikeInfo,
  PostLikeList,
  Posts,
  UpdatePostBody,
  CommentLikeList,
} from '@/typings/post.ts';
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
export const unNoticePost = async (menuId: number) => {
  try {
    const res: AxiosResponse<NoticeMenu | FailPost> = await instance.delete(
      `/menus/${menuId}/reset-notice`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'unNotice post fail';
  }
};

// post 좋아요 & 좋아요 취소
export const postLike = async (postId: number) => {
  try {
    const res: AxiosResponse<LikeInfo | FailPost> = await instance.post(`/posts/${postId}/likes`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'post like fail';
  }
};

// post 좋아요 개수
export const postLikeCount = async (postId: number) => {
  try {
    const res: AxiosResponse<number> = await instance.get(`/posts/${postId}/likes`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'post like count fail';
  }
};

// post each member 좋아요 리스트
export const postLikeList = async () => {
  try {
    const res: AxiosResponse<PostLikeList[]> = await instance.get(`/posts/likes`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'post like list fail';
  }
};

// comment 생성
export const createComment = async (postId: number, data: CommentBody) => {
  try {
    const res: AxiosResponse<Comment | FailPost> = await instance.post(`/comments/${postId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'create comment fail';
  }
};

// post comment 조회
export const postCommentList = async (postId: number) => {
  try {
    const res: AxiosResponse<CommentInfo[]> = await instance.get(`/comments/${postId}/post`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'post comment list fail';
  }
};

// comment 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const res: AxiosResponse<string | FailPost> = await instance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'delete comment fail';
  }
};

// comment 수정
export const updateComment = async (commentId: number, content: string) => {
  try {
    const res: AxiosResponse<CommentInfo | FailPost> = await instance.patch(
      `/comments/${commentId}/content`,
      {
        content: content,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'update comment fail';
  }
};

// comment like & like 취소
export const commentLike = async (commentId: number) => {
  try {
    const res: AxiosResponse<LikeInfo | FailPost> = await instance.post(
      `/comments/${commentId}/likes`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'comment like fail';
  }
};

// comment like 개수
export const commentLikeCount = async (commentId: number) => {
  try {
    const res: AxiosResponse<number> = await instance.get(`/comments/${commentId}/likes`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'comment like count fail';
  }
};

// comment each member like 리스트
export const commentLikeList = async () => {
  try {
    const res: AxiosResponse<CommentLikeList[]> = await instance.get(`/comments/likes`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'comment like list fail';
  }
};
