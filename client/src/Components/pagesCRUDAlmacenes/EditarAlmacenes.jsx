import React, { useState } from 'react'
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
import { useLocation } from 'react-router-dom'
import ApiAlmacen from '../../../api/almacen.api'
function EditarAlmacen() {
    const location = useLocation()
    const almacenSeleccionado = location.state.almacen
    console.log(almacenSeleccionado);
    // Datos iniciales del almacén
    const [almacen, setAlmacen] = useState(almacenSeleccionado)

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    const handleChange = (e) => {
        const { name, value } = e.target
        setAlmacen((prev) => ({ ...prev, [name]: value }))
    }

    const handleApplyChanges = () => {
        if (
            !almacen.nombreAlmacen ||
            !almacen.nombreCorto ||
            !almacen.direccion
        ) {
            setToastVariant('danger')
            setToastMessage('Todos los campos deben ser completados.')
            setShowToast(true)

            return
        }

        // Aquí puedes manejar la actualización del almacén
       // ApiAlmacen.putAlmacenRequest(almacen);
        setToastVariant('success')
        setToastMessage('Almacén actualizado con éxito.')
        setShowToast(true)
    }

    const handleCancel = () => {
        // Aquí puedes manejar la cancelación
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
                            <Form.Group as={Col} controlId="formNombreAlmacen">
                                <Form.Label>Nombre del Almacén</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del almacén"
                                    name="nombreAlmacen"
                                    value={almacen.nombreAlmacen}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formNombreCorto">
                                <Form.Label>Nombre Corto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre corto"
                                    name="nombreCorto"
                                    value={almacen.nombreCorto}
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

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                className="me-2"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleApplyChanges}
                            >
                                Aplicar cambios
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
