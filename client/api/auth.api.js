import axiosInstance from '../api/AxiosInstance';

const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth', { email, password });
        return response.data; 
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al realizar el login');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la solicitud');
        }
    }
};

export {
    login
}
