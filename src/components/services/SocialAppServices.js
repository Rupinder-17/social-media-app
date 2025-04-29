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
      console.log("load", response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async likePost(postId) {
    try {
      const response = await apiclient.request(
        `social-media/like/post/${postId}`,
        {
          method: "POST",
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async bookmark(postId) {
    try {
      const response = await apiclient.request(
        `social-media/bookmarks/${postId}`,
        {
          method: "POST",
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
