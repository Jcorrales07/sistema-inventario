import React, { forwardRef } from 'react'
import {
    Button,
    Container,
    Dropdown,
    Image,
    Nav,
    Navbar,
} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const dropdowns = [
    {
        name: 'Almacenes',
        options: [
            { name: 'Crear Almacen', link: '/almacenes/crear' },
            { name: 'Buscar Almacen', link: '/almacenes/buscar' },
        ],
        rolePermissions: [4],
    },
    {
        name: 'Operaciones',
        options: [
            { name: 'Recibidos', link: '/almacenes/recibidos', permission: 1 },
            { name: 'Entregas', link: '/almacenes/entregas', permission: 2 },
        ],
        rolePermissions: [1, 2],
    },
    {
        name: 'Productos',
        options: [
            { name: 'Crear Producto', link: '/productos/crear' },
            { name: 'Buscar Producto', link: '/productos/buscar' },
        ],
        rolePermissions: [3],
    },
    {
        name: 'Reportes',
        options: [
            { name: 'Existencias', link: '/reportes/existencias' },
            { name: 'Historia de movimientos', link: '/reportes/historial' },
        ],
        rolePermissions: [7],
    },
    {
        name: 'Usuarios',
        options: [
            { name: 'Crear Usuario', link: '/usuarios/registrar' },
            { name: 'Buscar Usuario', link: '/usuarios/buscar' },
        ],
        rolePermissions: [5],
    },
]

const user = JSON.parse(localStorage.getItem('user'))

function FeatureNavbar() {
    const location = useLocation()
    const navigate = useNavigate()

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
        <Navbar bg="dark" expand="lg" className="border-bg-black">
            <Container fluid>
                <Button
                    variant="none"
                    className="d-flex justify-content-center align-items-center px-0"
                    onClick={() => {
                        console.log('navigate(-1)')
                        navigate(-1)
                    }}
                >
                    <i className="bi bi-arrow-left-circle text-white fs-5"></i>
                    <h4 className="text-white ms-3 mb-0">
                        {location.pathname.charAt(1).toUpperCase() +
                            location.pathname.slice(2)}
                    </h4>
                </Button>
                <Nav className="d-flex flex-row align-items-center mx-5">
                    {dropdowns
                        .filter(
                            (dropdown) =>
                                user.privilegios.some((privilegio) =>
                                    dropdown.rolePermissions.includes(
                                        privilegio.id
                                    )
                                ) ||
                                dropdown.rolePermissions.length === 0 ||
                                user.roles.some((rol) => rol.id === 1) // Allow access to admin
                        )
                        .map((dropdown) => (
                            <Dropdown key={dropdown.name} className="text-white mx-1">
                                <Dropdown.Toggle
                                    variant="secondary"
                                    bsPrefix="btn text-white"
                                >
                                    {dropdown.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    {dropdown.options
                                        .filter((option) =>
                                            option.permission
                                                ? user.privilegios.some(
                                                      (privilegio) =>
                                                          privilegio.id ===
                                                          option.permission
                                                  ) ||
                                                  user.roles.some(
                                                      (rol) => rol.id === 1 // Admin can see all options
                                                  )
                                                : true
                                        )
                                        .map((option) => (
                                            <Dropdown.Item
                                                key={option.name}
                                                href={option.link}
                                            >
                                                {option.name}
                                            </Dropdown.Item>
                                        ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        ))}
                </Nav>
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
                                    onClick={() => {
                                        localStorage.removeItem('user')
                                        localStorage.removeItem('productos')
                                        localStorage.removeItem('users')
                                    }}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default FeatureNavbar
