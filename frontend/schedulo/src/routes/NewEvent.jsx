import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import apiEventFecth from "../axios/config";
import NavBar from "../components/Navbar.jsx";

const NewEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const parametros = useParams();

  const formatToDate = (startTime, endTime) => {
    setStartTime(startTime.slice(0, startTime.length - 5));
    setEndTime(endTime.slice(0, endTime.length - 5));
  };

  useEffect(() => {
    if (parametros.id) {
      apiEventFecth
        .get(`/events/${parametros.id}`)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          formatToDate(response.data.startTime, response.data.endTime);
        })
        .catch((error) => {
          console.error("Erro ao obter dados do evento:", error);
        });
    }
  }, [parametros]);

  const [error, setError] = useState("");

  const handleTitleChange = (value) => {
    setTitle(value);
    console.log(title);
    if (title == "" || title == null) {
      setError("O evento deve possuir um título");
    } else {
      setError("");
    }
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    const valueFormated = new Date(value).toISOString().slice(0, 16);
    const today = new Date().toISOString().slice(0, 16);

    if (valueFormated <= today) {
      setError(
        "A data/hora de início não pode ser anterior à data/hora atual."
      );
    } else {
      setError("");
    }
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    if (value <= startTime) {
      setError(
        "A data/hora de término deve ser posterior à data/hora de início."
      );
    } else {
      setError("");
    }
  };

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

  console.log(endTime);
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        {!parametros.id ? (
          <h2 className="text-center">Adicione um novo Evento!</h2>
        ) : (
          <h2 className="text-center">Edite seu Evento!</h2>
        )}

        <Form onSubmit={(e) => createOrUpdateEvent(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Título do evento</Form.Label>
            <Form.Control
              value={title}
              type="text"
              placeholder="Título legal"
              onChange={(e) => handleTitleChange(e.target.value)}
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
              onChange={(e) => handleStartTimeChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data e Hora Fim</Form.Label>
            <Form.Control
              value={endTime}
              type="datetime-local"
              onChange={(e) => handleEndTimeChange(e.target.value)}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="danger" onClick={() => backToHome()} className="m-3">
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={error}>
            Salvar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewEvent;
