import React, { useState, useEffect } from "react";

import { FiSend } from "react-icons/fi";
import { useComment } from "../hooks/useComment";
import { CommentList } from "./CommentList";

export const CommentModel = ({ postId, setCommentCount }) => {
  const [commentInput, setCommentInput] = useState("");
  const {
    data: comments,
    addComments,
    allcommentsOfPost,
    deleteComment,
    updateComment,
  } = useComment();
  
  console.log("postComments", comments);

  useEffect(() => {
    allcommentsOfPost(postId);
  }, [postId]);

  const handleAddComment = async () => {
    try {
      await addComments(postId, commentInput);
      setCommentCount((prev) => prev + 1);
      await allcommentsOfPost(postId);

      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setCommentCount((prev) => prev - 1);
      await allcommentsOfPost(postId);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleUpdateComment = async (editComment, editCommentText) => {
    try {
      if (!editComment || !editCommentText.trim()) return;

      await updateComment(editComment, editCommentText);
      await allcommentsOfPost(postId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-3 text-lg">Comments</h3>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm"></div>
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

      {comments?.length > 0 ? (
        <div className="mt-2">
          <ul className="space-y-3">
            {comments?.map((comment) => (
              <CommentList
                comment={comment}
                setCommentCount={setCommentCount}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
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
