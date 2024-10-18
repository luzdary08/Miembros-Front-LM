import { Modal, Button } from "react-bootstrap";
import axios from "axios";


export default function MiembroDeleteHijo({ idUser, setidUser, token }) {

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3000/api/v1/secretario/miembros/delete-hijo/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.idToken
                },
            });

            console.log(data);
            setidUser(null)
            

        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    }

    return (
        <Modal
            show={Boolean(idUser)}
            onHide={() => setidUser(null)}
            centered>

            <Modal.Header closeButton>
                <Modal.Title> Seguro que desea eliminarlo? </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿Desea borrar el siguiente hijo?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-end gap-3 align-items-center">
                    <Button  variant="danger" onClick={() => setidUser(null)} className='d-block mt-4 ml-auto btn-sm' >
                        Cancelar
                    </Button>
                    <Button  variant="primary" onClick={ () => handleDelete(idUser)  } className='d-block mt-4 ml-auto btn-sm' >
                        Eliminar
                    </Button>
                </div>
            
            </Modal.Footer>
        </Modal>
    )
}

