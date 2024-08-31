import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatureNavbar from "../FeatureNavbar";
import usuarioApi from "../../../api/usuario.api";

function RegistroUsuarios() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    usuario: "",
    identificacion: "",
    numeroIdentidad: "",
    contrasena: "",
    roles: [],
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (formData.nombre.trim() === "" || formData.nombre.length > 50) {
      newErrors.nombre =
        "El nombre no debe estar vacío ni exceder 50 caracteres.";
    }
    if (
      !/^(\+\d{1,3}[-\s]?)?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,9}$/.test(
        formData.telefono
      )
    ) {
      newErrors.telefono =
        "El teléfono solo debe contener números y el carácter '+'.";
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(formData.correo)) {
      newErrors.correo = "El correo electrónico no es válido.";
    }
    if (
      !/^[a-z0-9._]+$/.test(formData.usuario) ||
      formData.usuario.length > 50
    ) {
      newErrors.usuario =
        "El usuario debe tener menos de 50 caracteres y solo puede contener letras minúsculas, números, guión bajo y punto.";
    }
    if (!/^\d{4}-\d{4}-\d{5}$/.test(formData.numeroIdentidad)) {
      newErrors.numeroIdentidad =
        "El número de identidad debe tener el formato xxxx-xxxx-xxxxx.";
    }
    if (formData.contrasena.length < 8) {
      newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
    }
    if (formData.roles.length === 0) {
      newErrors.roles = "Debe asignar un rol.";
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setFormData(formData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignRoles = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/usuarios/roles");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      const socio = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.correo,
        rtn: formData.identificacion,
        tipo: "individuo",
      };

      const usuario = {
        nickname: formData.usuario,
        contrasena: formData.contrasena,
        rol: getRolInt(formData.rol),
      };
      const apiResponse = await usuarioApi.createUsuarioSocioRequest(
        usuario,
        socio
      );

      if (apiResponse && apiResponse.status >= 200) {
        setSuccessMessage(
          `El usuario para ${formData.nombre} fue creado exitosamente!`
        );
        setShowToast(true);

        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        setErrors({ form: "Hubo un problema con el registro" });
      }
    } else {
      setErrors({
        form: "Por favor, complete todos los campos correctamente.",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      telefono: "",
      correo: "",
      usuario: "",
      identificacion: "",
      numeroIdentidad: "",
      contrasena: "",
      rol: "",
    });
    localStorage.removeItem("formData");
    setErrors({});
    setSuccessMessage("");
    navigate(-1);
  };

  return (
    <div>
      <FeatureNavbar />
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Form className="w-75" onSubmit={handleSubmit}>
          <h3 className="text-center">Registro de Usuarios</h3>

          <Row>
            <Col md={6}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  maxLength="50"
                  value={formData.nombre}
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="numeroIdentidad">
                <Form.Label>Número de Identidad</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroIdentidad"
                  placeholder="xxxx-xxxx-xxxxx"
                  value={formData.numeroIdentidad}
                  onChange={handleChange}
                  isInvalid={!!errors.numeroIdentidad}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numeroIdentidad}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="usuario">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  maxLength="50"
                  value={formData.usuario}
                  onChange={handleChange}
                  isInvalid={!!errors.usuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.usuario}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="correo">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="correo"
                  placeholder="correo@email.com"
                  value={formData.correo}
                  onChange={handleChange}
                  isInvalid={!!errors.correo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.correo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="telefono">
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  placeholder="+xxx xxxxxxxx"
                  value={formData.telefono}
                  onChange={handleChange}
                  isInvalid={!!errors.telefono}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  isInvalid={!!errors.contrasena}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contrasena}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <Button variant="primary" onClick={handleAssignRoles}>
                Asignar Roles
              </Button>
            </Col>

            <Col md={6}>
              <Form.Group controlId="rolesAsignados">
                <Form.Label>Roles del usuario:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Roles asignados..."
                  style={{ height: "100px", resize: "none" }}
                  readOnly
                  value={"🔺" + formData.roles.map((rol) => rol.nombre_rol).join(",\n🔺")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="primary" type="submit" disabled={!formValid}>
                Guardar Usuario
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </Col>
          </Row>

          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Body>{successMessage}</Toast.Body>
          </Toast>

          {errors.form && (
            <Alert variant="danger" className="mt-3">
              {errors.form}
            </Alert>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default RegistroUsuarios;
