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
  async Coverimage() {
    try {
      const response = await apiclient.request(
        "social-media/profile/cover-image",
        {
          method: "PATCH",
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
