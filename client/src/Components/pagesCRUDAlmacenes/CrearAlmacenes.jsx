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

function CrearAlmacenes() {
    const [formData, setFormData] = useState({
        nombreAlmacen: '',
        nombreCorto: '',
        direccion: '',
    })

    const [isModified, setIsModified] = useState(false)
    const [errors, setErrors] = useState({
        nombreAlmacen: '',
        nombreCorto: '',
        direccion: '',
    })

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    useEffect(() => {
        setIsModified(
            formData.nombreAlmacen.trim() !== '' &&
                formData.nombreCorto.trim() !== '' &&
                formData.direccion.trim() !== '' &&
                !Object.values(errors).some((error) => error !== '')
        )
    }, [formData, errors])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        switch (name) {
            case 'nombreAlmacen':
                setErrors({
                    ...errors,
                    [name]:
                        value.trim() === ''
                            ? 'El nombre del almacén no puede estar vacío.'
                            : '',
                })
                break
            case 'nombreCorto':
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

    const handleApplyChanges = () => {
        if (isModified) {
            setToastMessage('Guardado con éxito.')
            setShowToast(true)
            console.log(formData)
        }
    }

    const handleCancel = () => {
        setFormData({
            nombreAlmacen: '',
            nombreCorto: '',
            direccion: '',
        })
        setErrors({
            nombreAlmacen: '',
            nombreCorto: '',
            direccion: '',
        })
        setToastMessage('Acción cancelada.')
        setShowToast(true)
    }

    return (
        <div>
            <FeatureNavbar />
            <Container fluid className="d-flex justify-content-center align-items-center">
                <div className="w-100" style={{ maxWidth: '600px' }}>
                    <h2 className="my-4" style={{ textAlign: 'center' }}>
                        Crear nuevo Almacén
                    </h2>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formNombreAlmacen">
                                    <Form.Label>Nombre del Almacén</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreAlmacen"
                                        placeholder="Ingrese el nombre del almacén"
                                        value={formData.nombreAlmacen}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.nombreAlmacen}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombreAlmacen}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNombreCorto">
                                    <Form.Label>Nombre Corto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreCorto"
                                        placeholder="Ingrese el nombre corto"
                                        value={formData.nombreCorto}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.nombreCorto}
                                        maxLength={5}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombreCorto}
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
                                <Button variant="secondary" onClick={handleCancel}>
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
                                <strong className="me-auto">Notificación</strong>
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
