const Baseurl = "https://api.freeapi.app/api/v1/";
const createApiClient = () => {
  const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem("social_app_accessToken");
    const defaultOptions = {
      headers: {
        ...options.headers,
        // Only set Content-Type to application/json if we're not sending FormData
        ...(!(options.body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    try {
      const response = await fetch(`${Baseurl}${endpoint}`, {
        ...options,
        ...defaultOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  return { request };
};
export const apiclient = createApiClient();
