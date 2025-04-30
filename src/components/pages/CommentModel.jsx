import React, { useState, useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const CommentModel = ({ postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const { addComments, allcommentsOfPost, deleteComment } = usePost();
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

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {comments.length > 0 ? (
        <div className="mt-3">
          <h3 className="font-medium mb-2">Comments</h3>
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="p-2 bg-white rounded border border-gray-200"
              >
                {comment.content}
                <button>
                  <MdOutlineDeleteOutline onClick={()=> deleteComment(comment._id)} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-2">No comments yet</p>
      )}
    </div>
  );
};
