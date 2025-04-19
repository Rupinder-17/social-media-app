import { useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";

export const useCreatePost = () => {
  const [post, setPost] = useState({
    content: "",
    image: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async () => {
    setStatus({ loading: true, error: null, success: false });
    try {
      const response = await SocialAppServices.postData(post);
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
    post,
    setPost,
    status,
    handleInputChange,
    createPost,
  };
};
