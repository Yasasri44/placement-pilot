import api from "./api";

export const getMyApplications =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/applications/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

export const createApplication =
  async (applicationData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/applications",
        applicationData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};