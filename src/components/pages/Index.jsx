import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Register } from "./Register";
import { Login } from "./Login";
import { VeiwPosts } from "./VeiwPosts";

export const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/veiw-post" element={<VeiwPosts />} />
      </Routes>
    </div>
  );
};
