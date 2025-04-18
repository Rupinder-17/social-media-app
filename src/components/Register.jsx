import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  
  const allvalues = {
    email: "",
    password: "",
    role: "USER",
    username: "",
  };
  const [inputValues, setInputValues] = useState(allvalues);
  const { register, loading, error } = useAuth();
  console.log("inputs", inputValues);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(inputValues);
      navigate("/login");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    console.log("values", inputValues);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>

        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={inputValues.username}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={inputValues.email}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={inputValues.password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <button onClick={()=> navigate("/login")}>Allready regiter</button>
        {error && (
          <div className="mt-4 text-center text-red-500 text-sm border border-red-500 rounded-md p-2 bg-red-100">
            {error.message || "An error occurred during registration"}
          </div>
        )}
      </div>
    </div>
  );
};
