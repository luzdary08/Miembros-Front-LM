import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiembroUpdateHijoForm from './miembro-update-hijo-form';
import MiembroDeleteHijo from './miembro-delete-hijo';
import MiembroAddHijo from './miembro-add-hijo';

export default function MiembrosUpdateHijo({ id, token }) {
    const [hijos, setHijos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedHijo, setSelectedHijo] = useState(null);
    const [idUser, setidUser] = useState(null);
    const [showModalHijo, setShowModalHijo] = useState(false);

    const getHijos = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/v1/secretario/miembros/all-hijo/${id}`, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token.idToken}`
                    },
                }
            );
            setHijos(data.message);
        } catch (error) {
            console.error('Error al obtener los hijos:', error);
        }
    };

    useEffect(() => {
        if (!showModal && !Boolean(idUser) && !showModalHijo) {
            getHijos();
        }
    }, [showModal, idUser, showModalHijo]);

    const handleEditClick = (hijo) => {
        setSelectedHijo(hijo);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setShowModalHijo(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <table className="hijos-listar">
                <thead>
                    <tr>
                        <th>
                            <button className="add" onClick={handleAddClick}>+</button>
                        </th>
                        <th>Nombre Completo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {hijos.map((hijo, index) => (
                        <tr key={hijo.id}>
                            <td>{index + 1}</td>
                            <td>{hijo.nombre} {hijo.apellido_paterno} {hijo.apellido_materno}</td>
                            <td className="actions">
                                <button className="edit" onClick={() => handleEditClick(hijo)}>Editar</button>
                                <button className="delete" onClick={() => setidUser(hijo.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && selectedHijo && (
                <MiembroUpdateHijoForm 
                        handleClose={handleClose} 
                        token={token} 
                        showModal={showModal} 
                        selectedHijo={selectedHijo} 
                />
                    )}

            {showModalHijo && (
                <MiembroAddHijo 
                        handleClose={() => setShowModalHijo(false)}
                        token={token} 
                        showModal={showModalHijo} 
                    />
                )}

            {idUser && (
                <MiembroDeleteHijo 
                    idUser={idUser} 
                    setidUser={setidUser} 
                    token={token} 
                />
            )}
        </>
    );
}
