import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import apiEventFecth from "../axios/config";
import { Link } from "react-router-dom";
import "../index.css";
import NavBar from "../components/Navbar";
import ImgEvent from "../assets/img-event.jpg";

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
      window.location.replace("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatDateToText = (date) => {
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
  };
  return (
    <>
      <NavBar />
      {events.length === 0 ? (
        <Container className="mt-4 text-center">
          <span>Poxa ainda não teve nenhum evento cadastrado :(</span>
        </Container>
      ) : (
        <div className="d-flex flex-wrap m-4">
          {events.map((event) => (
            <>
              <div className=" text-center m-4  " key={event.id}>
                <Card style={{ width: "30rem" }} className="m-4 ">
                  <Card.Img variant="top" src={ImgEvent} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <div className="container-hour ">
                      <p className="text-hour">
                        {formatDateToText(event.startTime)}
                      </p>{" "}
                      -
                      <p className="text-hour">
                        {formatDateToText(event.endTime)}
                      </p>
                    </div>

                    <Card.Text>{event.description}</Card.Text>

                    {sessionStorage.getItem("userId") == event.userId ? (
                      <div>
                        <Link
                          to={
                            sessionStorage.getItem("userId") != event.userId
                              ? "#"
                              : `/update-event/${event.id}`
                          }
                        >
                          <Button className="btn-sm m-2" variant="primary">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          className="btn-sm m-2"
                          variant="danger"
                          onClick={() => deleteEvent(event.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
