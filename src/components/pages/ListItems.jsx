import React, { useState } from "react";
import { usePost } from "../hooks/usePost";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { CommentModel } from "./CommentModel";
import { useNavigate } from "react-router-dom";

export const ListItems = ({ post }) => {
  const [model, setModel] = useState();
  const navigate = useNavigate();

  const { data, LikePosts, bookMarkPost, deletePost, PostGet } = usePost();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [bookMark, setBookMark] = useState(post.isBookmarked);
console.log("data", data);

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      await PostGet(id); 
    } catch (e) {
      console.log(e);
    } 
  };

  
  return (
    <div
      key={post._id}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Post header */}
      <div className="p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
          {post?.author?.account?.username?.charAt(0)?.toUpperCase()}
        </div>
        <div className="ml-3">
          <button
            onClick={() => {
              navigate(`/user-Profile/${post.author.account.username}`);
            }}
          >
            <p className="font-medium text-gray-900">
              {post?.author?.account?.username}
            </p>
          </button>
          <p className="text-gray-500 text-xs">{post.createdAt}</p>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => handleDeletePost(post._id)}
           
          >
            Del
          </button>
        </div>
      </div>

      {post.images && (
        <div className="relative  bg-white">
          <img
            src={post.images[0].url}
            alt="Post"
            className="h-60 object-contain"
          />
        </div>
      )}
      <div className="p-3 flex items-center space-x-4">
        <button
          onClick={() => {
            LikePosts(post._id);
            setIsLiked(() => !isLiked);
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isLiked ? (
            <IoIosHeart className="w-7 h-7 text-red-600" />
          ) : (
            <CiHeart className="w-7 h-7" />
          )}
          {/* <span>{likeCount}</span> */}
        </button>

        <button
          onClick={() => setModel(() => !model)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaRegComment className="w-6 h-6 text-gray-700" />
          <span>{post.comments}</span>
        </button>
        <button
          onClick={() => {
            bookMarkPost(post._id);
            setBookMark(() => !bookMark);
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {bookMark ? (
            <FaBookmark className="w-6 h-6 text-gray-700" />
          ) : (
            <FaRegBookmark className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
      {model && <CommentModel postId={post._id} />}
      <div className="p-4">
        <p className="text-gray-900">{post.content}</p>
      </div>
    </div>
  );
};
