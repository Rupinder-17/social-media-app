import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Register } from "./Register";
import { Login } from "./Login";
import { VeiwPosts } from "./VeiwPosts";
import { BookMarkPosts } from "./BookMarkPosts";

export const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/veiw-post" element={<VeiwPosts />} />
        <Route path="/book-mark" element={<BookMarkPosts/>} />
      </Routes>
    </div>
  );
};
