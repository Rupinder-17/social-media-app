import React, { useEffect } from "react";
import { usePost } from "../hooks/usePost";

export const VeiwPosts = () => {
  const { posts, PostGet } = usePost();
  console.log("postfetch", posts);

  useEffect(() => {
    PostGet();
  }, []);
  return (
    <div>
      <h1>your posts</h1>
      {posts?.data?.posts.length > 0 ? (
        posts?.data?.posts.map((post, index) => (
          <div>
            <p key={index}>{post.content}</p>
            <img src={post.image} alt="" />
          </div>
        ))
      ) : (
        <p>no posts found</p>
      )}
    </div>
  );
};
