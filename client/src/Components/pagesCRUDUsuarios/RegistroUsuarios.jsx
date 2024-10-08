import React, { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Alert,
    Toast,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FeatureNavbar from '../FeatureNavbar'
import usuarioApi from '../../../api/usuario.api'

function RegistroUsuarios() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        usuario: '',
        identificacion: '',
        numeroIdentidad: '',
        contrasena: '',
        roles: [],
    })

    const [errors, setErrors] = useState({})
    const [formValid, setFormValid] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [touchedFields, setTouchedFields] = useState({})

    const validateForm = () => {
        let newErrors = {}

        if (formData.nombre.trim() === '' || formData.nombre.length > 50) {
            newErrors.nombre =
                'El nombre no debe estar vacío ni exceder 50 caracteres.'
        }
        if (
            !/^(\+\d{1,3}[-\s]?)?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,9}$/.test(
                formData.telefono
            )
        ) {
            newErrors.telefono =
                "El teléfono solo debe contener números y el carácter '+'."
        }

        if (
            !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(formData.correo)
        ) {
            newErrors.correo = 'El correo electrónico no es válido.'
        }
        if (
            !/^[a-z0-9._]+$/.test(formData.usuario) ||
            formData.usuario.length > 50
        ) {
            newErrors.usuario =
                'El usuario debe tener menos de 50 caracteres y solo puede contener letras minúsculas, números, guión bajo y punto.'
        }
        if (!/^\d{4}-\d{4}-\d{5}$/.test(formData.numeroIdentidad)) {
            newErrors.numeroIdentidad =
                'El número de identidad debe tener el formato xxxx-xxxx-xxxxx.'
        }
        if (formData.contrasena.length < 8) {
            newErrors.contrasena =
                'La contraseña debe tener al menos 8 caracteres.'
        }
        if (formData.roles.length === 0) {
            newErrors.roles = 'Debe asignar un rol.'
        }

        setErrors(newErrors)
        setFormValid(Object.keys(newErrors).length === 0)
    }

    useEffect(() => {
        validateForm()
    }, [formData])

    useEffect(() => {
        const formData = JSON.parse(localStorage.getItem('formData'))
        if (formData) {
            setFormData(formData)
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setTouchedFields({ ...touchedFields, [name]: true }) // Marca el campo como tocado
    }

    const handleAssignRoles = () => {
        localStorage.setItem('formData', JSON.stringify(formData))
        navigate('/usuarios/roles')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formValid) {
            setFormValid(false) // Para desactivar el boton de guardar mientras se procesa la solicitud

            const socio = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: formData.correo,
                rtn: formData.numeroIdentidad,
                tipo: 'individuo',
            }

            const usuario = {
                nickname: formData.usuario,
                contrasena: formData.contrasena,
            }

            /*
      Los roles ya están asignados en el formulario de asignación de roles, por lo que no es necesario
      enviarlos en el objeto usuario. Se enviarán en el siguiente paso.

      */
            const apiResponse = await usuarioApi.createUsuarioSocioRequest(
                usuario,
                socio,
                formData.roles
            )

            if (
                apiResponse &&
                apiResponse.status >= 200 &&
                apiResponse.status < 300
            ) {
                setSuccessMessage(
                    `El usuario para ${formData.nombre} fue creado exitosamente!`
                )
                setShowToast(true)

                localStorage.removeItem('formData')

                setTimeout(() => {
                    navigate(-1)
                }, 3000)
            } else {
                console.log(apiResponse.data.error)

                if (apiResponse.data.error.includes('Unique'))
                    setErrors({
                        form: 'El usuario, no. identidad, email y el telefono deber ser unicos',
                    })
                else setErrors({ form: 'Hubo un problema con el registro' })
            }
        } else {
            setErrors({
                form: 'Por favor, complete todos los campos correctamente.',
            })
        }
    }

    const handleCancel = () => {
        setFormData({
            nombre: '',
            telefono: '',
            correo: '',
            usuario: '',
            identificacion: '',
            numeroIdentidad: '',
            contrasena: '',
            roles: [],
        })
        localStorage.removeItem('formData')
        setErrors({})
        setSuccessMessage('')
        navigate(-1)
    }

    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
            >
                <Form
                    className="w-75"
                    style={{ marginTop: '8rem' }}
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-center">Registro de Usuarios</h3>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    maxLength="50"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.nombre && !!errors.nombre
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nombre}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="numeroIdentidad">
                                <Form.Label>Número de Identidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroIdentidad"
                                    placeholder="xxxx-xxxx-xxxxx"
                                    value={formData.numeroIdentidad}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.numeroIdentidad &&
                                        !!errors.numeroIdentidad
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.numeroIdentidad}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="usuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="usuario"
                                    maxLength="50"
                                    value={formData.usuario}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.usuario &&
                                        !!errors.usuario
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.usuario}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="correo"
                                    placeholder="correo@email.com"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.correo && !!errors.correo
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.correo}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="telefono">
                                <Form.Label>Número de Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    placeholder="+xxx xxxxxxxx"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.telefono &&
                                        !!errors.telefono
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefono}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="contrasena"
                                    value={formData.contrasena}
                                    onChange={handleChange}
                                    isInvalid={
                                        touchedFields.contrasena &&
                                        !!errors.contrasena
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.contrasena}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Button
                                variant="primary"
                                onClick={handleAssignRoles}
                                className="mt-4"
                            >
                                Asignar Roles
                            </Button>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="rolesAsignados">
                                <Form.Label>Roles del usuario:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Roles asignados..."
                                    style={{ height: '100px', resize: 'none' }}
                                    readOnly
                                    value={
                                        formData.roles &&
                                        formData.roles
                                            .map((rol) => rol.nombre_rol)
                                            .join('.\n')
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col md={6} className='text-end'>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!formValid}
                            >
                                Guardar Usuario
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button
                                variant="danger"
                                onClick={handleCancel}
                            >
                                Cancelar Registro
                            </Button>
                        </Col>
                    </Row>

                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                    >
                        <Toast.Body>{successMessage}</Toast.Body>
                    </Toast>

                    {errors.form && (
                        <Alert variant="danger" className="mt-3">
                            {errors.form}
                        </Alert>
                    )}
                </Form>
            </Container>
        </div>
    )
}

export default RegistroUsuarios
