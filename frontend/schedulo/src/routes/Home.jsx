import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Spinner } from "react-bootstrap";
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


  const deleteEvent = async (id) => {
    try {
      await apiEventFecth.delete(`/events/${id}`);
      window.location.replace('/');
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getEvents();
  }, []);


  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };


  return (
    <>
    {events.length === 0 ? (
        <Container className="mt-4 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        events.map((event) => (
          <>
            <div className="cards m-2 justify-content-center text-center" key={event.id}>
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <div className="container-hour ">
                    <p className="text-hour">{new Intl.DateTimeFormat('pt-BR', options).format(new Date(event.startTime))}</p> -
                    <p className="text-hour">{new Intl.DateTimeFormat('pt-BR', options).format(new Date(event.endTime))}</p>
                  </div>
                    
                  <Card.Text>{event.description}</Card.Text>
                  
                  <Button className="btn-sm m-2" variant="primary">
                    Editar
                  </Button>
                  <Button className="btn-sm m-2" variant="danger" onClick={() => deleteEvent(event.id)}>
                    Excluir
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </>
        ))
      )}
    </>
  );
};

export default Home;
