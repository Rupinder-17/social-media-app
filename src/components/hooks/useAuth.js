import React, { useState } from "react";
import { authServices } from "../services/AuthServices";

export const useAuth = () => {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("social_app_user")),
    loading: false,
    error: null,
  });

  const register = async (userdata) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await authServices.register(userdata);
      setState({ user: null, loading: false, error: null });
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setState({ user: null, loading: false, error });
      throw error;
    }
  };

  const login = async (credentials) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await authServices.login(credentials);
      setState({ user: null, loading: false, error: null });
      return response;
    } catch (error) {
      setState({ user: null, loading: false, error });
      throw error;
    }
  };
  const logout = ()=>{
    setState(null)
    localStorage.removeItem("social_app_user");
    localStorage.removeItem("social_app_accessToken");
  }
  return { ...state, register, login, logout };
};
