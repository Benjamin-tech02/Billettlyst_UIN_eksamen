const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = '/api/discovery/v2/'; 

const festivalIds = [
    { id: 'Z698xZb_Z17q339', name: 'NEON Festival' },
    { id: 'Z698xZb_Z16v7eGkFy', name: 'Findings Festival' },
    { id: 'Z698xZb_Z17qfaA', name: 'Skeikampenfestivalen' },
    { id: 'Z698xZb_Z16vfkqIjU', name: 'Tons of Rock' }
];

export const fetchEventById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}events/${id}.json?apikey=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } 
    catch (error) {
        console.error(`Feil ved henting av event med ID ${id}:`, error);
        return null;
    }
};

export const fetchAllFestivals = async () => {
    const cached = localStorage.getItem("festivalCache");
    if (cached) {
        return JSON.parse(cached);
    }

    const results = [];

    for (const { id, name } of festivalIds) {
        const event = await fetchEventById(id);

        if (
        event &&
        event.id &&
        event.name &&
        Array.isArray(event.images) &&
        event.images.length > 0
        ) {
        results.push({ ...event, displayName: name });
        } else {
        console.warn(`Event med ID ${id} ble hoppet over.`);
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    localStorage.setItem("festivalCache", JSON.stringify(results));
    return results;
};

export const fetchEventsByKeyword = async (keyword) => {
    try {
        const res = await fetch(`${BASE_URL}events.json?keyword=${keyword}&apikey=${API_KEY}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data._embedded?.events || [];
    } 
    catch (error) {
        console.error(`Feil ved henting av arrangementer for ${keyword}:`, error);
        return [];
    }
};

export const fetchEventsByCity = async (city) => {
    try {
        const res = await fetch(`${BASE_URL}events.json?city=${city}&size=10&apikey=${API_KEY}`);
        const data = await res.json();
        return data._embedded?.events || [];
    } catch (error) {
        console.error(`Feil ved henting av events for ${city}:`, error);
        return [];
    }
};