import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //esto simula una lista de SKUs que ya existen en la base de datos (conectar a base de datos real) por mientras se usaran estos 
  const existingSkus = ['ABC123', 'XYZ789', 'QWE456'];

  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'productName':
        if (!value) {
          newErrors.productName = 'El nombre del producto es obligatorio.';
        } else {
          delete newErrors.productName;
        }
        break;
      case 'sku':
        if (!value) {
          newErrors.sku = 'El SKU es obligatorio.';
        } else if (existingSkus.includes(value)) {
          newErrors.sku = 'El SKU ya existe en la base de datos.';
        } else {
          delete newErrors.sku;
        }
        break;
      case 'category':
        if (!value) {
          newErrors.category = 'Debe seleccionar una categoría.';
        } else {
          delete newErrors.category;
        }
        break;
      case 'price':
        if (value <= 0) {
          newErrors.price = 'El precio debe ser mayor que 0.';
        } else {
          delete newErrors.price;
        }
        break;
      case 'stock':
        if (value < 0) {
          newErrors.stock = 'La cantidad en stock no puede ser negativa.';
        } else {
          delete newErrors.stock;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0 && productName && sku && category && price > 0 && stock >= 0) {
      alert('Producto guardado con éxito!');
      handleCancel();
    } else {
      alert('Hay errores en el formulario.');
    }
  };

  const handleCancel = () => {
    setProductName('');
    setSku('');
    setCategory('');
    setPrice('');
    setStock('');
    setErrors({});
  };

  return (
    <Container style={{ maxWidth: '700px', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Crear Producto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  validateField('productName', e.target.value);
                }}
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
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value);
                  validateField('sku', e.target.value);
                }}
                isInvalid={!!errors.sku}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sku}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  validateField('category', e.target.value);
                }}
                isInvalid={!!errors.category}
              >
                <option value="">Seleccione una categoría...</option>
                <option value="Electrónica">Electrónica</option>
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
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  validateField('stock', e.target.value);
                }}
                min="0"
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
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validateField('price', e.target.value);
            }}
            min="0"
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center" style={{ marginTop: '20px' }}>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default App;
