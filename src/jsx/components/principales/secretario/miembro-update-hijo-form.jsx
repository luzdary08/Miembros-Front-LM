import React from 'react'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function MiembroUpdateHijoForm({ selectedHijo, handleClose,showModal, token }) {

    console.log(selectedHijo);

    const { register, clearErrors, setValue, getValues, handleSubmit, trigger, formState: { isValid, errors } } = useForm(
        {
            defaultValues:
            {
                nombre: selectedHijo.nombre,
                apellido_paterno: selectedHijo.apellido_paterno,
                apellido_materno: selectedHijo.apellido_materno,
            }
        }
    );

    const submit = async () => {

        const info = {
            nombre: getValues("nombre"),
            apellido_materno: getValues("apellido_materno"),
            apellido_paterno: getValues("apellido_paterno"),
        }

        console.log(info);
       
    
        if (!Object.values(info).includes('')) {
            try {
                const  { data } = await axios.put(`http://localhost:3000/api/v1/secretario/miembros/update-hijo/${selectedHijo.id}`,info, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token.idToken
                    },
                });

                console.log(data);
                
                handleClose()
    
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }  
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered>

            <Modal.Header closeButton>
                <Modal.Title>Editar Hijo </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="form_nombre">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce los nombres"
                            {...register('nombre')}
                        />
                    </Form.Group>
                    <Form.Group controlId="form_apellido_paterno" className="pt-2">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce el apellido paterno"
                            {...register('apellido_paterno')}
                        />
                    </Form.Group>
                    <Form.Group controlId="form_apellido_materno" className="pt-2">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce el apellido materno"
                            {...register('apellido_materno')}
                        />
                    </Form.Group>
                </Form>
                    <Button variant="primary" onClick={submit} className='d-block mt-4 ml-auto btn-sm' >
                        Guardar
                    </Button>
            </Modal.Body>
        </Modal>
    )
}
