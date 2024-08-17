import axios from'./AxiosInstance'; 
import { toast } from'react-toastify';

const signInRequest = async (username, password) => {
    try {
        const response = await axios.post('/auth/login', {
            username,
            password,
        });

        if (response.status === 201) {
            // Inicio de sesión exitoso
            toast.success('Inicio de sesión exitoso!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
            });
            return response;
        } else {
            return null;
        }
    } catch (error) {
        // Manejar errores
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                toast.error('Usuario inexistente', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            } else if (status === 402) {
                toast.error('Contraseña inválida', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            } else {
                toast.error('Hubo un problema, vuelva a intentarlo!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
        } else {
            toast.error('Hubo un problema, vuelva a intentarlo!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
        returnnull;
    }
};

export default {
    signInRequest,
};
