import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Explore from "../Explore/Explore";
import Footer from "../Footer/Footer";
import About from "../About/About";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";

function App() {
  const [authModal, setAuthModal] = useState(null);

  function handleOpenLogin() {
    setAuthModal("login");
  }

  function handleOpenRegister() {
    setAuthModal("register");
  }

  function handleCloseModal() {
    setAuthModal(null);
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
        />
      )}
    </div>
  );
}

export default App;