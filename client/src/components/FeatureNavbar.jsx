import React from 'react'
import {
    Button,
    Container,
    Dropdown,
    Image,
    Nav,
    Navbar,
} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function FeatureNavbar() {
    const location = useLocation()
    const navigate = useNavigate()

    const CustomToggle = React.forwardRef(({ onClick }, ref) => (
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
        <Navbar bg="dark" fluid className="border-bg-black">
            <Container fluid>
                <Button
                    variant="none"
                    className="d-flex justify-content-center align-items-center px-0"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-arrow-left-circle text-white fs-5"></i>
                    <h4 className="text-white ms-3 mb-0">
                        {location.pathname.charAt(1).toUpperCase() +
                            location.pathname.slice(2)}
                    </h4>
                </Button>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="align-items-center">
                        <Nav.Link href="#notificaciones">
                            <i className="bi bi-bell-fill text-white fs-5"></i>
                        </Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-avatar"
                            />

                            <Dropdown.Menu align="end">
                                <Dropdown.Item href="#/profile">
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item href="/configuracion">
                                    Settings
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
