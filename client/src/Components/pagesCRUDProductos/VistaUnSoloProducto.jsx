import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Image,
    Button,
    ModalTitle,
} from 'react-bootstrap';
import FeatureNavbar from '../FeatureNavbar';
import { useNavigate, useLocation } from 'react-router-dom';

function VistaUnSoloProducto() {
    const navigate = useNavigate();
    const location = useLocation();

    const productSelected = location.state;
    const [producto, setProducto] = useState(productSelected);

    const esServicio = producto.tipo === 'Servicio';

    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="mt-3"
                style={{ height: 'calc(100vh - 93px)' }}
            >
                <Row className="h-100">
                    <Col
                        md={4}
                        className="d-flex justify-content-center align-items-center bg-light"
                    >
                        <div
                            className="border"
                            style={{
                                width: '80%',
                                height: '80%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src={producto.imagen_url}
                                fluid
                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                            />
                        </div>
                    </Col>
                    <Col
                        md={8}
                        className="d-flex flex-column justify-content-center align-items-center px-5"
                    >
                        <ModalTitle>Producto: {producto.nombre}</ModalTitle>
                        <Form className="w-100">
                            <Row className="mt-3">
                                <Col md={4}>
                                    <Form.Group controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={producto.nombre}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="tipo">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={producto.tipo}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                {!esServicio && (
                                    <Col md={4}>
                                        <Form.Group controlId="codigo_barra">
                                            <Form.Label>Código de Barra</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={producto.codigo_barra}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                )}
                            </Row>
                            <Row className="mt-3">
                                <Col md={4}>
                                    <Form.Group controlId="precio_venta">
                                        <Form.Label>
                                            Precio de Venta (Lps)
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={producto.precio_venta}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="coste">
                                        <Form.Label>Coste (Lps)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={producto.coste}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                {!esServicio && (
                                    <Col md={4}>
                                        <Form.Group controlId="puede_vender">
                                            <Form.Label>
                                                ¿Se puede vender? (Disponible)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={
                                                    producto.puede_vender
                                                        ? 'Sí'
                                                        : 'No'
                                                }
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                )}
                            </Row>
                            {esServicio ? (
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Form.Group controlId="descripcion_entrega">
                                            <Form.Label>
                                                Información de Entrega
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={
                                                    producto.descripcion_entrega
                                                }
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="plazo_entrega_cliente">
                                            <Form.Label>
                                                Plazo de Entrega al Cliente
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={
                                                    producto.plazo_entrega_cliente
                                                }
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <Row className="mt-3">
                                        <Col md={4}>
                                            <Form.Group controlId="puede_comprar">
                                                <Form.Label>
                                                    ¿Se puede comprar? (Entrada)
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={
                                                        producto.puede_comprar
                                                            ? 'Sí'
                                                            : 'No'
                                                    }
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="volumen">
                                                <Form.Label>Volumen</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={producto.volumen}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col md={6}>
                                            <Form.Group controlId="informacion_recepcion">
                                                <Form.Label>
                                                    Información de Recepción
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={
                                                        producto.informacion_recepcion
                                                    }
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="informacion_entrega">
                                                <Form.Label>
                                                    Información de Entrega
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={
                                                        producto.informacion_entrega
                                                    }
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Form.Group controlId="notas_internas">
                                        <Form.Label>Notas internas</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={producto.notas_internas}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                className="mt-3"
                                onClick={() => navigate(-1)}
                            >
                                Regresar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default VistaUnSoloProducto;
