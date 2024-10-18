import React, { Fragment, useState, useEffect } from "react";
import { Pagination } from "../../../layouts/Pagination";
import {Row, Col, Card, Table, Button, Modal, Alert, ProgressBar, Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { urlBackend } from "../../../config";
import { useDispatch } from 'react-redux';

const Informe = () => {
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
  const [getInformes, setInformes] = useState([]);

  const listarInformes = async (page_num, page_size) => {
    try {
      setProgress(0);
      setCarga(true);
      const response = await axios({
        url:
          `${urlBackend}/api/v1/tesorero/tesoreria/informes/` +
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
      setInformes(response.data.informes);

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

  const url = useNavigate();
  const { pathname } = useLocation();

  const redirigirDetalleCuentaIngreso = (e) => {
      e.preventDefault();
      url("/tesorero/informes/detalles-ingresos-diarios");
  };
  const redirigirDetalleCuentaEgreso = (e) => {
      e.preventDefault();
      url("/tesorero/informes/detalles-egresos-diarios");
  };

  useEffect(() => {
    setProgress(0);
    listarInformes(1, pageSize);
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
                    <Card.Title className="mb-0">INFORMES</Card.Title>
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
                        <th>Período</th>
                        <th>Total Enviado</th>
                        <th>Estado</th>
                        <th>Banco</th>
                        <th>Nro Operación</th>
                        <th>Fecha Operación</th>
                        <th>Importe Operación</th>
                        <th>Nro Recibo</th>
                        <th>Ir Cuentas Ingreso</th>
                        <th>Ir Cuentas Egreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getInformes.map((informes, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="w-space-no">{informes.periodo}</span>
                            </div>
                          </td>
                          <td>{informes.estado}</td>
                          <td>{informes.totalEnviado}</td>
                          <td>{informes.banco}</td>
                          <td>{informes.nroOperacion}</td>             
                          {/* <td>
                            <div className="d-flex align-items-center">
                              {informes.estado == 'Activo'
                                ? <><i className="fa fa-circle text-success me-1" /> {informes.estado}</>
                                : <><i className="fa fa-circle text-danger me-1" /> {informes.estado}</>
                              }
                            </div>
                          </td> */}
                          <td>{informes.fechaOperacion}</td> 
                          <td>{informes.importeOperacion}</td> 
                          <td>{informes.nroRecibo}</td> 
                          <td>
                            <Link to={"/tesorero/informes/detalles-ingresos-diarios"} onClick={redirigirDetalleCuentaIngreso}>
                              Cuentas Ingreso
                            </Link>
                          </td> 
                          <td>
                            <Link to={"/tesorero/informes/detalles-egresos-diarios"} onClick={redirigirDetalleCuentaEgreso}>
                              Cuentas Egreso
                            </Link>
                          </td> 
                           
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination totalItems={totalCount} pageSize={pageSize} pageSizeList={[5, 10, 25, 50]} onChangePage={(pageNum, pageSize) => listarInformes(pageNum, pageSize)}></Pagination>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Informe;
