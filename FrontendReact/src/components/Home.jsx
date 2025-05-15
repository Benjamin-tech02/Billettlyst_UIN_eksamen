import { useEffect, useState } from 'react';
import { fetchAllFestivals } from '../api/Ticketmaster';
import EventCard from './EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAllFestivals().then(setEvents);
  }, []);

    return (
        <main>
            <h1>Sommerens festivaler!</h1>
            <section>
                {events.map(event => (
                <EventCard key={event.id} event={event} />
                ))}
            </section>
        </main>
    );
};

export default Home;
