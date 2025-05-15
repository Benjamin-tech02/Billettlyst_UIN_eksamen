import { useEffect, useState } from 'react';
import { fetchAllFestivals } from '../api/Ticketmaster';
import { Link } from 'react-router-dom';

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
          <article key={event.id}>
            {event.images?.[0]?.url && (
              <img src={event.images[0].url} alt={event.name} />
            )}
            <h3>{event.displayName}</h3>
            <Link to={`/event/${event.id}`}>
              <button>Les mer om {event.displayName}</button>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;