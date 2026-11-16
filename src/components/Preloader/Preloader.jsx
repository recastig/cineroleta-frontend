import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader" role="status">
      <span
        className="preloader__spinner"
        aria-hidden="true"
      />
      <p className="preloader__text">
        Procurando seu próximo filme...
      </p>
    </div>
  );
}

export default Preloader;
