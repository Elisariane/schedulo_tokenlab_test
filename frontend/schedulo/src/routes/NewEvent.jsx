import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import apiEventFecth from "../axios/config";
import NavBar from  '../components/Navbar.jsx';

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

  const createOrUpdateEvent = async (e) => {
    e.preventDefault();

    const isoStartTime = new Date(startTime).toISOString();
    const isoEndTime = new Date(endTime).toISOString();
    const event = {
      title,
      description,
      startTime: isoStartTime,
      endTime: isoEndTime,
      userId: sessionStorage.getItem("userId"),
    };
    if (parametros.id) {
      try {
        await apiEventFecth.put(`/events/${parametros.id}`, event);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await apiEventFecth.post("/events", event);
      } catch (error) {
        console.error(error);
      }
    }
    backToHome("/home");
  };

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <>
    <NavBar />
      <Container className="mt-4">
        { !parametros.id ? <h2 className="text-center">Adicione um novo Evento!</h2> : <h2 className="text-center">Edite seu Evento!</h2>}
        
        <Form onSubmit={(e) => createOrUpdateEvent(e)}>
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
              value={startTime}
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
        </Form>
      </Container>
    </>
  );
};

export default NewEvent;
