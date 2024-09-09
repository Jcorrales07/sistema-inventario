import axios from "../api/AxiosInstance"

const  getAllAlmacenesRequest = async () =>{
    try {
        const response = await axios.get(`almacen/`)
        return response;
    } catch (error) {
        return res.json({message: 'Error al buscar alamcenes', error: error.message});
    }
}

const getAlmacenByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`almacen/${id}`);
        return response;
    } catch (error) {
        return res.json({message: 'Error al buscar alamcen por id', error: error.message});
    }
}

const putAlmacenRequest = async(id,values) =>{
    try {
        const response = await axios.put(`almacen/${id}`,values);
        return response;
    } catch (error) {
        res.json({message: 'Error al editar alamcen', error: error.message});
    }
}

const deleteAlmacenRequest = async(id,res) => {
    try {
        const response = await axios.put(`almacen/${id}`);
        return response;
    } catch (error) {
        return res.json({message: 'Error al elminar alamcen', error: error.message})
    }
}

const createAlmacenRequest = async(values) => {
    try {
        const response = await axios.post(`almacen/`,values);
        
        return response;
    } catch (error) {
        return res.json({message: 'Error al crear alamcen', error: error.message});
    }
}

export default {
    getAllAlmacenesRequest,
    getAlmacenByIdRequest,
    putAlmacenRequest,
    deleteAlmacenRequest,
    createAlmacenRequest
}