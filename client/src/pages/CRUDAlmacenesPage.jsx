import React from 'react'
import FeatureNavbar from '../components/FeatureNavbar'
import { Button, Container } from 'react-bootstrap'

function CRUDAlmacenesPage() {
    return (
        <div>
            <FeatureNavbar />
            <Container fluid>
                <Container
                    fluid
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '90vh' }}
                >
                    <div className="d-flex  gap-3">
                        <Button
                            variant="dark"
                            size="lg"
                            href="/almacenes/crear"
                        >
                            Crear nuevo Almacén
                        </Button>
                        <Button
                            variant="dark"
                            size="lg"
                            href="/almacenes/buscar"
                        >
                            Buscar Almacén
                        </Button>
                    </div>
                </Container>
            </Container>
        </div>
    )
}

export default CRUDAlmacenesPage
