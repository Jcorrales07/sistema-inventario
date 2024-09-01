// src/components/pagesCRUDUsuarios/EditarUsuarios.js

import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatureNavbar from "../FeatureNavbar";
import usuarioApi from "../../../api/usuario.api";
import socioApi from "../../../api/socio.api";

function EditarUsuarios() {
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

  const [activo, setActivo] = useState(false);

  // Validar formulario al cambiar el formData
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Cargar datos desde localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));

      setActivo(JSON.parse(storedData).active);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle = () => {
    setActivo(!activo);
  };

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
      newErrors.rol = "Debe seleccionar un rol.";
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignRoles = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      setFormValid(false);
      const socio = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.correo,
        rtn: formData.numeroIdentidad,
        tipo: "individuo",
      };

      const usuario = {
        nickname: formData.usuario,
        contrasena: formData.contrasena,
        roles: formData.roles,
        active: activo,
      };

      try {
        const socioResponse = await socioApi.putSocioRequest(
          formData.id_socio,
          socio
        );

        if (!socioResponse || socioResponse.status >= 300) {
          setErrors({
            form: "Hubo un problema con la actualizacion del socio",
          });
          return;
        }

        const usuarioResponse = await usuarioApi.putUsuarioRequest(
          formData.id_usuario,
          usuario
        );

        if (!usuarioResponse || usuarioResponse.status >= 300) {
          setErrors({
            form: "Hubo un problema con la actualizacion del usuario",
          });
          return;
        }

        // Faltaria actualizar los roles

        setSuccessMessage(
          `Los datos del usuario para ${formData.nombre} fueron actualizados exitosamente!`
        );
        setShowToast(true);

        setTimeout(() => {
          navigate("/usuarios/buscar");
        }, 3000);
      } catch (error) {
        setErrors({ form: "Hubo un error en la solicitud." });
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
      roles: [],
    });
    setErrors({});
    setSuccessMessage("");
    navigate(-1);
  };

  return (
    <div>
      <FeatureNavbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 mt-5 mb-5"
      >
        <Form className="w-75" onSubmit={handleSubmit}>
          <h3 className="text-center mb-5">
            Editar cuenta de: {formData.nombre}
          </h3>

          <Row className="mb-3">
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
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="correo">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  maxLength="50"
                  value={formData.correo}
                  onChange={handleChange}
                  isInvalid={!!errors.correo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.correo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

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
          </Row>

          <Row className="mt-3">
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

            <Col md={6}>
              <Form.Group controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    isInvalid={!!errors.contrasena}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.contrasena}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col md={6} className="mt-4">
              <Button href="/usuarios/roles" onClick={handleAssignRoles}>
                Asignar Roles
              </Button>
            </Col>

            <Col md={6}>
              <Form.Label>Roles del usuario:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Roles asignados..."
                style={{ height: "100px", resize: "none" }}
                cols={2}
                value={
                  "🔺" +
                  formData.roles.map((rol) => rol.nombre_rol).join(".\n🔺")
                }
                readOnly
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Label>Cuenta Activa:</Form.Label>
              <br />
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={activo}
                onChange={handleToggle}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="primary" type="submit" disabled={!formValid}>
                Aplicar Cambios
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={handleCancel}>
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

export default EditarUsuarios;
