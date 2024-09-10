import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Pagination,
  Badge,
  Spinner,
  Button,
} from "react-bootstrap";
import FeatureNavbar from "../FeatureNavbar";
import operacionApi from "../../../api/operacion.api";
import { set } from "date-fns";

// Datos de ejemplo

const HistorialDeMovimientos = () => {
  const [operations, setOperations] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [filteredOperations, setFilteredOperations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [operationsPerPage] = useState(5);

  const loadOperaciones = async () => {
    const response = await operacionApi.getAllOperacionsRequest();
    if (response) {
      let data = [];

      response.data.Data.forEach((operation) => {
        let estado = operation.estado;
        let desde = operation.desde;
        let hasta = operation.hasta;
        let referencia = operation.referencia;

        let fecha;

        if (operation.estado === 3) {
          fecha = operation.fecha_efectiva;
        } else {
          if (operation.estado !== 3 && operation.fecha_programada) {
            fecha = operation.fecha_programada;
          } else {
            fecha = operation.createdAt;
          }
        }

        operation.Operacion_Productos.forEach((opProducto) => {
          let producto = opProducto.Producto.nombre;

          let cantidad = opProducto.cantidad;

          data.push({
            fecha: fecha,
            referencia: referencia,
            producto: producto,
            desde: desde,
            hasta: hasta,
            cantidad: cantidad,
            estado: estado,
          });
        });
      });

      setOperations(data);

      const storedProduct = localStorage.getItem("selectedProduct");
      if (storedProduct) {
        const product = JSON.parse(storedProduct);
        setSearchProduct(product.nombre);

        const filtered = data.filter((operation) =>
          operation.producto
            .toLowerCase()
            .includes(product.nombre.toLowerCase())
        );

        setFilteredOperations(filtered);

        return;
      } else {
        setFilteredOperations(data);
      }
    }
  };

  useEffect(() => {
    loadOperaciones();

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("selectedProduct");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("selectedProduct");
      });
    };
  }, []);

  useEffect(() => {
    filterOperations(searchProduct, searchReference);
  }, [searchProduct, searchReference]);

  const filterOperations = (productSearch, referenceSearch) => {
    let filtered = operations;

    if (productSearch) {
      filtered = filtered.filter((operation) =>
        operation.producto.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    if (referenceSearch) {
      filtered = filtered.filter((operation) =>
        operation.referencia
          .toLowerCase()
          .includes(referenceSearch.toLowerCase())
      );
    }

    setFilteredOperations(filtered);
  };

  const handleSearchProductChange = (e) => {
    setSearchProduct(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchReferenceChange = (e) => {
    setSearchReference(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResetFilter = () => {
    setSearchProduct("");
    setSearchReference("");
    filterOperations("", "");
  };

  const handleViewState = (state) => {
    switch (state) {
      case 0:
        return (
          <Badge variant="danger" bg="danger">
            Borrador
          </Badge>
        );
      case 1:
        return (
          <Badge variant="warning" bg="warning">
            Pendiente
          </Badge>
        );
      case 2:
        return (
          <Badge variant="info" bg="info">
            Listo
          </Badge>
        );
      case 3:
        return (
          <Badge variant="success" bg="success">
            Hecho
          </Badge>
        );
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const startIndex = (currentPage - 1) * operationsPerPage;
  const paginatedOperations = filteredOperations.slice(
    startIndex,
    startIndex + operationsPerPage
  );
  const totalPages = Math.ceil(filteredOperations.length / operationsPerPage);

  const renderPagination = () => {
    const pageItems = [];

    pageItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    pageItems.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return pageItems;
  };

  const renderTable = () => {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Referencia</th>
              <th>Producto</th>
              <th>Desde</th>
              <th>A</th>
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOperations.length > 0 ? (
              paginatedOperations.map((operation, index) => (
                <tr key={index}>
                  <td>{operation.fecha}</td>
                  <td>{operation.referencia}</td>
                  <td>{operation.producto}</td>
                  <td>{operation.desde.nombre}</td>
                  <td>{operation.hasta.nombre}</td>
                  <td>{operation.cantidad}</td>
                  <td>{handleViewState(parseInt(operation.estado))}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No se encontraron movimientos
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    );
  };

  const render = () => {
    return (
      <>
        {/* Campos de búsqueda separados */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar por producto"
            value={searchProduct}
            onChange={handleSearchProductChange}
          />
          <FormControl
            placeholder="Buscar por referencia (IN/OUT)"
            value={searchReference}
            onChange={handleSearchReferenceChange}
          />
        </InputGroup>

        {/* Botón para resetear el filtro */}
        <Button
          variant="secondary"
          onClick={handleResetFilter}
          className="mb-3"
        >
          Resetear Filtro
        </Button>

        {/* Tabla de movimientos */}
        {renderTable()}

        {/* Paginación con números y flechas */}
        <Pagination className="justify-content-center mt-3">
          {renderPagination()}
        </Pagination>
      </>
    );
  };

  return (
    <div>
      <FeatureNavbar />
      <Container fluid>
        <Row>
          <Col>
            <h1 className="mt-4 mb-3">Historial de Movimientos</h1>

            {/* Spinner de carga */}

            {filteredOperations.length === 0 ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            ) : (
              render()
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HistorialDeMovimientos;
