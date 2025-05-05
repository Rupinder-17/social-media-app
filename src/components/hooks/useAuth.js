import React, { useState } from "react";
import { authServices } from "../services/AuthServices";

export const useAuth = () => {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
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
  return { ...state, register, login };
};
