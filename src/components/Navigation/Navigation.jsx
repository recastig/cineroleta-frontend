import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegação principal">
      <NavLink to="/" className="navigation__link">
        Início
      </NavLink>

      <NavLink to="/explore" className="navigation__link">
        Explorar
      </NavLink>
    </nav>
  );
}

export default Navigation;
