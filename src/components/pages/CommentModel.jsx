import React, { useState, useEffect } from "react";
import { usePost } from "../hooks/usePost";
import {
  MdOutlineDeleteOutline,
  MdEdit,
  MdCheck,
  MdClose,
} from "react-icons/md";
import { FiSend } from "react-icons/fi";

export const CommentModel = ({ postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const { addComments, allcommentsOfPost, deleteComment, updateComment } =
    usePost();
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const fetchComments = async (postId) => {
    try {
      const response = await allcommentsOfPost(postId);
      if (response && response.data && response.data.comments) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  const handleAddComment = async () => {
    try {
      await addComments(postId, commentInput);
      const response = await fetchComments(postId);
      if (response && response.data && response.data.comments) {
        setComments(response.data.comments);
      }
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      await fetchComments(postId);
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

      await updateComment(editComment, editCommentText);
      const response = await allcommentsOfPost(postId);
      if (response && response.data && response.data.comments) {
        setComments(response.data.comments);
      }

      // Reset edit state
      setEditComment(null);
      setEditCommentText("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-3 text-lg">Comments</h3>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          Y
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
            className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={!commentInput.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full ${
              commentInput.trim()
                ? "text-blue-500 hover:bg-blue-50"
                : "text-gray-300"
            }`}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {comments.length > 0 ? (
        <div className="mt-2">
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {comment.content.charAt(0).toUpperCase()}
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
                      </div>
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
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="py-6 text-center">
          <p className="text-gray-500 text-sm">No comments yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Be the first to share your thoughts
          </p>
        </div>
      )}
    </div>
  );
};
