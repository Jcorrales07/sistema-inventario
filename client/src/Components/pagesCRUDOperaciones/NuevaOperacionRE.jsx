import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// prettier-ignore
import { Container, Row, Col, Form, Button, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import FeatureNavbar from "../FeatureNavbar";
import RBDatePicker from "../datePicker/RBDatePicker";
import almacenApi from "../../../api/almacen.api";
import productoApi from "../../../api/producto.api";
import operacionApi from "../../../api/operacion.api";
import socioApi from "../../../api/socio.api";
import { set } from "date-fns";

import { format } from "date-fns";
import operacionProductoApi from "../../../api/operacionProducto.api";

import toast from "react-hot-toast";

function NuevaOperacionRE({tipo}) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("operaciones");
  const [productos, setProductos] = useState([
    { producto: "", demanda: "", id: -1 },
  ]);
  const [estado, setEstado] = useState(0); // Estado inicial es 'borrador'
  const [almacenes, setAlmacenes] = useState([]);
  const [socios, setSocios] = useState([]);
  const [loadedProductos, setLoadedProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);

  const [selectedSocio, setSelectedSocio] = useState(-1);
  const [selectedAlmacen, setSelectedAlmacen] = useState(-1);
  const [fechaProgramada, setFechaProgramada] = useState("");
  const [referencia, setReferencia] = useState(`Nueva ${tipo === 'recibir' ? 'Recepción' : 'Entrega'}`);

  const [operacion, setOperacion] = useState(null);

  // Add a new product ror

  const handleGetEstadoByInt = (estado) => {
    switch (estado) {
      case 0:
        return "borrador";
      case 1:
        return "pendiente";
      case 2:
        return "Listo";
      case 3:
        return "Hecho";
    }
  };

  const handleLoadProductosOperacion = (OperacionProductos) => {
    if (OperacionProductos.length === 0) {
      setProductos([{ producto: "", demanda: "", id: -1 }]);
      return;
    }

    let productos = OperacionProductos.map((op) => ({
      producto: op.Producto.nombre,
      demanda: op.cantidad,
      id: op.Producto.id,
    }));

    setProductos(productos);
  };

  const handleGuardarProductos = async () => {
    if (!operacion) {
      console.error("No se ha creado la operacion");
      return;
    }

    try {
      const response = await operacionProductoApi.handleChangeProductsRequest(
        operacion.id,
        productos
      );

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error creating operacion productos: ", response);
        return;
      }

      loadOperacion(operacion.id);

      toast.success("Productos agregados exitosamente");
    } catch (error) {
      console.error("Error creating operacion productos: ", error);
    }
  };

  const loadReferencia = async (idAlmacen) => {
    try {
      const response = await operacionApi.getSiguienteOperacionRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching referencia: ", response);
        return;
      }

      const next = response.data.entrada;

      const almacen = almacenes.find((almacen) => almacen.id === idAlmacen);

      const ref = `${almacen.nombre_corto}/IN/${next}`;

      setReferencia(ref);

      return ref;
    } catch (error) {
      console.error("Error fetching referencia: ", error);
    }
  };

  const fetchAlmacenes = async () => {
    try {
      const response = await almacenApi.getAllAlmacenesRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching almacenes: ", response);
        return;
      }

      setAlmacenes(response.data.Data);
    } catch (error) {
      console.error("Error fetching almacenes: ", error);
    }
  };

  const fetchSocios = async () => {
    try {
      const response = await socioApi.getAllSociosRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching socios: ", response);
        return;
      }

      setSocios(response.data.Data);
    } catch (error) {
      console.error("Error fetching socios: ", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await productoApi.getAllProductosRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching productos: ", response);
        return;
      }

      setLoadedProductos(response.data.Data);
      setFilteredProductos(response.data.Data);
    } catch (error) {
      console.error("Error fetching productos: ", error);
    }
  };

  const filterProductos = () => {
    console.log("Loaded productos: ", loadedProductos);
    console.log("Productos: ", productos);

    const filtered = loadedProductos.filter(
      (producto) => !productos.some((item) => item.producto === producto.nombre)
    );
    setFilteredProductos(filtered);
  };

  const handleCrearOperacion = async (atributos) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const operacion = {
      tipo: 0,
      estado: 0,
      id_responsable: userData.id_socio,
      ...atributos,
    };

    try {
      const response = await operacionApi.createOperacionRequest(operacion);

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error creating operacion: ", response);
        return;
      }

      setOperacion(response.data.Data);
      setSelectedSocio(response.data.Data.from ? response.data.Data.from : "");
      setFechaProgramada(
        response.data.Data.fecha_programada
          ? response.data.Data.fecha_programada
          : ""
      );
      setSelectedAlmacen(response.data.Data.to ? response.data.Data.to : "");

      localStorage.setItem("selectedOperacion", response.data.Data.id);
    } catch (error) {
      console.error("Error creating operacion: ", error);
    }
  };

  const handleUpdateOperacion = async (atributos) => {
    try {
      const response = await operacionApi.putOperacionRequest(
        operacion.id,
        atributos
      );

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error updating operacion: ", response);
        return;
      }
    } catch (error) {
      console.error("Error updating operacion: ", error);
    }
  };

  const loadOperacion = async (id) => {
    try {
      const response = await operacionApi.getOperacionByIdRequest(id);

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching operacion: ", response);
        return;
      }

      setOperacion(response.data.Data);

      setSelectedSocio(response.data.Data.id_socio);

      const dateFormat = response.data.Data.fecha_programada
        ? format(
            new Date(response.data.Data.fecha_programada),
            "MMMM d, yyyy h:mm a"
          )
        : "";

      setFechaProgramada(new Date(response.data.Data.fecha_programada));
      setSelectedAlmacen(response.data.Data.to);

      setReferencia(response.data.Data.referencia);
      handleLoadProductosOperacion(response.data.Data.Operacion_Productos);
    } catch (error) {
      console.error("Error fetching operacion: ", error);
    }
  };

  const handleChangeField = async (field, value) => {
    let atributos = {};

    switch (field) {
      case "estado":
        atributos = {
          estado: value,
        };

        if (value === 3) {
          const date = new Date();

          atributos = {
            ...atributos,
            fecha_efectiva: date.toISOString(),
          };
        }

        break;

      case "recibirDe":
        atributos = {
          from: value,
        };

        break;

      case "fechaProgramada":
        atributos = {
          fecha_programada: value,
        };

        break;

      case "almacen":
        atributos = {
          to: value,
        };

        const almacen = almacenes.find(
          (almacen) => almacen.id === parseInt(value)
        );

        if (operacion && operacion.referencia) {
          const newRef = referencia.replace(
            referencia.split("/")[0],
            almacen.nombre_corto
          );

          atributos = {
            ...atributos,
            referencia: newRef,
          };
        } else {
          const ref = await loadReferencia(parseInt(value));

          atributos = {
            ...atributos,
            referencia: ref,
          };
        }

        break;
    }

    if (operacion) {
      // vamos a actualizar la operacion

      await handleUpdateOperacion(atributos);
      await loadOperacion(operacion.id);
    } else {
      await handleCrearOperacion(atributos);
    }
  };

  const handleSocioChange = (e) => {
    setSelectedSocio(e.target.value);
  };

  const agregarLinea = () => {
    setProductos([...productos, { producto: "", demanda: "" }]);
  };

  // Handle product input changes
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...productos];

    if (field === "producto") {
      const producto = loadedProductos.find(
        (producto) => producto.nombre === value
      );
      nuevosProductos[index].id = producto.id;
    }
    nuevosProductos[index][field] = value;

    setProductos(nuevosProductos);
  };

  // Remove a product row
  const eliminarLinea = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  // Check if "Agregar una línea" should be enabled
  const isAgregarLineaDisabled = productos.some(
    (item) => item.producto === "" || item.demanda === ""
  );

  // Cambiar estado
  const cambiarEstado = async (nuevoEstado) => {
    if (nuevoEstado === 3 || nuevoEstado === 2) {
      if (!operacion) {
        toast.error("Primero debe crear una operación");
        return;
      }

      if (operacion.Operacion_Productos.length === 0) {
        toast.error("Primero debe agregar productos a la operación");
        return;
      }

      await handleChangeField("estado", nuevoEstado);

      toast.success("Estado actualizado exitosamente");

      setInterval(() => {
        navigate(-1);
      }, 1000);
    }

    setEstado(nuevoEstado);
  };

  useEffect(() => {
    fetchAlmacenes();
    fetchSocios();
    fetchProductos();

    const selectedOperacion = localStorage.getItem("selectedOperacion");

    if (selectedOperacion) {
      loadOperacion(selectedOperacion);
    }

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("selectedOperacion");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("selectedOperacion");
      });
    };
  }, []);

  return (
    <div>
      <FeatureNavbar />
      <Container fluid className="mt-5">
        {/* Formulario y Historial */}
        <Row>
          {/* Formulario */}
          <Col md={8}>
            <Row className="mb-3">
              <Col md={6} className="d-flex align-items-center">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => cambiarEstado(2)}
                >
                  Realizar
                </Button>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => cambiarEstado(3)}
                >
                  Validar
                </Button>
                <Button variant="danger" onClick={() => cambiarEstado(0)}>
                  Cancelar
                </Button>
              </Col>
              <Col md={6} className="text-end">
                {estado === 0 && (
                  <Badge bg="primary" className="me-1">
                    Borrador
                  </Badge>
                )}
                {estado === 2 && (
                  <Badge bg="warning" className="me-1">
                    Listo
                  </Badge>
                )}
                {estado === 3 && <Badge bg="success">Hecho</Badge>}
                {estado === 1 && <Badge bg="danger">Cancelado</Badge>}
              </Col>
            </Row>
            <Form>
              <h2 className="mb-3">{referencia}</h2>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Recibir de</Form.Label>
                    <Form.Select
                      aria-label="Seleccione algun proveedor (Socio)"
                      onChange={(e) =>
                        handleChangeField("recibirDe", e.target.value)
                      }
                      value={selectedSocio}
                    >
                      <option>Seleccione un Proveedor</option>
                      {socios.map((socio, index) => (
                        <option key={index} value={socio.id}>
                          {socio.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <RBDatePicker
                    value={fechaProgramada}
                    onChange={(e) => {
                      handleChangeField("fechaProgramada", e.toISOString());
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de operación</Form.Label>
                    <Form.Select disabled={true}>
                      <option>unitec4: {tipo === "recibidos" ? "Recibidos" : "Entregas"}</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ubicación de destino</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        handleChangeField("almacen", e.target.value);
                      }}
                      value={selectedAlmacen}
                    >
                      <option>Seleccione un almacén</option>
                      {almacenes.map((almacen, index) => (
                        <option key={index} value={almacen.id}>
                          {almacen.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>

            {/* Tabs */}
            <Tabs
              activeKey={selectedTab}
              onSelect={(k) => setSelectedTab(k)}
              className="mb-3"
            >
              <Tab eventKey="operaciones" title="Operaciones">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Demanda</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Select
                            value={item.producto}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "producto",
                                e.target.value
                              )
                            }
                          >
                            <option>Seleccione un producto</option>

                            {filteredProductos.map((producto, index) => (
                              <option key={index} value={producto.nombre}>
                                {producto.nombre}
                              </option>
                            ))}
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item.demanda}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "demanda",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => eliminarLinea(index)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <Button
                          variant="link"
                          onClick={agregarLinea}
                          disabled={isAgregarLineaDisabled}
                        >
                          Agregar una línea
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Button
                  variant="primary"
                  disabled={
                    isAgregarLineaDisabled ||
                    estado === 3 ||
                    productos.length === 0
                  }
                  onClick={handleGuardarProductos}
                >
                  Guardar
                </Button>
              </Tab>
              <Tab
                eventKey="informacion_adicional"
                title="Información adicional"
              >
                {/* Aquí puedes añadir más información si es necesario */}
              </Tab>
              <Tab eventKey="nota" title="Nota">
                {/* Aquí puedes añadir notas si es necesario */}
              </Tab>
            </Tabs>
          </Col>
          <Col md={4} className="mt-4 mt-md-0">
            <h5>Historial de acciones</h5>
            <ul className="list-unstyled">
              <li>Joe Corrales - Creando un nuevo registro...</li>
              <li>
                Joe Corrales - 4 de septiembre de 2024: Borrador → Listo
                (Estado)
              </li>
              <li>
                Joe Corrales - 4 de septiembre de 2024: Listo → Hecho (Estado)
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NuevaOperacionRE;
