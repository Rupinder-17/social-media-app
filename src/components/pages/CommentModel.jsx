import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

export const CommentModel = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { data:content, addComments, allcommentsOfPost } = usePost();
  const [submittedComment, setSubmittedComment] = useState("");
  console.log("allcomm", submittedComment);

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
            allcommentsOfPost(postId)
            setSubmittedComment(comment);
            setComment("")
          }}
        >
          send
        </button>
        <div>
          {content?.map((elm)=>(
            <ul key={elm._id}>
              <li>
                {elm.content}

              </li>
            </ul>
          ))}
        </div>
        <p>{submittedComment}</p>
      </>
    </div>
  );
};
