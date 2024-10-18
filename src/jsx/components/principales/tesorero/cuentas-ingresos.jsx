import React, { Fragment, useState, useEffect } from "react";
import { Pagination } from "../../../layouts/Pagination";
import {Row, Col, Card, Table, Button, Modal, Alert, ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { urlBackend } from "../../../config";
import { useDispatch } from 'react-redux';

const CuentaIngreso = () => {
  const [carga, setCarga] = useState(true);
  const [cargaAdd, setCargaAdd] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const normal = JSON.parse(localStorage.getItem('userDetails'))
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [getCuentasIngreso, setCuentasIngreso] = useState([]);

  const listarCuentasIngresos = async (page_num, page_size) => {
    try {
      setProgress(0);
      setCarga(true);
      const response = await axios({
        url:
          `${urlBackend}/api/v1/tesorero/tesoreria/cuentas-ingresos/` +
          `?page_num=` +
          page_num +
          `&page_size=` +
          page_size,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + normal.idToken,
        },
        onDownloadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentage);
        },
      });
      setCarga(false);
      setProgress(100);

      setPageSize(page_size);
      setTotalCount(response.data.count);
      setCuentasIngreso(response.data.cuentasIngresos);

    } catch (error) {
      setCarga(false);
      errorApi(error.response.data);
    }
  };

  function errorApi(data) {
    if (
      data.error.name == "TokenExpiredError" ||
      data.error.name == "JsonWebTokenError"
    ) {
      dispatch(Logout(navigate));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error en el servidor, contactarse con el equipo de Soporte!",
      });
    }
  }

  useEffect(() => {
    setProgress(0);
    listarCuentasIngresos(1, pageSize);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <div className="col mt-3 text-right">
                <Row className="align-items-center">
                  <Col>
                    <Card.Title className="mb-0">CUENTAS DE INGRESOS</Card.Title>
                  </Col>
                </Row>
              </div>
            </Card.Header>
            <Card.Body>
            {carga
                ?
                <ProgressBar now={progress} variant="danger" label={`${Math.round(progress)}%`} />
                :
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cuenta</th>
                        <th>Sub Cuenta</th>
                        <th>Descripción</th>
                        <th>Obligatorio</th>
                        <th>Auxiliares</th>
                        <th>Estado</th>
                        <th>Comentario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getCuentasIngreso.map((cuentasIngresos, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="w-space-no">{cuentasIngresos.cuenta}</span>
                            </div>
                          </td>
                          <td>{cuentasIngresos.subcuenta}</td>
                          <td>{cuentasIngresos.descripcion}</td>
                          <td>{cuentasIngresos.obligatorio}</td>
                          <td>{cuentasIngresos.auxiliares}</td>             
                          <td>
                            <div className="d-flex align-items-center">
                              {cuentasIngresos.estado == 'Activo'
                                ? <><i className="fa fa-circle text-success me-1" /> {cuentasIngresos.estado}</>
                                : <><i className="fa fa-circle text-danger me-1" /> {cuentasIngresos.estado}</>
                              }
                            </div>
                          </td>
                          <td>{cuentasIngresos.comentario}</td> 
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination totalItems={totalCount} pageSize={pageSize} pageSizeList={[5, 10, 25, 50]} onChangePage={(pageNum, pageSize) => listarCuentasIngresos(pageNum, pageSize)}></Pagination>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CuentaIngreso;
