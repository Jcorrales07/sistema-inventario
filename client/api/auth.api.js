import axios from'axios';

// Configura la URL base de tu API
constAPI_URL = 'https://api.example.com';
export async function signInRequest(username, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });

    return response;
  } catch (error) {
    console.error('Error en signInRequest:', error);
    returnnull;
  }
}
