import React from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();
  const { post, setPost, handleInputChange, createPost, status } =
    useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost();
      // Reset form after successful submission
      if (status.success) {
        setPost({ content: "", image: "" });
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Post
        </h1>

        {status.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Post created successfully!
          </div>
        )}

        {status.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {status.error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="content"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Image URL (optional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={post.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading || !post.content}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {status.loading ? "Posting..." : "Create Post"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
