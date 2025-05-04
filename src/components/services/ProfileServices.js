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
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
