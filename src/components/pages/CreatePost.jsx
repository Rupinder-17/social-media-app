import React, { useState, useEffect } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
// Icons for Instagram-like UI
import { FiImage, FiX, FiArrowLeft } from "react-icons/fi";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    content: "",
    image: "",
    tags: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submittedPosts, setSubmittedPosts] = useState([]);

  const { createPost, status } = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append("content", data.content);

    // Attach file if selected
    if (data.image instanceof File) {
      formData.append("images", data.image); // key must be "images"
    }

    // Properly append tags if they exist
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }

    try {
      await createPost(formData);

      if (status.success) {
        // Save the current post to the submittedPosts array
        const newPost = {
          id: Date.now(), // Generate a unique ID
          content: data.content,
          image: imagePreview,
          createdAt: new Date().toLocaleString(),
        };

        setSubmittedPosts((prev) => [newPost, ...prev]);

        // Reset form state
        setData({ content: "", image: "", tags: [] });
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      setData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Create image preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Clean up image preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Instagram-like header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-800 flex items-center gap-1"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">Create New Post</h1>
        <div className="w-6"></div> {/* Empty div for balanced spacing */}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 max-w-xl mx-auto w-full">

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

        {/* Instagram-like card for creating post */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          {/* Image upload area with preview */}
          <div className="relative">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full aspect-square object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setData(prev => ({ ...prev, image: "" }));
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                >
                  <FiX size={18} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer h-64 hover:bg-gray-100 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiImage className="w-12 h-12 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Content input area */}
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <textarea
                value={data.content}
                name="content"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none h-24"
                placeholder="Write a caption..."
              />
            </div>

            <div className="px-4 pb-4">
              <button
                type="submit"
                disabled={status.loading || (!data.content && !data.image)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? "Posting..." : "Share"}
              </button>
            </div>
          </form>
        </div>

        {status.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Post shared successfully!
          </div>
        )}

        {status.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {status.error}
          </div>
        )}

        {/* Display submitted posts in Instagram-like feed */}
        {submittedPosts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Your Feed
            </h2>
            <div className="space-y-6">
              {submittedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Post header */}
                  <div className="p-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {post.content.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">You</p>
                      <p className="text-gray-500 text-xs">{post.createdAt}</p>
                    </div>
                  </div>
                  
                  {/* Post image */}
                  {post.image && (
                    <div className="relative pb-[100%] bg-black">
                      <img
                        src={post.image}
                        alt="Post"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Post content */}
                  <div className="p-4">
                    <p className="text-gray-900">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
      // </div>
    // </div>
  );
};
