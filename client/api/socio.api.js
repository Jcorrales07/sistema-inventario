import axiosInstance from "./AxiosInstance.js"

const  getAllSociosRequest = async () =>{
    try {
        const response = await axiosInstance.get(`socio/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}


const getSocioByIdRequest = async(id) =>{
    try {
        const response = await axiosInstance.get(`socio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putSocioRequest = async(id,values) =>{
    try {
        const response = await axiosInstance.put(`socio/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteSocioRequest = async(id) => {
    try {
        const response = await axiosInstance.put(`socio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createSocioRequest = async(values) => {
    try {
        const response = await axiosInstance.post(`socio/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllSociosRequest,
    getSocioByIdRequest,
    putSocioRequest,
    deleteSocioRequest,
    createSocioRequest
}