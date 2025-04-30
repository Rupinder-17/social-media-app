import React from "react";
import { apiclient } from "../../api/apiClients";

export const SocialAppServices = {
  async postData(formdata) {
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
  async getBookmarkedPosts() {
    try {
      const response = await apiclient.request("social-media/bookmarks", {
        method: "GET",
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async addComment(postId, comment) {
    try {
      const response = await apiclient.request(
        `social-media/comments/post/${postId}`,
        {
          method: "POST",
          body: JSON.stringify({ content: comment }),
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async allcommentsOfPost(postId) {
    try {
      const response = await apiclient.request(
        `social-media/comments/post/${postId}`,
        {
          method: "GET",
        }
      );
      console.log("allcommments", response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
