import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ onLoginClick, onRegisterClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        CINEROLETA<span className="header__dot">.</span>
      </Link>

      <Navigation
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
    </header>
  );
}

export default Header;