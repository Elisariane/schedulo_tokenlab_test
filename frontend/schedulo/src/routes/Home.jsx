import { useEffect, useState } from "react";
import apiEventFecth from "../axios/config";
import "../index.css";
import NavBar from "../components/Navbar";
import EventList from "../components/EventList";

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
      <NavBar />
      <EventList events={events} />
    </>
  );
};

export default Home;
