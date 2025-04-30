import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

export const CommentModel = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { addComments } = usePost();
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
            addComments(postId, comment);
            setSubmittedComment(comment);
            setComment("")
          }}
        >
          send
        </button>
        <p>{submittedComment}</p>
      </>
    </div>
  );
};
