import React, { useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";

export const useCreatePost = () => {
  const [post, setPost] = useState({
    img: "",
    loading: "",
    error: null,
  });
  const CreatePost = async () => {
    
    try {
      const response = await SocialAppServices.postData();
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  };
};
