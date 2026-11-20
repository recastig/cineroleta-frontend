import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Favorites from "../Favorites/Favorites";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Explore from "../Explore/Explore";
import Footer from "../Footer/Footer";
import About from "../About/About";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup, signin, getCurrentUser } from "../../utils/AuthApi";
import {
  getSavedMovies,
  saveMovie,
  deleteSavedMovie,
} from "../../utils/MoviesApi";
import "./App.css";

const TOKEN_KEY = "cineroleta_token";

function App() {
  const navigate = useNavigate();
  const sessionRequestRef = useRef(0);

  const [authModal, setAuthModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [favoritesLoadedForUserId, setFavoritesLoadedForUserId] =
    useState(null);
  const [favoriteLoadingIds, setFavoriteLoadingIds] = useState([]);
  const [favoritesError, setFavoritesError] = useState("");

  const [isSessionLoading, setIsSessionLoading] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  useEffect(() => {
    const requestId = ++sessionRequestRef.current;
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return () => {
        sessionRequestRef.current += 1;
      };
    }

    getCurrentUser(token)
      .then((user) => {
        if (requestId === sessionRequestRef.current) {
          setCurrentUser(user);
        }
      })
      .catch(() => {
        if (requestId === sessionRequestRef.current) {
          localStorage.removeItem(TOKEN_KEY);
          setCurrentUser(null);
        }
      })
      .finally(() => {
        if (requestId === sessionRequestRef.current) {
          setIsSessionLoading(false);
        }
      });

    return () => {
      sessionRequestRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return undefined;
    }

    let isActive = true;
    const requestId = sessionRequestRef.current;
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      getSavedMovies(token)
        .then((movies) => {
          if (isActive && requestId === sessionRequestRef.current) {
            setSavedMovies(movies);
            setFavoritesError("");
          }
        })
        .catch((error) => {
          if (isActive && requestId === sessionRequestRef.current) {
            setFavoritesError(error.message);
          }
        })
        .finally(() => {
          if (isActive && requestId === sessionRequestRef.current) {
            setFavoritesLoadedForUserId(currentUser._id);
          }
        });
    }

    return () => {
      isActive = false;
    };
  }, [currentUser]);

  function handleOpenLogin() {
    setAuthModal("login");
  }

  function handleOpenRegister() {
    setAuthModal("register");
  }

  function handleCloseModal() {
    setAuthModal(null);
  }

  function handleSignOut() {
    sessionRequestRef.current += 1;
    localStorage.removeItem(TOKEN_KEY);
    setCurrentUser(null);
    setSavedMovies([]);
    setFavoriteLoadingIds([]);
    setFavoritesLoadedForUserId(null);
    setFavoritesError("");
    setAuthModal(null);
    setIsSessionLoading(false);
    navigate("/");
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

    sessionRequestRef.current += 1;
    localStorage.setItem(TOKEN_KEY, loginResponse.token);
    setSavedMovies([]);
    setFavoritesLoadedForUserId(null);
    setFavoritesError("");
    setCurrentUser(user);
    setIsSessionLoading(false);
    handleCloseModal();
  }

  async function handleFavoriteClick(movie) {
    if (!currentUser) {
      handleOpenLogin();
      return;
    }

    if (isFavoritesLoading) {
      return;
    }

    if (favoriteLoadingIds.includes(movie.id)) {
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      handleOpenLogin();
      return;
    }

    const requestId = sessionRequestRef.current;

    setFavoritesError("");
    setFavoriteLoadingIds((previous) => [...previous, movie.id]);

    try {
      const existingMovie = savedMovies.find(
        (savedMovie) => savedMovie.tmdbId === movie.id,
      );

      if (existingMovie) {
        await deleteSavedMovie(existingMovie._id, token);

        if (requestId === sessionRequestRef.current) {
          setSavedMovies((previous) =>
            previous.filter(
              (savedMovie) => savedMovie._id !== existingMovie._id,
            ),
          );
        }
      } else {
        const savedMovie = await saveMovie(movie, token);

        if (requestId === sessionRequestRef.current) {
          setSavedMovies((previous) => [...previous, savedMovie]);
        }
      }
    } catch (error) {
      if (requestId === sessionRequestRef.current) {
        setFavoritesError(error.message);
      }
    } finally {
      if (requestId === sessionRequestRef.current) {
        setFavoriteLoadingIds((previous) =>
          previous.filter((id) => id !== movie.id),
        );
      }
    }
  }

  const isFavoritesLoading =
    Boolean(currentUser) && favoritesLoadedForUserId !== currentUser._id;
  const favoriteIds = savedMovies.map((movie) => movie.tmdbId);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleOpenLogin}
          onRegisterClick={handleOpenRegister}
          currentUser={currentUser}
          isLoggedIn={Boolean(currentUser)}
          isSessionLoading={isSessionLoading}
          onSignOut={handleSignOut}
        />

        <div className="app__content">
          <Routes>
            <Route path="/" element={<Main />} />

            <Route
              path="/explore"
              element={
                <Explore
                  favoriteIds={favoriteIds}
                  favoriteLoadingIds={favoriteLoadingIds}
                  favoritesError={favoritesError}
                  onFavoriteClick={handleFavoriteClick}
                  isFavoritesLoading={isFavoritesLoading}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute
                  isLoggedIn={Boolean(currentUser)}
                  isSessionLoading={isSessionLoading}
                >
                  <Favorites
                    savedMovies={savedMovies}
                    favoriteIds={favoriteIds}
                    favoriteLoadingIds={favoriteLoadingIds}
                    favoritesError={favoritesError}
                    onFavoriteClick={handleFavoriteClick}
                    isFavoritesLoading={isFavoritesLoading}
                  />
                </ProtectedRoute>
              }
            />

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
              authModal === "login" ? handleOpenRegister : handleOpenLogin
            }
            onSubmit={handleAuthSubmit}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
