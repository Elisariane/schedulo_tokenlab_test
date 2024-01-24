import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
