import { useState } from "react";
import { ProfileServices } from "../services/ProfileServices";

export const useProfile = () => {
  const [profileState, setProfileState] = useState({
    loading: false,
    error: null,
    success: false,
    data: null,
  });

  const getProfile = async () => {
    setProfileState({ loading: true, error: null, success: false, data: null });
    try {
      const response = await ProfileServices.getProfile();
      setProfileState({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      setProfileState({
        loading: false,
        error: error.message || "Failed to fetch profile",
        success: false,
        data: null,
      });
      console.error("Error fetching profile:", error);
    }
  };
  const coverImage = async (formData) => {
    setProfileState({ loading: true, error: null, success: false, data: null });
    try {
      const response = await ProfileServices.Coverimage(formData);
      setProfileState({
        loading: false,
        error: null,
        success: true,
        data: response.data.coverImage.url,
      });
      console.log("cover res", response.data.coverImage.url);
      return response.data.Coverimage.url;
    } catch (e) {
      console.log(e);
      setProfileState({
        loading: false,
        error: e.message || "Failed to update cover image",
        success: false,
        data: null,
      });
    }
  };
  const followerUser = async (userId) => {
    try {
      const response = await ProfileServices.followerUser(userId);

      console.log("follower", response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getUserProfile = async (username) => {
    setProfileState({
      loading: true,
      error: null,
      success: false,
      data: null,
    });
    try {
      const response = await ProfileServices.getUserPorfile(username);
      setProfileState({
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
    ...profileState,
    getProfile,
    coverImage,
    followerUser,
    getUserProfile,
  };
};
