import React, { useState, useEffect } from 'react';
import productoApi from '../../../api/producto.api';
import { Container, Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import FeatureNavbar from '../FeatureNavbar';
import { useNavigate } from 'react-router-dom';

const cargarInformacion = async (setProductsfn) => {
    const productos = await productoApi.getAllProductosRequest();
    console.log(productos.data);
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
        }));
        setProductsfn(Products);
    }
};

function BuscarProducto() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        cargarInformacion(setProducts);
    }, []); // El array vacío [] asegura que useEffect solo se ejecute una vez cuando el componente se monta.

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setShowEditModal(true);
    };

    const handleViewClick = (productId) => {
        // Encuentra el producto completo en la lista de productos
        const selectedProduct = products.find(p => p.id === productId);

        if (selectedProduct) {
            navigate('/productos/ver', { state: selectedProduct });
        }
    };


    const handleSave = () => {
        setProducts(
            products.map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            )
        );
        setShowEditModal(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEditingProduct({ ...editingProduct, [name]: checked });
        } else {
            setEditingProduct({ ...editingProduct, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingProduct({
                    ...editingProduct,
                    imagen_url: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredProducts = products.filter(
        (product) =>
            product.nombre.toLowerCase().includes(search.toLowerCase()) ||
            product.tipo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <FeatureNavbar />
            <Container fluid className="mt-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <h2 className="text-center mb-4">Gestión de Productos</h2>
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
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.nombre}</td>
                                            <td>{product.tipo}</td>
                                            <td>{product.precio_venta} Lps</td>
                                            <td>{product.coste} Lps</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEditClick(product)}
                                                >
                                                    Editar
                                                </Button>{' '}
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleViewClick(product.id)}
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
                                    <Form.Group>
                                        <Form.Label>
                                            Nombre del Producto
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={
                                                editingProduct?.nombre || ''
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="tipo"
                                            value={editingProduct?.tipo || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="Consumible">
                                                Consumible
                                            </option>
                                            <option value="Servicio">
                                                Servicio
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
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
                                    <Form.Group>
                                        <Form.Label>Coste</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="coste"
                                            value={editingProduct?.coste || ''}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </Form.Group>
                                    {editingProduct?.tipo === 'Consumible' && (
                                        <>
                                            <Form.Group>
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
                                            <Form.Group>
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
                                    <Form.Group>
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
                                        {editingProduct?.imagen_url && (
                                            <img
                                                src={editingProduct.imagen_url}
                                                alt="Producto"
                                                style={{
                                                    width: '100%',
                                                    marginTop: '10px',
                                                }}
                                            />
                                        )}
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
                                    Guardar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BuscarProducto;
