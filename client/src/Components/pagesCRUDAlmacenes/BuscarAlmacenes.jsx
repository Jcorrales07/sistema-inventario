import React, { useEffect, useState } from 'react'
import {
    Container,
    Button,
    FormControl,
    Table,
    Pagination,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FeatureNavbar from '../FeatureNavbar'

const dummyAlmacenes = [
    {
        id: 1,
        nombre: 'Almacén Central',
        ubicacion: 'Planta Baja - Sector A',
        direccion: 'Av. Siempre Viva 123, Ciudad',
    },
    {
        id: 2,
        nombre: 'Almacén Norte',
        ubicacion: 'Planta Alta - Sector B',
        direccion: 'Calle Falsa 456, Ciudad',
    },
    {
        id: 3,
        nombre: 'Almacén Sur',
        ubicacion: 'Subsuelo - Sector C',
        direccion: 'Avenida Principal 789, Ciudad',
    },
    {
        id: 4,
        nombre: 'Depósito Este',
        ubicacion: 'Planta Baja - Sector D',
        direccion: 'Camino Verde 321, Ciudad',
    },
    {
        id: 5,
        nombre: 'Depósito Oeste',
        ubicacion: 'Planta Alta - Sector E',
        direccion: 'Ruta Azul 654, Ciudad',
    },
    {
        id: 6,
        nombre: 'Almacén Externo',
        ubicacion: 'Planta Baja - Sector F',
        direccion: 'Calle Larga 987, Afueras',
    },
    {
        id: 7,
        nombre: 'Almacén Temporal',
        ubicacion: 'Subsuelo - Sector G',
        direccion: 'Carretera Norte 159, Ciudad',
    },
    {
        id: 8,
        nombre: 'Almacén Frigorífico',
        ubicacion: 'Planta Baja - Sector H',
        direccion: 'Avenida Fría 753, Ciudad',
    },
    {
        id: 9,
        nombre: 'Depósito de Químicos',
        ubicacion: 'Planta Alta - Sector I',
        direccion: 'Zona Industrial 246, Ciudad',
    },
    {
        id: 10,
        nombre: 'Depósito General',
        ubicacion: 'Subsuelo - Sector J',
        direccion: 'Paseo Comercial 357, Ciudad',
    },
    {
        id: 11,
        nombre: 'Almacén Secundario',
        ubicacion: 'Planta Baja - Sector K',
        direccion: 'Callejón Central 101, Ciudad',
    },
    {
        id: 12,
        nombre: 'Almacén Tercero',
        ubicacion: 'Subsuelo - Sector L',
        direccion: 'Carril Sur 202, Ciudad',
    },
]

function BuscarAlmacenes() {
    const [almacenes, setAlmacenes] = useState([])
    const [filteredAlmacenes, setFilteredAlmacenes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10
    const navigate = useNavigate()

    // useEffect(() => {
    //     // Simulación de llamada a la API para traer los almacenes
    //     fetch('/api/almacenes') // Ajusta la ruta de la API según corresponda
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setAlmacenes(data)
    //             setFilteredAlmacenes(data) // Iniciar con todos los registros
    //         })
    //         .catch((error) => console.error('Error fetching almacenes:', error))
    // }, [])

    useEffect(() => {
        setAlmacenes(dummyAlmacenes)
        setFilteredAlmacenes(dummyAlmacenes) // Iniciar con todos los registros
    }, [])

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = almacenes.filter(
            (almacen) =>
                almacen.nombre.toLowerCase().includes(term) ||
                almacen.ubicacion.toLowerCase().includes(term) ||
                almacen.direccion.toLowerCase().includes(term)
        )
        setFilteredAlmacenes(filtered)
    }

    const handleEdit = () => {
        // Redirigir a la pantalla de edición del almacén
        navigate(`/almacenes/editar/`)
    }

    const handleNew = () => {
        // Redirigir a la pantalla de creación de un nuevo almacén
        navigate('/almacenes/crear')
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Paginación
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = filteredAlmacenes.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    )

    const totalPages = Math.ceil(filteredAlmacenes.length / recordsPerPage)

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <FeatureNavbar />
            <Container fluid className="mt-4">
                <div className="d-flex justify-content-between mb-3">
                    <h2>Almacenes</h2>
                    <div className="d-flex">
                        <Button
                            variant="primary"
                            onClick={handleNew}
                            className="me-3"
                        >
                            Nuevo
                        </Button>
                        <FormControl
                            type="search"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ width: '300px' }}
                        />
                    </div>
                </div>
                <div style={{ height: '65vh' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ubicación de existencias</th>
                                <th>Dirección</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.length > 0 ? (
                                currentRecords.map((almacen) => (
                                    <tr
                                        key={almacen.id}
                                        className="align-middle"
                                    >
                                        <td>{almacen.nombre}</td>
                                        <td>{almacen.ubicacion}</td>
                                        <td>{almacen.direccion}</td>
                                        <td className="text-center">
                                            <Button
                                                variant=""
                                                className="border"
                                                onClick={() => handleEdit()}
                                            >
                                                ✏️
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Paginación */}
                <Pagination className="mt-3">
                    <Pagination.Prev
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <Pagination.Item
                            key={pageNumber + 1}
                            active={pageNumber + 1 === currentPage}
                            onClick={() => handlePageChange(pageNumber + 1)}
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </div>
    )
}

export default BuscarAlmacenes
