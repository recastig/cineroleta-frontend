import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function ProtectedRoute({
  isLoggedIn,
  isSessionLoading,
  children,
}) {
  if (isSessionLoading) {
    return <Preloader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;