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
import ApiAlmacenes from '../../../api/almacen.api'
const dummyAlmacenes = [
    {
        id: 1,
        nombreAlmacen: 'Almacén Central',
        nombreCorto: 'AC',
        ubicacion: 'Planta Baja - Sector A',
        direccion: 'Av. Siempre Viva 123, Ciudad',
    },
    {
        id: 2,
        nombreAlmacen: 'Almacén Norte',
        nombreCorto: 'AN',
        ubicacion: 'Planta Alta - Sector B',
        direccion: 'Calle Falsa 456, Ciudad',
    },
    {
        id: 3,
        nombreAlmacen: 'Almacén Sur',
        nombreCorto: 'AS',
        ubicacion: 'Subsuelo - Sector C',
        direccion: 'Avenida Principal 789, Ciudad',
    },
    {
        id: 4,
        nombreAlmacen: 'Depósito Este',
        nombreCorto: 'DE',
        ubicacion: 'Planta Baja - Sector D',
        direccion: 'Camino Verde 321, Ciudad',
    },
    {
        id: 5,
        nombreAlmacen: 'Depósito Oeste',
        nombreCorto: 'DO',
        ubicacion: 'Planta Alta - Sector E',
        direccion: 'Ruta Azul 654, Ciudad',
    },
    {
        id: 6,
        nombreAlmacen: 'Almacén Externo',
        nombreCorto: 'AE',
        ubicacion: 'Planta Baja - Sector F',
        direccion: 'Calle Larga 987, Afueras',
    },
    {
        id: 7,
        nombreAlmacen: 'Almacén Temporal',
        nombreCorto: 'AT',
        ubicacion: 'Subsuelo - Sector G',
        direccion: 'Carretera Norte 159, Ciudad',
    },
    {
        id: 8,
        nombreAlmacen: 'Almacén Frigorífico',
        nombreCorto: 'AF',
        ubicacion: 'Planta Baja - Sector H',
        direccion: 'Avenida Fría 753, Ciudad',
    },
    {
        id: 9,
        nombreAlmacen: 'Depósito de Químicos',
        nombreCorto: 'DQ',
        ubicacion: 'Planta Alta - Sector I',
        direccion: 'Zona Industrial 246, Ciudad',
    },
    {
        id: 10,
        nombreAlmacen: 'Depósito General',
        nombreCorto: 'DG',
        ubicacion: 'Subsuelo - Sector J',
        direccion: 'Paseo Comercial 357, Ciudad',
    },
    {
        id: 11,
        nombreAlmacen: 'Almacén Secundario',
        nombreCorto: 'AS',
        ubicacion: 'Planta Baja - Sector K',
        direccion: 'Callejón Central 101, Ciudad',
    },
    {
        id: 12,
        nombreAlmacen: 'Almacén Tercero',
        nombreCorto: 'AT',
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
    

    useEffect( () => {
        const fetchAlmacenes = async () => {
            const almacen = await ApiAlmacenes.getAllAlmacenesRequest()
            console.log(almacen.data.Data);
        setAlmacenes(almacen.data.Data);
        setFilteredAlmacenes(almacen.data.Data) // Iniciar con todos los registros
      }
        fetchAlmacenes()
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

    const handleEdit = (selectedAlmacen) => {
        // Redirigir a la pantalla de edición del almacén
        navigate(`/almacenes/editar/`, { state: { almacen: selectedAlmacen } })
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
                                        <td>{almacen.nombreAlmacen}</td>
                                        <td>{almacen.ubicacion}</td>
                                        <td>{almacen.direccion}</td>
                                        <td className="text-center">
                                            <Button
                                                variant=""
                                                className="border"
                                                onClick={() => handleEdit(almacen)}
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
