import React from 'react'
import FeatureNavbar from '../components/FeatureNavbar'
import { Button, Container } from 'react-bootstrap'

function CRUDProductosPage() {
    return (
        <div>
            <FeatureNavbar />
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ height: '90vh' }}
            >
                <div className="d-flex  gap-3">
                    <Button variant="dark" size="lg" href="/productos/crear">
                        Crear nuevo producto
                    </Button>
                    <Button variant="dark" size="lg" href="/productos/buscar">
                        Buscar Producto
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default CRUDProductosPage
