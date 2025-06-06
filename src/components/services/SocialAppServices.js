import React from "react";
import { apiclient } from "../../api/apiClients";

export const SocialAppServices = {
  // async userPosts(username){
  //   try{
  //     const response = await apiclient.request()
  //   }
  // }
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
  async likeComments(commentId){
    try{
      const response = apiclient.request(`social-media/like/comment/${commentId}`,{
        method:"POST",
      })
      return response
    }
    catch(e){
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

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteComment(commentId) {
    try {
      const response = await apiclient.request(
        `social-media/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async updateComment(commentId, updatetext) {
    try {
      const response = await apiclient.request(
        `social-media/comments/${commentId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ content: updatetext }),
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async deletePost(postId) {
    try {
      const response = await apiclient.request(`social-media/posts/${postId}`, {
        method: "DELETE",
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
