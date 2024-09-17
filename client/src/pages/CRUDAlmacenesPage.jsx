import React from 'react'
import FeatureNavbar from '../components/FeatureNavbar'
import { Button, Container } from 'react-bootstrap'

const user = JSON.parse(localStorage.getItem('user'))
console.log(user);
// console.log(user.privilegios.some((privilegio) => privilegio.id === 1));
// console.log(user.privilegios.some((privilegio) => privilegio.id === 2));

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
                            disabled={!user.privilegios.some((privilegio) => privilegio.id === 3) && !user.roles.some((rol) => rol.id === 1)}
                            variant="dark"
                            size="lg"
                            href="/almacenes/crear"
                        >
                            Crear nuevo Almacén
                        </Button>
                        <Button
                            disabled={!user.privilegios.some((privilegio) => privilegio.id === 3) && !user.roles.some((rol) => rol.id === 1)}
                            variant="dark"
                            size="lg"
                            href="/almacenes/buscar"
                        >
                            Buscar Almacén
                        </Button>
                        <Button
                        disabled={!user.privilegios.some((privilegio) => privilegio.id === 1) && !user.roles.some((rol) => rol.id === 1)}
                        variant = "dark"
                        size = "lg"
                        href = "/almacenes/recibidos"
                        >
                            Recibidos
                        </Button>
                        <Button
                        disabled={!user.privilegios.some((privilegio) => privilegio.id === 2) && !user.roles.some((rol) => rol.id === 1)}
                        variant = "dark"
                        size = "lg"
                        href = "/almacenes/entregas"
                        >
                            Entregas
                        </Button>
                    </div>
                </Container>
            </Container>
        </div>
    )
}

export default CRUDAlmacenesPage
