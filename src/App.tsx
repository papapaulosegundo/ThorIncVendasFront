import { Routes, Route } from "react-router-dom";
import NavbarApp from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import Ecommerce from "./pages/services/Ecommerce";
import Websites from "./pages/services/Websites";
import ContactList from "./pages/contact/ContactList";
import "./app.css";

export default function App() {
  return (
    <>
      <NavbarApp/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<AboutUs />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/servicos/ecommerce" element={<Ecommerce />} />
          <Route path="/servicos/websites" element={<Websites />} />
          <Route path="/contatosFormulario" element={<ContactList />} />
        </Routes>
      <Footer/>
    </>
  );
}
