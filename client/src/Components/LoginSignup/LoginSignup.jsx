import React, { useState } from 'react'
import './LoginSignup.css'


const LoginSignup = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === '1234') {
            setIsLoggedIn(true)
            setError('')
        }else if(username === '' && password === '1234') {
            setError('Campo de usuario no completado!')
            setUsername('');
            setPassword('');
        }else if(username === 'admin' && password === '') {
            setError('Campo de contraseña no completado!')
            setUsername('');
            setPassword('');
        } else {
            setError('Usuario o contraseña incorrectos!')
            setUsername('');
            setPassword('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className='container'>
            {isLoggedIn ? (
                <div>  
                    {/*aqui se configura lo que va adentro del boton de login*/} 
                </div>
            ) : (
                <div className='containerIniciar'>
                    <div className="header"><h3>Inicio de Sesión</h3></div>
                    <div className="inputs">
                        <div className="input">
                        <label htmlFor="username">Usuario</label>
                            <input
                                id = "username" 
                                type="text" 
                                placeholder = ""
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength="50"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id = "password"
                                type="password" 
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown} 
                            />
                        </div>
                        {error && <div className= "error-messager">{error}</div>}
                    </div>
                    <div className="submit-container">
                        <div className="submit" onClick={handleLogin}>Inicar Sesión</div>     
                    </div>
                </div>
            )}
        </div> 
    )
}
export default LoginSignup;