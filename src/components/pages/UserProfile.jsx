import React, { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useParams } from "react-router-dom";

export const UserProfile = () => {
  const { data, getUserProfile } = useProfile();
  console.log("data", data);
  
  const { username } = useParams();
  console.log("username", username);
  useEffect(() => {
    getUserProfile(username);
  }, []);

  return (
    <div>
      <div>
        <h1 className="bg-red-800">{data?.account?.username}</h1>
        <div>
          <button>follow</button>
          <button>follower</button>
        </div>
      </div>
    </div>
  );
};
