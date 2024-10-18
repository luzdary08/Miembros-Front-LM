import React, { Fragment, useState, useEffect } from "react";
import { Pagination } from "../../../layouts/Pagination";
import {Row, Col, Card, Table, Button, Modal, Alert, ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { urlBackend } from "../../../config";
import { useDispatch } from 'react-redux';

const DetalleIngresoDiario = () => {
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
  const [getDetallesIngresosDiarios, setDetallesIngresosDiarios] = useState([]);

  const listarDetallesIngresosDiarios = async (page_num, page_size) => {
    try {
      setProgress(0);
      setCarga(true);
      const response = await axios({
        url:
          `${urlBackend}/api/v1/tesorero/tesoreria/detalles-ingresos-diarios/` +
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
      setDetallesIngresosDiarios(response.data.detallesIngresosDiarios);

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
    listarDetallesIngresosDiarios(1, pageSize);
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
                    <Card.Title className="mb-0">DETALLES DE INGRESOS DIARIOS</Card.Title>
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
                        <th>Fecha Ingreso</th>
                        <th>Cuenta</th>
                        <th>Sub Cuenta</th>
                        <th>Miembro</th>
                        <th>Importe</th>
                        <th>Descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDetallesIngresosDiarios.map((detallesIngresosDiarios, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="w-space-no">{detallesIngresosDiarios.fechaIngreso}</span>
                            </div>
                          </td>
                          <td>{detallesIngresosDiarios.tesoreriaIngresoDiario.tesoreriaCuentaIngreso.cuenta}</td>
                          <td>{detallesIngresosDiarios.tesoreriaIngresoDiario.tesoreriaCuentaIngreso.subcuenta}</td>
                          <td>{detallesIngresosDiarios.tesoreriaIngresoDiario.miembro.nombres} {detallesIngresosDiarios.tesoreriaIngresoDiario.miembro.apellido_paterno} {detallesIngresosDiarios.tesoreriaIngresoDiario.miembro.apellido_materno}</td>
                          <td>{detallesIngresosDiarios.tesoreriaIngresoDiario.importe}</td>             
                          <td>{detallesIngresosDiarios.tesoreriaIngresoDiario.descripcion}</td> 
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination totalItems={totalCount} pageSize={pageSize} pageSizeList={[5, 10, 25, 50]} onChangePage={(pageNum, pageSize) => listarDetallesIngresosDiarios(pageNum, pageSize)}></Pagination>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DetalleIngresoDiario;

