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

// kilde 1: brukte ChatGPT, beskrevet i eksamensdokumentet.
/*
    Vi lagde funkskonen fetchallfestivls slik vi så for oss at den skulle være. 
    Vi fikk CORS-feil og forhørte oss med en bekjent som har hatt faget før. 
    Denne feilen var visst en gjenganger med henting av API
    Deretter sendte vi funksjonen med erroren vi fikk i konsollen til ChatGPT.
    Først fikk vi en løsning med å bruke timer på kall av hvert api eventid som forsinker prosessen.
    Vi fikk fremdeles error, og etterspurte ny løsning, hvor vi fikk løsningen som lagret informasjonen 
    direkte i nettleserens "storage".

    1-Funksjonen lar oss sjekke om dataen allerede finnes lokalt i nettleseren, for å unngå 
    å kalle api-et hvergang vi laster inn siden. Hvis cache finnes, bruker vi den og avslutter funksjonen tidlig.
    2-Funksjonen går gjennom alle festivalene vi har satt opp manuelt med id og name.
    3-Bruke fetchEventById() til å hente festivalene fra Ticketmaster api-et basert på id.
    4-Vi sjekker at dataen ser riktig ut (at events finnes, har bilder osv). hvis alt 
    ser riktig ut, legger vi det results arrayen med riktig navn (displayName). hvis det mangler
    data, så hopper vi over det og returnerer error.
    5-Vi pauser 100ms for å unngå å spamme api-et og dermed få CORS error.
    6-Vi lagrer dataen i localstorage.
*/

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