import React, { useEffect } from "react";
import { usePost } from "../hooks/usePost";

export const BookMarkPosts = () => {
  const { data: posts, loading, error, getBookMarkPosts } = usePost();
  useEffect(() => {
    getBookMarkPosts();
  }, []);
  return (
    <div>
      <h1>bookmarks</h1>
      {loading ? <p>loading</p> : <p></p>}
      {error ? <p>there is error</p> : <p>no error</p>}
      {posts?.map((items) => (
        <ul key={items._id}>
          <li>{items.images.url}</li>
        </ul>
      ))}
    </div>
  );
};
