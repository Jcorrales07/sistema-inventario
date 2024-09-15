import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// prettier-ignore
import { Container, Row, Col, Form, Button, Tabs, Tab, Table, Badge, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import FeatureNavbar from "../FeatureNavbar";
import RBDatePicker from "../datePicker/RBDatePicker";
import almacenApi from "../../../api/almacen.api";
import productoApi from "../../../api/producto.api";
import operacionApi from "../../../api/operacion.api";
import socioApi from "../../../api/socio.api";
import actividad_operacionApi from "../../../api/actividad_operacion.api";
import { set } from "date-fns";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import operacionProductoApi from "../../../api/operacionProducto.api";

import toast from "react-hot-toast";

function NuevaOperacionRE({ tipo }) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("operaciones");
  const [productos, setProductos] = useState([
    { producto: "", demanda: "", id: -1 },
  ]);

  const [actividades, setActividades] = useState([]);
  const [estado, setEstado] = useState(0); // Estado inicial es 'borrador'
  const [almacenes, setAlmacenes] = useState([]);
  const [socios, setSocios] = useState([]);
  const [loadedProductos, setLoadedProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);

  const [selectedSocio, setSelectedSocio] = useState(-1);
  const [selectedAlmacen, setSelectedAlmacen] = useState(-1);
  const [fechaProgramada, setFechaProgramada] = useState("");
  const [referencia, setReferencia] = useState(
    `Nueva ${tipo === "recibir" ? "Recepción" : "Entrega"}`
  );

  const [loadingGuardarProducto, setLoadingGuardarProducto] = useState(false);

  const [operacion, setOperacion] = useState(null);

  const loadActividades = async (id) => {
    try {
      const response =
        await actividad_operacionApi.getActividadesByOperacionRequest(id);

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching actividades: ", response);
        return;
      }

      console.log("Actividades: ", response.data);

      const acts = response.data.map((act) => ({
        user: act.Socio.nombre,
        date: act.fecha,
        message: act.texto,
      }));

      setActividades(acts);
    } catch (error) {
      console.error("Error fetching actividades: ", error);
    }
  };

  const handleCrearActividad = async (message) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const actividad = {
      id_operacion: operacion.id,
      id_socio: userData.id_socio,
      texto: message,
      fecha: new Date().toISOString(),
    };

    try {
      const response = await actividad_operacionApi.createActividadRequest(
        actividad
      );

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error creating actividad: ", response);
        return;
      }
    } catch (error) {
      console.error("Error creating actividad: ", error);
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
    setLoadingGuardarProducto(true);
    if (!operacion) {
      console.error("No se ha creado la operacion");
      toast.error("Primero debe crear una operación");
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

      const message =
        productos.length === 0
          ? "Ha eliminado los productos"
          : "'Ha actualizado los productos de la operación: \n" +
            productos.map((p) => p.producto + ": " + p.demanda).join("\n") +
            "'";

      console.log("Message: ", message);
      await handleCrearActividad(message);

      loadOperacion(operacion.id);

      toast.success("Productos agregados exitosamente");
    } catch (error) {
      console.error("Error creating operacion productos: ", error);
    }

    setLoadingGuardarProducto(false);
  };

  const loadReferencia = async (idAlmacen) => {
    try {
      const response = await operacionApi.getSiguienteOperacionRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.error("Error fetching referencia: ", response);
        return;
      }

      const next =
        tipo === "recibir" ? response.data.entrada : response.data.salida;

      const almacen = almacenes.find((almacen) => almacen.id === idAlmacen);

      const ref =
        tipo === "recibir"
          ? `${almacen.nombre_corto}/IN/${next}`
          : `${almacen.nombre_corto}/OUT/${next}`;

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

  const handleCrearOperacion = async (atributos, message) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const operacion = {
      tipo: tipo === "recibir" ? 0 : 1,
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

      setFechaProgramada(
        response.data.Data.fecha_programada
          ? response.data.Data.fecha_programada
          : ""
      );

      if (tipo === "recibir") {
        setSelectedSocio(
          response.data.Data.from ? response.data.Data.from : ""
        );
        setSelectedAlmacen(response.data.Data.to ? response.data.Data.to : "");
      } else {
        setSelectedSocio(response.data.Data.to ? response.data.Data.to : "");
        setSelectedAlmacen(
          response.data.Data.from ? response.data.Data.from : ""
        );
      }

      localStorage.setItem("selectedOperacion", response.data.Data.id);

      const actividad = {
        id_operacion: response.data.Data.id,
        id_socio: userData.id_socio,
        texto: message,
        fecha: new Date().toISOString(),
      };

      const responseActividad =
        await actividad_operacionApi.createActividadRequest(actividad);

      if (
        !responseActividad ||
        responseActividad.status < 200 ||
        responseActividad.status >= 300
      ) {
        console.error("Error creating actividad: ", responseActividad);
        return;
      }

      await loadOperacion(response.data.Data.id);
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

      setFechaProgramada(
        response.data.Data.fecha_programada
          ? new Date(response.data.Data.fecha_programada)
          : ""
      );

      setReferencia(response.data.Data.referencia);

      let i_socio;
      let i_almacen;

      if (tipo === "recibir") {
        i_socio = response.data.Data.from;
        i_almacen = response.data.Data.to;
      } else {
        i_socio = response.data.Data.to;
        i_almacen = response.data.Data.from;
      }

      setSelectedAlmacen(i_almacen);

      setSelectedSocio(i_socio);

      setEstado(response.data.Data.estado);

      handleLoadProductosOperacion(response.data.Data.Operacion_Productos);

      await loadActividades(id);
    } catch (error) {
      console.error("Error fetching operacion: ", error);
    }
  };

  const handleGenerarMensaje = (atributo, ext) => {};

  const handleChangeField = async (field, value) => {
    let atributos = {};
    let message = "";

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

        message =
          "Ha cambiado el socio de origen ➜ " +
          socios.find((e) => e.id === parseInt(value)).nombre +
          ".";

        if (tipo === "entregar") {
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

            message =
              "Ha cambiado el almacen de origen ➜ " + almacen.nombre + ".";
          } else {
            const ref = await loadReferencia(parseInt(value));

            atributos = {
              ...atributos,
              referencia: ref,
            };

            message =
              "Ha cambiado el almacen de origen ➜ " +
              almacenes.find((e) => e.id === parseInt(value)).nombre +
              ".";
          }
        }

        break;

      case "fechaProgramada":
        atributos = {
          fecha_programada: value,
        };

        message =
          "Ha cambiado la fecha programada de la operación ➜ " +
          new Date(value).toLocaleString() +
          ".";

        break;

      case "almacen":
        atributos = {
          to: value,
        };

        if (tipo === "recibir") {
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

          message = "Ha cambiado el almacen de destino ➜ " + almacen.nombre;
        } else {
          message =
            "Ha cambiado el socio de destino ➜ " +
            socios.find((e) => e.id === parseInt(value)).nombre +
            ".";
        }

        break;
    }

    if (operacion) {
      // vamos a actualizar la operacion

      await handleUpdateOperacion(atributos);

      await handleCrearActividad(message);
      await loadOperacion(operacion.id);
    } else {
      await handleCrearOperacion(atributos, message);
    }
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

      if (nuevoEstado === 3 && operacion.tipo === 1) {
        const response =
          await operacionApi.handleValidarOperacionEntregaRequest(operacion.id);

        if (!response || response.status < 200 || response.status >= 300) {
          console.error("Error validating operacion: ", response);
          toast.error("Error validando la operación");
          return;
        }
      } else {
        await handleChangeField("estado", nuevoEstado);
      }

      if (nuevoEstado === 2) {
        await handleCrearActividad("Operación marcada como realizada");
      }

      if (nuevoEstado === 3) {
        await handleCrearActividad("Operación marcada como validada");
      }
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
                  disabled={estado === 2 || estado === 3}
                >
                  Realizar
                </Button>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => cambiarEstado(3)}
                  disabled={estado === 3}
                >
                  Validar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => cambiarEstado(0)}
                  disabled={estado === 3}
                >
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
                {tipo === "recibir" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Desde</Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            handleChangeField("recibirDe", e.target.value);
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Hasta</Form.Label>
                        <Form.Select
                          aria-label="Seleccione algun proveedor (Socio)"
                          onChange={(e) =>
                            handleChangeField("almacen", e.target.value)
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
                  </>
                )}
              </Row>
              <Row>
                <Col md={6}>
                  <RBDatePicker
                    value={fechaProgramada}
                    onChange={(e) => {
                      handleChangeField("fechaProgramada", e.toISOString());
                    }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de operación</Form.Label>
                    <Form.Select disabled={true}>
                      <option>
                        unitec4:{" "}
                        {tipo === "recibidos" ? "Recibidos" : "Entregas"}
                      </option>
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
                    productos.length === 0 ||
                    loadingGuardarProducto
                  }
                  onClick={handleGuardarProductos}
                >
                  Guardar
                </Button>
              </Tab>
              {/* <Tab
                                eventKey="informacion_adicional"
                                title="Información adicional"
                            ></Tab>
                            <Tab eventKey="nota" title="Nota"></Tab> */}
            </Tabs>
          </Col>
          <Col md={4} className="mt-4 mt-md-0">
            <h5>Historial de acciones</h5>
            <ListGroup className="overflow-auto" style={{ maxHeight: "700px" }}>
              {actividades.length === 0 ? (
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="ms-3">
                    <div className="d-flex flex-row align-content-center align-items-center">
                      <div className="fw-bold">Sistema</div>
                      <small className="text-muted ms-1">
                        ??/??/?? ??:?? ??
                      </small>
                    </div>

                    <div>Sin actividades</div>
                  </div>
                </ListGroup.Item>
              ) : (
                actividades.map((message, index) => (
                  <ListGroup.Item
                    key={index}
                    className="mb-4 d-flex"
                    style={{ border: "none" }}
                  >
                    <Image
                      src={`https://placehold.co/40x40/c5ec53/000?text=${
                        message.user.charAt(0) +
                        message.user.split(" ")[1].charAt(0)
                      }`}
                      rounded
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <div className="d-flex flex-row align-content-center align-items-center">
                          <div className="fw-bold">{message.user}</div>
                          <small className="text-muted ms-1">
                            {format(
                              new Date(message.date),
                              "dd/MM/yy hh:mm a",
                              {
                                locale: es,
                              }
                            )}
                          </small>
                        </div>

                        <div>{message.message}</div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NuevaOperacionRE;
