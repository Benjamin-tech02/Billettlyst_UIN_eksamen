import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventsByKeyword } from '../api/Ticketmaster';

const CategoryPage = () => {
    const { slug } = useParams();
    const [events, setEvents] = useState([]);
    const [setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchEventsByKeyword(slug);
                setEvents(eventsData);
            } catch (err) {
                setError('Feil under henting av arrangementer.');
                console.error(err);
            }
        };

        fetchData();
    }, [setError, slug]);

    return (
        <section>
            <h1>{slug}</h1>
            <article>
                {events.map((event) => (
                    <div key={event.id}>
                        {event.images?.[0]?.url && (
                            <img src={event.images[0].url} alt={event.name} />
                            )
                        }
                        <h2>{event.name}</h2>
                        <time>{event.dates?.start?.localDate}</time>
                    </div>
                    ))
                }
            </article>
        </section>
    );
};

export default CategoryPage;