import React from 'react'
import { useState } from 'react';
import { ProfileServices } from '../services/ProfileServices';

export const useFollowList = () => {
    const [ followList, setFollowList] = useState({
        loading:  false,error: null, success: true, followData: null
    })
    const followersList = async (username) => {
      setFollowList({ ...followList,loading: true, error: null });
      try {
        const response = await ProfileServices.getFollowerList(username)
        setFollowList({
          loading: false,
          error: null,
          success: false,
        //   isFollowing: followState.isFollowing,
        data: response.data
        });
        console.log(response.data)

        return response;
      } catch (e) {
        console.log(e);
      }
    };
    return{
        ...followList,
        followersList
    }
}
