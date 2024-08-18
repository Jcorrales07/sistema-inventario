import axiosInstance from "../api/AxiosInstance";

const login = async (nickname, contrasena) => {
  try {
    const response = await axiosInstance.post("/auth/login/", {
      nickname,
      contrasena,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { login };
