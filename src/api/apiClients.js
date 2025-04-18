const Baseurl = "https://api.freeapi.app/api/v1/";
const createApiClient = () => {
    
  const request = async (endpoint, options = {}) => {
    console.log("options", options);

    const token = localStorage.getItem("accessToken");
    const defaultOptions = {
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    console.log("default", defaultOptions);
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
      throw console;
    }
  };
  return { request };
};
export const apiclient = createApiClient();
