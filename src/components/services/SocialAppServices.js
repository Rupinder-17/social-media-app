import React from "react";
import { apiclient } from "../../api/apiClients";

export const SocialAppServices = {
  async postData(postData) {
    try {
      const response = await apiclient.request("social-media/posts", {
        method: "POST",
        body: JSON.stringify(postData),
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
