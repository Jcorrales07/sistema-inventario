import React from "react";
import { Button, Container } from "react-bootstrap";
import { FeatureNavbar } from "../components";


function CRUDReportesPage() {
    return (
        <div>
            <FeatureNavbar />
                <Container fluid className="d-flex justify-content-center align-items-center"
                style={{height: "90vh"}}>
                    <div className="d-flex gap-3">

                        <Button
                        variant = "dark"
                        size = "lg"
                        href = ""
                        >
                            Existencias
                        </Button>

                        <Button
                        variant = "dark"
                        size = "lg"
                        href = "">
                           Historial de Moviemientos 
                        </Button>

                    </div>
                
                </Container>
        </div>
    )
}

export default CRUDReportesPage
