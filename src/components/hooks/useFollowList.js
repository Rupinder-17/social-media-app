import React from "react";
import { useState } from "react";
import { ProfileServices } from "../services/ProfileServices";

export const useFollowList = () => {
  const [followList, setFollowList] = useState({
    loading: false,
    error: null,
    success: true,
    followData: null, // For followers
    followingData: null, // For following
  });
  const userFollowerList = async (username) => {
    setFollowList((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await ProfileServices.getFollowerList(username);
      setFollowList({
        loading: false,
        error: null,
        success: false,
        followData: response?.data?.followers,
      });
      console.log(response?.data?.followers);

      return response.data;
    } catch (e) {
      setFollowList((prev) => ({
        ...prev,
        loading: false,
        error: e.message,
        success: false,
      }));
      console.log(e);
    }
  };
  const userFollowingList = async (username) => {
    setFollowList((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await ProfileServices.getFollowingList(username);
      setFollowList({
        loading: false,
        error: null,
        success: true, // Assuming success if no error
        followData: followList.followData, // Preserve existing follower data
        followingData: response?.data?.following,
      });
      console.log("Following List:", response?.data?.following);
      return response.data;
    } catch (e) {
      setFollowList((prev) => ({
        ...prev,
        loading: false,
        error: e.message,
        success: false,
        followingData: null, // Reset on error
      }));
      console.log(e);
    }
  };

  return {
    ...followList,
    userFollowerList,
    userFollowingList,
  };
};
