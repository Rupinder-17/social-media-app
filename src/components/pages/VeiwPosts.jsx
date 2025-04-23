import React from "react";
import { usePost } from "../hooks/usePost";
 import {FiArrowLeft } from "react-icons/fi";
import {useNavigate } from "react-router-dom";


export const VeiwPosts = () => {
  const { posts} = usePost();
  console.log("postfetch", posts);
  const navigate = useNavigate()

  // useEffect(() => {
  //   PostGet();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate("/create-post")}>
        <FiArrowLeft size={20} />
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Posts
      </h1>

      {posts.loading ? (
        <p className="text-center text-gray-600">Loading posts...</p>
      ) : posts.error ? (
        <p className="text-center text-red-500">{posts.error}</p>
      ) : posts?.data?.posts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.data.posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {post.content?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">You</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Image */}
              {post.images && (
                <img
                  src={post.images[0].url}
                  alt="Post"
                  className="w-full h-60 object-contain"
                />
              )}

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
};
