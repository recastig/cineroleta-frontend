import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        CINEROLETA<span className="header__dot">.</span>
      </Link>

      <Navigation />
    </header>
  );
}

export default Header;
