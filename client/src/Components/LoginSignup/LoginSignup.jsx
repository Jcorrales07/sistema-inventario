import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../api/auth.api'
import './LoginSignup.css'
import { toast } from 'react-toastify'

const LoginSignup = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Usuario y contraseña son requeridos')
            return
        }

        const response = await login(username, password)
        if (response) {
            if (response.status === 201) {
                setIsLoggedIn(true)
                setError('')
                toast.success('Inicio de sesión exitoso!', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: true,
                })
                navigate('/homepage')
            }
        } else {
            setError('Error en el inicio de sesión')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="container">
            {isLoggedIn ? (
                <div>
                    {/* Aquí puedes agregar lo que quieras mostrar cuando el usuario esté logueado */}
                </div>
            ) : (
                <div className="containerIniciar">
                    <div className="header">
                        <h3>Inicio de Sesión</h3>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <label className="labels" htmlFor="username">
                                Usuario
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder=""
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength="50"
                                onKeyDown={handleKeyDown}
                                className={`${
                                    error.includes('Usuario')
                                        ? 'input-error'
                                        : ''
                                }
                                `}
                            />
                        </div>
                        <div className="input">
                            <label className="labels" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`${
                                    error.includes('Usuario')
                                        ? 'input-error'
                                        : ''
                                }
                                `}
                            />
                        </div>
                        {error && <div className="error-messager">{error}</div>}
                    </div>
                    <div className="submit-container">
                        <div className="submit" onClick={handleLogin}>
                            Iniciar Sesión
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default LoginSignup
