import React, { useState, useEffect } from 'react'
import {
    Button,
    Form,
    Toast,
    ToastContainer,
    Container,
    Row,
    Col,
} from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiAlmacen from '../../../api/almacen.api'

function EditarAlmacen() {
    const navigate = useNavigate()
    const location = useLocation()
    const almacenSeleccionado = location.state.almacen
    console.log(almacenSeleccionado)

    const [almacen, setAlmacen] = useState(almacenSeleccionado)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')
    const [isFormComplete, setIsFormComplete] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Verificar si todos los campos están llenos
    useEffect(() => {
        const { nombre, nombre_corto, direccion } = almacen
        if (nombre && nombre_corto && direccion) {
            setIsFormComplete(true)
        } else {
            setIsFormComplete(false)
        }
    }, [almacen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setAlmacen((prev) => ({ ...prev, [name]: value }))
    }

    const handleApplyChanges = async () => {
        if (!isFormComplete) return

        setIsSubmitting(true)

        const response = await ApiAlmacen.putAlmacenRequest(almacen.id, almacen)

        console.log(response)

        if (response.statusText === 'Created') {
            setToastVariant('success')
            setToastMessage('Almacén actualizado con éxito.')
            setShowToast(true)

            setTimeout(() => {
                navigate(-1)
            }, 2000)
        } else {
            setToastVariant('danger')
            setToastMessage('Error al actualizar el almacén.')
            setShowToast(true)
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        console.log('Edición cancelada')
    }

    const handleCloseToast = () => setShowToast(false)

    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
            >
                <div className="w-100" style={{ maxWidth: '600px' }}>
                    <h2 className="my-4 text-center">Editar Almacén</h2>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formNombre">
                                <Form.Label>Nombre del Almacén</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del almacén"
                                    name="nombre"
                                    value={almacen.nombre}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formNombreCorto">
                                <Form.Label>Nombre Corto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre corto"
                                    name="nombre_corto"
                                    value={almacen.nombre_corto}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formDireccion" className="mb-4">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la dirección"
                                name="direccion"
                                value={almacen.direccion}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button
                                variant="primary"
                                onClick={handleApplyChanges}
                                disabled={!isFormComplete || isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Guardando...'
                                    : 'Aplicar cambios'}
                            </Button>
                            <Button
                                variant="danger"
                                className="mx-3"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancelar Edicion
                            </Button>
                        </div>
                    </Form>

                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            show={showToast}
                            onClose={handleCloseToast}
                            bg={toastVariant}
                            delay={3000}
                            autohide
                        >
                            <Toast.Header>
                                <strong className="me-auto">
                                    {toastVariant === 'success'
                                        ? 'Éxito'
                                        : 'Error'}
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

export default EditarAlmacen
