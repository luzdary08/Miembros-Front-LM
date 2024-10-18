import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Table, Tab, Nav, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { urlBackend } from "../../../config";

const Reportes = () => {

    const [getUsuario, setListaUsuario] = useState([]);
    const [progress, setProgress] = useState(0);
    const normal = JSON.parse(localStorage.getItem('userDetails'))
    const { register, clearErrors, setValue, getValues, trigger, formState: { isValid, errors } } = useForm({ defaultValues: { form_username: "elvis", form_password: "", form_rol_id: "", form_estado_id: "", form_nombre: "", form_apellido: "" } });


    const insertUsuario = () => {
        trigger()
        if (!isValid) return;
       
        const data = {
            perfil : {
                username:  getValues("form_username")
            },
            password: getValues("form_password"),
            nombre:  getValues("form_nombre"),
            apellidos: getValues("form_apellido")
        }
       
        console.log(data)

        clearErrors();



    }

    const listarDatos = async () => {
        setProgress(0)
        try {
            const data = await axios({
                url: `${urlBackend}/api/v1/core/usuario/listar/?page_num=1&page_size=20`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + normal.idToken
                },
                onDownloadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percentage);
                }
            })
            setListaUsuario(data.data.usuario)
            console.log(data.data.usuario)
        } catch (error) {

        }


    }

    useEffect(() => {
        listarDatos()
    }, [])

    return (

        <Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                USUARIOS
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>

                        <form>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_username">Usuario</label>
                            <input type="text" id="form_username" name="form_username" autoComplete="username" className="form-control" placeholder="Usuario" {...register("form_username", { required: { value: true, message: "Se necesita ingresar el usuario" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_username && <div>{errors.form_username.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_password">Password</label>
                            <input type="password" id="form_password" name="form_password" autoComplete="new-password" className="form-control" {...register("form_password", { required: { value: true, message: "Se necesita ingresar la password" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_password && <div>{errors.form_password.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_nombre">Nombre</label>
                            <input type="text" id="form_nombre" name="form_nombre" autoComplete="name" className="form-control" placeholder="Nombre" {...register("form_nombre", { required: { value: true, message: "Se necesita ingresar el Nombre" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_nombre && <div>{errors.form_nombre.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_apellido">Apellido</label>
                            <input type="text" id="form_apellido" name="form_apellido" autoComplete="cc-name" className="form-control" placeholder="Apellido" {...register("form_apellido", { required: { value: true, message: "Se necesita ingresar el Apellido" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_apellido && <div>{errors.form_apellido.message}</div>}
                          </div>
                        </div>
                      </form>
                      <Button variant="primary" onClick={insertUsuario}>Guardar</Button>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>

    );
}

export default Reportes;