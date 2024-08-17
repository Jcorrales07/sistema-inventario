import React from 'react'
import FeatureNavbar from '../components/FeatureNavbar'
import { Container } from 'react-bootstrap'

function CRUDProductosPage() {
    return (
        <div>
            <FeatureNavbar />
            <Container fluid>
                <h3>Productos</h3>
            </Container>
        </div>
    )
}

export default CRUDProductosPage
