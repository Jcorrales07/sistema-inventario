import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { FeatureNavbar } from '../components'

function CRUDUsuariosPage() {
    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <div className="d-flex  gap-3">
                    <Button variant="dark" size="lg" href="/usuarios/registrar">
                        Registrar nuevo usuario
                    </Button>
                    <Button variant="dark" size="lg">
                        Buscar Usuario
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default CRUDUsuariosPage
