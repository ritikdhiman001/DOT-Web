import "./App.css";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <Navigation />
    </>
  );
}

export default App;
