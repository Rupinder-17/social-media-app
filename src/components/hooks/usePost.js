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
      console.log("myposts", response?.data?.posts);

      return response?.data?.posts;
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
    } catch (e) {
      console.log(e);
    }
  };
  const getUserPosts = async (username) => {
    setPosts({ loading: true, error: null, success: false, data: null });

    try {
      const response = await SocialAppServices.userPosts(username);
      setPosts({
        loading: false,
        error: null,
        success: true,
        data: response.data.posts || [],
      });
      console.log("userpost", response.data.posts);
    } catch (e) {
      console.log(e);
    }
  };
  const deletePost = async (postId) => {
    setPosts({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.deletePost(postId);
      setPosts((prev) => ({
        ...prev,
        loading: false,
        success: true,
        data: prev?.data?.filter((post) => post?._id !== postId),
      }));

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
    getUserPosts,
    deletePost,
  };
};
