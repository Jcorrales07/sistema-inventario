import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Pagination,
  InputGroup,
  FormControl,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import FeatureNavbar from "../FeatureNavbar";
import UsuairoApi from "../../../api/usuario.api";

const BuscarUsuarios = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByActive, setFilterByActive] = useState(null);
  const [filterByRole, setFilterByRole] = useState(null);
  const [users, setUsers] = useState([]);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UsuairoApi.getAllUsuariosRequest();
        console.log(response);

        const data = response.data.Data.map((user) => ({
          name: user.Socio.nombre,
          email: user.Socio.email,
          username: user.nickname,
          role: user.Rol.nombre_rol,
          active: user.active,
          date: user.createdAt,
          infoRol: user.Rol,
          id_usuario: user.id,
        }));
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesActiveStatus =
      filterByActive === null || user.active === filterByActive;
    const matchesRole = filterByRole === null || user.role === filterByRole;
    return matchesSearchTerm && matchesActiveStatus && matchesRole;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (isActive) => {
    setFilterByActive(isActive);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilterByActive(null);
    setFilterByRole(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

    const handleFilterChange = (isActive) => {
        setFilterByActive(isActive)
        setCurrentPage(1)
        setShowFilterModal(false)
    }

    const resetFilters = () => {
        setFilterByActive(null)
        setFilterByRole(null)
        setSearchTerm('')
        setCurrentPage(1)
    }

    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex flex-column align-items-center min-vh-100 p-4"
            >
                <Row className="w-100 mb-4">
                    <Col md={8} lg={6} className="mx-auto">
                        <h3 className="text-center mb-4">
                            Usuarios en base de datos
                        </h3>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Buscar usuario..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="w-100 mb-4">
                    <Col md={8} lg={6} className="mx-auto">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Usuario</th>
                                    <th>
                                        <Button
                                            variant="link"
                                            onClick={() =>
                                                setShowRoleModal(true)
                                            }
                                            className="text-light p-0"
                                            style={{
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Rol
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            variant="link"
                                            onClick={() =>
                                                setShowFilterModal(true)
                                            }
                                            className="text-light p-0"
                                            style={{
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Activo?
                                        </Button>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.nombre}</td>
                                            <td>{user.correo}</td>
                                            <td>{user.usuario}</td>
                                            <td>{user.rol}</td>
                                            <td>{user.active ? 'Sí' : 'No'}</td>
                                            <td>
                                                <Button
                                                    variant="outline-light"
                                                    onClick={() =>
                                                        handleShowEditModal(
                                                            user
                                                        )
                                                    }
                                                >
                                                    {' ••• '}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No hay resultados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {(filterByActive !== null || filterByRole !== null) && (
                    <Row className="w-100 mb-4">
                        <Col md={8} lg={6} className="mx-auto text-center">
                            <Button variant="secondary" onClick={resetFilters}>
                                Restablecer Filtros
                            </Button>
                        </Col>
                    </Row>
                )}
                <Row className="w-100 mb-4">
                    <Col md={8} lg={6} className="mx-auto text-center">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            />
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === currentPage}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </Col>
                </Row>
            </Container>

            <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtrar por Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="primary"
                        className="w-100 mb-2"
                        onClick={() => {
                            setFilterByRole('Administrador')
                            setShowRoleModal(false)
                        }}
                    >
                        Administrador
                    </Button>
                    <Button
                        variant="primary"
                        className="w-100 mb-2"
                        onClick={() => {
                            setFilterByRole('Encargado de Entradas')
                            setShowRoleModal(false)
                        }}
                    >
                        Encargado de Entradas
                    </Button>
                    <Button
                        variant="primary"
                        className="w-100 mb-2"
                        onClick={() => {
                            setFilterByRole('Encargado de Salidas')
                            setShowRoleModal(false)
                        }}
                    >
                        Encargado de Salidas
                    </Button>
                    <Button
                        variant="primary"
                        className="w-100 mb-2"
                        onClick={() => {
                            setFilterByRole('Analista de Compras')
                            setShowRoleModal(false)
                        }}
                    >
                        Analista de Compras
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal
                show={showFilterModal}
                onHide={() => setShowFilterModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filtrar por Estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="primary"
                        className="w-100 mb-2"
                        onClick={() => handleFilterChange(true)}
                    >
                        Activos
                    </Button>
                    <Button
                        variant="danger"
                        className="w-100 mb-2"
                        onClick={() => handleFilterChange(false)}
                    >
                        Inactivos
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Body>
                    ¿Desea editar al usuario "{selectedUser?.nombre}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={handleCloseEditModal}
                        href="/usuarios/editar"
                    >
                        Editar Usuario
                    </Button>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BuscarUsuarios
