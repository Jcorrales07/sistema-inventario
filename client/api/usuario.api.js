import axiosInstance from './AxiosInstance';

/**
 * Obtiene todos los usuarios.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const getAllUsuariosRequest = async () => {
    try {
        const response = await axiosInstance.get('usuario/');
        return response;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return null;
    }
};

/**
 * Obtiene un usuario por ID.
 * @param {string} id - El ID del usuario a buscar.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const getUsuarioByIdRequest = async (id) => {
    try {
        const response = await axiosInstance.get(`usuario/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        return null;
    }
};

/**
 * Actualiza un usuario por ID.
 * @param {string} id - El ID del usuario a actualizar.
 * @param {object} values - Los atributos a actualizar.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const putUsuarioRequest = async (id, values) => {
    try {
        const response = await axiosInstance.put(`usuario/${id}`, values);
        return response;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        return null;
    }
};

/**
 * Elimina un usuario por ID.
 * @param {string} id - El ID del usuario a eliminar.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const deleteUsuarioRequest = async (id) => {
    try {
        const response = await axiosInstance.delete(`usuario/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        return null;
    }
};

/**
 * Crea un nuevo usuario.
 * @param {object} values - Los atributos del nuevo usuario.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const createUsuarioRequest = async (values) => {
    try {
        const response = await axiosInstance.post('usuario/', values);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

/**
 * Crea un nuevo usuario y socio asociado.
 * @param {object} usuario - Los atributos del usuario (excepto id_socio y id).
 * @param {object} socio - Los atributos del socio.
 * @returns {Promise<any>|null} La respuesta de la peticion o null en caso de error.
 */
export const createUsuarioSocioRequest = async (usuario, socio) => {
    try {
        const response = await axiosInstance.post('usuario/socio/', { usuario, socio });
        return response;
    } catch (error) {
        console.error('Error creating user and associate:', error);
        return null;
    }
};

export default {
    getAllUsuariosRequest,
    getUsuarioByIdRequest,
    putUsuarioRequest,
    deleteUsuarioRequest,
    createUsuarioRequest,
    createUsuarioSocioRequest
};