import axios from "../api/AxiosInstance"

const  getAllActividadesRequest = async () =>{
    try {
        const response = await axios.get(`actividad/`)
        return response;
    } catch (error) {
        return res.json({message: 'Error al buscar actividades', error: error.message});
    }
}

const getActividadByIdRequest = async(id) =>{
    try {
        const response = await axios.get(`actividad/${id}`);
        return response;
    } catch (error) {
        return res.json({message: 'Error al buscar actividad por id', error: error.message});
    }
}

const putActividadRequest = async(id,values) =>{
    try {
        const response = await axios.put(`actividad/${id}`,values);
        return response;
    } catch (error) {
        res.json({message: 'Error al editar actividad', error: error.message});
    }
}

const deleteActividadRequest = async(id,res) => {
    try {
        const response = await axios.put(`actividad/${id}`);
        return response;
    } catch (error) {
        return res.json({message: 'Error al elminar actividad', error: error.message})
    }
}

const createActividadRequest = async(values) => {
    try {
        const response = await axios.post(`actividad/`,values);
        
        return response;
    } catch (error) {
        return res.json({message: 'Error al crear actividad', error: error.message});
    }
}

export default {
    getAllActividadesRequest,
    getActividadByIdRequest,
    putActividadRequest,
    deleteActividadRequest,
    createActividadRequest
}