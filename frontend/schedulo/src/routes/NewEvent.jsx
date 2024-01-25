import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import apiEventFecth from "../axios/config";

const NewEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      apiEventFecth
        .get(`/events/${parametros.id}`)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setStartTime(response.data.startTime);
          setEndTime(new Date(response.data.endTime).toISOString());
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter dados do evento:", error);
        });
    }
  }, [parametros]);

  const createEvent = async (e) => {
    e.preventDefault();

    setStartTime(new Date(startTime).toISOString());
    setEndTime(new Date(endTime).toISOString());

    const event = {
      title,
      description,
      startTime,
      endTime,
      userId: "e4ecb18c-bf19-4690-bca9-740bbd961893",
    };
    await apiEventFecth.post("/events", event);

    backToHome("/home");
  };

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center">Adicione um novo Evento!</h2>
        <Form onSubmit={(e) => createEvent(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Título do evento</Form.Label>
            <Form.Control
              value={title}
              type="text"
              placeholder="Título legal"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              value={description}
              as="textarea"
              rows={3}
              placeholder="Uma descrição bacana!"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data e Hora Inicio</Form.Label>
            <Form.Control
              value={setStartTime}
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data e Hora Fim</Form.Label>
            <Form.Control
              value={endTime}
              type="datetime-local"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>

          <div>
            <Button
              variant="danger"
              onClick={() => backToHome()}
              className="m-3"
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default NewEvent;
