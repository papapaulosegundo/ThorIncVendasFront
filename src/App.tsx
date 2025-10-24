import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import type { ReactElement } from "react";  
import NavbarApp from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import Ecommerce from "./pages/services/Ecommerce";
import Websites from "./pages/services/Websites";
import ContactList from "./pages/contact/ContactList";
import OpcoesClientes from "./pages/clients/OpcoesCliente";
import CadastroCliente from "./pages/clients/CadastroCliente";
import EditarCliente from "./pages/clients/EditarCliente";
import DashboardEmpresas from "./pages/dashboard/Dashboard";
import Login from "./pages/loginAdmin/loginAdmin";
import "./app.css";
import { isAdmin } from "./services/auth";

function ProtectedRoute({ children }: { children: ReactElement }) { 
  if (!isAdmin()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { pathname } = useLocation();
  const hideChrome = ["/contatosFormulario", "/clientes/cadastro", "/clientes/edit", "/empresas/dashboard", "/login"];
  const shouldHide = hideChrome.includes(pathname);

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


          <Route path="/contatosFormulario" element={<ProtectedRoute><ContactList /></ProtectedRoute>} />
          <Route path="/clientes/opcoes" element={<ProtectedRoute><OpcoesClientes /></ProtectedRoute>}/>
          <Route path="/clientes/cadastro" element={<ProtectedRoute><CadastroCliente /></ProtectedRoute>}/>
          <Route path="/clientes/edit" element={<ProtectedRoute><EditarCliente /></ProtectedRoute>}/>
          <Route path="/empresas/dashboard" element={<ProtectedRoute><DashboardEmpresas /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      {!shouldHide && <Footer />}
    </>
  );
}
