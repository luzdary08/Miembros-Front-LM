import { useNavigate } from 'react-router-dom'
export default function TableItemMiembros({miembro}) {

    const nav = useNavigate()

    const redirect = (id) => {
        nav(`/secretario/miembros/update/${id}`)
    }

    const {
        id,
        tipoDocumento, 
        numero_documento, 
        tipoRegistro, 
        fecha_nacimiento, 
        apellido_paterno, 
        apellido_materno, 
        nombres, 
        sexo, 
        estadosCivil, 
        telefono_fijo, 
        telefono_celular, 
        estados,
        email,
    } = miembro

    return (
        <tr className='table-row' onClick={() => redirect(id)}>
            <td>{tipoDocumento.nombre} - {numero_documento}</td>
            <td>{tipoRegistro.nombre}</td>
            <td>{fecha_nacimiento}</td>
            <td>{apellido_paterno}</td>
            <td>{apellido_materno}</td>
            <td>{nombres}</td>
            <td>{sexo.nombre}</td>
            <td>{estadosCivil.nombre}</td>
            <td>{telefono_fijo}</td>
            <td>{telefono_celular}</td>
            <td>{estados.nombre}</td>
            <td>{email}</td>
            
        </tr>
    )
}
