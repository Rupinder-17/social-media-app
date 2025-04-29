import React from "react";
import { usePost } from "../hooks/usePost";
 import {FiArrowLeft } from "react-icons/fi";
import {useNavigate } from "react-router-dom";
import { ListItems } from "./ListItems";


export const VeiwPosts = () => {
  const {  loading, error,data:posts} = usePost();
  console.log("postfetch", posts);
  const navigate = useNavigate()

 

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate("/create-post")}>
        <FiArrowLeft size={20} />
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Posts
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
           <ListItems post={post} key={post._id}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
};
