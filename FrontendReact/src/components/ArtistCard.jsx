const ArtistCard = ({ artist }) => {
    if (!artist) return null;
  
    return (
        <article>
            <h3>{artist.name}</h3>
        </article>
    );
};
  
export default ArtistCard;