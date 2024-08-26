import axios from "../api/AxiosInstance"

const  getAllRolsRequest = async () =>{
    try {
        const response = await axios.get(`rol/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getRolByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`rol/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putRolRequest = async(id,values) =>{
    try {
        const response = await axios.put(`rol/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteRolRequest = async(id) => {
    try {
        const response = await axios.put(`rol/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createRolRequest = async(values) => {
    try {
        const response = await axios.post(`rol/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllRolsRequest,
    getRolByIdRequest,
    putRolRequest,
    deleteRolRequest,
    createRolRequest
}