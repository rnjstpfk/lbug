// src/components/Header.jsx
import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <span className="logo-icon">🐞</span>
          <span className="logo-text">Miraculous</span>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
