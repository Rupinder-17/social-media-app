import { useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";

export const useCreatePost = () => {
  
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

 
  const createPost = async (data) => {
    console.log("postData", data);
    
    setStatus({ loading: true, error: null, success: false });
    try {
      const response = await SocialAppServices.postData(data);
      console.log("Post created:", response);
      setStatus({ loading: false, error: null, success: true });
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      setStatus({
        loading: false,
        error: error.message || "Failed to create post",
        success: false,
      });
      throw error;
    }
  };
  

  return {
    status,
    createPost,
  };
};
