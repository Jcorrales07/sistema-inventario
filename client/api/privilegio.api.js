import axios from "./client/src/api/AxiosInstance.js"

const  getAllPrivilegiosRequest = async () =>{
    try {
        const response = await axios.get(`privilegio/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getPrivilegioByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`privilegio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putPrivilegioRequest = async(id,values) =>{
    try {
        const response = await axios.put(`privilegio/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deletePrivilegioRequest = async(id) => {
    try {
        const response = await axios.put(`privilegio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createPrivilegioRequest = async(values) => {
    try {
        const response = await axios.post(`privilegio/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllPrivilegiosRequest,
    getPrivilegioByIdRequest,
    putPrivilegioRequest,
    deletePrivilegioRequest,
    createPrivilegioRequest
}