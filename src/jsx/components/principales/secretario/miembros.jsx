import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Row, Col, Card, Table, Tab, Nav, Button } from "react-bootstrap";
import TableMiembros from './table-miembros'

import { useForm } from "react-hook-form";
import { urlBackend } from "../../../config";

const Miembros = () => {
    const url = useNavigate();
    const { pathname } = useLocation()

    const redirigirMiembro = (e) => {
        e.preventDefault();
        url("/secretario/miembros/listar");
    };
    
    const redirigirAddMiembro = (e) => {
        e.preventDefault();
        url("/secretario/miembros/add");
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
                                            Gestión de Miembros
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="listar" >
                                <Row>
                                    <Col sm={12}>
                                        <Nav variant="tabs">
                                            <Nav.Item>
                                                <Nav.Link active={pathname === "/secretario/miembros/listar"} onClick={redirigirMiembro}>Lista de Miembros</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link active={pathname === "/secretario/miembros/add"}  onClick={redirigirAddMiembro} >Agregar Miembro</Nav.Link>
                                            </Nav.Item>                                        
                                        </Nav>
                                    </Col>
                                    <Col sm={12} className="mt-5">
                                        <Tab.Content>
                                                    <Outlet/>
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
}

export default Miembros;