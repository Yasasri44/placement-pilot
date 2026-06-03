import api from "./api";

export const getMyResumes =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/resumes/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};