import { useEffect, useState } from 'react';
import { fetchAllFestivals, fetchEventsByCity } from '../api/Ticketmaster';
import EventCard from './EventCard';

const Home = () => {
    const [festivals, setFestivals] = useState([]);
    const [cityEvents, setCityEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        fetchAllFestivals().then(setFestivals);
    }, []);

    const sortCity = async (city) => {
        setSelectedCity(city);
        const events = await fetchEventsByCity(city);
        setCityEvents(events);
    };

    return (
        <main className='main-home'>
            <h1>Sommerens festivaler!</h1>
            <section className="forside-festivaler">
                {festivals.map(event => (
                <EventCard key={event.id} event={event} />
                ))}
            </section>

            <section className="forside-by">
                <h2>Oppdag arrangementer i en storby:</h2>
                <div>
                    <button onClick={() => sortCity('Oslo')}>Oslo</button>
                    <button onClick={() => sortCity('Paris')}>Paris</button>
                    <button onClick={() => sortCity('London')}>London</button>
                    <button onClick={() => sortCity('Berlin')}>Berlin</button>
                </div>

                {selectedCity && (
                    <>
                    <h3>I {selectedCity} kan du oppleve:</h3>
                    <section className="forside-by-seksjon">
                        {cityEvents.map(event => (
                            <EventCard key={event.id} event={event} clickable={false} />
                        ))}
                    </section>
                    </>
                )}
            </section>
        </main>
    );
};

export default Home;