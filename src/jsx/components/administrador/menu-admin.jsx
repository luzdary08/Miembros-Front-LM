import React, { Fragment, useState, useEffect } from "react"
import { serviceGetListarMenu, servicePostAgregarMenu, servicePatchEditarMenu, serviceDeleteEliminarMenu } from './services/apiServiceMenu'
import { Pagination } from "../../layouts/Pagination"
import Swal from "sweetalert2"
import { Row, Col, Card, Table, Button, Modal, Alert, Badge } from "react-bootstrap"
import { useForm } from "react-hook-form"
import './mi.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const emojis = { welcome: (<svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' className='me-2'> <circle cx='12' cy='12' r='10'></circle> <path d='M8 14s1.5 2 4 2 4-2 4-2'></path> <line x1='9' y1='9' x2='9.01' y2='9'></line> <line x1='15' y1='9' x2='15.01' y2='9'></line></svg>) }

const MenuAdmin = () => {
    const [carga, setCarga] = useState(true);
    const [cargaAdd, setCargaAdd] = useState(true);
    const [pageSize, setPageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [getMenu, setMenu] = useState([]);
    const [getMenuSub, setMenuSub] = useState([]);
    const [modalListaSubMenu, setModalListaSubMenu] = useState(false);
    const [modalListaSubMenuAgregar, setModalListaSubMenuAgregar] = useState(false);
    const [modalListaAgregar, setModalListaAgregar] = useState(false);
    const [getRol, setRol] = useState([])
    const [newElement, setNewElement] = useState(true);
    const [fail, setFail] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [inputEditar, setInputEditar] = useState(false);
    const { handleSubmit, register, clearErrors, setValue, getValues, trigger, formState: { isValid, errors } } = useForm({ defaultValues: { id: 0, form_order: "", form_nombre: "", form_url: "", form_rol_id: "", form_classs_change: "", form_iconStyle: "" } });

    const notifyTopRight = (mensaje) => {
        toast.success(mensaje, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const getListarMenu = async (page_num, page_size) => {
        try {
            setCarga(true)
            const response = await serviceGetListarMenu(page_num, page_size)
            setCarga(false)
            setPageSize(page_size);
            setTotalCount(response.count);
            setMenu(response.menu);
            setRol(response.rol)
        } catch (error) {
            setCarga(false)
            errorApi(error.response.data)
        }
    }
    const agregarMenu = async () => {
        trigger()
        if (!isValid) return;
        const data = {
            "order": getValues("form_order"),
            "nombre": getValues("form_nombre"),
            "url": getValues("form_url"),
            "parent_id": 0,
            "rol_id": getValues("form_rol_id"),
            "classs_change": getValues("form_classs_change"),
            "iconStyle": getValues("form_iconStyle"),
        }
        setMessage("");
        setFail(false);
        setSuccess(false);
        setCargaAdd(true)
        try {
            const response = await servicePostAgregarMenu(data)
            if (response.status == "SUCCESS") {
                modalAction("editarCerrar", "")
                notifyTopRight("Agregado Correctamente")
                setFail(false);
                setSuccess(false);
                setCargaAdd(false)

                getListarMenu(1, pageSize);
            } else {
                setMessage(response.error_message);
                setSuccess(false);
                setFail(true);
                setCargaAdd(false)
            }

        } catch (error) {
            setCarga(false)
            setCargaAdd(false)
            errorApi(error.response.data)
        }
    }
    const agregarSubMenu = async () => {
        trigger()
        if (!isValid) return;
        const data = {
            "order": getValues("form_order"),
            "nombre": getValues("form_nombre"),
            "url": getValues("form_url"),
            "parent_id": getValues("id"),
            "rol_id": getValues("form_rol_id"),
            "classs_change": "",
            "iconStyle": getValues("form_iconStyle"),
        }
        setMessage("");
        setFail(false);
        setSuccess(false);
        setCargaAdd(true)
        try {
            const response = await servicePostAgregarMenu(data)
            if (response.status == "SUCCESS") {
                notifyTopRight("Agregado Correctamente")
                setFail(false);
                setSuccess(false);
                setCargaAdd(false)
                modalAction("listarCerrar", "")
                getListarMenu(1, pageSize);
            } else {
                setMessage(response.error_message);
                setSuccess(false);
                setFail(true);
                setCargaAdd(false)
            }

        } catch (error) {
            setCarga(false)
            setCargaAdd(false)
            errorApi(error.response.data)
        }
    }
    const editarMenu = async () => {
        trigger()
        if (!isValid) return;
        const data = {
            "id": getValues("id"),
            "order": getValues("form_order"),
            "nombre": getValues("form_nombre"),
            "rol_id": getValues("form_rol_id"),
            "classs_change": getValues("form_classs_change"),
            "iconStyle": getValues("form_iconStyle"),
        }
        setMessage("");
        setFail(false);
        setSuccess(false);
        setCargaAdd(true)
        try {
            const response = await servicePatchEditarMenu(data)
            if (response.status == "SUCCESS") {
                notifyTopRight("Editado Correctamente")
                setFail(false);
                setSuccess(false);
                setCargaAdd(false)
                modalAction("editarCerrar", "")
                getListarMenu(1, pageSize);
            } else {
                setMessage(response.error_message);
                setSuccess(false);
                setFail(true);
                setCargaAdd(false)
            }

        } catch (error) {
            setCarga(false)
            setCargaAdd(false)
            errorApi(error.response.data)
        }
    }
    const eliminarMenu = async () => {
        const data = {
            "id": getValues("id")
        }
        setMessage("");
        setFail(false);
        setSuccess(false);
        setCargaAdd(true)
        try {
            const response = await serviceDeleteEliminarMenu(data)
            if (response.status == "SUCCESS") {
                notifyTopRight("Eliminado Correctamente")
                setFail(false);
                setSuccess(false);
                setCargaAdd(false)
                modalAction("editarCerrar", "")
                getListarMenu(1, pageSize);
            } else {
                setMessage(response.error_message);
                setSuccess(false);
                setFail(true);
                setCargaAdd(false)
            }

        } catch (error) {
            setCarga(false)
            setCargaAdd(false)
            errorApi(error.response.data)
        }
    }
    const eliminarSubMenu = async (id) => {
        const data = {
            "id": id
        }
        setMessage("");
        setFail(false);
        setSuccess(false);
        setCargaAdd(true)
        try {
            const response = await serviceDeleteEliminarMenu(data)
            if (response.status == "SUCCESS") {
                setMessage("Eliminado Correctamente");
                setFail(false);
                setSuccess(true);
                setCargaAdd(false)
                setTimeout(function () { modalAction("cerrar", "") }, 1000);
                getListarMenu(1, pageSize);
            } else {
                setMessage(response.error_message);
                setSuccess(false);
                setFail(true);
                setCargaAdd(false)
            }

        } catch (error) {
            setCarga(false)
            errorApi(error.response.data)
        }
    }
    const modalAction = (condicion, data) => {
        clearErrors()
        setCargaAdd(false)
        setFail(false);
        setMessage("");
        setValue("id", data ? data.id : 0);
        setValue("form_order", data ? data.order : "");
        setValue("form_nombre", data ? data.nombre : "");
        setValue("form_url", data ? data.url : "");
        setValue("form_rol_id", data ? data.rol.id : "");
        setValue("form_classs_change", data ? data.classs_change : "");
        setValue("form_iconStyle", data ? data.iconStyle : "");
        if (condicion == 'agregar') {
            setModalListaAgregar(true)
            setNewElement(true);
            setInputEditar(false)
            setMenuSub([])
        } else if (condicion == 'cerrar') {
            setMenuSub([])
            setModalListaSubMenu(false)
        } else if (condicion == 'listar') {
            setSuccess(false);
            setMenuSub(data.children)
            setModalListaSubMenu(true)
        } else if (condicion == 'listarAgregar') {
            setValue("form_order", "");
            setValue("form_nombre", "");
            setValue("form_url", "");
            setValue("form_classs_change", "");
            setValue("form_iconStyle", "");
            setSuccess(false);
            setModalListaSubMenuAgregar(true)
            setMenuSub([])
        } else if (condicion == 'listarCerrar') {
            setModalListaSubMenuAgregar(false)
            setMenuSub([])
        } else if (condicion == 'editar') {
            setInputEditar(true)
            setModalListaAgregar(true)
            setNewElement(false);
            setMenuSub([])
        } else {
            setInputEditar(false)
            setSuccess(false);
            setNewElement(true);
            setMenuSub([])
            setModalListaAgregar(false)
        }

    }
    function errorApi(data) {
        if (data.error && (data.error.name === "TokenExpiredError" || data.error.name === "JsonWebTokenError")) {
            dispatch(Logout(navigate));
        } else {
            Swal.fire({ icon: 'error', title: 'Oops', text: 'Error en el servidor, contactarse con el equipo de Soporte!' })
        }
    }
    useEffect(() => {
        getListarMenu(1, pageSize);
        setMenuSub([])
    }, []);





    return (
        <Fragment>
            <ToastContainer />
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <Button className="me-2" variant="primary btn-xs" onClick={() => modalAction('agregar', '')}>Agregar Menu</Button>
                            </Card.Title>
                        </Card.Header>
    

                            <Modal className="fade bd-example-modal-lg" size="lg" show={modalListaSubMenu} onHide={setModalListaSubMenu} centered backdrop="static" keyboard={false}>
                                <Modal.Header>
                                    <Modal.Title>Lista de SubMenu</Modal.Title>
                                    <Button onClick={() => modalAction("cerrar", "")} variant="" className="btn-close"> </Button>
                                </Modal.Header>
                                <Modal.Body>
                                    {success && <><Alert variant="success" className="solid">{emojis.welcome} {" "} {message} </Alert></>}
                                    {fail && <><Alert variant="danger" className="solid"><div className='media'><div className="media-body"><h5 className="mt-1 mb-2 text-white">Error</h5><p className="mb-0">{message}</p></div></div></Alert></>}
                                    <Table responsive>
                                        <thead>
                                            <tr>

                                                <th>Order</th>
                                                <th>Nombre</th>
                                                <th>Icon</th>
                                                <th>Url</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getMenuSub.map((items, index) => (
                                                <tr key={index}>
                                                    <td>{items.order}</td>
                                                    <td>{items.nombre}</td>
                                                    <td>{items.iconStyle}</td>
                                                    <td>{items.url}</td>
                                                    <td><Button className="me-2" variant="success btn-xs" onClick={() => eliminarSubMenu(items.id)}>Eliminar</Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Modal.Body>
                            </Modal>

                            <Modal className="fade bd-example-modal-lg" size="lg" show={modalListaSubMenuAgregar} onHide={setModalListaSubMenuAgregar} centered backdrop="static" keyboard={false}>
                                <Modal.Header>
                                    <Modal.Title>Agregar SubMenu</Modal.Title>
                                    <Button onClick={() => modalAction("listarCerrar", "")} variant="" className="btn-close"> </Button>
                                </Modal.Header>
                                <Modal.Body>
                                    {success && <><Alert variant="success" className="solid">{emojis.welcome} {" "} {message} </Alert></>}
                                    {fail && <><Alert variant="danger" className="solid"><div className='media'><div className="media-body"><h5 className="mt-1 mb-2 text-white">Error</h5><p className="mb-0">{message}</p></div></div></Alert></>}
                                    <form>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="form_order">Order</label>
                                                <input type="text" id="form_order" name="form_order" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_order", { required: { value: true, message: "Se necesita ingresar el order" }, maxLength: { value: 4, message: "Se acepta solo 4 caracteres" } })} />
                                                {errors.form_order && <div className="">{errors.form_order.message}</div>}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="form_nombre">Nombre</label>
                                                <input type="text" id="form_nombre" name="form_nombre" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_nombre", { required: { value: true, message: "Se necesita ingresar el Nombre" }, maxLength: { value: 15, message: "Se acepta solo 15 caracteres" } })} />
                                                {errors.form_nombre && <div className="">{errors.form_nombre.message}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="form_iconStyle">Icon</label>
                                                <input type="text" id="form_iconStyle" name="form_iconStyle" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_iconStyle", { required: { value: true, message: "Se necesita ingresar el icono" }, maxLength: { value: 40, message: "Se acepta solo 40 caracteres" } })} />
                                                {errors.form_iconStyle && <div className="">{errors.form_iconStyle.message}</div>}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="form_url">Url</label>
                                                <input type="text" id="form_url" name="form_url" autoComplete="off" readOnly={inputEditar} disabled={inputEditar} className="form-control form-control-sm" placeholder="" {...register("form_url", { required: { value: true, message: "Se necesita ingresar el URL" }, maxLength: { value: 45, message: "Se acepta solo 45 caracteres" } })} />
                                                {errors.form_url && <div className="">{errors.form_url.message}</div>}
                                            </div>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary btn-xs" onClick={agregarSubMenu} disabled={cargaAdd}>Guardar</Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal className="fade bd-example-modal-lg" size="lg" show={modalListaAgregar} onHide={setModalListaAgregar} centered backdrop="static" keyboard={false}>
                                <Modal.Header>
                                    <Modal.Title>{newElement ? <>Agregar Menu</> : <>Editar Menu</>}</Modal.Title>
                                    <Button onClick={() => modalAction("editarCerrar", "")} variant="" className="btn-close"> </Button>
                                </Modal.Header>
                                <Modal.Body>
                                    {success && <><Alert variant="success" className="solid">{emojis.welcome} {" "} {message} </Alert></>}
                                    {fail && <><Alert variant="danger" className="solid"><div className='media'><div className="media-body"><h5 className="mt-1 mb-2 text-white">Error</h5><p className="mb-0">{message}</p></div></div></Alert></>}

                                    {cargaAdd ?
                                        <Badge bg="" className='badge-warning light'>Guardando....</Badge>
                                        : <form>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_order">Order</label><span className="text-danger">*</span>
                                                    <input type="text" id="form_order" name="form_order" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_order", { required: { value: true, message: "Se necesita ingresar el order" }, maxLength: { value: 4, message: "Se acepta solo 4 caracteres" } })} />
                                                    {errors.form_order && <div id="val-username1-error" className="invalid-feedback animated fadeInUp" style={{ display: "block" }} >{errors.form_order.message}</div>}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_nombre">Nombre</label><span className="text-danger">*</span>
                                                    <input type="text" id="form_nombre" name="form_nombre" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_nombre", { required: { value: true, message: "Se necesita ingresar el Nombre" }, maxLength: { value: 20, message: "Se acepta solo 20 caracteres" } })} />
                                                    {errors.form_nombre && <div id="val-username1-error" className="invalid-feedback animated fadeInUp" style={{ display: "block" }} >{errors.form_nombre.message}</div>}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_classs_change">Class</label>
                                                    <input type="text" id="form_classs_change" name="form_classs_change" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_classs_change")} />
                                                    {errors.form_classs_change && <span>This field is required</span>}

                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_rol_id">Rol</label><span className="text-danger">*</span>
                                                    <select id="form_rol_id" name="form_rol_id" autoComplete="off" className="form-control form-control-sm" {...register("form_rol_id", { required: { value: true, message: "se necesita seleccionar una opción" } })}>
                                                        <option disabled value="">Seleccionar</option>
                                                        {getRol.map((rol, index) => (
                                                            <option key={index} value={rol.id}>{rol.nombre}</option>
                                                        ))}
                                                    </select>
                                                    <div id="val-username1-error" className="invalid-feedback animated fadeInUp" style={{ display: "block" }} >
                                                        {errors.form_rol_id && errors.form_rol_id.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_iconStyle">Icon</label><span className="text-danger">*</span>
                                                    <input type="text" id="form_iconStyle" name="form_iconStyle" autoComplete="off" className="form-control form-control-sm" placeholder="" {...register("form_iconStyle", { required: { value: true, message: "Se necesita ingresar el icono" }, maxLength: { value: 30, message: "Se acepta solo 30 caracteres" } })} />
                                                    {errors.form_iconStyle && <div id="val-username1-error" className="invalid-feedback animated fadeInUp" style={{ display: "block" }} >{errors.form_iconStyle.message}</div>}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="form_url">Url</label><span className="text-danger">*</span>
                                                    <input type="text" id="form_url" name="form_url" autoComplete="off" readOnly={inputEditar} disabled={inputEditar} className="form-control form-control-sm" placeholder="" {...register("form_url", { required: { value: true, message: "Se necesita ingresar el URL" }, maxLength: { value: 30, message: "Se acepta solo 30 caracteres" } })} />
                                                    {errors.form_url && <div id="val-username1-error" className="invalid-feedback animated fadeInUp" style={{ display: "block" }} >{errors.form_url.message}</div>}
                                                </div>
                                            </div>
                                        </form>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    {!success && (newElement
                                        ? <Button variant="primary btn-xs" onClick={agregarMenu} disabled={cargaAdd}>Guardar</Button>
                                        : <>
                                            <Button variant="success btn-xs" onClick={editarMenu} disabled={cargaAdd}>Actualizar</Button>
                                            <Button variant="danger btn-xs" onClick={eliminarMenu} disabled={cargaAdd}>Eliminar</Button></>
                                    )
                                    }
                                </Modal.Footer>
                            </Modal>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    {carga
                        ?
                        <Badge bg="" className='badge-warning light'>Cargando....</Badge>
                        :
                        <>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Orden</th>
                                        <th>Nombre</th>
                                        <th>Rol</th>

                                        <th>Class</th>
                                        <th>Icon</th>
                                        <th>Url</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getMenu.map((menu, index) => (
                                        <tr key={index}>
                                            <td>
                                                <strong>{index + 1}</strong>
                                            </td>
                                            <td>{menu.order} </td>
                                            <td>{menu.nombre} </td>
                                            <td>{menu.rol.nombre} </td>
                                            <td>{menu.classs_change} </td>
                                            <td>{menu.iconStyle} </td>
                                            <td>{menu.url}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Button className="me-2" variant="success btn-xs" onClick={() => modalAction('editar', menu)}>
                                                        Editar
                                                    </Button>

                                                    {menu.classs_change
                                                        ?
                                                        <>
                                                            <Button className="me-2" variant="danger btn-xs" onClick={() => modalAction('listar', menu)}>
                                                                Ver
                                                            </Button>
                                                            <Button className="me-2" variant="warning btn-xs" onClick={() => modalAction('listarAgregar', menu)}>
                                                                Agregar
                                                            </Button>
                                                        </>
                                                        :
                                                        <></>
                                                    }

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Pagination totalItems={totalCount} pageSize={pageSize} pageSizeList={[5, 10, 25, 50]} onChangePage={(pageNum, pageSize) => getListarMenu(pageNum, pageSize)}></Pagination>
                        </>
                    }
                </Col>
            </Row>
        </Fragment>
    )
}
export default MenuAdmin;