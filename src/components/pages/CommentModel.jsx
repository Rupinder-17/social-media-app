import React, { useState } from "react";

export const CommentModel = () => {
  const [model, setModel] = useState();
  const [comment, setComment] = useState();

  return (
    
    <div>
      <input
        type="text"
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
      />
    </div>
  );
};
