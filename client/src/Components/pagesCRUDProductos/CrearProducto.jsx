import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'
import { useNavigate } from 'react-router-dom'
import productoApi from '../../../api/producto.api'
import axios from 'axios'
import toast from 'react-hot-toast'
function CrearProducto() {
    const [formData, setFormData] = useState({
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
        plazo_entrega_cliente: 0,
        descripcion_recepcion: '',
        descripcion_entrega: '',
    })

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = type === 'checkbox' ? checked : value;
    
        // Si el tipo es "servicio", asignar valores por defecto a "volumen" y "codigo_barra"
        if (name === "tipo" && value === "servicio") {
            setFormData({
                ...formData,
                [name]: updatedValue,
                codigo_barra: '0000000000000',  // valor por defecto para el código de barras
                volumen: 0, // valor por defecto para el volumen
            });
        } else {
            setFormData({
                ...formData,
                [name]: updatedValue,
            });
        }
    }

    const handleImageChange = async (e) => {
        const imgData = new FormData();
        imgData.append('file',e.target.files[0]);
        imgData.append('upload_preset','images_preset');
        try {
            let cloudName = 'dzm2nkjpj'
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

            const res = await axios.post(api, imgData)
            const { secure_url } = res.data
            console.log(secure_url);
            setFormData({
                ...formData,
                imagen_url: secure_url,
            })
        } catch (error) {
            console.error('Upload failed:', error);
        }
        
    }

    const validateForm = () => {
        const newErrors = []

        if (!formData.nombre) newErrors.push('El nombre es obligatorio.')
        if (!formData.tipo) newErrors.push('La categoría es obligatoria.')

        if (formData.tipo === 'consumible') {
            if (!formData.codigo_barra)
                newErrors.push('El código de barra es obligatorio.')
            if (!formData.precio_venta)
                newErrors.push('El precio de venta es obligatorio.')
            if (!formData.coste) newErrors.push('El costo es obligatorio.')
            if (!formData.volumen) newErrors.push('El volumen es obligatorio.')
            if (!formData.plazo_entrega_cliente)
                newErrors.push('El plazo de entrega es obligatorio.')
        } else if (formData.tipo === 'servicio') {
            if (!formData.precio_venta)
                newErrors.push('El precio de venta es obligatorio.')
            if (!formData.coste) newErrors.push('El costo es obligatorio.')
            if (!formData.plazo_entrega_cliente)
                newErrors.push('El plazo de entrega es obligatorio.')
        }

        setErrors(newErrors)
        return newErrors.length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log(formData)
            const apiResponse = await productoApi.createProductoRequest(formData)

            console.log(apiResponse)
            if (apiResponse.status === 201) {
                toast.success('Producto creado con éxito')
                setTimeout(() => {
                    handleCancel()
                }, 2000)
            } else {
                toast.error('Error al crear el producto')
            }
        }
    }

    const handleCancel = () => {
        setFormData({
            nombre: '',
            tipo: '',
            codigo_barra: '',
            precio_venta: 0,
            coste: 0,
            puede_vender: false,
            puede_comprar: false,
            notas_internas: '',
            imagen_url: '',
            volumen: 0,
            plazo_entrega_cliente: 0,
            descripcion_recepcion: 'descripcion recepcion',
            descripcion_entrega: 'descripcion entrega',
        })
        setErrors([])
        navigate(-1)
    }

    return (
        <div>
            <FeatureNavbar />
            <Container fluid style={{ maxWidth: '700px', marginTop: '50px' }}>
                <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
                    Crear Producto
                </h1>

                {errors.length > 0 && (
                    <Alert variant="danger">
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="formProductName">
                                <Form.Label>
                                    Nombre
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCategory">
                                <Form.Label>
                                    Categoría
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Seleccione una categoría...
                                    </option>
                                    <option value="consumible">
                                        consumible
                                    </option>
                                    <option value="servicio">servicio</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    {formData.tipo === 'consumible' && (
                        <Row className="mt-3">
                            <Col md={12}>
                                <Form.Group controlId="formBarcode">
                                    <Form.Label>
                                        Código de Barra
                                        <span style={{ color: 'red' }}> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="codigo_barra"
                                        value={formData.codigo_barra}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="formPrice">
                                <Form.Label>
                                    Precio de Venta (Lps)
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio_venta"
                                    value={formData.precio_venta}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCost">
                                <Form.Label>
                                    Costo (Lps)
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="coste"
                                    value={formData.coste}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {formData.tipo === 'consumible' && (
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formVolume">
                                    <Form.Label>
                                        Volumen (m³)
                                        <span style={{ color: 'red' }}> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="volumen"
                                        value={formData.volumen}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formCanSell">
                                    <Form.Label>
                                        ¿Se puede vender? (Salidas)
                                    </Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        name="puede_vender"
                                        checked={formData.puede_vender}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    {formData.tipo === 'consumible' && (
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formCanBuy">
                                    <Form.Label>
                                        ¿Se puede comprar? (Entradas)
                                    </Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        name="puede_comprar"
                                        checked={formData.puede_comprar}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    <Row className="mt-3">
                        <Col md={12}>
                            <Form.Group controlId="formDeliveryTime">
                                <Form.Label>
                                    Plazo de Entrega al Cliente (días)
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="plazo_entrega_cliente"
                                    value={formData.plazo_entrega_cliente}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        {formData.tipo === 'consumible' && (
                            <>
                                <Form.Group controlId="formReceptionInfo">
                                    <Form.Label>
                                        Información de Recepción
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descripcion_recepcion"
                                        value={formData.descripcion_recepcion}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDeliveryInfo">
                                    <Form.Label>
                                        Información de Entrega
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descripcion_entrega"
                                        value={formData.descripcion_entrega}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Row>

                    <Row className="mt-3">
                        <Form.Group controlId="formInternalNotes">
                            <Form.Label>Notas internas</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notas_internas"
                                value={formData.notas_internas}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mt-3">
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Imagen del Producto</Form.Label>
                            <Form.Control
                                type="file"
                                name="imagen_url"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                    </Row>

                    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px' }}>
                        <Button variant="primary" type="submit">
                            Crear Producto
                        </Button>
                        <Button
                            variant="danger"
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
