import React, { useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    ListGroup,
    Table,
    InputGroup,
    FormControl,
    Button,
    Modal,
    Pagination,
} from 'react-bootstrap'
import FeatureNavbar from '../FeatureNavbar'

// Datos de ejemplo
const sampleWarehouses = [
    { id: 1, name: 'Almacén A' },
    { id: 2, name: 'Almacén B' },
    { id: 3, name: 'Almacén C' },
]

const sampleProducts = [
    {
        id: 1,
        name: 'Manzana',
        warehouseId: 1,
        available: 100,
        availableForUse: 50,
        incoming: 10,
        outgoing: 5,
    },
    {
        id: 2,
        name: 'Pera',
        warehouseId: 1,
        available: 200,
        availableForUse: 75,
        incoming: 20,
        outgoing: 10,
    },
    {
        id: 3,
        name: 'Mango',
        warehouseId: 2,
        available: 150,
        availableForUse: 80,
        incoming: 15,
        outgoing: 8,
    },
    {
        id: 4,
        name: 'Manzana',
        warehouseId: 3,
        available: 120,
        availableForUse: 60,
        incoming: 12,
        outgoing: 7,
    },
    {
        id: 5,
        name: 'Banano',
        warehouseId: 1,
        available: 180,
        availableForUse: 90,
        incoming: 25,
        outgoing: 12,
    },
    {
        id: 6,
        name: 'Naranja',
        warehouseId: 2,
        available: 160,
        availableForUse: 70,
        incoming: 18,
        outgoing: 11,
    },
    {
        id: 7,
        name: 'Ciruela',
        warehouseId: 3,
        available: 130,
        availableForUse: 65,
        incoming: 14,
        outgoing: 6,
    },
    {
        id: 8,
        name: 'Melón',
        warehouseId: 2,
        available: 190,
        availableForUse: 100,
        incoming: 20,
        outgoing: 9,
    },
    {
        id: 9,
        name: 'Fresa',
        warehouseId: 1,
        available: 140,
        availableForUse: 60,
        incoming: 18,
        outgoing: 8,
    },
    {
        id: 10,
        name: 'Papaya',
        warehouseId: 3,
        available: 150,
        availableForUse: 80,
        incoming: 22,
        outgoing: 10,
    },
]

const Existencias = () => {
    const [warehouses, setWarehouses] = useState(sampleWarehouses)
    const [selectedWarehouse, setSelectedWarehouse] = useState(null)
    const [products, setProducts] = useState(sampleProducts)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(5)

    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        filterProducts()
    }, [products, searchTerm, selectedWarehouse])

    const filterProducts = () => {
        let filtered = products
        if (selectedWarehouse) {
            filtered = filtered.filter(
                (product) => product.warehouseId === selectedWarehouse
            )
        }
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        setFilteredProducts(filtered)
    }

    const handleWarehouseSelect = (warehouseId) => {
        setSelectedWarehouse(warehouseId)
        setCurrentPage(1) // Reset to first page when changing warehouse
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) // Reset to first page when changing search term
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * productsPerPage
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    )
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleShowModal = (product) => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedProduct(null)
    }

    const handleViewHistory = () => {
        if (selectedProduct) {
            localStorage.setItem(
                'selectedProduct',
                JSON.stringify(selectedProduct)
            )
            window.location.href = '/reportes/historial'
            handleCloseModal()
        }
    }

    // Render pagination component
    const renderPagination = () => {
        const items = []
        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            )
        }

        return (
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {items}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        )
    }

    return (
        <div>
            <FeatureNavbar />
            <Container fluid>
                <h1 className="mt-4 mb-3">Existencias</h1>
                <Row>
                    <Col xs={3} className="border-end">
                        <h4>Almacenes</h4>
                        <ListGroup>
                            <ListGroup.Item
                                action
                                active={selectedWarehouse === null}
                                onClick={() => handleWarehouseSelect(null)}
                            >
                                Todos los almacenes
                            </ListGroup.Item>
                            {warehouses.map((warehouse) => (
                                <ListGroup.Item
                                    key={warehouse.id}
                                    action
                                    active={selectedWarehouse === warehouse.id}
                                    onClick={() =>
                                        handleWarehouseSelect(warehouse.id)
                                    }
                                >
                                    {warehouse.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col xs={9}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Buscar productos"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Disponible</th>
                                    <th>Disponible para uso</th>
                                    <th>Entrante</th>
                                    <th>Saliente</th>
                                    <th>Historial</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.length > 0 ? (
                                    paginatedProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.available}</td>
                                            <td>{product.availableForUse}</td>
                                            <td>{product.incoming}</td>
                                            <td>{product.outgoing}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        handleShowModal(product)
                                                    }
                                                >
                                                    Ver historial
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No se encuentra el producto
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {/* Render pagination */}
                        <div className="d-flex justify-content-center">
                            {renderPagination()}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ver historial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct &&
                        `Ver historial de ${selectedProduct.name}`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleViewHistory}>
                        Historial
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Existencias
