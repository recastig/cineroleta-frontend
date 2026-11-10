
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Explore from "../Explore/Explore";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
