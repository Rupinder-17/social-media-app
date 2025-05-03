import React, { useState } from 'react'
import { SocialAppServices } from '../services/SocialAppServices';

export const useComment = () => {
    const [commentState, setCommentState] = useState({
      loading: false,
      error: null,
      success: false,
    });
  const addComments = async (postId, comment) => {
    setCommentState({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.addComment(postId, comment);
      setCommentState({ loading: false, error: null, success: true, data: response });
      console.log("comment", response);
    } catch (e) {
      console.log(e);
    }
  };
  const allcommentsOfPost = async (postId) => {
    setCommentState({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.allcommentsOfPost(postId);
      setCommentState({
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
    setCommentState({ loading: true, error: null, success: false, data: null });
    try {
      const response = await SocialAppServices.deleteComment(commentId);
      setCommentState({
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
    setCommentState({ loading: true, error: null, success: false, data: null });
    try {
      const response = SocialAppServices.updateComment(commentId, updatetext);
      setCommentState({
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
    ...commentState,
    addComments,
    allcommentsOfPost,
    deleteComment,
    updateComment,
  };
}
