// src/components/RegistroUsuarios.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Dropdown, DropdownButton, Toast } from 'react-bootstrap';

const RegistroUsuarios = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    usuario: '',
    identificacion: '',
    numeroIdentidad: '',
    contraseña: '',
    rol: 'Roles',
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Validar cada campo y verificar si el formulario es válido
  const validateForm = () => {
    let newErrors = {};

    // Validaciones para cada campo
    if (formData.nombre.length > 50) {
      newErrors.nombre = 'El nombre no debe exceder 50 caracteres.';
    }
    if (!/^\d{4}-\d{4}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener el formato xxxx-xxxx.';
    }
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(formData.correo)) {
      newErrors.correo = 'El correo electrónico no es válido.';
    }
    if (!/^[a-z0-9._]+$/.test(formData.usuario) || formData.usuario.length > 50) {
      newErrors.usuario = 'El usuario debe tener menos de 50 caracteres y solo puede contener letras minúsculas, números, guión bajo y punto.';
    }
    if (!/^\d{4}-\d{4}-\d{5}$/.test(formData.numeroIdentidad)) {
      newErrors.numeroIdentidad = 'El número de identidad debe tener el formato xxxx-xxxx-xxxxx.';
    }
    if (!/^\d{4}-\d{4}$/.test(formData.identificacion)) {
      newErrors.identificacion = 'El número de identificación debe tener el formato xxxx-xxxx.';
    }
    if (formData.contraseña.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (formData.rol === 'Roles') {
      newErrors.rol = 'Debe seleccionar un rol.';
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateForm();
  };

  // Manejar la selección del rol
  const handleSelectRol = (rol) => {
    setFormData({ ...formData, rol });
    validateForm();
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      // Simular la llamada a la API
      const apiResponse = null; // Simulación de respuesta nula

      if (apiResponse === null) {
        setShowToast(true);
      } else {
        setSuccessMessage(`El usuario ${formData.nombre} fue creado exitosamente!`);
        // Redirigir al menú CRUD de usuarios
      }
    } else {
      setErrors({ form: 'Por favor, complete todos los campos correctamente.' });
    }
  };

  // Limpiar el formulario y redirigir al CRUD
  const handleCancel = () => {
    setFormData({
      nombre: '',
      telefono: '',
      correo: '',
      usuario: '',
      identificacion: '',
      numeroIdentidad: '',
      contraseña: '',
      rol: 'Roles',
    });
    setErrors({});
    setSuccessMessage('');
    // Redirigir al menú CRUD de usuarios
    window.location.href = '/menu-crud-usuarios'; // Redirige a la URL correspondiente
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="w-75" onSubmit={handleSubmit}>
        <h3 className="text-center">Registro de Usuarios</h3>
        
        <Row>
          <Col md={6}>
            {/* Nombre Completo */}
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
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Número de Teléfono */}
            <Form.Group controlId="telefono">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="xxxx-xxxx"
                value={formData.telefono}
                onChange={handleChange}
                isInvalid={!!errors.telefono}
              />
              <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* Correo Electrónico */}
            <Form.Group controlId="correo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="micorreo@correo.com"
                value={formData.correo}
                onChange={handleChange}
                isInvalid={!!errors.correo}
              />
              <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Usuario */}
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
              <Form.Control.Feedback type="invalid">{errors.usuario}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
        <Col md={6}>
            {/* Número de Identidad */}
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
              <Form.Control.Feedback type="invalid">{errors.numeroIdentidad}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Contraseña */}
            <Form.Group controlId="contraseña">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              isInvalid={!!errors.contraseña}
            />
            <Form.Control.Feedback type="invalid">{errors.contraseña}</Form.Control.Feedback>
            </Form.Group>
          </Col>          
        </Row>

       

        {/* Rol del Usuario */}
        <DropdownButton
          id="rol-dropdown"
          title={formData.rol}
          onSelect={handleSelectRol}
          className={!!errors.rol ? 'is-invalid' : ''}
        >
          <Dropdown.Item eventKey="Encargado de entregas">Encargado de entregas</Dropdown.Item>
          <Dropdown.Item eventKey="Encargado de salidas">Encargado de salidas</Dropdown.Item>
          <Dropdown.Item eventKey="Analista de compras">Analista de compras</Dropdown.Item>
        </DropdownButton>
        {errors.rol && <div className="invalid-feedback d-block">{errors.rol}</div>}

        {/* Botones de acción */}
        <Row className="mt-3">
          <Col>
            <Button variant="primary" type="submit" disabled={!formValid}>Crear Usuario</Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
          </Col>
        </Row>
        
        {/* Toast de error */}
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>Hubo un problema con el registro</Toast.Body>
        </Toast>

        {/* Mensaje de éxito */}
        {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}

      </Form>
    </Container>
  );
};

export default RegistroUsuarios;
