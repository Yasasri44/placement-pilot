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
export const deleteApplication =
  async (id) => {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/applications/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};
export const updateApplicationStatus =
  async (id, status) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/applications/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};