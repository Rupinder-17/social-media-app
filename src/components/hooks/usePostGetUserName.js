import React, { useState } from 'react'
import { ProfileServices } from '../services/ProfileServices';
import { SocialAppServices } from '../services/SocialAppServices';

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
            console.log("postby name", response.data.posts.images);
            
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
        const deletePost = async (postId) => {
            console.log("del",postId);
            
            setUserNamePost({ ...userNamePost, loading: true, error: null, success: false });
            try {
              const response = await SocialAppServices.deletePost(postId);
              setUserNamePost((prev) => {
                return {
                  ...prev,
                  loading: false,
                  success: true,
                  userpost: prev?.userpost?.filter((post) => post?._id !== postId),
                };
              });
        
              return response.data;
            } catch (e) {
              console.log(e);
            }
          };
        return {
            ...userNamePost,
            getPostByUsername,
            deletePost
        }
      
}
