import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, InputGroup, FormControl, Pagination, Badge, Button } from 'react-bootstrap';
import FeatureNavbar from "../FeatureNavbar";

// Datos de ejemplo
const sampleOperations = [
    { fecha: '2023-09-07', referencia: 'alerg/IN/00001', producto: 'Manzana', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 10, estado: 'Hecho' },
    { fecha: '2023-09-08', referencia: 'alerg/OUT/00001', producto: 'Pera', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 5, estado: 'Hecho' },
    { fecha: '2023-09-08', referencia: 'alerg/IN/00002', producto: 'Mango', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 15, estado: 'Hecho' },
    { fecha: '2023-09-09', referencia: 'alerg/OUT/00002', producto: 'Manzana', desde: 'Oficina 2', a: 'Oficina 1', cantidad: 7, estado: 'Hecho' },
    { fecha: '2023-09-10', referencia: 'alerg/IN/00003', producto: 'Banano', desde: 'Oficina 3', a: 'Oficina 1', cantidad: 20, estado: 'Hecho' },
    { fecha: '2023-09-10', referencia: 'alerg/OUT/00003', producto: 'Naranja', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 10, estado: 'Hecho' },
    { fecha: '2023-09-11', referencia: 'alerg/IN/00004', producto: 'Ciruela', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 12, estado: 'Hecho' },
    { fecha: '2023-09-12', referencia: 'alerg/OUT/00004', producto: 'Melón', desde: 'Oficina 1', a: 'Oficina 3', cantidad: 8, estado: 'Hecho' },
    { fecha: '2023-09-12', referencia: 'alerg/IN/00005', producto: 'Fresa', desde: 'Oficina 3', a: 'Oficina 1', cantidad: 18, estado: 'Hecho' },
    { fecha: '2023-09-13', referencia: 'alerg/OUT/00005', producto: 'Papaya', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 5, estado: 'Hecho' },
    { fecha: '2023-09-13', referencia: 'alerg/IN/00006', producto: 'Manzana', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 25, estado: 'Hecho' },
    { fecha: '2023-09-14', referencia: 'alerg/OUT/00006', producto: 'Pera', desde: 'Oficina 3', a: 'Oficina 1', cantidad: 10, estado: 'Hecho' },
    { fecha: '2023-09-14', referencia: 'alerg/IN/00007', producto: 'Mango', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 30, estado: 'Hecho' },
    { fecha: '2023-09-15', referencia: 'alerg/OUT/00007', producto: 'Banano', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 15, estado: 'Hecho' },
    { fecha: '2023-09-15', referencia: 'alerg/IN/00008', producto: 'Naranja', desde: 'Oficina 3', a: 'Oficina 1', cantidad: 12, estado: 'Hecho' },
];

const HistorialDeMovimientos = () => {
    const [operations, setOperations] = useState(sampleOperations);
    const [searchProduct, setSearchProduct] = useState('');
    const [searchReference, setSearchReference] = useState('');
    const [filteredOperations, setFilteredOperations] = useState(sampleOperations);
    const [currentPage, setCurrentPage] = useState(1);
    const [operationsPerPage] = useState(5);

    useEffect(() => {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            const product = JSON.parse(storedProduct);
            setSearchProduct(product.name);
            filterOperations(product.name, searchReference);
            localStorage.removeItem('selectedProduct');
        }
    }, []);

    useEffect(() => {
        filterOperations(searchProduct, searchReference);
    }, [searchProduct, searchReference]);

    const filterOperations = (productSearch, referenceSearch) => {
        let filtered = operations;

        if (productSearch) {
            filtered = filtered.filter(operation =>
                operation.producto.toLowerCase().includes(productSearch.toLowerCase())
            );
        }

        if (referenceSearch) {
            filtered = filtered.filter(operation =>
                operation.referencia.toLowerCase().includes(referenceSearch.toLowerCase())
            );
        }

        setFilteredOperations(filtered);
    };

    const handleSearchProductChange = (e) => {
        setSearchProduct(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchReferenceChange = (e) => {
        setSearchReference(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleResetFilter = () => {
        setSearchProduct('');
        setSearchReference('');
        filterOperations('', '');
    };

    const startIndex = (currentPage - 1) * operationsPerPage;
    const paginatedOperations = filteredOperations.slice(startIndex, startIndex + operationsPerPage);
    const totalPages = Math.ceil(filteredOperations.length / operationsPerPage);

    const renderPagination = () => {
        const pageItems = [];

        pageItems.push(
            <Pagination.Prev
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
        );

        for (let i = 1; i <= totalPages; i++) {
            pageItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        pageItems.push(
            <Pagination.Next
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        );

        return pageItems;
    };

    return (
        <div>
            <FeatureNavbar />
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Historial de Movimientos</h1>

                        {/* Campos de búsqueda separados */}
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Buscar por producto"
                                value={searchProduct}
                                onChange={handleSearchProductChange}
                            />
                            <FormControl
                                placeholder="Buscar por referencia (IN/OUT)"
                                value={searchReference}
                                onChange={handleSearchReferenceChange}
                            />
                        </InputGroup>

                        {/* Botón para resetear el filtro */}
                        <Button variant="secondary" onClick={handleResetFilter} className="mb-3">
                            Resetear Filtro
                        </Button>

                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Referencia</th>
                                    <th>Producto</th>
                                    <th>Desde</th>
                                    <th>A</th>
                                    <th>Cantidad</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOperations.length > 0 ? (
                                    paginatedOperations.map((operation, index) => (
                                        <tr key={index}>
                                            <td>{operation.fecha}</td>
                                            <td>{operation.referencia}</td>
                                            <td>{operation.producto}</td>
                                            <td>{operation.desde}</td>
                                            <td>{operation.a}</td>
                                            <td>{operation.cantidad}</td>
                                            <td>
                                                {operation.estado === 'Hecho' ? (
                                                    <Badge bg="success">Hecho</Badge>
                                                ) : (
                                                    <span>{operation.estado}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No se encontraron movimientos</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {/* Paginación con números y flechas */}
                        <Pagination className="justify-content-center mt-3">
                            {renderPagination()}
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HistorialDeMovimientos;
