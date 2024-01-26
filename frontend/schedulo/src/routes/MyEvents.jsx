import { useEffect, useState } from "react";
import apiEventFecth from "../axios/config";
import EventList from "../components/EventList";
import NavBar from "../components/Navbar";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  const userId = sessionStorage.getItem("userId");

  const getMyEvents = async () => {
    try {
      const response = await apiEventFecth.get(`/events/user/${userId}`);
      const eventsData = response.data;

      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyEvents();
  });

  return (
    <>
      <NavBar />

      <EventList events={events} />
    </>
  );
};

export default MyEvents;
