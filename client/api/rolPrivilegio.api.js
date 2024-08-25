import axios from "./client/src/api/AxiosInstance.js"

const  getAllRolPrivilegiosRequest = async () =>{
    try {
        const response = await axios.get(`rolPrivilegio/`)
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const getRolPrivilegioByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`rolPrivilegio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const putRolPrivilegioRequest = async(id,values) =>{
    try {
        const response = await axios.put(`rolPrivilegio/${id}`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const deleteRolPrivilegioRequest = async(id) => {
    try {
        const response = await axios.put(`rolPrivilegio/${id}`);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

const createRolPrivilegioRequest = async(values) => {
    try {
        const response = await axios.post(`rolPrivilegio/`,values);
        if(!response){
            return null;
        }
        return response;
    } catch (error) {
        return null;
    }
}

export default {
    getAllRolPrivilegiosRequest,
    getRolPrivilegioByIdRequest,
    putRolPrivilegioRequest,
    deleteRolPrivilegioRequest,
    createRolPrivilegioRequest
}