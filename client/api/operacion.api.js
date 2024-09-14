import axiosInstance from "./AxiosInstance.js";

const getAllOperacionsRequest = async () => {
  try {
    const response = await axiosInstance.get(`operacion/`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const getInventarioOperacionRequest = async () => {
  try {
    const response = await axiosInstance.get(`operacion/inventario`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const getInventarioOperacionByAlmacenRequest = async (id) => {
  try {
    const response = await axiosInstance.get(`operacion/inventario/${id}`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const getHistorialByProductoRequest = async (id) => {
  try {
    const response = await axiosInstance.get(`operacion/producto/${id}`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const getOperacionByIdRequest = async (id) => {
  try {
    const response = await axiosInstance.get(`operacion/${id}`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const putOperacionRequest = async (id, values) => {
  try {
    const response = await axiosInstance.put(`operacion/${id}`, values);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const deleteOperacionRequest = async (id) => {
  try {
    const response = await axiosInstance.put(`operacion/${id}`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const createOperacionRequest = async (values) => {
  try {
    const response = await axiosInstance.post(`operacion/`, values);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const getSiguienteOperacionRequest = async () => {
  try {
    const response = await axiosInstance.get(`operacion/sigOperacion`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

const handleValidarOperacionEntregaRequest = async (id) => {
  try {
    const response = await axiosInstance.put(`operacion/validarEntrega/${id}`);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    return null;
  }
};

export default {
  handleValidarOperacionEntregaRequest,
  getAllOperacionsRequest,
  getSiguienteOperacionRequest,
  getOperacionByIdRequest,
  putOperacionRequest,
  deleteOperacionRequest,
  createOperacionRequest,
  getInventarioOperacionRequest,
  getHistorialByProductoRequest,
  getInventarioOperacionByAlmacenRequest,
};
