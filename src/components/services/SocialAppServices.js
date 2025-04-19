import React from "react";
import { apiclient } from "../../api/apiClients";

export const SocialAppServices = {
  async postData() {
    try {
      const response = await apiclient.request("social-media/posts", {
        method: "POST",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
