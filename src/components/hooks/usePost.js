import React, { useEffect, useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";

export const usePost = () => {
  const [posts, setPosts] = useState({
    loading: false,
    error: null,
    success: false,
  });
  useEffect(() => {
    PostGet();
  }, []);

  const PostGet = async () => {
    setPosts({ loading: true, error: null, success: false });
    try {
      const response = await SocialAppServices.loadpost();
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response?.data?.posts || null,
      });
      return response;
    } catch (e) {
      setPosts({ loading: false, error: null, success: false, data: null });
      console.log(e);
    }
  };
  const LikePosts = async (postId) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.likePost(postId);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response?.data?.posts || null,
      });
      return response;
    } catch (e) {
      setPosts({ loading: false, error: null, success: false, data: null });

      console.log(e);
    }
  };

  const bookMarkPost = async (postId) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.bookmark(postId);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response?.data.posts || [],
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getBookMarkPosts = async () => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.getBookmarkedPosts();
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response.data.bookmarkedPosts || [],
      });
      console.log("book", response);
    } catch (e) {
      console.log(e);
    }
  };
  const addComments = async (postId, comment) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.addComment(postId, comment);
      setPosts({ loading: false, error: null, success: true, data: response });
      console.log("comment", response);
    } catch (e) {
      console.log(e);
    }
  };
  const allcommentsOfPost = async (postId) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.allcommentsOfPost(postId);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteComment = async (commentId) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.deleteComment(commentId);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const updateComment = (commentId, updatetext) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = SocialAppServices.updateComment(commentId,updatetext);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  return {
    ...posts,
    PostGet,
    LikePosts,
    bookMarkPost,
    getBookMarkPosts,
    addComments,
    allcommentsOfPost,
    deleteComment,
    updateComment,
  };
};
