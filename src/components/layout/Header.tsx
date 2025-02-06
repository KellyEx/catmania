import { Link } from 'react-router-dom';

import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link" aria-label="home" title="home">
        <figure className="logo">
          <img src="/logo.svg" alt="Logo" />
        </figure>
        <h1 className="title">Catmania</h1>
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
