import React, { useState } from 'react'
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Toast,
    ToastContainer,
} from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'
import { useNavigate } from 'react-router-dom'
import productoApi from '../../../api/producto.api'

function CrearProducto() {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        codigo_barra: '',
        precio_venta: '',
        coste: '',
        puede_vender: false, // Cambiado a boolean
        puede_comprar: false, // Cambiado a boolean
        notas_internas: '',
        imagen_url: '',
        volumen: '10',
        plazo_entrega_cliente: '10',
        descripcion_recepcion: 'descripcion recepcion',
        descripcion_entrega: 'descripcion entrega',
    })

    const [errors, setErrors] = useState({})
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    const navigate = useNavigate()

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors }

        switch (fieldName) {
            case 'nombre':
                if (!value) {
                    newErrors.nombre = 'El nombre es obligatorio.'
                } else {
                    delete newErrors.nombre
                }
                break
            case 'tipo':
                if (!value) {
                    newErrors.tipo = 'El tipo es obligatorio.'
                } else {
                    delete newErrors.tipo
                }
                break
            case 'codigo_barra':
                if (!value) {
                    newErrors.codigo_barra = 'El código de barra es obligatorio.'
                } else {
                    delete newErrors.codigo_barra
                }
                break
            case 'precio_venta':
                if (value <= 0) {
                    newErrors.precio_venta = 'El precio de venta debe ser mayor que 0.'
                } else {
                    delete newErrors.precio_venta
                }
                break
            case 'coste':
                if (value < 0) {
                    newErrors.coste = 'El coste no puede ser negativo.'
                } else {
                    delete newErrors.coste
                }
                break
            case 'volumen':
                if (value <= 0) {
                    newErrors.volumen = 'El volumen debe ser mayor que 0.'
                } else {
                    delete newErrors.volumen
                }
                break
            case 'plazo_entrega_cliente':
                if (value < 0) {
                    newErrors.plazo_entrega_cliente = 'El plazo de entrega no puede ser negativo.'
                } else {
                    delete newErrors.plazo_entrega_cliente
                }
                break
            default:
                break
        }

        setErrors(newErrors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isFormValid()) {
            productoApi.createProductoRequest(formData).then((response) => {
                console.log(response)
            })
            console.log(formData)
            setToastMessage('Producto guardado con éxito!')
            setToastVariant('success')
            setShowToast(true)
            // setTimeout(() => {
            //     handleCancel()
            // }, 2000)
        } else {
            setToastMessage('Hay errores en el formulario.')
            setToastVariant('danger')
            setShowToast(true)
        }
    }

    const handleCancel = () => {
        setFormData({
            nombre: '',
            tipo: '',
            codigo_barra: '',
            precio_venta: '',
            coste: '',
            puede_vender: false,
            puede_comprar: false,
            notas_internas: '',
            imagen_url: '',
            volumen: '',
            plazo_entrega_cliente: '',
            descripcion_recepcion: '',
            descripcion_entrega: '',
        })
        setErrors({})
        navigate(-1)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
        validateField(name, value)
    }

    const isFormValid = () => {
        return (
            formData.nombre &&
            formData.tipo &&
            formData.codigo_barra &&
            formData.precio_venta > 0 &&
            formData.coste >= 0 &&
            formData.volumen > 0 &&
            formData.plazo_entrega_cliente >= 0 &&
            Object.keys(errors).length === 0
        )
    }

    return (
        <div>
            <FeatureNavbar />
            <Container fluid style={{ maxWidth: '700px', marginTop: '50px' }}>
                <ToastContainer
                    position="bottom-center"
                    className="p-3 text-white"
                >
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        bg={toastVariant}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                {toastVariant === 'success' ? 'Éxito' : 'Error'}
                            </strong>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>

                <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
                    Crear Producto
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    isInvalid={!!errors.nombre}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nombre}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    isInvalid={!!errors.tipo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.tipo}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formCodigoBarra">
                                <Form.Label>Código de Barra</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigo_barra"
                                    value={formData.codigo_barra}
                                    onChange={handleChange}
                                    isInvalid={!!errors.codigo_barra}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.codigo_barra}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPrecioVenta">
                                <Form.Label>Precio de Venta (Lps)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio_venta"
                                    value={formData.precio_venta}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.precio_venta}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.precio_venta}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formCoste">
                                <Form.Label>Coste (Lps)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="coste"
                                    value={formData.coste}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.coste}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.coste}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formImagenUrl">
                                <Form.Label>URL de Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagen_url"
                                    value={formData.imagen_url}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formPuedeVender">
                                <Form.Label>¿Puede Vender? (Salidas)</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="puede_vender"
                                    label={formData.puede_vender ? 'Sí' : 'No'}
                                    checked={formData.puede_vender}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPuedeComprar">
                                <Form.Label>¿Puede Comprar? (Entradas)</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="puede_comprar"
                                    label={formData.puede_comprar ? 'Sí' : 'No'}
                                    checked={formData.puede_comprar}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="formNotasInternas">
                                <Form.Label>Notas Internas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="notas_internas"
                                    value={formData.notas_internas}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formVolumen">
                                <Form.Label>Volumen (m³)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="volumen"
                                    value={formData.volumen}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.volumen}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.volumen}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPlazoEntregaCliente">
                                <Form.Label>Plazo de Entrega al Cliente (días)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="plazo_entrega_cliente"
                                    value={formData.plazo_entrega_cliente}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.plazo_entrega_cliente}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.plazo_entrega_cliente}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formDescripcionRecepcion">
                                <Form.Label>Informacion de Recepción</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descripcion_recepcion"
                                    value={formData.descripcion_recepcion}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formDescripcionEntrega">
                                <Form.Label>Informacion de Entrega</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descripcion_entrega"
                                    value={formData.descripcion_entrega}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={handleCancel}
                            style={{ marginLeft: '10px' }}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default CrearProducto
