import api from "./api";

export const getCurrentUser =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/users/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};