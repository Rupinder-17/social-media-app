import React from "react";
import { apiclient } from "../../api/apiClients";

export const SocialAppServices = {
  async postData(formdata) {
    console.log("form", formdata);

    try {
      const response = await apiclient.request("social-media/posts", {
        method: "POST",
        body: formdata,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async loadpost() {
    try {
      const response = await apiclient.request("social-media/posts", {
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
