import { Link } from 'react-router-dom';

const EventCard = ({ event, clickable = true }) => {
    if (!event) return null;

    return (
        <article>
            {event.images?.[0]?.url && (
                <img src={event.images[0].url} alt={event.name} />
            )}
            <h3>{event.displayName || event.name}</h3>
            <p>{event.dates?.start?.localDate}</p>

            {clickable && (
                <Link to={`/event/${event.id}`}>
                    <button>Les mer om {event.displayName || event.name}</button>
                </Link>
            )}
        </article>
    );
};

export default EventCard;