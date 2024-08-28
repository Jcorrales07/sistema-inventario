import axios from "./client/src/api/AxiosInstance.js"

const  getAllCategoriasRequest = async () =>{
    try {
        const response = await axios.get(`categoria/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getCategoriaByNombreRequest = async(id) =>{
    try {
        const response = await axios.get(`categoria/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putCategoriaRequest = async(id,values) =>{
    try {
        const response = await axios.put(`categoria/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteCategoriaRequest = async(id) => {
    try {
        const response = await axios.put(`categoria/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createCategoriaRequest = async(values) => {
    try {
        const response = await axios.post(`categoria/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllCategoriasRequest,
    getCategoriaByNombreRequest,
    putCategoriaRequest,
    deleteCategoriaRequest,
    createCategoriaRequest
}