import React, { useState, useEffect } from "react";
import FeatureNavbar from "../FeatureNavbar";
// prettier-ignore
import { Container, Row, Col, Table, Form, Button, Pagination, Badge } from 'react-bootstrap';
import operacionApi from "../../../api/operacion.api";

import { format } from "date-fns";
function Recibidos() {
  const [data, setData] = useState([
    // Add more rows if needed
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fechtData = async () => {
    try {
      const response = await operacionApi.getAllOperacionsRequest();

      if (!response || response.status < 200 || response.status >= 300) {
        console.log("Error getting data");
        return;
      }

      const data = response.data.Data.map((item) => ({
        referencia: item.referencia,
        desde: item.desde ? item.desde.nombre : "",
        a: item.hasta ? item.hasta.nombre : "",
        responsable: item.Socio.nombre,
        fechaProgramada: item.fecha_programada
          ? format(new Date(item.fecha_programada), "yyyy-MM-dd HH:mm")
          : "",
        documentoOrigen: item.documento_origen,
        estado: item.estado,
      }));
      setData(data);

      setFilteredData(data);
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  useEffect(() => {
    fechtData();
  }, []);

  useEffect(() => {
    // Apply search term and filter criteria
    let filtered = data;

    console.log("filtered", filterEstado);

    if (filterEstado) {
      filtered = filtered.filter((item) => item.estado === parseInt(filterEstado));
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, filterEstado, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterEstado(e.target.value);
  };

  const clearFilter = () => {
    setFilterEstado("");
  };

  // Calculate pagination data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to determine badge variant
  const getBadgeVariant = (estado) => {
    switch (estado) {
      case 1:
        return "danger";
      case 2:
        return "primary";
      case 3:
        return "success";
      case 0:
        return "secondary";
      default:
        return "light";
    }
  };

  const handleGetEstado = (estado) => {
    switch (estado) {
      case 1:
        return "Cancelado";
      case 2:
        return "Listo";
      case 3:
        return "Hecho";
      case 0:
        return "Borrador";
      default:
        return "Desconocido";
    }
  };

  return (
    <div>
      <FeatureNavbar />
      <Container fluid>
        <h1 className="mt-3">Recibidos</h1>
        <Row className="mt-4 mb-4">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              variant="primary"
              href="/almacenes/nuevo-recepcion"
              className="mt-3"
            >
              Nuevo Recibidos
            </Button>
          </Col>
          <Col>
            <div>
              <Form.Control
                as="select"
                value={filterEstado}
                onChange={handleFilterChange}
              >
                <option value="">Todos</option>
                <option value={3}>Hecho</option>
                <option value={0}>Borrador</option>
                <option value={2}>Listo</option>
                <option value={1}>Cancelado</option>
              </Form.Control>
              <Button
                variant="secondary"
                onClick={clearFilter}
                className="mt-3"
              >
                Limpiar Filtro
              </Button>
            </div>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Desde</th>
              <th>Dirigido a</th>
              <th>Responsable</th>
              <th>Fecha Programada</th>
              <th>Documento Origen</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index}>
                <td>{item.referencia}</td>
                <td>{item.desde}</td>
                <td>{item.a}</td>
                <td>{item.responsable}</td>
                <td>{item.fechaProgramada}</td>
                <td>{item.documentoOrigen}</td>
                <td>
                  <Badge bg={getBadgeVariant(item.estado)}>
                    {handleGetEstado(item.estado)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            />
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            />
          </Pagination>
        </div>
      </Container>
    </div>
  );
}

export default Recibidos;
