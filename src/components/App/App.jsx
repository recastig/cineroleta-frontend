import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Explore from "../Explore/Explore";
import Footer from "../Footer/Footer";
import About from "../About/About";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup, signin, getCurrentUser } from "../../utils/AuthApi";
import "./App.css";

function App() {
  const [authModal, setAuthModal] = useState(null);
  const [, setCurrentUser] = useState(null);

  function handleOpenLogin() {
    setAuthModal("login");
  }

  function handleOpenRegister() {
    setAuthModal("register");
  }

  function handleCloseModal() {
    setAuthModal(null);
  }

  async function handleAuthSubmit({ name, email, password }) {
    if (authModal === "register") {
      await signup({ name, email, password });
    }

    const loginResponse = await signin({ email, password });

    if (!loginResponse.token) {
      throw new Error("O servidor não retornou um token de autenticação.");
    }

    const user = await getCurrentUser(loginResponse.token);

    localStorage.setItem("cineroleta_token", loginResponse.token);
    setCurrentUser(user);
    handleCloseModal();
  }

  return (
    <div className="app">
      <Header
        onLoginClick={handleOpenLogin}
        onRegisterClick={handleOpenRegister}
      />

      <div className="app__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />

      {authModal && (
        <ModalWithForm
          key={authModal}
          mode={authModal}
          onClose={handleCloseModal}
          onSwitchMode={
            authModal === "login"
              ? handleOpenRegister
              : handleOpenLogin
          }
          onSubmit={handleAuthSubmit}
        />
      )}
    </div>
  );
}

export default App;