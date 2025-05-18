// import { div } from 'framer-motion/client'
import React, { useState } from "react";
import { useComment } from "../hooks/useComment";
import { useAuth } from "../hooks/useAuth";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import {
  MdOutlineDeleteOutline,
  MdEdit,
  MdCheck,
  MdClose,
} from "react-icons/md";

export const CommentList = ({ comment, onDelete, onUpdate }) => {
  const {
    data: comments,
    allcommentsOfPost,
  } = useComment();

  const { user } = useAuth();
  const [editComment, setEditComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [Liked, setIsLiked] = useState(comments?.isLiked);
  const [likeCount, setLikeCount] = useState(comments?.likes);

  const handleDeleteComment = async (id) => {
    try {
      await onDelete(id);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditComment = (comment) => {
    setEditComment(comment._id);
    setEditCommentText(comment.content);
  };

  const handleCancelEdit = () => {
    setEditComment(null);
    setEditCommentText("");
  };

  const handleUpdateComment = async () => {
    try {
      if (!editComment || !editCommentText.trim()) return;

      await onUpdate(editComment, editCommentText);
        // await allcommentsOfPost(postId);

      setEditComment(null);
      setEditCommentText("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <li
        key={comment._id}
        className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {comment?.content?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          {editComment === comment._id ? (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Edit your comment..."
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1 text-xs"
                  title="Cancel"
                >
                  <MdClose size={16} /> Cancel
                </button>
                <button
                  onClick={handleUpdateComment}
                  disabled={!editCommentText.trim()}
                  className={`p-1.5 rounded-full flex items-center gap-1 text-xs ${
                    editCommentText.trim()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                  title="Save"
                >
                  <MdCheck size={16} /> Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-900 break-words">
                  {comment.content}
                </p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : "Just now"}
                </span>
                <button
                  onClick={() => {
                    !Liked
                      ? setLikeCount(likeCount + 1)
                      : setLikeCount(likeCount - 1);
                    setIsLiked(() => !Liked);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex gap-2"
                >
                  {Liked ? (
                    <IoIosHeart className="w-7 h-7 text-red-600" />
                  ) : (
                    <CiHeart className="w-7 h-7" />
                  )}
                  <span>{likeCount}</span>
                </button>
              </div>
              {comment.author.account._id === user._id && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-gray-200"
                    title="Edit comment"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-200"
                    title="Delete comment"
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </li>
    </div>
  );
};
