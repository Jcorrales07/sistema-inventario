
import'./LoginSignup.css';
import { signInRequest } from'./api/auth.api';
import { toast, ToastContainer } from'react-toastify';
import'react-toastify/dist/ReactToastify.css';

function LoginSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleLogin() {
    setError('');
    setUsernameError(false);
    setPasswordError(false);

    try {
      const response = await signInRequest(username, password);

      if (!response) {
        toast.error('Hubo un problema, vuelva a intentarlo!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        setError('Hubo un problema, vuelva a intentarlo!');
        return;
      }

      if (response.status === 401) {
        setUsernameError(true);
        setError('Usuario inexistente');
        toast.error('Usuario inexistente', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else if (response.status === 402) {
        setPasswordError(true);
        setError('Contraseña invalida');
        toast.error('Contraseña invalida', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else if (response.status === 201) {
        toast.success('Inicio de sesión exitoso!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        setTimeout(() => {
          window.location.href = '/homepage';
        }, 2000);
      } else {
        toast.error('Hubo un problema, vuelva a intentarlo!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (err) {
      console.error('Error en handleLogin:', err);
      toast.error('Hubo un problema, vuelva a intentarlo!', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  consthandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='container'><ToastContainer /><div className='containerIniciar'><div className="header"><h3>Inicio de Sesión</h3></div><div className="inputs"><div className={`input ${usernameError ? 'input-error' : ''}`}><label htmlFor="username">Usuario</label><input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength="50"
            />
          </div><div className={`input ${passwordError ? 'input-error' : ''}`}><label htmlFor="password">Contraseña</label><input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && <div className="error-messager"> {error} </div>}
        </div><div className="submit-container"><button className="submit" onClick={handleLogin}>Iniciar Sesión</button></div></div></div>
  );
}

exportdefaultLoginSignup;
