import React, { useState, useEffect } from 'react'
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    Toast,
    ToastContainer,
} from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'
import ApiAlmacenes from '../../../api/almacen.api'
import { useNavigate } from 'react-router-dom'
function CrearAlmacenes() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        nombre_corto: '',
        direccion: '',
    })

    const [isModified, setIsModified] = useState(false)
    const [errors, setErrors] = useState({
        nombre: '',
        nombre_corto: '',
        direccion: '',
    })

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    useEffect(() => {
        setIsModified(
            formData.nombre.trim() !== '' &&
                formData.nombre_corto.trim() !== '' &&
                formData.direccion.trim() !== '' &&
                !Object.values(errors).some((error) => error !== '')
        )
    }, [formData, errors])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        switch (name) {
            case 'nombre':
                setErrors({
                    ...errors,
                    [name]:
                        value.trim() === ''
                            ? 'El nombre del almacén no puede estar vacío.'
                            : '',
                })
                break
            case 'nombre_corto':
                setErrors({
                    ...errors,
                    [name]:
                        value.trim() === ''
                            ? 'El nombre corto no puede estar vacío.'
                            : '',
                })
                break
            case 'direccion':
                setErrors({
                    ...errors,
                    [name]:
                        value.trim() === ''
                            ? 'La dirección no puede estar vacía.'
                            : '',
                })
                break
            default:
                break
        }
    }

    const handleApplyChanges = async () => {
        if (isModified) {
            // console.log(formData)
            const response = await ApiAlmacenes.createAlmacenRequest(formData)

            console.log(response)
            if (response.statusText === 'Created') {
                setToastMessage('Guardado con éxito.')
                setShowToast(true)
                setIsModified(false)
                setTimeout(() => {
                    navigate(-1)
                }, 2000)
            }
        }
    }

    const handleCancel = () => {
        setFormData({
            nombre: '',
            nombre_corto: '',
            direccion: '',
        })
        setErrors({
            nombre: '',
            nombre_corto: '',
            direccion: '',
        })
        setToastMessage('Creacion cancelada.')
        setShowToast(true)
        setTimeout(() => {
            navigate(-1)
        }, 2000)
    }

    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
            >
                <div className="w-100" style={{ maxWidth: '600px' }}>
                    <h2 className="my-4" style={{ textAlign: 'center' }}>
                        Crear nuevo Almacén
                    </h2>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre del Almacén</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        placeholder="Ingrese el nombre del almacén"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.nombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNombreCorto">
                                    <Form.Label>Nombre Corto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre_corto"
                                        placeholder="Ingrese el nombre corto"
                                        value={formData.nombre_corto}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.nombre_corto}
                                        maxLength={5}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombre_corto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formDireccion" className="mb-4">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                placeholder="Ingrese la dirección"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                isInvalid={!!errors.direccion}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.direccion}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mt-4">
                            <Col className="d-flex justify-content-center">
                                <Button
                                    variant="primary"
                                    onClick={handleApplyChanges}
                                    disabled={!isModified}
                                    className="me-3"
                                >
                                    Crear Almacen
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <ToastContainer position="top-end" className="p-3">
                        <Toast
                            onClose={() => setShowToast(false)}
                            show={showToast}
                            delay={3000}
                            autohide
                        >
                            <Toast.Header>
                                <strong className="me-auto">
                                    Notificación
                                </strong>
                            </Toast.Header>
                            <Toast.Body>{toastMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            </Container>
        </div>
    )
}

export default CrearAlmacenes
