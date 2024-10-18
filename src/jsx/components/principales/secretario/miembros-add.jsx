import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Table, Tab, Nav, Button, Modal, ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { urlBackend } from "../../../config";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useDispatch } from 'react-redux';
import MiembrosFormItem from './miembros-form-item'
import { User } from "../../../../assets/helper/util";
import { zodResolver } from '@hookform/resolvers/zod';
import './miembros.css';


const emojis = { welcome: (<svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' className='me-2'> <circle cx='12' cy='12' r='10'></circle> <path d='M8 14s1.5 2 4 2 4-2 4-2'></path> <line x1='9' y1='9' x2='9.01' y2='9'></line> <line x1='15' y1='9' x2='15.01' y2='9'></line></svg>) }
const MiembrosAdd = () => {
    const url = useNavigate();

    const redirigirMiembro = (e) => {
        e.preventDefault();
        url("/secretario/miembros");
    };


    const [pageSize, setPageSize] = useState(20);
    const [carga, setCarga] = useState(true);
    const dispatch = useDispatch();

    const [getUsuario, setUsuario] = useState([]);
    const [getEstudiosSeculares, setEstudiosSeculares] = useState([]);
    const [getEstudiosEclesiasticos, setEstudiosEclesiasticos] = useState([]);
    const [getTipoDocumento, setTipoDocumento] = useState([]);
    const [getSexo, setSexo] = useState([])
    const [getEstadosCivil, setEstadosCivil] = useState([]);
    const [getEstados, setEstados] = useState([]);
    const [getDones, setDones] = useState([]);
    const [getMinistroBautizmo, setMinistroBautizmo] = useState({ id: "", nombre: "" })
    const [getIglesias, setIglesia] = useState({ id: "", nombre: "" })
    const [searchMinistro, setSearchMinistro] = useState("");
    const [searchIglesia, setSearchIglesia] = useState("");
    //const [valueMinistro, setValueMinistro] = useState("");
    const [showEstado, setshowEstado] = useState(false);
    const [showEstadoIglesia, setshowEstadoIglesia] = useState(false);
    const [addMinistro, setAddMinistro] = useState("");
    const [addIglesia, setAddIglesia] = useState("");
    const [arrayMinistro, setArrayMinistro] = useState([]);
    const [arrayIglesia, setArrayIglesia] = useState([]);
    const [ministroId, setMinistroId] = useState(null);
    const [iglesiaId, setIglesiaId] = useState(null);
    const [getConvencimientoDoctrina, setConvencimientoDoctrina] = useState([]);
    const [getDiasVisita, setDiasVisita] = useState([]);
    const [getHorasVisita, setHorasVisita] = useState([]);
    const [getTipoRegistro, setTipoRegistro] = useState([]);
    const [getDepartamentos, setDepartamentos] = useState([]);
    const [getProvincias, setProvincias] = useState([]);
    const [getDistritos, setDistritos] = useState([]);
    const [esCasado, setEsCasado] = useState(false);
    const [esSeparado, setEsSeparado] = useState(false);
    const [numerosHijos, setnumerosHijos] = useState(0)

    const [modalUsuario, setModalUsuario] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (searchMinistro) {
            getMinistros()
        }

    }, [searchMinistro])

    useEffect(() => {
        if (searchIglesia) {
            getIglesia()
        }

    }, [searchIglesia])

    const getMinistros = async () => {
        try {
            const data = await axios.get("http://localhost:3000/api/v1/secretario/miembros/listar-ministros?nombre=" + searchMinistro, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.idToken
                },
            })
            setArrayMinistro(data.data.ministro_bautizmo)

        } catch (error) {
            console.error("Error al buscar ministros:", error);
        }
    }

    const getIglesia = async () => {
        try {
            const data = await axios.get("http://localhost:3000/api/v1/secretario/miembros/listar-iglesias?nombre=" + searchIglesia, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.idToken
                },
            })
            setArrayIglesia(data.data.iglesia)

        } catch (error) {
            console.error("Error al buscar ministros:", error);
        }
    }

    const handleEstadoCivilChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue)
        if (selectedValue == 2) {
            setEsCasado(true)
        } else {
            setEsCasado(false)
        }

        if (selectedValue == 5) {
            setEsSeparado(true)
        } else {
            setEsSeparado(false)
        }
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se guardó correctamente',
            confirmButtonText: 'Cerrar',
            timerProgressBar: true,
            showCloseButton: true,
        });
    };

    const showErrorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar los datos. Inténtalo nuevamente.',
            confirmButtonText: 'Cerrar',
            timerProgressBar: true,
            showCloseButton: true,
        });
    }


    const token = JSON.parse(localStorage.getItem('userDetails'))
    const { register, clearErrors, setValue, handleSubmit, getValues, watch, trigger, reset,setError, setFocus, formState: { isValid, errors } } = useForm({
        resolver:zodResolver(User),
        defaultValues: {
            form_usuario: "",
            form_nombres: "",
            form_apellido_paterno: "",
            form_apellido_materno: "",
            form_tipo_documento: "",
            form_fecha_nacimiento: "",
            form_estado: "",
            form_sexo: "",
            form_iglesia: "",
            form_estados_civil: "",
            form_telefono_fijo: "",
            form_telefono_celular: "",
            form_email: "",
            form_direccion: "",
            form_convencimiento_doctrina: "",
            form_dias_visita: "",
            form_horas_visita: "",
            form_dones: "",
            form_departamentos: "",
            form_distritos: "",
            form_provincias: "",
            form_hijos_nombres: 0,
            form_tipo_registro: "",
            form_estudios_seculares: "",
            form_numero_documento: "",
            form_fecha_conversion: "",
            form_fecha_traslado: "",
            form_estudios_eclesiasticos: "",
            form_apellido_paterno_conyuge: "",
            form_apellido_materno_conyuge: "",
            form_nombres_conyuge: "",
            form_fecha_bautizo: "",
            form_mayordomia_fiel: "",
            form_gdc: "",
            form_gps: "",
            form_cm: "",
            form_mision: "",
            form_fecha_observado: "",
            form_fecha_baja: "",
            form_experiencias_espirituales: "",
            form_ministro_bautizmo: ""
        },

    });


    async function onSubmit(datos) {


        let hijos = []

        for (let index = 0; index < numerosHijos; index++) {
            hijos[index] = {
                nombre: getValues(`form_hijos_nombres_${index}`),
                apellido_paterno: getValues(`form_hijos_apellido_paterno_${index}`),
                apellido_materno: getValues(`form_hijos_apellido_materno_${index}`),
            }
        }

        let usuario = datos.form_usuario

        // if (datos.form_usuario == 'vacio') {
            
        // }

        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // if (!emailRegex.test(datos.form_email)) {  
        //     setError('form_email',{message:'Ingrese un correo valido'})
        //     setFocus('form_email')
        //     return
        // }
        
        // if (datos.form_telefono_celular.length > 12) {
        //     setError('form_telefono_celular',{message:'El numero debe tener 10 digitos como máximo'})
        //     setFocus('form_telefono_celular')   
        //     return
        // }


     

        const information = {
            usuario: usuario,
            tipo_registro: datos.form_tipo_registro,
            nombres: datos.form_nombres,
            apellido_paterno: datos.form_apellido_paterno,
            apellido_materno: datos.form_apellido_materno,
            tipo_documento: datos.form_tipo_documento,
            numero_documento: datos.form_numero_documento,
            fecha_nacimiento: datos.form_fecha_nacimiento,
            estado: datos.form_estado,
            sexo: datos.form_sexo,
            ministro_bautizmo: ministroId,
            estados_civil: datos.form_estados_civil,
            telefono_fijo: datos.form_telefono_fijo,
            telefono_celular: datos.form_telefono_celular,
            email: datos.form_email,
            direccion: datos.form_direccion,
            departamentos: datos.form_departamentos,
            provincias: datos.form_provincias,
            distritos: datos.form_distritos,
            fecha_conversion: datos.form_fecha_conversion,
            fecha_bautismo: datos.form_fecha_bautizo,
            fecha_traslado: datos.form_fecha_traslado,
            dones: datos.form_dones,
            experiencias: datos.form_experiencias_espirituales,
            mayordomia: datos.form_mayordomia_fiel,
            estudios_seculares: datos.form_estudios_seculares,
            estudios_eclesiasticos: datos.form_estudios_eclesiasticos,
            convencimiento_doctrina: datos.form_convencimiento_doctrina,
            dias_visita: datos.form_dias_visita,
            horas_visita: datos.form_horas_visita,
            iglesia: iglesiaId,
            apellido_paterno_conyuge: datos.form_apellido_paterno_conyuge,
            apellido_materno_conyuge: datos.form_apellido_materno_conyuge,
            nombres_conyuge: datos.form_nombres_conyuge,
            hijos_array: hijos,
            gdc: datos.form_gdc,
            gps: datos.form_gps,
            cm: datos.form_cm,
            mision: datos.form_mision,
            fecha_observado: datos.form_fecha_observado,
            fecha_baja: datos.form_fecha_baja
        }


        console.log(information);

        

        try {

            const { data } = await axios.post(`${urlBackend}/api/v1/secretario/miembros/add-miembros`, information, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.idToken
                },
            });

            console.log(data);

            showSuccessAlert();
            url("/secretario/miembros/listar", { replace: true });


        } catch (error) {

            if (error.response) {
                showErrorAlert()
                console.log("Error data:", error.response.data);
                console.log("Error status:", error.response.status);
            } else {
                console.log("Error:", error.message);
            }
        }

    }


    const listarMiembros = async () => {
        const response = await axios({
            url: `${urlBackend}/api/v1/secretario/miembros/listar-add`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.idToken
            },
        });

        return response
    }

    const obtenerDetarpamentos = async () => {
        const responseDepartamentos = await axios({
            url: `${urlBackend}/api/v1/core/ciudades/listar`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.idToken
            },
        });

        return responseDepartamentos
    }

    const listarDatosMiembrosAdd = async () => {
        try {

            const [response, responseDepartamentos] = await Promise.all([listarMiembros(), obtenerDetarpamentos()])

            setUsuario(response.data.usuario)
            setDepartamentos(responseDepartamentos.data.data)
            setTipoDocumento(response.data.tipo_documento)
            setTipoRegistro(response.data.tipo_registro)
            setConvencimientoDoctrina(response.data.convencimiento_doctrina)
            setSexo(response.data.sexo)
            setMinistroBautizmo(response.data.ministro_bautizmo)
            setEstadosCivil(response.data.estados_civil)
            setEstados(response.data.estados)
            setDiasVisita(response.data.dias_visita)
            setHorasVisita(response.data.horas_visita)
            const array_estudios_seculares = response.data.estudios_seculares.map(estudio => ({
                key: estudio.id.toString(),
                label: estudio.nombre
            }))
            setEstudiosSeculares(array_estudios_seculares);

            const array_estudios_eclesiasticos = response.data.estudios_eclesiasticos.map(estudios_eclesiasticos => ({
                key: estudios_eclesiasticos.id.toString(),
                label: estudios_eclesiasticos.nombre
            }))
            setEstudiosEclesiasticos(array_estudios_eclesiasticos);

            const array_dones = response.data.dones.map(dones => ({
                key: dones.id.toString(),
                label: dones.nombre
            }))
            setDones(array_dones);
            setIglesia(response.data.iglesia)

        } catch (error) {
            //errorApi(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    function errorApi(data) {
        if (data.error.name == "TokenExpiredError" || data.error.name == "JsonWebTokenError") {
            dispatch(Logout(navigate));
        } else {
            Swal.fire({ icon: 'error', title: 'Oops', text: 'Error en el servidor, contactarse con el equipo de Soporte!' })
        }
    }

    async function changeSelectDepartamento(id) {


        const responseProvincias = await axios({
            url: `${urlBackend}/api/v1/core/ciudades/listar-departamento?id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.idToken
            },
        });
        const responseDistritos = await axios({
            url: `${urlBackend}/api/v1/core/ciudades/listar-distrito?id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.idToken
            },
        });

        setProvincias(responseProvincias.data.data)
        console.log(responseDistritos.data.data);

        setDistritos(responseDistritos.data.data)

    }


    useEffect(() => {
        listarDatosMiembrosAdd()
    }, []);

    if (loading) {
        return <div>Cargando datos...</div>;
    }



    return (
        <>

            <div className="tab-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="sector">
                        {/* Titulo */}
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    I.Datos Personales
                                </Card.Title>
                            </div>

                            {/* Usuario */}
                            <MiembrosFormItem
                                name='form_usuario'
                                label={'Usuario'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type='select'
                                placeholder={"Seleccionar.."}
                            >

                                <option value="vacio">Ninguno</option>
                                {getUsuario.map((usuario, index) => (
                                    <option key={index} value={usuario.id}>{usuario.username}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Tipo de Registro */}
                            <MiembrosFormItem
                                name='form_tipo_registro'
                                label={'Tipo de Registro'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type='select'
                            >
                                {getTipoRegistro.map((tipoRegistro, index) => (
                                    <option key={index} value={tipoRegistro.id}>{tipoRegistro.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Nombre */}
                            <MiembrosFormItem
                                name='form_nombres'
                                label={'Nombres'}
                                register={register}
                                //message={"Se necesita ingresar el/los nombres."}
                                errors={errors}
                                placeholder={'Nombres'}
                            />


                            {/* Apellido Paterno */}
                            <MiembrosFormItem
                                name='form_apellido_paterno'
                                label={'Apellido Paterno'}
                                register={register}
                                message={"Se necesita ingresar el apellido paterno."}
                                errors={errors}
                                placeholder={'Apellido Paterno'}
                            />


                            {/* Campo para Apellido Materno */}
                            <MiembrosFormItem
                                name='form_apellido_materno'
                                label={'Apellido Materno'}
                                register={register}
                                message={"Se necesita ingresar el apellido materno."}
                                errors={errors}
                                placeholder={'Apellido Materno'}
                            />


                            {/* Tipo de documento */}
                            <MiembrosFormItem
                                name='form_tipo_documento'
                                label={'Tipo de Documento'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type={'select'}
                            >
                                {getTipoDocumento.map((tipoDocumento, index) => (
                                    <option key={index} value={tipoDocumento.id}>{tipoDocumento.nombre}</option>
                                ))}
                            </MiembrosFormItem>


                            {/* Numero de documento */}
                            <MiembrosFormItem
                                name='form_numero_documento'
                                label={'Número de documento'}
                                register={register}
                                message={"Se necesita ingresar el número de documento."}
                                errors={errors}
                                placeholder={'Número de Documento'}
                                maxLength={20}
                            />

                            {/* Fecha de Nacimiento */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_nacimiento'
                                label={'Fecha de nacimiento'}
                                register={register}
                                message={"Se necesita ingresar la fecha de nacimiento."}
                                errors={errors}
                                placeholder={'Fecha de nacimiento'}
                            />

                            {/* Estado */}
                            <MiembrosFormItem
                                name='form_estado'
                                label={'Estado'}
                                register={register}
                                message={"Se necesita ingresar el estado."}
                                errors={errors}
                                type={'select'}
                            >
                                {getEstados.map((estado, index) => (
                                    <option key={index} value={estado.id}>{estado.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Sexo */}
                            <MiembrosFormItem
                                name='form_sexo'
                                label={'Sexo'}
                                register={register}
                                message={"Se necesita seleccionar el sexo."}
                                errors={errors}
                                type={'select'}
                            >
                                {getSexo.map((sexo, index) => (
                                    <option key={index} value={sexo.id}>{sexo.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Ministro que lo Bautizó */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_ministro_bautizmo">Ministro que lo Bautizó</label>
                                <input
                                    id="form_ministro_bautizmo"
                                    name="form_ministro_bautizmo"
                                    className="form-control form-control-sm"
                                    type="search"
                                    value={addMinistro}
                                    {...register("form_ministro_bautizmo", { required: "Este campo es obligatorio." })}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setshowEstado(true);
                                            getMinistros();
                                        }
                                    }}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        setSearchMinistro(value);  // Actualiza el valor de búsqueda en tiempo real
                                        setAddMinistro(value);     // Actualiza el input con lo que se escribe

                                        await trigger('form_ministro_bautizmo');
                                        if (value.trim() !== "") {
                                            clearErrors('form_ministro_bautizmo');
                                        }
                                    }}
                                    placeholder="Buscar Ministro"
                                />
                                <Modal
                                    className="fade bd-example-modal-lg"
                                    size="lg"
                                    show={showEstado}
                                    onHide={() => setshowEstado(false)}
                                    centered
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header>
                                        <Modal.Title>Ministros que coinciden con "{addMinistro}"</Modal.Title>
                                        <Button onClick={() => setshowEstado(false)} variant="" className="btn-close"></Button>
                                    </Modal.Header>

                                    <Modal.Body>
                                        {arrayMinistro.length > 0 ? (
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayMinistro.map((ministro, index) => (
                                                        <tr
                                                            key={ministro.id}
                                                            onClick={() => {
                                                                setMinistroBautizmo(ministro);
                                                                setAddMinistro(ministro.nombre);
                                                                setMinistroId(ministro.id);
                                                                setshowEstado(false);
                                                                //setValueMinistro("");
                                                                setSearchMinistro("");
                                                                setArrayMinistro([]);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>{ministro.nombre}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>) : (
                                            <div className="text-center">
                                                <p>No se encontraron coincidencias para "{addMinistro}".</p>
                                            </div>
                                        )}
                                    </Modal.Body>
                                </Modal>
                                {errors.form_ministro_bautizmo && (
                                    <div className="text-danger message mt-2">{errors.form_ministro_bautizmo.message}</div>
                                )}
                            </div>

                            {/* Estado Civil */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_estados_civil">Estado Civil</label>
                                <select
                                    id="form_estados_civil"
                                    name="form_estados_civil"
                                    className="form-control form-control-sm"

                                    {...register("form_estados_civil", {
                                        required: { value: true, message: "Se necesita seleccionar el estado civil." },
                                        onChange: handleEstadoCivilChange
                                    })}>
                                    <option disabled value="">Seleccione...</option>
                                    {getEstadosCivil.map((estadosCivil, index) => (
                                        <option key={index} value={estadosCivil.id}>{estadosCivil.nombre}</option>
                                    ))}
                                </select>
                                {errors.form_estados_civil && <div className="text-danger message mt-2">{errors.form_estados_civil.message}</div>}
                            </div>


                            {/* Teléfono Fijo */}
                            <MiembrosFormItem
                                name='form_telefono_fijo'
                                label={'Teléfono Fijo'}
                                register={register}
                                message={"Se acepta solo 15 caracteres."}
                                errors={errors}
                                placeholder={'Teléfono Fijo'}
                                maxLength={15}
                            />

                            {/* Celular */}
                            <MiembrosFormItem
                                name='form_telefono_celular'
                                label={'Teléfono Celular'}
                                register={register}
                                message={"Se acepta solo 15 caracteres."}
                                errors={errors}
                                placeholder={'Teléfono Celular'}
                                maxLength={15}
                            />

                            {/* Email */}
                            <MiembrosFormItem
                                name='form_email'
                                label={'Email'}
                                register={register}
                                message={"Formato de email inválido."}
                                errors={errors}
                                placeholder={'Email'}

                            />

                            {/* Dirección */}
                            <MiembrosFormItem
                                name='form_direccion'
                                label={'Dirección'}
                                register={register}
                                message={"Se necesita ingresar la dirección."}
                                errors={errors}
                                placeholder={'Email'}
                            />

                            {/* Departamentos */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_departamentos">Departamentos</label>
                                <select
                                    id="form_departamentos"
                                    name="form_departamentos"
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="Seleccione.."
                                    {...register("form_departamentos", { required: { value: true, message: "se necesita seleccionar una opción." }, onChange: (e) => changeSelectDepartamento(e.target.value) })}>
                                    <option disabled value="">Seleccionar...</option>
                                    {getDepartamentos.map((departamentos, index) => (
                                        <option key={index} value={departamentos.id}>{departamentos.nombre}</option>
                                    ))}
                                </select>
                                {errors.form_departamentos && <div className="text-danger message mt-2">{errors.form_departamentos.message}</div>}
                            </div>

                            {/* Provincias */}
                            <MiembrosFormItem
                                name='form_provincias'
                                label={'Provincias'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type={'select'}
                            >
                                {getProvincias.map((provincia, index) => (
                                    <option key={index} value={provincia.id}>{provincia.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Distritos */}
                            <MiembrosFormItem
                                name='form_distritos'
                                label={'Distritos'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type={'select'}
                            >
                                {getDistritos.map((distritos, index) => (
                                    <option key={index} value={distritos.id}>{distritos.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                        </div>
                    </div>

                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    II. Datos Espirituales
                                </Card.Title>
                            </div>
                            {/* Fecha de conversion */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_conversion'
                                label={'Fecha de Conversión'}
                                register={register}
                                message={"Se necesita ingresar la fecha de conversión."}
                                errors={errors}
                                placeholder={'Fecha de Conversión'}
                            />

                            {/* Fecha de Bautizo */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_bautizo'
                                label={'Fecha de Bautizo'}
                                register={register}
                                message={"Se necesita ingresar la fecha de bautizo."}
                                errors={errors}
                                placeholder={'Fecha de Bautizo'}
                            />

                            {/* Fecha de Traslado */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_traslado'
                                label={'Fecha de Traslado'}
                                register={register}
                                message={"Se necesita ingresar la fecha de traslado."}
                                errors={errors}
                                placeholder={'Fecha de Traslado'}
                            />

                            {/* Dones */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_dones">Dones</label>
                                <div id="multiselect-dones" className="multi-select-input">
                                    <DropdownMultiselect
                                        options={getDones}
                                        placeholder="Seleccionar Dones"
                                        className="form-control form-control-sm"
                                        {...register("form_dones", { required: "Este campo es obligatorio." })}
                                        handleOnChange={(selected) => {
                                            setValue('form_dones', selected)
                                            trigger('form_dones');
                                        }}
                                    />
                                </div>
                                {errors.form_dones && (
                                    <div className="text-danger mt-2 message">{errors.form_dones.message}</div>)}
                            </div>
                            {/* Experiencias Espirituales */}
                            <MiembrosFormItem
                                name='form_experiencias_espirituales'
                                label={'Experiencias Espirituales'}
                                register={register}
                                message={"Se necesita ingresar las experiencias."}
                                errors={errors}
                                placeholder={'Experiencias Espirituales'}
                            />

                            {/* Mayordomía Fiel */}
                            <MiembrosFormItem
                                name='form_mayordomia_fiel'
                                label={'Mayordomía Fiel'}
                                register={register}
                                message={"Se necesita ingresar la mayordomía fiel."}
                                errors={errors}
                                placeholder={'Mayordomía Fiel'}
                            />


                        </div>
                    </div>

                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    III. Estudios Realizados
                                </Card.Title>
                            </div>
                            {/* Estudios seculares */}
                            <div className="mb-3 col-md-4" >
                                <label htmlFor="form_estudios_seculares">Estudios Seculares</label>
                                <div id="multiselect_estudios_seculares" className="multi-select-input">
                                    <DropdownMultiselect
                                        options={getEstudiosSeculares}
                                        placeholder="Seleccionar Datos"
                                        className="form-control form-control-sm"
                                        {...register("form_estudios_seculares", { required: "Este campo es obligatorio." })}
                                        handleOnChange={(selected) => {
                                            setValue('form_estudios_seculares', selected)
                                            trigger('form_estudios_seculares')
                                        }}
                                    />
                                    {errors.form_estudios_seculares && <div className="text-danger message mt-2">{errors.form_estudios_seculares.message}</div>}
                                </div>
                            </div>


                            {/* Estudios Eclesiásticos */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_estudios_eclesiasticos">Estudios Eclesiásticos</label>
                                <div id="multiselect_estudios_eclesiasticos" className="multi-select-input">
                                    <DropdownMultiselect
                                        options={getEstudiosEclesiasticos}
                                        placeholder="Seleccionar Datos"
                                        className="form-control form-control-sm"
                                        {...register("form_estudios_eclesiasticos", { required: "Este campo es obligatorio." })}
                                        handleOnChange={(selected) => {
                                            setValue('form_estudios_eclesiasticos', selected)
                                            trigger('form_estudios_eclesiasticos')
                                        }}
                                    />
                                    {errors.form_estudios_eclesiasticos && (
                                        <div className="text-danger message mt-2">{errors.form_estudios_eclesiasticos.message}</div>)}
                                </div>
                            </div>
                            {/* Convencimiento de doctrina */}
                            <MiembrosFormItem
                                name='form_convencimiento_doctrina'
                                label={'¿Está usted convencido(a) de la doctrina y gobierno de la iglesia?'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type={'select'}
                            >
                                {getConvencimientoDoctrina.map((convencimientoDoctrina, index) => (
                                    <option key={index} value={convencimientoDoctrina.id}>{convencimientoDoctrina.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Días de visita */}
                            <MiembrosFormItem
                                name='form_dias_visita'
                                label={'¿Qué día prefiere la visita?'}
                                register={register}
                                message={"Se necesita seleccionar una opción."}
                                errors={errors}
                                type={'select'}
                            >
                                {getDiasVisita.map((diasVisita, index) => (
                                    <option key={index} value={diasVisita.id}>{diasVisita.nombre}</option>
                                ))}
                            </MiembrosFormItem>

                            {/* Hora preferida para la visita */}
                            <MiembrosFormItem
                                name='form_horas_visita'
                                label={'¿A qué hora prefiere la visita?'}
                                register={register}
                                message={"Se necesita seleccionar una hora."}
                                errors={errors}
                                type={'select'}
                            >
                                {getHorasVisita.map((horasVisita, index) => (
                                    <option key={index} value={horasVisita.id}>{horasVisita.hora}</option>
                                ))}
                            </MiembrosFormItem>


                        </div>
                    </div>
                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    IV. Cargos Desempeñados en la Iglesia
                                </Card.Title>
                            </div>
                            {/* Campo para Iglesia o misión */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_iglesia">Ministro que lo Bautizó</label>
                                <input
                                    id="form_iglesia"
                                    name="form_iglesia"
                                    className="form-control form-control-sm"
                                    type="search"
                                    value={addIglesia}
                                    {...register("form_iglesia", { required: "Este campo es obligatorio." })}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setshowEstadoIglesia(true);
                                            getIglesia();
                                        }
                                    }}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        setSearchIglesia(value);  // Actualiza el valor de búsqueda en tiempo real
                                        setAddIglesia(value);     // Actualiza el input con lo que se escribe

                                        await trigger('form_iglesia');
                                        if (value.trim() !== "") {
                                            clearErrors('form_iglesia');
                                        }
                                    }}
                                    placeholder="Buscar Iglesia"
                                />
                                <Modal
                                    className="fade bd-example-modal-lg"
                                    size="lg"
                                    show={showEstadoIglesia}
                                    onHide={() => setshowEstadoIglesia(false)}
                                    centered
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header>
                                        <Modal.Title>Iglesias que coinciden con "{addIglesia}"</Modal.Title>
                                        <Button onClick={() => setshowEstadoIglesia(false)} variant="" className="btn-close"></Button>
                                    </Modal.Header>

                                    <Modal.Body>
                                        {arrayIglesia.length > 0 ? (
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayIglesia.map((iglesia, index) => (
                                                        <tr
                                                            key={iglesia.id}
                                                            onClick={() => {
                                                                setIglesia(iglesia);
                                                                setAddIglesia(iglesia.nombre);
                                                                setIglesiaId(iglesia.id);
                                                                setshowEstadoIglesia(false);
                                                                //setValueMinistro("");
                                                                setSearchIglesia("");
                                                                setArrayIglesia([]);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>{iglesia.nombre}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>) : (
                                            <div className="text-center">
                                                <p>No se encontraron coincidencias para "{addIglesia}".</p>
                                            </div>
                                        )}
                                    </Modal.Body>
                                </Modal>
                                {errors.form_iglesia && (
                                    <div className="text-danger message mt-2">{errors.form_iglesia.message}</div>
                                )}
                            </div>



                        </div>
                    </div>

                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    V. Datos Familiares
                                </Card.Title>
                            </div>

                            {esCasado && (
                                <div className="row">
                                    {/* Apellido Paterno Cónyuge */}
                                    <MiembrosFormItem
                                        name='form_apellido_paterno_conyuge'
                                        label={'Apellido Paterno Cónyuge'}
                                        register={register}
                                        message={"Se necesita ingresar el apellido paterno del cónyuge."}
                                        errors={errors}
                                        placeholder={'Apellido Paterno Cónyuge'}
                                    />

                                    {/* Apellido Materno Cónyuge */}
                                    <MiembrosFormItem
                                        name='form_apellido_materno_conyuge'
                                        label={'Apellido Paterno Cónyuge'}
                                        register={register}
                                        message={"Se necesita ingresar el apellido materno del cónyuge."}
                                        errors={errors}
                                        placeholder={'Apellido Materno Cónyuge'}
                                    />

                                    {/* Nombres Cónyuge */}
                                    <MiembrosFormItem
                                        name='form_nombres_conyuge'
                                        label={'Nombres Cónyuge'}
                                        register={register}
                                        message={"Se necesita ingresar el nombre del cónyuge."}
                                        errors={errors}
                                        placeholder={'Nombres Cónyuge'}
                                    />

                                </div>
                            )}
                            {/* Hijos */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="form_hijos">¿Tiene hijos?</label>
                                <input
                                    id="form_hijos"
                                    name="form_hijos"
                                    className="form-control form-control-sm"
                                    type="number"
                                    min={0}
                                    max={15}
                                    {...register("form_hijos", {
                                        required: { value: true, message: "Se necesita registrar un número." },
                                        onChange: (e) => setnumerosHijos(Number(e.target.value))
                                    })}
                                />

                                {errors.form_hijos && <div className="text-danger message mt-2">{errors.form_hijos.message}</div>}
                            </div>
                        </div>

                        {/* Nombres Hijo */}
                        {
                            numerosHijos > 0 && Array.from({ length: numerosHijos }, (_, i) => (
                                <div key={i} className="row">
                                    <Card.Title className="mb-2">
                                        Hijo {i + 1}
                                    </Card.Title>
                                    <MiembrosFormItem
                                        name={`form_hijos_nombres_${i}`}
                                        label={"Nombres"}
                                        register={register}
                                        message={`Se necesita ingresar el nombre del hijo ${i}.`}
                                        errors={errors}
                                        placeholder={'Nombres'}
                                    />

                                    <MiembrosFormItem
                                        name={`form_hijos_apellido_paterno_${i}`}
                                        label={"Apellido Paterno"}
                                        register={register}
                                        message={`Se necesita ingresar el apellido paterno del hijo ${i}.`}
                                        errors={errors}
                                        placeholder={'Apellido Paterno'}
                                    />

                                    <MiembrosFormItem
                                        name={`form_hijos_apellido_materno_${i}`}
                                        label={"Apellido Materno"}
                                        register={register}
                                        message={`Se necesita ingresar el apellido materno del hijo ${i}.`}
                                        errors={errors}
                                        placeholder={'Apellido Materno'}
                                    />
                                </div>
                            ))
                        }

                    </div>

                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    VI. Ubicación
                                </Card.Title>
                            </div>
                            {/* GDC N. */}
                            <MiembrosFormItem
                                name='form_gdc'
                                label={'GDC N.'}
                                register={register}
                                message={"Se necesita ingresar el GDC N."}
                                errors={errors}
                                placeholder={'GDC N.'}
                            />

                            {/* GPS N. */}
                            <MiembrosFormItem
                                name='form_gps'
                                label={'GPS N.'}
                                register={register}
                                message={"Se necesita ingresar el GPS N."}
                                errors={errors}
                                placeholder={'GPS N.'}
                            />

                            {/* CM N. */}
                            <MiembrosFormItem
                                name='form_cm'
                                label={'CM N.'}
                                register={register}
                                message={"Se necesita ingresar el CM N."}
                                errors={errors}
                                placeholder={'CM N.'}
                            />

                            {/* Misión */}
                            <MiembrosFormItem
                                name='form_mision'
                                label={'Misión'}
                                register={register}
                                message={"Se necesita ingresar la Misión."}
                                errors={errors}
                                placeholder={'Misión'}
                            />

                        </div>
                    </div>
                    <div className="sector">
                        <div className="row">
                            <div>
                                <Card.Title className="mb-4">
                                    VII. Observado y Exclusión
                                </Card.Title>
                            </div>
                            {/* Fecha de Observado */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_observado'
                                label={'Fecha de Observado'}
                                register={register}
                                message={"Se necesita ingresar la fecha de observado."}
                                errors={errors}
                                placeholder={'Misión'}
                            />

                            {/* Fecha de Baja */}
                            <MiembrosFormItem
                                typeInput="date"
                                name='form_fecha_baja'
                                label={'Fecha de Baja'}
                                register={register}
                                message={"Se necesita ingresar la fecha de baja."}
                                errors={errors}
                                placeholder={'Fecha de Baja'}
                            />

                        </div>
                    </div>
                    <Button type="submit" variant="primary">Guardar</Button>
                </form>
            </div>

        </>
    );
}
export default MiembrosAdd;