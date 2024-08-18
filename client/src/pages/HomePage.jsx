import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
// prettier-ignore
import {
    Container, Row, Col, Navbar, Nav, Image, Button, Dropdown,
} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const buttons = [
    {
        name: 'Dashboard',
        link: '/',
    },
    {
        name: 'Gestión de Productos',
        link: '/productos',
    },
    {
        name: 'Gestión de Almacenes',
        link: '/almacenes',
    },
    {
        name: 'Gestión de Usuarios',
        link: '/usuarios',
    },
    {
        name: 'Gestión de Proveedores',
        link: '/proveedores',
    },
    {
        name: 'Reportes',
        link: '/reportes',
    },
    {
        name: 'Configuración',
        link: '/configuracion',
    },
    {
        name: 'Cerrar Sesión',
        link: '/login',
    },
]

function HomePage() {
    const [date, setDate] = React.useState('Fecha')

    useEffect(() => {
        setInterval(() => {
            const now = new Date()
            setDate(
                format(now, "EEEE, dd 'de' MMMM 'del' yyyy hh:mm a", {
                    locale: es,
                })
            )
        }, 1000)
    }, [])

    return (
        <Container fluid>
            <Row>
                {/* Columna Izquierda */}
                <Col
                    className="bg-dark text-white vh-100 py-5 px-3"
                    style={{
                        maxWidth: '350px', // Limita el ancho máximo
                        width: 'fit-content', // Se ajusta al contenido
                    }}
                >
                    <div
                        style={{ display: 'flex' }}
                        className="flex-column justify-content-between mt-5"
                    >
                        <div
                            className="user-info text-center mb-5"
                            style={{ display: 'inline-block' }}
                        >
                            <div className="user-avatar mb-2">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="Avatar"
                                    className="img-fluid rounded-circle"
                                />
                            </div>
                            <p>Nombre de usuario</p>
                            <p>correo@electronico.com</p>
                        </div>

                        <Nav
                            defaultActiveKey="/"
                            className="flex-column"
                            // style={{ width: 'fit-content' }}
                        >
                            {buttons.map((button) => (
                                <Button
                                    key={button.name}
                                    className="mb-2 w-full"
                                    variant="dark"
                                >
                                    <Nav.Link
                                        key={button.name}
                                        href={button.link}
                                        className="text-white text-start"
                                    >
                                        {button.name}
                                    </Nav.Link>
                                </Button>
                            ))}
                        </Nav>
                    </div>
                </Col>

                {/* Columna Principal */}
                <Col className="flex-grow-1 p-0">
                    {/* Barra Superior */}
                    <Navbar bg="dark" fluid className="border-bg-black">
                        <Container fluid>
                            <Navbar.Brand className="text-white text-capitalize">
                                {date}
                            </Navbar.Brand>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    <Nav.Link href="#notificaciones">
                                        <i class="bi bi-bell-fill text-white fs-5"></i>
                                    </Nav.Link>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="link"
                                            id="dropdown-avatar"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                            }}
                                        >
                                            <Image
                                                src="https://via.placeholder.com/30"
                                                alt="Avatar"
                                                className="img-fluid rounded-circle"
                                            />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item href="#/profile">
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/settings">
                                                Settings
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/logout">
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {/* Contenido Principal */}
                    <Container
                        style={{
                            padding: '35px',
                        }}
                        fluid
                    >
                        <h4>Estado del inventario:</h4>

                        <Row className="text-center mb-3">
                            <Col className="border p-3 mx-2">Contenido 1</Col>
                            <Col className="border p-3 mx-2">Contenido 2</Col>
                            <Col className="border p-3 mx-2">Contenido 3</Col>
                        </Row>
                        <Row className="text-center mb-3">
                            <Col className="border p-3 mx-2">Contenido 1</Col>
                            <Col className="border p-3 mx-2">Contenido 2</Col>
                            <Col className="border p-3 mx-2">Contenido 3</Col>
                        </Row>
                        <Row className="text-center mb-3">
                            <Col className="border p-3 mx-2">Contenido 1</Col>
                            <Col className="border p-3 mx-2">Contenido 2</Col>
                            <Col className="border p-3 mx-2">Contenido 3</Col>
                        </Row>
                        {/* Aquí puedes agregar más contenido */}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
