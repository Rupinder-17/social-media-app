import { useState } from "react";
import { ProfileServices } from "../services/ProfileServices";

export const useFollow = () => {
  const [followState, setFollowState] = useState({
    loading: false,
    error: null,
    success: false,
    isFollowing: false,
  });

  const toggleFollow = async (userId) => {
    setFollowState({ ...followState, loading: true, error: null });
    try {
      const response = await ProfileServices.followerUser(userId);

      const isNowFollowing = response.data.isFollowing;
      console.log("isfollow", isNowFollowing);
      

      setFollowState({
        loading: false,
        error: null,
        success: true,
        isFollowing: isNowFollowing,
      });

      return {
        success: true,
        isFollowing: isNowFollowing,
        followersCount: response.data.followersCount,
      };
    } catch (error) {
      setFollowState({
        loading: false,
        error: error.message || "Failed to update follow status",
        success: false,
        isFollowing: followState.isFollowing,
      });

      return {
        success: false,
        error: error.message || "Failed to update follow status",
      };
    }
  };

  return {
    ...followState,
    toggleFollow,
  };
};
