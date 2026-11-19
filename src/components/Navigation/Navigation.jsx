import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  onLoginClick,
  onRegisterClick,
  currentUser,
  isLoggedIn,
  isSessionLoading,
  onSignOut,
}) {
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

      {!isSessionLoading && (
        <>
          {isLoggedIn ? (
            <>
              <span className="navigation__link navigation__username">
                {currentUser?.name}
              </span>

              <button
                className="navigation__register"
                type="button"
                onClick={onSignOut}
              >
                Sair
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </nav>
  );
}

export default Navigation;