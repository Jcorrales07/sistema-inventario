import React, { useState } from 'react';
import { Container, Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//estos productos son para efectos de mostrar como funciona falta modificarlo para que se adapte a la base de datos (merge)
const initialProducts = [
  { id: 1, name: 'Producto 1', sku: 'ABC123', category: 'Electrónica', price: 100, stock: 50 },
  { id: 2, name: 'Producto 2', sku: 'XYZ789', category: 'Ropa', price: 200, stock: 20 },
  { id: 3, name: 'Producto 3', sku: 'QWE456', category: 'Alimentos', price: 300, stock: 30 },
];

function ProductTable() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    setProducts(products.map(product => product.id === editingProduct.id ? editingProduct : product));
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Gestión de Productos</h2>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o categoría"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <Table striped bordered hover className="shadow-sm text-center">
            <thead className="thead-dark">
              <tr>
                <th>Nombre del Producto</th>
                <th>SKU</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad en Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditClick(product)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No se encontraron productos</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editingProduct?.name || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={editingProduct?.sku || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={editingProduct?.category || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={editingProduct?.price || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad en Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={editingProduct?.stock || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
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
  );
}

export default ProductTable;
