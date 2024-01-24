import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiEventFecth from "../axios/config";

const NewEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const createEvent = async (e) => {
    e.preventDefault();
    const event = {title, description, startTime, endTime, userId: 'e4ecb18c-bf19-4690-bca9-740bbd961893'};
    
    await apiEventFecth.post("/events", {
        body: event,
    });

    navigate('/');

};
  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center">Adicione um novo Evento!</h2>
        <Form onSubmit={(e) => createEvent(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Título do evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título legal"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Uma descrição bacana!"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data e Hora Inicio</Form.Label>
            <Form.Control type="datetime-local"  onChange={(e) => setStartTime(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data e Hora Fim</Form.Label>
            <Form.Control type="datetime-local"  onChange={(e) => setEndTime(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewEvent;
