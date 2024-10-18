import Table from 'react-bootstrap/Table';
import Axios from 'axios'
import { useEffect, useState } from 'react'
import TableItemMiembros from './table-item-miembros'
import { urlBackend } from "../../../config";
import { Tab } from 'react-bootstrap';
import "./tabla.css"

const token = JSON.parse(localStorage.getItem('userDetails'))

function TableMiembros() {

  const [miembros, setMiembros] = useState([])
  const [loading, setLoading] = useState(false)
  const [estadoFechaNacimiento, setEstadoFechaNacimiento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [estados, setEstados] = useState('');
  const [sexo, setSexo] = useState('')
  const [tipoRegistro, setTipoRegistro] = useState('')
  const [selecciones, setSelecciones] = useState({
    estadoCivil: [],
    tipoRegistro: [],
    sexo: [],
    estado: [],
  })

  const token = JSON.parse(localStorage.getItem('userDetails'))

  const getInformacion = async () => {
    setLoading(true)
    try {
      const datos = await Axios.get('http://localhost:3000/api/v1/secretario/miembros/listar-miembros', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.idToken
        },
      })

      console.log(datos.data.miembros)

      setMiembros(datos.data.miembros)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }


  }
  const listarMiembros = async () => {
    try {
      const { data } = await Axios({
        url: `${urlBackend}/api/v1/secretario/miembros/listar-add`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.idToken
        },
      });

      console.log("tipoo", data)
      setSelecciones({
        estadoCivil: data.estados_civil,
        tipoRegistro: data.tipo_registro,
        sexo: data.sexo,
        estado: data.estados,
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInformacion()
    listarMiembros()
  }, [])

  if (loading) return <p>Loading...</p>


  let filtroMiembros = miembros
  

  if (sexo) {
    filtroMiembros = miembros.filter( item => item.sexo.id == sexo )
  }

  if (estadoCivil) {
    filtroMiembros = filtroMiembros.filter( item => item.estadosCivil.id == estadoCivil )
  }

  if (estados) {
    filtroMiembros = filtroMiembros.filter( item => item.estados.id == estados )
  }
  
  if (tipoRegistro) {
    filtroMiembros = filtroMiembros.filter( item => item.tipoRegistro.id == tipoRegistro )
  }

  if (estadoFechaNacimiento) {
    filtroMiembros = filtroMiembros.filter( item => item.fecha_nacimiento == estadoFechaNacimiento )
  }
  
  

  return (
    <>

      <div className='filters'>

        <div className="filter-item">
          <label className='filter-label'htmlFor="estadoCivil">Estado Civil:</label>
          <select
            id="estadoCivil"
            value={estadoCivil}
            onChange={(e) => setEstadoCivil(e.target.value)}
          >
            <option value="">Seleccionar Estado Civil</option>
            {
              selecciones.estadoCivil.map(estado => <option key={estado.id} value={estado.id}>{estado.nombre}</option>)
            }

          </select>
        </div>

        <div className="filter-item">
          <label className='filter-label'htmlFor="tipoRegistro">Tipo de Registro</label>
          <select
            id="tipoRegistro"
            value={tipoRegistro}
            onChange={(e) => setTipoRegistro(e.target.value)}
          >
            <option value="">Seleccionar Tipo de Registro</option>
            {
              selecciones.tipoRegistro.map(registro => <option key={registro.id} value={registro.id}>{registro.nombre}</option>)
            }
          </select>
        </div>

        <div className="filter-item">
          <label className='filter-label'htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estados}
            onChange={(e) => setEstados(e.target.value)}
          >
            <option value="">Seleccionar Estado</option>
            
            {
              selecciones.estado.map(estado => <option key={estado.id} value={estado.id}>{estado.nombre}</option>)
            }
            
          </select>
        </div>

        <div className="filter-item">
          <label className='filter-label'htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="">Seleccionar Sexo</option>
            {
              selecciones.sexo.map(sexo => <option key={sexo.id} value={sexo.id}>{sexo.nombre}</option>)
            }
          </select>
        </div>


        <div className="filter-item">
          <label className='filter-label'htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            id="fechaNacimiento"
            onChange={(e) => setEstadoFechaNacimiento(e.target.value) }
            value={estadoFechaNacimiento}
            type="date"                      
          />
          
        </div>
      </div>

      <div className='content__table'>
        <Table className='table' striped>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Registro</th>
              <th>Fecha de Nacimiento</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Nombres</th>
              <th>Sexo</th>
              <th>Estado Civil</th>
              <th>Teléfono Fijo</th>
              <th>Celular</th>
              <th>Estado</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {
              filtroMiembros.map((miembro) => <TableItemMiembros key={miembro.id} miembro={miembro} />)
            }
          </tbody>
        </Table>
      </div>

     

    </>
  );
}

export default TableMiembros;