import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import apiEventFecth from "../axios/config";

const Home = () => { 

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await apiEventFecth.get("/events");
      const eventsData = response.data;

      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      {events.length === 0 ? (
        <Container className="mt-4 text-center">
            <Spinner  animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
        
      ) : (
        events.map((event) => (
            <>
            <Container fluid>
                <Row className="text-center">
                    <Col sm>
                    <div className="card-apresentation m-2" key={event.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button className="btn-sm m-2" variant="primary">
                      Editar
                    </Button>
                    <Button className="btn-sm m-2" variant="danger">
                      Excluir
                    </Button>
                  </Card.Body>
                </Card>
            </div>
                    </Col>
                </Row>
            </Container>
            </>
        ))
      )}
    </>
  );
};

export default Home;
