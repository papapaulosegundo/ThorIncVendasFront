import { Routes, Route } from "react-router-dom";
import NavbarApp from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import "./app.css";

export default function App() {
  return (
    <>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<AboutUs />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  );
}
