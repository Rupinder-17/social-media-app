import React, { useState } from 'react'
import { ProfileServices } from '../services/ProfileServices';

export const usePostGetUserName = () => {
    const [userNamePost, setUserNamePost] = useState({
      loading: false,
      error: null,
      success: false,
      data: null,
    });
    const getPostByUsername = async (username) => {
          setUserNamePost({ loading: true, error: null, success: false, data: null });
          try {
            const response = await ProfileServices.userPostsbyUserName(username);
            setUserNamePost({
            //   ...profileState,
              loading: true,
              error: null,
              success: false,
              post: response.data,
            });
            return response.data;
          } catch (e) {
            console.log(e);
            setUserNamePost({
              loading: false,
              error: e.message || "Failed to update cover image",
              success: false,
              data: null,
            });
          }
        };
        return {
            ...userNamePost,
            getPostByUsername
        }
      
}
