import React, { useState, useEffect } from 'react'
import FeatureNavbar from '../FeatureNavbar'
import { Button, Container, Row, Table, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AsignarRoles() {
    const [checkedItems, setCheckedItems] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [rolName, setRolName] = useState('')
    const [rolDescription, setRolDescription] = useState('')
    const [newPermissions, setNewPermissions] = useState({})
    const [formComplete, setFormComplete] = useState(false)
    const navigate = useNavigate()

    const handleCheckboxChange = (index) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }))
    }

    const handleCloseModal = () => {
        resetForm()
        setShowModal(false)
    }

    const handleShowModal = () => setShowModal(true)

    const resetForm = () => {
        setRolName('')
        setRolDescription('')
        setNewPermissions({})
        setFormComplete(false)
    }

    const handleCreateRole = () => {
        const roleData = {
            name: rolName,
            description: rolDescription,
            permissions: Object.keys(newPermissions).filter(
                (key) => newPermissions[key]
            ),
        }

        console.log('Creating role with data:', roleData)

        // Add code to send `roleData` to your backend or database here

        handleCloseModal() // This will reset the form and close the modal
    }

    const handlePermissionChange = (index) => {
        setNewPermissions((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }))
    }

    const handleAssignRoles = () => {
        const selectedRoles = Object.keys(checkedItems).filter(
            (key) => checkedItems[key]
        )

        // Add code to send `selectedRoles` to your backend or database here
        console.log('Assigning roles:', selectedRoles)
        navigate(-1)
    }

    const isAssignButtonDisabled = !Object.values(checkedItems).includes(true)

    useEffect(() => {
        // Check if all fields are filled and at least one permission is selected
        const allFieldsFilled =
            rolName.trim() !== '' &&
            rolDescription.trim() !== '' &&
            Object.values(newPermissions).includes(true)

        setFormComplete(allFieldsFilled)
    }, [rolName, rolDescription, newPermissions])

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <FeatureNavbar />

            <Container
                fluid
                className="px-4 py-3 d-flex flex-column flex-grow-1"
            >
                <Container fluid className="d-flex justify-content-center">
                    <h3>Usuario a asignar: Nombre de usuario</h3>
                </Container>

                <Container
                    fluid
                    className="d-flex flex-column align-items-center flex-grow-1"
                >
                    <div
                        style={{
                            width: '80%',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '20px',
                        }}
                    >
                        <h4>Roles disponibles:</h4>

                        <Table
                            responsive
                            bordered
                            striped
                            hover
                            variant="dark"
                            className="flex-grow-1"
                        >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Rol</th>
                                    <th>Permisos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td style={{ width: '3%' }}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={
                                                    checkedItems[i] || false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(i)
                                                }
                                            />
                                        </td>
                                        <td>Rol {i + 1}</td>
                                        <td>Permisos {i + 1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
                <Row>
                    <Container
                        fluid
                        className="d-flex gap-3 justify-content-center p-3"
                    >
                        <Button
                            onClick={handleAssignRoles}
                            disabled={isAssignButtonDisabled}
                        >
                            Asignar roles seleccionados
                        </Button>
                        <Button onClick={handleShowModal}>
                            Crear nuevo rol
                        </Button>
                    </Container>
                </Row>
            </Container>

            {/* Modal Component */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="rolName">
                            <Form.Label>Nombre del Rol</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del rol"
                                value={rolName}
                                onChange={(e) => setRolName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="rolDescription">
                            <Form.Label>Descripción del Rol</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Descripción del rol"
                                value={rolDescription}
                                onChange={(e) =>
                                    setRolDescription(e.target.value)
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="permissions">
                            <Form.Label>Permisos</Form.Label>
                            <Table bordered striped hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Seleccionar</th>
                                        <th>Permiso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td style={{ width: '3%' }}>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={
                                                        newPermissions[i] ||
                                                        false
                                                    }
                                                    onChange={() =>
                                                        handlePermissionChange(
                                                            i
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>Permiso {i + 1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleCreateRole}
                        disabled={!formComplete}
                    >
                        Crear Rol
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AsignarRoles
