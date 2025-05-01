import React, { useState, useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiSend } from "react-icons/fi";

export const CommentModel = ({ postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const { addComments, allcommentsOfPost, deleteComment, updateComment } = usePost();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await allcommentsOfPost(postId);
        if (response && response.data && response.data.comments) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      await addComments(postId, commentInput);
      const response = await allcommentsOfPost(postId);
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
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateComment = async(id)=>{
    try{
      await updateComment(id)
      await allcommentsOfPost(postId)

    }
    catch(e){
      console.log(e);
      
    }

  }

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
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-900 break-words">
                        {comment.content}
                      </p>
                      <span className="text-xs text-gray-500 mt-1">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleString()
                          : "Just now"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-200"
                      title="Delete comment"
                    >
                      <MdOutlineDeleteOutline size={16} />

                    </button>
                    <button onClick={()=>handleUpdateComment(comment._id)}>edit</button>
                  </div>
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
