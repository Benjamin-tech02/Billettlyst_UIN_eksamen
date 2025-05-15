import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllFestivals } from '../api/Ticketmaster';

const EventPage = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null);
    const [setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await fetchAllFestivals();
                const eventData = events.find(event => event.id === id);

                if (eventData) {
                setEvent(eventData);
                } else {
                setError('Kunne ikke finne festival med denne ID-en.');
                }
            } catch (err) {
                setError('Feil under henting av festivaldata');
                console.error(err);
            } 
        };

        fetchData();
    }, [id]);

    return (
        <article>
            <h1>{event.displayName}</h1>
            {event.images?.[0]?.url && (
                <img src={event.images[0].url} alt={event.name} />
            )}
            <p>{event.dates?.start?.localDate}</p>
            <p>{event.dates?.start?.localTime}</p>
            <p>Sted: {event._embedded?.venues?.[0]?.name}</p>
        </article>
    );
};

export default EventPage;