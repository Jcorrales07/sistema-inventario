import axiosInstance from "./AxiosInstance";

const handleChangeProductsRequest = async (id, productos) => {
  try {
    const response = await axiosInstance.post(
      "/operacionProducto/changeProducts/" + id,
      productos
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { handleChangeProductsRequest };
