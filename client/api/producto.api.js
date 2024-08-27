import axios from "../api/AxiosInstance"

const  getAllProductosRequest = async () =>{
    try {
        const response = await axios.get(`producto/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getProductoByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`producto/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putProductoRequest = async(id,values) =>{
    try {
        const response = await axios.put(`producto/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteProductoRequest = async(id) => {
    try {
        const response = await axios.put(`producto/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createProductoRequest = async(values) => {
    try {
        const response = await axios.post(`/producto/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllProductosRequest,
    getProductoByIdRequest,
    putProductoRequest,
    deleteProductoRequest,
    createProductoRequest
}