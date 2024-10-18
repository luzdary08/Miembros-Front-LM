import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Row, Col, Card, Table, Tab, Nav, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { urlBackend } from "../../../config";

const FichaPastoral = () => {
    const url = useNavigate();
    const { pathname } = useLocation()
    const location = useLocation();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("Lista de Fichas Pastorales");

    const redirigirFichaPastoral = () => {
      navigate("/pastor/ficha-pastoral/listar");
      setTitulo("Lista de Fichas Pastorales");
    };

    const handleEdit = (id) => {
      navigate(`/pastor/ficha-pastoral/edit/${id}`);
      setTitulo(`Ficha Pastoral de: ${miembro.nombres} ${miembro.apellido_paterno} ${miembro.apellido_materno}`);
    };
    
    const redirigirAddFichaPastoral= (e) => {
        e.preventDefault();
        url("/pastor/ficha-pastoral/add");
    };
    
    return (
      <>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <div className="col mt-3 text-right">
                  <Row className="align-items-center">
                    <Col>
                      <Card.Title className="mb-0 text-center">
                        {titulo}
                      </Card.Title>
                    </Col>
                  </Row>
                </div>
              </Card.Header>
              <Card.Body>
                <Tab.Container defaultActiveKey="listar">
                  <Row>
                    <Col sm={12}>
                      <Nav variant="tabs">
                        <Nav.Item>
                          <Nav.Link
                            active={location.pathname === "/pastor/ficha-pastoral/listar"}
                            onClick={redirigirFichaPastoral}
                          >
                            Lista de Fichas Pastorales
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            active={location.pathname === "/pastor/ficha-pastoral/add"}
                          >
                            Ficha Pastoral
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col sm={12} className="mt-5">
                      <Tab.Content>
                        <Outlet />
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

export default FichaPastoral;