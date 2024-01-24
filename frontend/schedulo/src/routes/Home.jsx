import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    
        const URL = 'http://localhost:3000/events';

        const [events, setEvents] = useState([]);
        
        const getEvents = async() => {
            try {
                const response = await axios.get(URL);

                setEvents(response);
                console.log(response);
            } catch (error) {
                console.error(error)
            }
        };

        useEffect(() => {
            getEvents();
        }, []);


    return (
        <div>Home</div>
    );
}

export default Home;