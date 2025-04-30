import React, { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const BookMarkPosts = () => {
  const { data: posts, loading, error, getBookMarkPosts } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    getBookMarkPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate("/create-post")}
          className="p-2 bg-white shadow rounded-full hover:bg-gray-100 transition"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Your Bookmarked Posts</h1>
      </div>

      {loading && <p className="text-blue-600">Loading bookmarks...</p>}
      {error && (
        <p className="text-red-500">There was an error loading bookmarks.</p>
      )}

      {!loading && posts?.length === 0 && (
        <p className="text-gray-600">No bookmarks found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={item.images[0].url}
              alt="Bookmark"
              className="w-full h-48 object-contain"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold truncate">
                {item.content || "Untitled Post"}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
