import { useState } from "react";
import { SocialAppServices } from "../services/SocialAppServices";
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
        data: response.data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
      setProfileState({
        loading: false,
        error: e.message || "Failed to update cover image",
        success: false,
        data: profileState.data,
      });
    }
  };
  return {
    ...profileState,
    getProfile,
    coverImage,
  };
};
