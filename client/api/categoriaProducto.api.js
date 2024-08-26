import axios from "./client/src/api/AxiosInstance.js"

const  getAllCategoriaProductosRequest = async () =>{
    try {
        const response = await axios.get(`producto_categoria/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getCategoriaProductoByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`producto_categoria/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putCategoriaProductoRequest = async(id,values) =>{
    try {
        const response = await axios.put(`producto_categoria/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteCategoriaProductoRequest = async(id) => {
    try {
        const response = await axios.put(`producto_categoria/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createCategoriaProductoRequest = async(values) => {
    try {
        const response = await axios.post(`producto_categoria/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllCategoriaProductosRequest,
    getCategoriaProductoByIdRequest,
    putCategoriaProductoRequest,
    deleteCategoriaProductoRequest,
    createCategoriaProductoRequest
}