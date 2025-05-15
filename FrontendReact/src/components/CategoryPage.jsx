import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventsByKeyword } from '../api/Ticketmaster';
import EventCard from './EventCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchEventsByKeyword(slug);
                setEvents(eventsData);
            } catch (err) {
                console.error('Feil under henting av arrangementer:', err);
            }
    };

    fetchData();
}, [slug]);

    return (
        <section>
            <h1>{slug}</h1>
            {events.map((event) => (
                <EventCard key={event.id} event={event} clickable={false} />
            ))}
        </section>
    );
};

export default CategoryPage;
