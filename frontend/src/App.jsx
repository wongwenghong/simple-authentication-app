import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useStateContext } from "./context/StateContext";

const App = () => {
  const { authUser } = useStateContext();

  return (
    <>
      <Routes>
        <Route
          index={true}
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
