import React, { useState } from 'react';
// prettier-ignore
import { Container, Row, Col, Form, Button, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import FeatureNavbar from '../FeatureNavbar';
import RBDatePicker from '../datePicker/RBDatePicker';

function NuevoRecepcion() {
  const [selectedTab, setSelectedTab] = useState('operaciones');
  const [productos, setProductos] = useState([{ producto: '', demanda: '' }]);

  // Add a new product row
  const agregarLinea = () => {
    setProductos([...productos, { producto: '', demanda: '' }]);
  };

  // Handle product input changes
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][field] = value;
    setProductos(nuevosProductos);
  };

  // Remove a product row
  const eliminarLinea = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  // Check if "Agregar una línea" should be enabled
  const isAgregarLineaDisabled = productos.some(
    (item) => item.producto === '' || item.demanda === ''
  );

  return (
    <div>
      <FeatureNavbar />
      <Container fluid className="mt-5">
        {/* Formulario y Historial */}
        <Row>
          {/* Formulario */}
          <Col md={8}>
            <Row className="mb-3">
              <Col md={6} className="d-flex align-items-center">
                <Button variant="outline-primary" className="me-2">Marcar como realizar</Button>
                <Button variant="success" className="me-2">Validar</Button>
                <Button variant="danger">Cancelar</Button>
              </Col>
              <Col md={6} className="text-end">
                <Badge bg="primary" className="me-1">Borrador</Badge>
                <Badge bg="warning" className="me-1">Listo</Badge>
                <Badge bg="success">Hecho</Badge>
              </Col>
            </Row>
            <Form>
              <h2 className="mb-3">Nuevo Recepcion</h2>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Recibir de</Form.Label>
                    <Form.Select>
                      <option>Por ejemplo, Lumber Inc</option>
                      <option>Proveedor A</option>
                      <option>Proveedor B</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <RBDatePicker />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de operación</Form.Label>
                    <Form.Select>
                      <option>unitec4: Recibidos</option>
                      <option>Operación B</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ubicación de destino</Form.Label>
                    <Form.Select>
                      <option>WH/Stock</option>
                      <option>WH/Almacen 2</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>

            {/* Tabs */}
            <Tabs activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)} className="mb-3">
              <Tab eventKey="operaciones" title="Operaciones">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Demanda</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Select
                            value={item.producto}
                            onChange={(e) => handleProductoChange(index, 'producto', e.target.value)}
                          >
                            <option>Seleccione un producto</option>
                            <option>Producto 1</option>
                            <option>Producto 2</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item.demanda}
                            onChange={(e) => handleProductoChange(index, 'demanda', e.target.value)}
                          />
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => eliminarLinea(index)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <Button
                          variant="link"
                          onClick={agregarLinea}
                          disabled={isAgregarLineaDisabled}
                        >
                          Agregar una línea
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="informacion_adicional" title="Información adicional">
                {/* Aquí puedes añadir más información si es necesario */}
              </Tab>
              <Tab eventKey="nota" title="Nota">
                {/* Aquí puedes añadir notas si es necesario */}
              </Tab>
            </Tabs>
          </Col>
          <Col md={4} className="mt-4 mt-md-0">
            <h5>Historial de acciones</h5>
            <ul className="list-unstyled">
              <li>Joe Corrales - Creando un nuevo registro...</li>
              <li>Joe Corrales - 4 de septiembre de 2024: Borrador → Listo (Estado)</li>
              <li>Joe Corrales - 4 de septiembre de 2024: Listo → Hecho (Estado)</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NuevoRecepcion;
