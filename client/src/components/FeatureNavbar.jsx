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

    return (
        <Navbar bg="dark" fluid className="border-bg-black">
            <Container fluid>
                <Button
                    variant="none"
                    className="d-flex justify-content-center align-items-center px-0"
                    onClick={() => navigate(-1)}
                >
                    <i class="bi bi-arrow-left-circle text-white fs-5"></i>
                    <h4 className="text-white ms-3 mb-0">
                        {location.pathname.charAt(1).toUpperCase() +
                            location.pathname.slice(2)}
                    </h4>
                </Button>
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
                                <Dropdown.Item href="/configuracion">
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="/"
                                    onClick={() =>
                                        localStorage.removeItem('user')
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
    )
}

export default FeatureNavbar
