import React, { useState, useEffect } from 'react'
import productoApi from '../../../api/producto.api'
import {
    Container,
    Table,
    Button,
    Form,
    Modal,
    Row,
    Col,
    Pagination,
    Image,
} from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const cargarInformacion = async (setProductsfn) => {
    // const savedProducts = localStorage.getItem('productos')
    // if (savedProducts) {
    //     setProductsfn(JSON.parse(savedProducts))
    // } else {
        const productos = await productoApi.getAllProductosRequest()
        if (productos.status === 200) {
            const Products = productos.data.Data.map((item) => ({
                id: item.id,
                nombre: item.nombre,
                tipo: item.tipo,
                codigo_barra: item.codigo_barra,
                precio_venta: item.precio_venta,
                coste: item.coste,
                puede_comprar: item.puede_comprar,
                notas_internas: item.notas_internas,
                volumen: item.volumen,
                descripcion_recepcion: item.descripcion_recepcion,
                descripcion_entrega: item.descripcion_entrega,
                plazo_entrega_cliente: item.plazo_entrega_cliente,
                imagen_url: item.imagen_url,
                puede_vender: item.puede_vender,
            }))
            setProductsfn(Products)
            localStorage.setItem('productos', JSON.stringify(Products))
        }
    // }
}

function BuscarProducto() {
    const [products, setProducts] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)
    const [viewingProduct, setViewingProduct] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(5) // Cantidad de productos por página

    const navigate = useNavigate()

    useEffect(() => {
        cargarInformacion(setProducts)
    }, [])

    const handleEditClick = (product) => {
        setEditingProduct(product)
        setShowEditModal(true)
    }

    const handleViewClick = (productId) => {
        const selectedProduct = products.find((p) => p.id === productId)

        if (selectedProduct) {
            navigate('/productos/ver', { state: selectedProduct })
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleSave = () => {
        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
        )
        setProducts(updatedProducts)
        localStorage.setItem('productos', JSON.stringify(updatedProducts))
        productoApi.putProductoRequest(editingProduct.id, editingProduct)
        setShowEditModal(false)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setEditingProduct({ ...editingProduct, [name]: checked })
        } else {
            setEditingProduct({ ...editingProduct, [name]: value })
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const imgData = new FormData()
            imgData.append('file', file)
            imgData.append('upload_preset', 'images_preset')
            try {
                let cloudName = 'dzm2nkjpj'
                let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

                const res = await axios.post(api, imgData)
                const { secure_url } = res.data
                setEditingProduct((prevState) => ({
                    ...prevState,
                    imagen_url: secure_url,
                }))
            } catch (error) {
                console.error('Upload failed:', error)
            }
        }
    }

    const filteredProducts = products.filter(
        (product) =>
            product.nombre.toLowerCase().includes(search.toLowerCase()) ||
            product.tipo.toLowerCase().includes(search.toLowerCase())
    )

    // Obtener los productos actuales según la página
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <FeatureNavbar />
            <Container fluid className="mt-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <h2 className="text-center mb-4">
                            Productos en base de datos
                        </h2>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre o tipo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mb-4"
                        />
                        <Table
                            striped
                            bordered
                            hover
                            className="shadow-sm text-center"
                        >
                            <thead className="thead-dark">
                                <tr>
                                    <th>Nombre del Producto</th>
                                    <th>Tipo</th>
                                    <th>Precio de Venta</th>
                                    <th>Coste</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.nombre}</td>
                                            <td>{product.tipo}</td>
                                            <td>{product.precio_venta} Lps</td>
                                            <td>{product.coste} Lps</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEditClick(product)
                                                    }
                                                >
                                                    Editar
                                                </Button>{' '}
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleViewClick(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Ver Producto
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No se encontraron productos
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {/* Paginación */}
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={idx + 1 === currentPage}
                                    onClick={() => paginate(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>

                        {/* Modal para Editar Producto */}
                        <Modal
                            show={showEditModal}
                            onHide={() => setShowEditModal(false)}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Nombre del Producto
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={editingProduct?.nombre || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="tipo"
                                            value={editingProduct?.tipo || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="consumible">
                                                consumible
                                            </option>
                                            <option value="servicio">
                                                servicio
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Precio de Venta</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="precio_venta"
                                            value={
                                                editingProduct?.precio_venta ||
                                                ''
                                            }
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Coste</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="coste"
                                            value={editingProduct?.coste || ''}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </Form.Group>
                                    {editingProduct?.tipo === 'consumible' && (
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Código de Barra
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="codigo_barra"
                                                    value={
                                                        editingProduct?.codigo_barra ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Volumen</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="volumen"
                                                    value={
                                                        editingProduct?.volumen ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    min="0"
                                                />
                                            </Form.Group>
                                        </>
                                    )}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Plazo de Entrega al Cliente (días)
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="plazo_entrega_cliente"
                                            value={
                                                editingProduct?.plazo_entrega_cliente ||
                                                ''
                                            }
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Imagen del Producto
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        <div className="d-flex justify-content-center mb-4">
                                            {editingProduct?.imagen_url && (
                                                <Image
                                                    src={
                                                        editingProduct.imagen_url
                                                    }
                                                    alt="Imagen del producto"
                                                    style={{
                                                        maxWidth: '300px',
                                                        maxHeight: '300px',
                                                        marginTop: '10px',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Check
                                            type="checkbox"
                                            name="puede_comprar"
                                            label="¿Puede Comprar?"
                                            checked={
                                                editingProduct?.puede_comprar ||
                                                false
                                            }
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            name="puede_vender"
                                            label="¿Puede Vender?"
                                            checked={
                                                editingProduct?.puede_vender ||
                                                false
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Notas Internas</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="notas_internas"
                                            value={
                                                editingProduct?.notas_internas ||
                                                ''
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Guardar Cambios
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuscarProducto
