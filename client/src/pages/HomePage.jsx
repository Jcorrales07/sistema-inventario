import React, { act, forwardRef, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    Image,
    Button,
    Dropdown,
    Badge,
    Stack,
} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import productoApi from '../../api/producto.api'
import operacionApi from '../../api/operacion.api'

import 'bootstrap/dist/css/bootstrap.min.css'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

const buttons = [
    {
        name: 'Dashboard',
        link: '/home',
        rolePermissions: [],
    },
    {
        name: 'Gestión de Productos',
        link: '/productos',
        rolePermissions: [3],
    },
    {
        name: 'Gestión de Almacenes',
        link: '/almacenes',
        rolePermissions: [1, 2, 4],
    },
    {
        name: 'Gestión de Usuarios',
        link: '/usuarios',
        rolePermissions: [5],
    },
    // {
    //     name: 'Gestión de Proveedores',
    //     link: '/proveedores',
    //     rolePermissions: [6],
    // },
    {
        name: 'Reportes',
        link: '/reportes',
        rolePermissions: [7],
    },
    // {
    //     name: 'Configuración',
    //     link: '/configuracion',
    //     rolePermissions: [],
    // },
]

function HomePage() {
    const [productCount, setProductCount] = useState(0)
    const [recibidosCount, setRecibidosCount] = useState(0)
    const [entregasCount, setEntregasCount] = useState(0)
    const [user, setUser] = useState({
        nombre: '',
        email: '',
        rol: '',
        username: '',
        roles: [],
        privilegios: [],
        activo: false,
    })
    const [date, setDate] = useState('Fecha')
    const location = useLocation()
    const toastShown = useRef(false)

    const fetchData = async () => {
        try {
            const response1 = await productoApi.getAllProductosRequest()
            const response2 = await operacionApi.getAllOperacionsRequest()

            const productos = response1.data.Data
            const recibidos = response2.data.Data.filter(
                (item) => item.tipo === 0
            )
            const entregas = response2.data.Data.filter(
                (item) => item.tipo === 1
            )

            setProductCount(productos.length)
            setRecibidosCount(recibidos.length)
            setEntregasCount(entregas.length)
        } catch (error) {
            console.error('Error al obtener productos', error)
        }
    }

    useEffect(() => {
        fetchData() // Ejecutar fetchData al montar el componente
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        setUser(user)
        setInterval(() => {
            const now = new Date()
            setDate(
                format(now, "EEEE, dd 'de' MMMM 'del' yyyy hh:mm a", {
                    locale: es,
                })
            )
        }, 1000)
    }, [])

    useEffect(() => {
        if (location.pathname === '/home' && !toastShown.current) {
            toast.success('Inicio de sesión exitoso!')
            toastShown.current = true
        }
    }, [location])

    const CustomToggle = forwardRef(({ onClick }, ref) => (
        <Image
            ref={ref}
            src="https://via.placeholder.com/30"
            alt="Avatar"
            className="img-fluid rounded-circle"
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
            style={{ cursor: 'pointer' }}
        />
    ))

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
                            <div className="user-avatar mb-4">
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt="Avatar"
                                    className="img-fluid rounded-circle"
                                />
                            </div>
                            <Stack
                                className="d-flex flex-column align-items-center"
                                direction="vertical"
                                gap={2}
                            >
                                <Badge
                                    pill
                                    bg="secondary"
                                    style={{ width: 'fit-content' }}
                                >
                                    {user.username.charAt(0).toUpperCase() +
                                        user.username.slice(1)}
                                </Badge>

                                <Badge
                                    pill
                                    bg="light"
                                    className="text-dark"
                                    style={{ width: 'fit-content' }}
                                >
                                    {user.email}
                                </Badge>
                            </Stack>
                        </div>

                        <Nav
                            defaultActiveKey="/"
                            className="flex-column"
                            // style={{ width: 'fit-content' }}
                        >
                            {buttons
                                .filter(
                                    (button) =>
                                        user.privilegios.some((privilegio) =>
                                            button.rolePermissions.includes(
                                                privilegio.id
                                            )
                                        ) ||
                                        button.rolePermissions.length === 0 ||
                                        user.roles.some((rol) => rol.id === 1)
                                )
                                .map((button) => (
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
                            <Button
                                key="cerrarSesion"
                                className="mb-2 w-full"
                                variant="dark"
                                onClick={() => localStorage.removeItem('user')}
                            >
                                <Nav.Link
                                    key="cerrarSesion"
                                    href="/"
                                    className="text-white text-start"
                                >
                                    Cerrar Sesión
                                </Nav.Link>
                            </Button>
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
                                <Nav className="align-items-center">
                                    <Nav.Link href="/home">
                                        <i className="bi bi-house-fill text-white fs-5"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#notificaciones">
                                        <i className="bi bi-bell-fill text-white fs-5"></i>
                                    </Nav.Link>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            as={CustomToggle}
                                            id="dropdown-avatar"
                                        />

                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item href="/configuracion">
                                                Configuracion
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                href="/"
                                                onClick={() =>
                                                    localStorage.removeItem(
                                                        'user'
                                                    )
                                                }
                                            >
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
                            <Col className="mx-2">
                                <Card className="border-0 shadow-sm p-3">
                                    <Card.Body>
                                        <h5>
                                            <i className="bi bi-box-seam"></i>{' '}
                                            Cantidad de productos
                                        </h5>
                                        <p className="display-6">
                                            {productCount}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mx-2">
                                <Card className="border-0 shadow-sm p-3">
                                    <Card.Body>
                                        <h5>
                                            <i className="bi bi-arrow-down-circle"></i>{' '}
                                            Cantidad de recepciones
                                        </h5>
                                        <p className="display-6">
                                            {recibidosCount}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mx-2">
                                <Card className="border-0 shadow-sm p-3">
                                    <Card.Body>
                                        <h5>
                                            <i className="bi bi-arrow-up-circle"></i>{' '}
                                            Cantidad de entregas
                                        </h5>
                                        <p className="display-6">
                                            {entregasCount}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* <Row className="text-center mb-3">
                            <Col className="border p-3 mx-2">Contenido 1</Col>
                            <Col className="border p-3 mx-2">Contenido 2</Col>
                            <Col className="border p-3 mx-2">Contenido 3</Col>
                        </Row>
                        <Row className="text-center mb-3">
                            <Col className="border p-3 mx-2">Contenido 1</Col>
                            <Col className="border p-3 mx-2">Contenido 2</Col>
                            <Col className="border p-3 mx-2">Contenido 3</Col>
                        </Row> */}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
