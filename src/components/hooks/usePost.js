import React, { useEffect, useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";
// import { data } from "react-router-dom";

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
          success: false,
          data: response?.data?.posts || null,
        });
        return response;
      } catch (e) {
        setPosts({ loading: false, error: null, success: false, data: null });

        console.log(e);
      }
    };
  return {
    ...posts,
    PostGet,
    LikePosts

  };
};
