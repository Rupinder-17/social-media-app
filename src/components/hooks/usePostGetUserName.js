import React, { useState } from 'react'
import { ProfileServices } from '../services/ProfileServices';

export const usePostGetUserName = () => {
    const [userNamePost, setUserNamePost] = useState({
      loading: false,
      error: null,
      success: false,
      userpost: null,
    });
    const getPostByUsername = async (username) => {
        console.log("myuser", username);
        
          setUserNamePost({ loading: true, error: null, success: false, });
          try {
            const response = await ProfileServices.userPostsbyUserName(username);
            setUserNamePost({
            
              loading: true,
              error: null,
              success: false,
              userpost: response.data.posts,
            });
            return response.data.posts;
          } catch (e) {
            console.log(e);
            setUserNamePost({
              loading: false,
              error: e.message || "Failed to update cover image",
              success: false,
              userpost: null,
            });
          }
        };
        return {
            ...userNamePost,
            getPostByUsername
        }
      
}
