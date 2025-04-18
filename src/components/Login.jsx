import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(credentials);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login Form</h1>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};
