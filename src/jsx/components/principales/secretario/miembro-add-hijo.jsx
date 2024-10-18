import React from 'react'
import axios from 'axios';
import TableItemMiembros from './table-item-miembros'
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function MiembroAddHijo({ handleClose,showModal, token }) {

    const { register, clearErrors, setValue, getValues, handleSubmit, trigger, formState: { isValid, errors, isSubmitting } } = useForm(
        {
            defaultValues:
            {
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
            }
        }
    );

    const {id} = useParams() 

    const onSubmit = async (data) => {
        console.log('Datos enviados:', data);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/secretario/miembros/add-hijo/'+id, 
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token.idToken}`
                    },
                }
            );
            console.log('Respuesta:', response.data);

            handleClose(); 
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            alert('Ocurrió un error al guardar los datos. Por favor, intenta de nuevo.');
        }
    };
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Hijo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="form_nombre">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce los nombres"
                            {...register('nombre', { required: 'El nombre es obligatorio' })}
                        />
                        {errors.nombre && (
                            <small className="text-danger">{errors.nombre.message}</small>
                        )}
                    </Form.Group>

                    <Form.Group controlId="form_apellido_paterno" className="pt-2">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce el apellido paterno"
                            {...register('apellido_paterno', { required: 'El apellido paterno es obligatorio' })}
                        />
                        {errors.apellido_paterno && (
                            <small className="text-danger">{errors.apellido_paterno.message}</small>
                        )}
                    </Form.Group>

                    <Form.Group controlId="form_apellido_materno" className="pt-2">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce el apellido materno"
                            {...register('apellido_materno', { required: 'El apellido materno es obligatorio' })}
                        />
                        {errors.apellido_materno && (
                            <small className="text-danger">{errors.apellido_materno.message}</small>
                        )}
                    </Form.Group>

                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="d-block mt-4 ml-auto btn-sm"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
