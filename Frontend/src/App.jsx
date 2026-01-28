import "./App.css";
import Navbar from "./components/Navbar-Footer/Navbar";
import Navigation from "./components/Navigation";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Navigation />
    </>
  );
}

export default App;
