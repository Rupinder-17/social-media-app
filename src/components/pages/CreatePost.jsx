import React, { useState, useEffect } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    content: "",
    image: "",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  console.log(data);

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
        setData({ content: "", image: "", tags: [] }); // Reset state
        setImagePreview(null); // Clear image preview
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
            <input
              type="text"
              value={data.content}
              name="content"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's on your mind?"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Upload Image (optional)
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-48 object-contain rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status.loading}
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
