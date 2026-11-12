import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navigation" aria-label="Navegação principal">
      <NavLink to="/" className="navigation__link">
        Início
      </NavLink>

      <NavLink to="/explore" className="navigation__link">
        Explorar
      </NavLink>

      <NavLink to="/about" className="navigation__link">
        Sobre
      </NavLink>

      <button
        className="navigation__link navigation__button"
        type="button"
        onClick={onLoginClick}
      >
        Login
      </button>

      <button
        className="navigation__register"
        type="button"
        onClick={onRegisterClick}
      >
        Cadastre-se
      </button>
    </nav>
  );
}

export default Navigation;
