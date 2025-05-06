import React from "react";
import { apiclient } from "../../api/apiClients";

export const ProfileServices = {
  async getProfile() {
    try {
      const response = await apiclient.request("social-media/profile", {
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async Coverimage(formData) {
    try {
      const response = await apiclient.request(
        "social-media/profile/cover-image",
        {
          method: "PATCH",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async followerList(username) {
    try {
      const response = await apiclient.request(
        `social-media/follow/list/followers/${username}`,
        {
          method: "GET",
        }
      );
      
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserPorfile(username) {
    try {
      const response = await apiclient.request(
        `social-media/profile/u/${username}`,
        {
          method: "GET",
        }
      );
      // console.log("userProfile", response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
