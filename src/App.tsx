import NavbarApp from "./components/navBar/Navbar";
import Home from "./pages/home/Home";
import "./app.css";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <>
      <NavbarApp />
      <Home />
      <Footer />
    </>
  );
}

export default App;