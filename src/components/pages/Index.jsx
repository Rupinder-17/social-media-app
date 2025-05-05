import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Register } from "./Register";
import { Login } from "./Login";
import { VeiwPosts } from "./VeiwPosts";
import { BookMarkPosts } from "./BookMarkPosts";
import { Profile } from "./Profile";

export const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/create-post"
          element={
            <Protected>
              <CreatePost />
            </Protected>
          }
        />
        <Route
          path="/veiw-post"
          element={
            <Protected>
              <VeiwPosts />
            </Protected>
          }
        />
        <Route
          path="/book-mark"
          element={
            <Protected>
              <BookMarkPosts />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
};
