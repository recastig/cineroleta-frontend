import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  onLoginClick,
  onRegisterClick,
  currentUser,
  isLoggedIn,
  isSessionLoading,
  onSignOut,
}) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        CINEROLETA<span className="header__dot">.</span>
      </Link>

      <Navigation
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        isSessionLoading={isSessionLoading}
        onSignOut={onSignOut}
      />
    </header>
  );
}

export default Header;