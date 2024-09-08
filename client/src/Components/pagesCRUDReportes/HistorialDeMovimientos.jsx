import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import FeatureNavbar from "../FeatureNavbar";

// Datos de ejemplo para la tabla de operaciones
const sampleOperations = [
    { fecha: '2023-09-07', referencia: 'alerg/IN/00001', producto: 'Manzana', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 10, estado: 'Hecho' },
    { fecha: '2023-09-08', referencia: 'alerg/OUT/00001', producto: 'Pera', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 5, estado: 'Hecho' },
    { fecha: '2023-09-09', referencia: 'alerg/IN/00002', producto: 'Mango', desde: 'Oficina 3', a: 'Oficina 1', cantidad: 7, estado: 'Hecho' },
    { fecha: '2023-09-10', referencia: 'alerg/OUT/00002', producto: 'Tomate', desde: 'Oficina 1', a: 'Oficina 4', cantidad: 3, estado: 'Hecho' },
    { fecha: '2023-09-11', referencia: 'alerg/IN/00003', producto: 'Manzana', desde: 'Oficina 4', a: 'Oficina 5', cantidad: 15, estado: 'Hecho' },
    { fecha: '2023-09-12', referencia: 'alerg/OUT/00003', producto: 'Ciruela', desde: 'Oficina 5', a: 'Oficina 6', cantidad: 20, estado: 'Hecho' },
    { fecha: '2023-09-13', referencia: 'alerg/IN/00004', producto: 'Banano', desde: 'Oficina 6', a: 'Oficina 1', cantidad: 8, estado: 'Hecho' },
    { fecha: '2023-09-14', referencia: 'alerg/OUT/00004', producto: 'Platano', desde: 'Oficina 1', a: 'Oficina 2', cantidad: 12, estado: 'Hecho' },
    { fecha: '2023-09-15', referencia: 'alerg/IN/00005', producto: 'Licha', desde: 'Oficina 2', a: 'Oficina 3', cantidad: 9, estado: 'Hecho' },
    { fecha: '2023-09-16', referencia: 'alerg/OUT/00005', producto: 'Naranja', desde: 'Oficina 3', a: 'Oficina 4', cantidad: 6, estado: 'Hecho' },
    { fecha: '2023-09-17', referencia: 'alerg/IN/00006', producto: 'Pera', desde: 'Oficina 4', a: 'Oficina 5', cantidad: 11, estado: 'Hecho' },
    { fecha: '2023-09-18', referencia: 'alerg/OUT/00006', producto: 'Manzana', desde: 'Oficina 5', a: 'Oficina 6', cantidad: 14, estado: 'Hecho' },
    { fecha: '2023-09-19', referencia: 'alerg/IN/00007', producto: 'Pera', desde: 'Oficina 6', a: 'Oficina 1', cantidad: 13, estado: 'Hecho' },
];

const HistorialDeMovimientos = () => {
    const [operations, setOperations] = useState(sampleOperations);
    const [filteredOperations, setFilteredOperations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [referenceFilter, setReferenceFilter] = useState(''); // IN or OUT
    const [currentPage, setCurrentPage] = useState(1);
    const [operationsPerPage] = useState(5);

    useEffect(() => {
        filterOperations();
    }, [operations, searchTerm, referenceFilter]);

    const filterOperations = () => {
        let filtered = operations;
        if (searchTerm) {
            filtered = filtered.filter(operation =>
                operation.producto.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (referenceFilter) {
            filtered = filtered.filter(operation =>
                operation.referencia.includes(referenceFilter)
            );
        }
        setFilteredOperations(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when changing search term
    };

    const handleReferenceFilterChange = (e) => {
        setReferenceFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when changing filter
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * operationsPerPage;
    const paginatedOperations = filteredOperations.slice(startIndex, startIndex + operationsPerPage);

    return (
        <div>
            <FeatureNavbar />
            <h1>Historial de Movimientos</h1>
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Buscar por producto"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <FormControl
                                as="select"
                                value={referenceFilter}
                                onChange={handleReferenceFilterChange}
                            >
                                <option value="">Todos</option>
                                <option value="IN">IN</option>
                                <option value="OUT">OUT</option>
                            </FormControl>
                        </InputGroup>
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
                                                <Button
                                                    variant="success" // Color verde para el estado 'Hecho'
                                                >
                                                    {operation.estado}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No se encuentran operaciones</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between">
                            <Button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Página anterior
                            </Button>
                            <span>Página {currentPage} de {Math.ceil(filteredOperations.length / operationsPerPage)}</span>
                            <Button
                                disabled={currentPage === Math.ceil(filteredOperations.length / operationsPerPage)}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Página siguiente
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HistorialDeMovimientos;
