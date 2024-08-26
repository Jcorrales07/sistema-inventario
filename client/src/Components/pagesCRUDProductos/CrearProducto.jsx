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

function CrearProducto() {
    const existingSkus = ['ABC123', 'XYZ789', 'QWE456']

    const [formData, setFormData] = useState({
        productName: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
    })
    const [errors, setErrors] = useState({})
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    const navigate = useNavigate()

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors }

        switch (fieldName) {
            case 'productName':
                if (!value) {
                    newErrors.productName =
                        'El nombre del producto es obligatorio.'
                } else {
                    delete newErrors.productName
                }
                break
            case 'sku':
                if (!value) {
                    newErrors.sku = 'El SKU es obligatorio.'
                } else if (existingSkus.includes(value)) {
                    newErrors.sku = 'El SKU ya existe en la base de datos.'
                } else {
                    delete newErrors.sku
                }
                break
            case 'category':
                if (!value) {
                    newErrors.category = 'Debe seleccionar una categoría.'
                } else {
                    delete newErrors.category
                }
                break
            case 'price':
                if (value <= 0) {
                    newErrors.price = 'El precio debe ser mayor que 0.'
                } else {
                    delete newErrors.price
                }
                break
            case 'stock':
                if (value < 0) {
                    newErrors.stock =
                        'La cantidad en stock no puede ser negativa.'
                } else {
                    delete newErrors.stock
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
            setToastMessage('Producto guardado con éxito!')
            setToastVariant('success')
            setShowToast(true)
            setTimeout(() => {
                handleCancel()
            }, 2000)
        } else {
            setToastMessage('Hay errores en el formulario.')
            setToastVariant('danger')
            setShowToast(true)
        }
    }

    const handleCancel = () => {
        setFormData({
            productName: '',
            sku: '',
            category: '',
            price: '',
            stock: '',
        })
        setErrors({})
        navigate(-1)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        validateField(name, value)
    }

    const isFormValid = () => {
        return (
            formData.productName &&
            formData.sku &&
            formData.category &&
            formData.price > 0 &&
            formData.stock >= 0 &&
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
                            <Form.Group controlId="formProductName">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.productName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.productName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formSku">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    isInvalid={!!errors.sku}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.sku}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    isInvalid={!!errors.category}
                                >
                                    <option value="">
                                        Seleccione una categoría...
                                    </option>
                                    <option value="Electrónica">
                                        Electrónica
                                    </option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Alimentos">Alimentos</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formStock">
                                <Form.Label>Cantidad en Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="1"
                                    isInvalid={!!errors.stock}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.stock}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formPrice">
                        <Form.Label>Precio (Lps)</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center" style={{ marginTop: '20px' }}>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!isFormValid() || showToast}
                        >
                            Crear Producto
                        </Button>
                        <Button
                            variant="danger"
                            style={{ marginLeft: '10px' }}
                            onClick={handleCancel}
                            disabled={showToast}
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
