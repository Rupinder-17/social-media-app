import { apiclient } from "../../api/apiClients";

export const authServices = {
  async login(credentials) {
    try {
      const response = await apiclient.request("users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      console.log(response);

      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async register(userdata) {
    try {
      const response = await apiclient.request("users/register", {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "x-api-key": "hello",
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};
