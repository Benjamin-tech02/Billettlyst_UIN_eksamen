import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">BillettLyst</Link>
      </h1>
      <nav>
        <ul>
          <li><Link to="/category/music">Musikk</Link></li>
          <li><Link to="/category/sport">Sport</Link></li>
          <li><Link to="/category/teater">Teater/Show</Link></li>
        </ul>
      </nav>
      <div>
        <Link to="/dashboard">Logg inn</Link>
      </div>
    </header>
  );
};

export default Header;