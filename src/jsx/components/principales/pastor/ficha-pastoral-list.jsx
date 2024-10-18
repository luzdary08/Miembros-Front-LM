import React, { Fragment, useState, useEffect } from "react";
import { Pagination } from "../../../layouts/Pagination";
import {Row, Col, Card, Table, Button, Modal, Alert, ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { urlBackend } from "../../../config";
import { useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa'; // Usaremos react-icons para los íconos
import { useNavigate } from "react-router-dom";


const TableFichaPastoral = () => {
  const [carga, setCarga] = useState(true);
  //const [cargaAdd, setCargaAdd] = useState(true);
  const [progress, setProgress] = useState(0);
  //const [fail, setFail] = useState(false);
  //const [message, setMessage] = useState("");
  //const [success, setSuccess] = useState(false);
  const normal = JSON.parse(localStorage.getItem('userDetails'))
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Agregar para redirigir


  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [getFichaPastoral, setFichaPastoral] = useState([]);

  const redirigirEditarFichaPastoral = (fichaPastoral) => {
    // Redirigir a la ficha pastoral con los datos del miembro
    navigate(`/pastor/ficha-pastoral/add`, { state: { miembro: fichaPastoral.miembro } });
  };

  const listarFichaPastoral = async (page_num, page_size) => {
    try {
      setProgress(0);
      setCarga(true);
      const response = await axios({
        url:
          `${urlBackend}/api/v1/pastor/ficha-pastoral/listar-ficha-pastoral/` +
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
      setFichaPastoral(response.data.fichaPastoral);

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
    listarFichaPastoral(1, pageSize);
  }, []);

return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {carga ? (
                <ProgressBar now={progress} variant="danger" label={`${Math.round(progress)}%`} />
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Acciones</th> {/* Nueva columna para el ícono de edición */}
                        <th>#</th>
                        <th>Documento</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Nombres</th>
                        <th>Fecha Nacimiento</th>
                        <th>Sexo</th>
                        <th>Estado Civil</th>
                        <th>Teléfono Fijo</th>
                        <th>Teléfono Celular</th>
                        <th>Email</th>
                        <th>Distrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFichaPastoral.map((fichaPastoral, index) => (
                        <tr key={index}>
                          <td>
                            <Button variant="link" onClick={() => redirigirEditarFichaPastoral(fichaPastoral)}>
                              <FaEdit /> {/* Ícono de edición */}
                            </Button>
                          </td>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>{fichaPastoral.miembro.numero_documento}</td>
                          <td>{fichaPastoral.miembro.apellido_paterno}</td>
                          <td>{fichaPastoral.miembro.apellido_materno}</td>
                          <td>{fichaPastoral.miembro.nombres}</td>
                          <td>{fichaPastoral.miembro.fecha_nacimiento}</td>
                          <td>{fichaPastoral.miembro.sexo.nombre}</td>
                          <td>{fichaPastoral.miembro.estadosCivil.nombre}</td>
                          <td>{fichaPastoral.miembro.telefono_fijo}</td>
                          <td>{fichaPastoral.miembro.telefono_celular}</td>
                          <td>{fichaPastoral.miembro.email}</td>
                          <td>{fichaPastoral.miembro.distritos.nombre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination
                    totalItems={totalCount}
                    pageSize={pageSize}
                    pageSizeList={[5, 10, 25, 50]}
                    onChangePage={(pageNum, pageSize) => listarFichaPastoral(pageNum, pageSize)}
                  ></Pagination>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableFichaPastoral;
