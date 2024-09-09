import React from 'react'
import FeatureNavbar from '../components/FeatureNavbar'
import { Container,Button } from 'react-bootstrap'

function CRUDAlmacenesPage() {
    return (
        <div>
            <FeatureNavbar />
                <Container fluid className="d-flex justify-content-center align-items-center"
                style={{height: "90vh"}}>
                    <div className="d-flex gap-3">

                        <Button
                        variant = "dark"
                        size = "lg"
                        href = "/almacenes/recibidos"
                        >
                            Recibidos
                        </Button>


                    </div>
                
                </Container>
        </div>
    )
}

export default CRUDAlmacenesPage
