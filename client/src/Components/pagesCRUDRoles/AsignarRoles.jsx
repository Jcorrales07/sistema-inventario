import React, { useState, useEffect } from "react";
import FeatureNavbar from "../FeatureNavbar";
import { Button, Container, Row, Table, Form, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import rolApi from "../../../api/rol.api";
import privilegioApi from "../../../api/privilegio.api";
import rolPrivilegioApi from "../../../api/rolPrivilegio.api";
import toast from "react-hot-toast";

function AsignarRoles() {
  const [checkedItems, setCheckedItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rolName, setRolName] = useState("");
  const [rolDescription, setRolDescription] = useState("");
  const [newPermissions, setNewPermissions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [formComplete, setFormComplete] = useState(false);
  const [formData, setFormData] = useState({});

  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);

  const navigate = useNavigate();

  const loadRoles = async () => {
    const response = await rolApi.getAllRolsRequest();

    if (!response && response.status >= 300) {
      console.log("Error al obtener los roles");
    }

    const r = response.data.Data.map((rol) => {
      return { ...rol, checked: false };
    });

    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);

      if (data.roles && data.roles.length > 0) {
        const rolesToCheck = data.roles;

        r.forEach((rol) => {
          if (rolesToCheck.find((r) => r.id === rol.id)) {
            rol.checked = true;
          }
        });
      }
    }

    setRoles(r);
  };

  const loadPermisos = async () => {
    const response = await privilegioApi.getAllPrivilegiosRequest();

    if (!response && response.status >= 300) {
      console.log("Error al obtener los permisos");
    }

    const p = response.data.Data.map((permiso) => {
      return { ...permiso, checked: false };
    });

    setPermisos(p);
  };

  useEffect(() => {
    loadRoles();
    loadPermisos();
  }, [newPermissions]);

  const handleCheckboxChange = (index) => {
    const newRoles = roles.map((p, i) => {
      if (i === index) {
        return { ...p, checked: !p.checked };
      }
      return p;
    });

    setRoles(newRoles);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  const resetForm = () => {
    setRolName("");
    setRolDescription("");
    setNewPermissions({});
    setFormComplete(false);
  };

  const handleCreateRole = async () => {
    const roleData = {
      nombre_rol: rolName,
      descripcion: rolDescription,
    };

    const privilegios = permisos.filter((p) => p.checked);

    const responseRol = await rolApi.createRolRequest(roleData);

    if (!responseRol && responseRol.status >= 300) {
      console.log("Error al crear el rol");
      return;
    }

    const rol = responseRol.data.Data;

    privilegios.forEach(async (privilegio) => {
      const rolPrivilegioData = {
        id_rol: rol.id,
        id_privilegio: privilegio.id,
      };

      const responseRolPrivilegio =
        await rolPrivilegioApi.createRolPrivilegioRequest(rolPrivilegioData);

      if (!responseRolPrivilegio && responseRolPrivilegio.status >= 300) {
        console.log("Error al asignar privilegios al rol");
        return;
      }
    });

    // Add code to send `roleData` to your backend or database here
    toast.success("Rol creado correctamente");

    await loadRoles();

    handleCloseModal(); // This will reset the form and close the modal
  };

  const handlePermissionChange = async (index) => {
    const newPermisos = permisos.map((p, i) => {
      if (i === index) {
        return { ...p, checked: !p.checked };
      }
      return p;
    });

    setPermisos(newPermisos);
  };

  const handleAssignRoles = () => {
    // Add code to send `selectedRoles` to your backend or database here
    const rolesToAssign = roles.filter((rol) => rol.checked);

    console.log("Roles to assign:", rolesToAssign);

    const newForm = { ...formData, roles: rolesToAssign };

    localStorage.setItem("formData", JSON.stringify(newForm));

    navigate(-1);
  };

  let isAssignButtonDisabled = false;

  useEffect(() => {
    // Check if all fields are filled and at least one permission is selected

    setFormComplete(true);
  }, [rolName, rolDescription, newPermissions]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FeatureNavbar />

      <Container fluid className="px-4 py-3 d-flex flex-column flex-grow-1">
        <Container fluid className="d-flex justify-content-center">
          <h3>Usuario a asignar: {formData.nombre}</h3>
        </Container>

        <Container
          fluid
          className="d-flex flex-column align-items-center flex-grow-1"
        >
          <div
            style={{
              width: "80%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <h4>Roles disponibles:</h4>

            <Table
              responsive
              bordered
              striped
              hover
              variant="dark"
              className="flex-grow-1"
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Rol</th>
                  <th>Permisos</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((rol, i) => (
                  <tr key={i}>
                    <td style={{ width: "3%" }}>
                      <Form.Check
                        type="checkbox"
                        checked={rol.checked}
                        onChange={() => handleCheckboxChange(i)}
                      />
                    </td>
                    <td>{rol.nombre_rol}</td>
                    <td>
                      {rol.Rol_Privilegios.map((privilegio) => {
                        return privilegio.Privilegio.nombre_privilegio + ", ";
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
        <Row>
          <Container fluid className="d-flex gap-3 justify-content-center p-3">
            <Button
              onClick={handleAssignRoles}
              disabled={isAssignButtonDisabled}
            >
              Asignar roles seleccionados
            </Button>
            <Button onClick={handleShowModal}>Crear nuevo rol</Button>
          </Container>
        </Row>
      </Container>

      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rolName">
              <Form.Label>Nombre del Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del rol"
                value={rolName}
                onChange={(e) => setRolName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="rolDescription">
              <Form.Label>Descripción del Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del rol"
                value={rolDescription}
                onChange={(e) => setRolDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="permissions">
              <Form.Label>Permisos</Form.Label>
              <Table bordered striped hover variant="dark">
                <thead>
                  <tr>
                    <th>Seleccionar</th>
                    <th>Permiso</th>
                  </tr>
                </thead>
                <tbody>
                  {permisos.map((p, i) => (
                    <tr key={i}>
                      <td style={{ width: "3%" }}>
                        <Form.Check
                          type="checkbox"
                          checked={p.checked}
                          onChange={() => handlePermissionChange(i)}
                        />
                      </td>
                      <td>{p.nombre_privilegio}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCreateRole}
            disabled={!formComplete}
          >
            Crear Rol
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AsignarRoles;
