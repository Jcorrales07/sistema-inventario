import React, { useState, useEffect } from 'react';
import FeatureNavbar from '../FeatureNavbar';
import { Container, Row, Col, Table, Form, Button, Pagination, Badge } from 'react-bootstrap';

function Recibidos() {
    const [data, setData] = useState([
        // Your data here
        {
            referencia: '12345',
            desde: 'Honduras',
            a: 'USA',
            contacto: 'John Doe',
            fechaProgramada: '2024-09-05',
            documentoOrigen: 'Invoice #001',
            estado: 'Cancelado'
        },
        {
            referencia: '67890',
            desde: 'Brazil',
            a: 'Canada',
            contacto: 'Jane Smith',
            fechaProgramada: '2024-09-06',
            documentoOrigen: 'Invoice #002',
            estado: 'Borrador'
        },
        {
            referencia: '123452',
            desde: 'Honduras2',
            a: 'USA2',
            contacto: 'John Doe2',
            fechaProgramada: '2024-09-05',
            documentoOrigen: 'Invoice #001',
            estado: 'Listo'
        },
        {
            referencia: '678903',
            desde: 'Brazil3',
            a: 'Canada3',
            contacto: 'Jane Smith3',
            fechaProgramada: '2024-09-063',
            documentoOrigen: 'Invoice #0023',
            estado: 'Hecho'
        }
        // Add more rows if needed
    ]);

    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        // Apply search term and filter criteria
        let filtered = data;

        if (filterEstado) {
            filtered = filtered.filter(item => item.estado === filterEstado);
        }

        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        setFilteredData(filtered);
    }, [searchTerm, filterEstado, data]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterEstado(e.target.value);
    };

    const clearFilter = () => {
        setFilterEstado('');
    };

    // Calculate pagination data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentPageData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to determine badge variant
    const getBadgeVariant = (estado) => {
        switch (estado) {
            case 'Cancelado':
                return 'danger';
            case 'Listo':
                return 'primary';
            case 'Hecho':
                return 'success';
            case 'Borrador':
                return 'secondary';
            default:
                return 'light';
        }
    };

    return (
        <div>
            <FeatureNavbar />
            <Container fluid>
                <h1>Recibidos</h1>
                <Row className="mb-3">      
                    <Col xs={12} md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="primary" href="/another-page">
                            Nuevo Recibidos
                        </Button>
                    </Col>
                    <Col>
                        <div>
                            <Form.Control
                                as="select"
                                value={filterEstado}
                                onChange={handleFilterChange}
                            >
                                <option value="">Todos</option>
                                <option value="Hecho">Hecho</option>
                                <option value="Borrador">Borrador</option>
                                <option value="Listo">Listo</option>
                                <option value="Cancelado">Cancelado</option>
                            </Form.Control>
                            <Button variant="secondary" onClick={clearFilter} className="ms-2">
                                Limpiar Filtro
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Referencia</th>
                            <th>Desde</th>
                            <th>Dirigido a</th>
                            <th>Contacto</th>
                            <th>Fecha Programada</th>
                            <th>Documento Origen</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.referencia}</td>
                                <td>{item.desde}</td>
                                <td>{item.a}</td>
                                <td>{item.contacto}</td>
                                <td>{item.fechaProgramada}</td>
                                <td>{item.documentoOrigen}</td>
                                <td>
                                    <Badge bg={getBadgeVariant(item.estado)}>
                                        {item.estado}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item
                                key={number + 1}
                                active={number + 1 === currentPage}
                                onClick={() => handlePageChange(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </div>
            </Container>
        </div>
    );
}

export default Recibidos;