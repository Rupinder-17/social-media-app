import React, { Children } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Register } from "./Register";
import { Login } from "./Login";
import { VeiwPosts } from "./VeiwPosts";
import { BookMarkPosts } from "./BookMarkPosts";
import { Profile } from "./Profile";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({children})=>{
  const {user}= useAuth()
  return user ? children : <Navigate to="/login"/>
}
const PublicRoute = ({children})=>{
  const {user}= useAuth()
  return !user ? children : <Navigate to="/create-post" />;
}

export const Index = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/veiw-post"
          element={
            <ProtectedRoute>
              <VeiwPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-mark"
          element={
            <ProtectedRoute>
              <BookMarkPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
