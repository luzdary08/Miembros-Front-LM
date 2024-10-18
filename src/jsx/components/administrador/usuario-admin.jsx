import React, { Fragment, useState, useEffect } from "react";
import { Pagination } from "../../layouts/Pagination";
import { Row, Col, Card, Table, Button, Modal, Alert, Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import './mi.css';
import { urlBackend } from "../../config";
import { Logout } from '../../../store/actions/AuthActions';
import { useDispatch } from 'react-redux';
import { servicePostImagenBlanco, serviceGetBuscarCogopDistrito, serviceGetListarUsuarios, servicePostAgregarUsuarios, servicePostEditarUsuarios, servicePostEliminarUsuarios, servicePostBuscarUsuario, servicePostAgregarImagen } from './services/apiService';
const emojis = { welcome: (<svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' className='me-2'> <circle cx='12' cy='12' r='10'></circle> <path d='M8 14s1.5 2 4 2 4-2 4-2'></path> <line x1='9' y1='9' x2='9.01' y2='9'></line> <line x1='15' y1='9' x2='15.01' y2='9'></line></svg>) }

const UsuarioAdmin = () => {
  const [iglesia, setIglesia] = useState('');
  const [iglesiaLista, setListaIglesia] = useState([]);
  const [iglesiaEstado, setIglesiaEstado] = useState(false);
  const [arrayIglesia, setArrayIglesia] = useState([])

  const [distritoCogop, setDistritoCogop] = useState('');
  const [distritoCogopLista, setDistritoCogopLista] = useState([]);
  const [distritoCogopEstado, setdistritoCogopEstado] = useState(false);
  const [arrayDistritoCogop, setArrayDistritoCogop] = useState([])

  const [modalUsuario, setModalUsuario] = useState(false);
  const [modalUsuarioImagen, setModalUsuarioImagen] = useState(false);
  const [carga, setCarga] = useState(true);
  const [imagen, setImagen] = useState([]);
  const [cargaAdd, setCargaAdd] = useState(true);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [getUsuarios, setUsuarios] = useState([]);
  const [getRol, setRol] = useState([]);
  const [getEstado, setEstado] = useState([]);
  const [newElement, setNewElement] = useState(true);
  const [inputEditar, setInputEditar] = useState(false);

  const { register, clearErrors, setValue, getValues, trigger, formState: { isValid, errors } } = useForm({ defaultValues: { perfil_id: 0, id: 0, form_username: "", form_password: "", form_rol_id: "", form_estado_id: "", form_nombre: "", form_apellido: "", imagen: "" } });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function modalAction(condicion, data) {
    setFail(false);
    setCargaAdd(false)
    setCarga(false)
    setValue("form_username", data ? data.username : "");
    setValue("imagen", data ? data.imagen : "");
    setValue("form_password", data ? "123456" : "");
    setValue("form_nombre", data ? data.perfil.nombre : "");
    setValue("form_apellido", data ? data.perfil.apellido : "");
    setValue("form_rol_id", data ? data.rol.id : "");
    setValue("form_estado_id", data ? data.estado.id : "");
    setValue("id", data ? data.id : 0);
    setValue("perfil_id", data ? data.perfil.id : 0);
    setMessage("");
    limpiarBuscarIglesia()
    limpiarBuscarDistritoCogop()
    if (condicion == 'agregar') {
      setNewElement(true);
      setModalUsuario(true)
      setInputEditar(false)
    } else if (condicion == 'cerrar') {
      setNewElement(true);
      setModalUsuario(false)
      clearErrors();
      setSuccess(false);
      setInputEditar(false)
      setIglesia('')
      setIglesiaEstado(false)
    } else if (condicion == 'imagen') {
      console.log(data ? data.imagen : "")
      setImagen(data ? data.imagen : "")
      setNewElement(true);
      setModalUsuarioImagen(true)
      clearErrors();
      setSuccess(false);
      setInputEditar(false)
      setIglesia('')
      setIglesiaEstado(false)
    } else if (condicion == 'imagenCerrar') {
      setImagen("")
      setNewElement(true);
      setModalUsuarioImagen(false)
      clearErrors();
      setSuccess(false);
      setInputEditar(false)
      setIglesia('')
      setIglesiaEstado(false)
    } else {
      setArrayIglesia(data.iglesia ? data.iglesia : "")
      setArrayDistritoCogop(data.distrito ? data.distrito : "")
      setNewElement(false);
      setModalUsuario(true)
      setInputEditar(true)
    }
  }
  const getListarUsuarios = async (page_num, page_size) => {
    try {
      setCarga(true)
      const response = await serviceGetListarUsuarios(page_num, page_size)
      setCarga(false)
      setPageSize(page_size);
      setTotalCount(response.count);
      setUsuarios(response.usuario);
      setRol(response.rol);
      setEstado(response.estado);
    } catch (error) {
      setCarga(false)
      errorApi(error.response.data)
    }
  }
  const insertUsuario = async () => {
    trigger()
    if (!isValid) return;
    const data = {
      username: getValues("form_username"),
      password: getValues("form_password"),
      estado: { id: getValues("form_estado_id") },
      rol: { id: getValues("form_rol_id") },
      perfil: { nombre: getValues("form_nombre"), apellido: getValues("form_apellido") },
      arrayDistritoCogop,
      arrayIglesia
    }
    setMessage("");
    setFail(false);
    setSuccess(false);
    setCargaAdd(true)
    try {
      const response = await servicePostAgregarUsuarios(data)
      if (response.status == "SUCCESS") {
        setMessage("Agregado Correctamente");
        setFail(false);
        setSuccess(true);
        setCargaAdd(false)
        setTimeout(function () { modalAction("cerrar", "") }, 1000);
        getListarUsuarios(1, pageSize);
        limpiarBuscarIglesia()
        limpiarBuscarDistritoCogop()
      } else {
        setMessage(response.error_message);
        setSuccess(false);
        setFail(true);
        setCargaAdd(false)
      }
    } catch (error) {
      setCargaAdd(false)
      errorApi(error.response.data)
    }
  }
  const insertImagen = async (data) => {
    const formData = new FormData();
    formData.append('id', getValues("id"))
    formData.append('imagen', getValues("imagen")[0])

    setMessage("");
    setFail(false);
    setSuccess(false);
    setCargaAdd(true)
    try {
      const response = await servicePostAgregarImagen(formData)
      if (response.status == "SUCCESS") {
        setMessage("Agregado Correctamente");
        setFail(false);
        setSuccess(true);
        setCargaAdd(false)
        setTimeout(function () { modalAction("imagenCerrar", "") }, 1000);
        getListarUsuarios(1, pageSize);
        limpiarBuscarIglesia()
        limpiarBuscarDistritoCogop()
      } else {
        setMessage(response.error_message);
        setSuccess(false);
        setFail(true);
        setCargaAdd(false)
      }
    } catch (error) {
      setCargaAdd(false)
      errorApi(error.response.data)
    }
  }
  const editarUsuario = async () => {
    trigger()
    if (!isValid) return;
    const data = {
      id: getValues("id"),
      username: getValues("form_username"),
      estado: { id: getValues("form_estado_id") },
      rol: { id: getValues("form_rol_id") },
      perfil: { id: getValues("perfil_id"), nombre: getValues("form_nombre"), apellido: getValues("form_apellido") },
      arrayDistritoCogop,
      arrayIglesia
    }
    setMessage("");
    setFail(false);
    setSuccess(false);
    setCargaAdd(true)
    try {
      const response = await servicePostEditarUsuarios(data)
      if (response.status == "SUCCESS") {
        setMessage("Actualizado Correctamente");
        setFail(false);
        setSuccess(true);
        setCargaAdd(false)
        setTimeout(function () { modalAction("cerrar", "") }, 1000);
        getListarUsuarios(1, pageSize);
      } else {
        setMessage(response.error_message);
        setSuccess(false);
        setFail(true);
        setCargaAdd(false)
      }
    } catch (error) {
      setCargaAdd(false)
      errorApi(error.response.data)
    }

  }
  const eliminarUsuario = async () => {
    trigger()
    if (!isValid) return;
    const data = {
      id: getValues("id"),
      estado: { id: 3 }
    }
    setMessage("");
    setFail(false);
    setSuccess(false);
    setCargaAdd(true)

    try {
      const response = await servicePostEliminarUsuarios(data)
      if (response.status == "SUCCESS") {
        setMessage("Eliminado Correctamente");
        setFail(false);
        setSuccess(true);
        setCargaAdd(false)
        setTimeout(function () { modalAction("cerrar", "") }, 1000);
        getListarUsuarios(1, pageSize);
      } else {
        setMessage(response.error_message);
        setSuccess(false);
        setFail(true);
        setCargaAdd(false)
      }
    } catch (error) {
      setCargaAdd(false)
      errorApi(error.response.data)
    }
  }
  const eliminarImagen = async () => {
    const data = {
      id: getValues("id")
    }
    setMessage("");
    setFail(false);
    setSuccess(false);
    setCargaAdd(true)

    try {
      const response = await servicePostImagenBlanco(data)
      if (response.status == "SUCCESS") {
        setMessage("Eliminado Correctamente");
        setFail(false);
        setSuccess(true);
        setCargaAdd(false)
        setTimeout(function () { modalAction("imagenCerrar", "") }, 1000);
        getListarUsuarios(1, pageSize);
      } else {
        setMessage(response.error_message);
        setSuccess(false);
        setFail(true);
        setCargaAdd(false)
      }
    } catch (error) {
      setCargaAdd(false)
      errorApi(error.response.data)
    }
  }
  const buscarIglesia = async (event) => {
    if (event.key === 'Enter') {
      const data = {
        nombre: iglesia
      }
      try {
        const response = await servicePostBuscarUsuario(data)

        if (response.size > 0) {
          setListaIglesia(response.data)
          setIglesiaEstado(true)
        } else {
          setIglesiaEstado(false)
          setListaIglesia([])
        }

      } catch (error) {
        setCargaAdd(false)
        errorApi(error.response.data)
      }
    }

  }
  const buscarCogopDistrito = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await serviceGetBuscarCogopDistrito(distritoCogop)
        console.log(response)
        if (response.size > 0) {
          setDistritoCogopLista(response.data)
          setdistritoCogopEstado(true)
        } else {
          setdistritoCogopEstado(false)
          setDistritoCogopLista([])
        }

      } catch (error) {
        setCargaAdd(false)
        errorApi(error.response.data)
      }
    }

  }
  const limpiarBuscarIglesia = () => {
    setIglesiaEstado(false)
    setListaIglesia([])
    setArrayIglesia([])
    setIglesia('')

  }
  const limpiarBuscarDistritoCogop = () => {
    setdistritoCogopEstado(false)
    setDistritoCogopLista([])
    setArrayDistritoCogop([])
    setDistritoCogop('')

  }
  const seleccionarIglesia = (iglesia) => {
    setArrayIglesia(iglesia)
  };
  const seleccionarDistritoCogop = (distritoCogop) => {
    setArrayDistritoCogop(distritoCogop)
  };
  function errorApi(data) {
    if (data.error && (data.error.name === "TokenExpiredError" || data.error.name === "JsonWebTokenError")) {
      dispatch(Logout(navigate));
    } else {
      Swal.fire({ icon: 'error', title: 'Oops', text: 'Error en el servidor, contactarse con el equipo de Soporte!' })
    }
  }
  useEffect(() => {
    getListarUsuarios(1, pageSize);
  }, []);
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                <Button className="me-2" variant="primary btn-rounded" onClick={() => modalAction("agregar", "")}>
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info" />
                  </span>
                  Lista de Usuarios
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Modal className="fade bd-example-modal-lg" size="lg" show={modalUsuario} onHide={setModalUsuario} centered backdrop="static" keyboard={false}>
                <Modal.Header>
                  <Modal.Title>{newElement ? <>Agregar Usuario</> : <>Editar Usuario</>}</Modal.Title>
                  <Button onClick={() => modalAction("cerrar", "")} variant="" className="btn-close"> </Button>
                </Modal.Header>
                <Modal.Body>
                  {cargaAdd
                    ? <Badge bg="" className='badge-warning light'>Cargando....</Badge>
                    : <>
                      {success && <><Alert variant="success" className="solid">{emojis.welcome} {" "} {message} </Alert></>}
                      {fail && <><Alert variant="danger" className="solid"><div className='media'><div className="media-body"><h5 className="mt-1 mb-2 text-white">Error</h5><p className="mb-0">{message}</p></div></div></Alert></>}
                      <form>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_username">Usuario</label>
                            <input type="text" id="form_username" name="form_username" autoComplete="username" readOnly={inputEditar} disabled={inputEditar} className="form-control form-control-sm" placeholder="Usuario" {...register("form_username", { required: { value: true, message: "Se necesita ingresar el usuario" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_username && <div className="">{errors.form_username.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_password">Password</label>
                            <input type="password" id="form_password" name="form_password" autoComplete="new-password" readOnly={inputEditar} disabled={inputEditar} className="form-control form-control-sm" {...register("form_password", { required: { value: true, message: "Se necesita ingresar la password" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_password && <div>{errors.form_password.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_nombre">Nombre</label>
                            <input type="text" id="form_nombre" name="form_nombre" autoComplete="name" className="form-control form-control-sm" placeholder="Nombre" {...register("form_nombre", { required: { value: true, message: "Se necesita ingresar el Nombre" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_nombre && <div>{errors.form_nombre.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="form_apellido">Apellido</label>
                            <input type="text" id="form_apellido" name="form_apellido" autoComplete="cc-name" className="form-control form-control-sm" placeholder="Apellido" {...register("form_apellido", { required: { value: true, message: "Se necesita ingresar el Apellido" }, maxLength: { value: 50, message: "Se acepta solo 50 caracteres" } })} />
                            {errors.form_apellido && <div>{errors.form_apellido.message}</div>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="formulario_iglesia" onClick={() => limpiarBuscarIglesia()}>Seleccionar Iglesia</label>
                            {arrayIglesia.length === 0 ? (
                              <>
                                <input type="text" id="formulario_iglesia" name="formulario_iglesia" autoComplete="cc-name" className="form-control form-control-sm" placeholder="" value={iglesia} onChange={(e) => setIglesia(e.target.value)} onKeyDown={buscarIglesia} />
                                {iglesiaEstado
                                  ? <><Table responsive>
                                    <thead>
                                      <tr>
                                        <th>
                                          #
                                        </th>
                                        <th>
                                          Nombre
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {iglesiaLista.map((iglesia, index) => (
                                        <tr key={index}>
                                          <td>
                                            <strong>{index + 1}</strong>
                                          </td>
                                          <td onClick={() => seleccionarIglesia(iglesia)}>{iglesia.nombre} </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                  </>
                                  : <></>
                                }</>) : (<input type="text" id="formulario_iglesia" name="formulario_iglesia" autoComplete="cc-name" className="form-control form-control-sm" value={arrayIglesia.nombre} readOnly={true} disabled={true} />
                            )}

                          </div>



                          <div className="mb-3 col-md-6">
                            <label htmlFor="formulario_iglesia_distrito" onClick={() => limpiarBuscarDistritoCogop()}>Seleccionar Distrito</label>
                            {arrayDistritoCogop.length === 0 ? (
                              <>
                                <input type="text" id="formulario_iglesia_distrito" name="formulario_iglesia_distrito" autoComplete="cc-name" className="form-control form-control-sm" placeholder="" value={distritoCogop} onChange={(e) => setDistritoCogop(e.target.value)} onKeyDown={buscarCogopDistrito} />
                                {distritoCogopEstado
                                  ? <><Table responsive>
                                    <thead>
                                      <tr>
                                        <th>
                                          #
                                        </th>
                                        <th>
                                          Nombre
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {distritoCogopLista.map((distrito, index) => (
                                        <tr key={index}>
                                          <td>
                                            <strong>{index + 1}</strong>
                                          </td>
                                          <td onClick={() => seleccionarDistritoCogop(distrito)}>{distrito.nombre} </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                  </>
                                  : <></>
                                }</>) : (<input type="text" id="formulario_iglesia" name="formulario_iglesia" autoComplete="cc-name" className="form-control form-control-sm" value={arrayDistritoCogop.nombre} readOnly={true} disabled={true} />
                            )}

                          </div>

                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="estado_id">Estado</label>
                            <select id="estado_id" name="estado_id" autoComplete="off" className="form-control form-control-sm" {...register("form_estado_id", { required: { value: true, message: "se necesita seleccionar una opción" } })}>
                              <option disabled value="">Seleccionar</option>
                              {getEstado.map((estado, index) => (
                                <option key={index} value={estado.id}>{estado.nombre}</option>
                              ))}
                            </select>
                            {errors.form_estado_id && <div>{errors.form_estado_id.message}</div>}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="rol_id">Rol</label>
                            <select id="rol_id" name="rol_id" autoComplete="off" className="form-control form-control-sm" {...register("form_rol_id", { required: { value: true, message: "se necesita seleccionar una opción" } })}>
                              <option disabled value="">Seleccionar</option>
                              {getRol.map((rol, index) => (
                                <option key={index} value={rol.id}>{rol.nombre}</option>
                              ))}
                            </select>
                            {errors.form_rol_id && <div>{errors.form_rol_id.message}</div>}
                          </div>
                        </div>
                      </form>

                    </>
                  }
                </Modal.Body>
                <Modal.Footer>
                  {cargaAdd
                    ? <></>
                    : !success && (newElement
                      ? <Button variant="primary" onClick={insertUsuario}>Guardar</Button>
                      : <>
                        <Button variant="success" onClick={editarUsuario}>Actualizar</Button>
                        <Button variant="danger" onClick={eliminarUsuario}>Eliminar</Button></>
                    )
                  }

                </Modal.Footer>
              </Modal>


              <Modal className="fade bd-example-modal-lg" size="lg" show={modalUsuarioImagen} onHide={setModalUsuarioImagen} centered backdrop="static" keyboard={false}>
                <Modal.Header>
                  <Modal.Title>{newElement ? <>Agregar Imagen</> : <>Editar Imagen</>}</Modal.Title>
                  <Button onClick={() => modalAction("imagenCerrar", "")} variant="" className="btn-close"> </Button>
                </Modal.Header>
                <Modal.Body>
                  {cargaAdd
                    ? <Badge bg="" className='badge-warning light'>Cargando....</Badge>
                    : <>
                      {success && <><Alert variant="success" className="solid">{emojis.welcome} {" "} {message} </Alert></>}
                      {fail && <><Alert variant="danger" className="solid"><div className='media'><div className="media-body"><h5 className="mt-1 mb-2 text-white">Error</h5><p className="mb-0">{message}</p></div></div></Alert></>}

                      {imagen
                        ?
   
                            <div className="image-container">
                              <img src={`${urlBackend}/api/v1/core/usuario/imagen/?imagen=${imagen}`} alt="Logo" className="responsive-image" />
                              <img src={`${urlBackend}/api/v1/core/usuario/imagen-resize/?imagen=${imagen}`} alt="Logo" />
                            </div>
                        :
                        <form>
                          <div className="row">
                            <div className="mb-3 col-md-6">
                              <label htmlFor="form_username">Imagen</label>
                              <input {...register('imagen')} type="file" accept="image/*" className="form-control form-control-sm" />
                            </div>
                          </div>
                        </form>
                      }


                    </>
                  }
                </Modal.Body>
                <Modal.Footer>
                  {cargaAdd
                    ? <></>
                    : !success && (!imagen
                      ? <Button variant="primary" onClick={insertImagen}>Guardar</Button>
                      : <>
                        <Button variant="danger" onClick={eliminarImagen}>Eliminar</Button></>
                    )
                  }

                </Modal.Footer>
              </Modal>

              {carga
                ?
                <Badge bg="" className='badge-warning light'>Cargando....</Badge>
                :
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Nombre Completo</th>
                        <th>Estado</th>
                        <th>Iglesia</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUsuarios.map((usuario, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="w-space-no">{usuario.username}</span>
                            </div>
                          </td>
                          <td>{usuario.rol.nombre} </td>
                          <td>{usuario.perfil.nombre} {usuario.perfil.apellido}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {usuario.estado.id == 1
                                ? <><i className="fa fa-circle text-success me-1" /> {usuario.estado.nombre}</>
                                : <><i className="fa fa-circle text-danger me-1" /> {usuario.estado.nombre}</>
                              }
                            </div>
                          </td>
                          <td>{usuario.iglesia.nombre}</td>
                          <td>
                            <div className="d-flex">
                              <Button className="me-2" variant="success btn-xs" onClick={() => modalAction("editar", usuario)}>
                                Editar{" "}
                                <span className="btn-icon-end">
                                  <i className="fa fa-pencil"></i>
                                </span>
                              </Button>
                              <Button className="me-2" variant="danger btn-xs" onClick={() => modalAction("imagen", usuario)}>
                                Imagen{" "}
                                <span className="btn-icon-end">
                                  <i className="fa fa-pencil"></i>
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination totalItems={totalCount} pageSize={pageSize} pageSizeList={[5, 10, 25, 50]} onChangePage={(pageNum, pageSize) => listarUsuarios(pageNum, pageSize)}></Pagination>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default UsuarioAdmin;
