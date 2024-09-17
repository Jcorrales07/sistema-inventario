// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { login } from '../../../api/auth.api'
// import './LoginSignup.css'
// import toast from 'react-hot-toast'

// const LoginSignup = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState('')
//     const navigate = useNavigate()

//     const loadPrivilegios = (roles) => {
//         let privilegios = []

//         roles.forEach((rol) => {
//             rol.Rol_Privilegios.forEach((privilegio) => {
//                 if (
//                     !privilegios.find((p) => p.id === privilegio.Privilegio.id)
//                 ) {
//                     privilegios.push(privilegio.Privilegio)
//                 }
//             })
//         })

//         return privilegios
//     }

//     const handleLogin = async () => {
//         if (!username || !password) {
//             toast.error('Usuario y contraseña son requeridos!')
//             return
//         }

//         const response = await login(username, password)
//         console.log(response)

//         if (response) {
//             if (response.status === 201) {
//                 if (response.data.Data.active) {
//                     const roles = response.data.Data.Usuario_Rols.map(
//                         (rol) => rol.Rol
//                     )

//                     const privilegios = loadPrivilegios(roles)

//                     const user = {
//                         nombre: response.data.Data.Socio.nombre,
//                         username: response.data.Data.nickname,
//                         email: response.data.Data.Socio.email,
//                         roles: roles,
//                         privilegios: privilegios,
//                         active: response.data.Data.active,
//                         id_socio: response.data.Data.id_socio,
//                     }

//                     localStorage.setItem('user', JSON.stringify(user))

//                     navigate('/home')
//                     setIsLoggedIn(true)
//                     return
//                 }
//                 toast.error('Usuario inactivo!', { icon: '🚫' })
//             }

//             if (response.status === 401) {
//                 toast.error('Usuario no existe!', {
//                     icon: '👤',
//                 })
//             }

//             if (response.status === 402) {
//                 toast.error('Contraseña incorrecta!', {
//                     icon: '🔑',
//                 })
//             }
//         } else {
//             setError('Error en el inicio de sesión')
//             console.log('Error en el inicio de sesión')
//         }
//     }

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleLogin()
//         }
//     }

//     return (
//         <div className="container">
//             {isLoggedIn ? (
//                 <div>
//                     {/* Aquí puedes agregar lo que quieras mostrar cuando el usuario esté logueado */}
//                 </div>
//             ) : (
//                 <div className="containerIniciar">
//                     <div className="header">
//                         <h3>Inicio de Sesión</h3>
//                     </div>
//                     <div className="inputs">
//                         <div className="input">
//                             <label className="labels" htmlFor="username">
//                                 Usuario
//                             </label>
//                             <input
//                                 id="username"
//                                 type="text"
//                                 placeholder=""
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 maxLength="50"
//                                 onKeyDown={handleKeyDown}
//                                 className={`${
//                                     error.includes('Usuario')
//                                         ? 'input-error'
//                                         : ''
//                                 }
//                                 `}
//                             />
//                         </div>
//                         <div className="input">
//                             <label className="labels" htmlFor="password">
//                                 Contraseña
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 placeholder=""
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                                 className={`${
//                                     error.includes('Usuario')
//                                         ? 'input-error'
//                                         : ''
//                                 }
//                                 `}
//                             />
//                         </div>
//                         {error && <div className="error-messager">{error}</div>}
//                     </div>
//                     <div className="submit-container">
//                         <div className="submit" onClick={handleLogin}>
//                             Iniciar Sesión
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
// export default LoginSignup

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../api/auth.api'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import toast from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LoginSignup.css'

const LoginSignup = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const loadPrivilegios = (roles) => {
        let privilegios = []

        roles.forEach((rol) => {
            rol.Rol_Privilegios.forEach((privilegio) => {
                if (
                    !privilegios.find((p) => p.id === privilegio.Privilegio.id)
                ) {
                    privilegios.push(privilegio.Privilegio)
                }
            })
        })

        return privilegios
    }

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Usuario y contraseña son requeridos!')
            return
        }

        const response = await login(username, password)

        if (response) {
            if (response.status === 201 && response.data.Data.active) {
                const roles = response.data.Data.Usuario_Rols.map(
                    (rol) => rol.Rol
                )
                const privilegios = loadPrivilegios(roles)

                const user = {
                    nombre: response.data.Data.Socio.nombre,
                    username: response.data.Data.nickname,
                    email: response.data.Data.Socio.email,
                    roles: roles,
                    privilegios: privilegios,
                    active: response.data.Data.active,
                    id_socio: response.data.Data.id_socio,
                }

                localStorage.setItem('user', JSON.stringify(user))
                navigate('/home')
                setIsLoggedIn(true)
                return
            }

            handleError(response.status, response)
        } else {
            setError('Error en el inicio de sesión')
        }
    }

    const handleError = (status, response) => {
        if (status === 401) {
            toast.error('Usuario no existe!', { icon: '👤' })
        } else if (status === 402) {
            toast.error('Contraseña incorrecta!', { icon: '🔑' })
        } else if (status === 201 && !response.data.Data.active) {
            toast.error('Usuario inactivo!', { icon: '🚫' })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <Container fluid style={{ width: '300px', marginTop: '150px' }} className='shadow'>
                <Row className="">
                    <Col className="border rounded py-5 px-3">
                        <h3 className="text-center mb-4">Inicio de Sesión</h3>
                        <Form>
                            <Form.Group className="mb-3 mt-4" controlId="username">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu usuario"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    isInvalid={error.includes('Usuario')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {error.includes('Usuario') &&
                                        'Usuario incorrecto!'}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-4" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    isInvalid={error.includes('Contraseña')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {error.includes('Contraseña') &&
                                        'Contraseña incorrecta!'}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Button
                                variant="dark"
                                onClick={handleLogin}
                                className="w-100 mt-4"
                            >
                                Iniciar Sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>
        </Container>
    )
}

export default LoginSignup
