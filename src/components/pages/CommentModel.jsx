import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

export const CommentModel = () => {
  const [comment, setComment] = useState();
  const { addcomments } = usePost();
  console.log("comm", comment);
  

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
        <button onClick={() => addcomments}>send</button>
        
      </>
    </div>
  );
};
