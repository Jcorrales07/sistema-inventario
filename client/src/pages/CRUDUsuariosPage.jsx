import React from "react";
import { Button, Container } from "react-bootstrap";
import { FeatureNavbar } from "../components";

function CRUDUsuariosPage() {
  const handleRegistrarUsuario = () => {
    localStorage.removeItem("formData");
  };

  return (
    <div>
      <FeatureNavbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div className="d-flex  gap-3">
          <Button
            onClick={handleRegistrarUsuario}
            variant="dark"
            size="lg"
            href="/usuarios/registrar"
          >
            Registrar nuevo usuario
          </Button>
          <Button variant="dark" size="lg" href="/usuarios/buscar">
            Buscar Usuario
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default CRUDUsuariosPage;
