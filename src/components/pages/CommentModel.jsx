import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

export const CommentModel = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { addcomments } = usePost();
  const [submittedComment, setSubmittedComment] = useState("");
  console.log("allcomm", comment);

  return (
    <div>
      <>
        <input
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <button
          onClick={() => {
            addcomments(Comment, postId);
            setSubmittedComment(comment);
          }}
        >
          send
        </button>
        <p>{submittedComment}</p>
      </>
    </div>
  );
};
