import { useEffect, useRef, useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ mode, onClose, onSwitchMode, onSubmit }) {
  const isLogin = mode === "login";
  const title = isLogin ? "Entrar" : "Cadastro";

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll(
            'button:not(:disabled), input:not(:disabled)'
          )
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (error) {
      setMessage(error.message || "Não foi possível realizar a operação.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="modal"
      onMouseDown={handleOverlayClick}
    >
      <section
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        ref={dialogRef}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Fechar janela"
          ref={closeButtonRef}
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="modal__title" id="auth-modal-title">
          {title}
          <span className="modal__title-dot">.</span>
        </h2>

        <p className="modal__description">
          {isLogin
            ? "Que bom ter você de volta!"
            : "Crie sua conta e comece a girar!"}
        </p>

        <form
          className="modal__form"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <label className="modal__field">
              <span className="modal__label">
                Nome
              </span>
              <input
                className="modal__input"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                minLength={2}
                maxLength={100}
                required
              />
            </label>
          )}

          <label className="modal__field">
            <span className="modal__label">
              E-mail
            </span>
            <input
              className="modal__input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label className="modal__field">
            <span className="modal__label">
              Senha
            </span>
            <input
              className="modal__input"
              type="password"
              name="password"
              autoComplete={
                isLogin
                  ? "current-password"
                  : "new-password"
              }
              placeholder="Sua senha"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={isLogin ? undefined : 8}
              required
            />
          </label>

          <button
            className="modal__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "AGUARDE..."
              : isLogin
                ? "ENTRAR"
                : "CADASTRAR"}
          </button>

          {message && (
            <p className="modal__message" role="alert">
              {message}
            </p>
          )}
        </form>

        <p className="modal__footer">
          {isLogin
            ? "Ainda não tem uma conta?"
            : "Já tem uma conta?"}

          <button
            className="modal__switch"
            type="button"
            onClick={onSwitchMode}
          >
            {isLogin ? "Cadastre-se" : "Login"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default ModalWithForm;