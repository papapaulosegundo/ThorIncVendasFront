import { useEffect, useState } from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import logoImage from "../../assets/Preview.png";
import MenuServicos from "../../pages/services/MenuServicos";
import { isAdmin, logout } from "../../services/auth";

export default function NavbarApp() {
  const [shrink, setShrink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShrink(prev => (y > 60 ? true : y < 10 ? false : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const admin = isAdmin();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <Navbar expand="lg" className={`navbar-hero sticky-top ${shrink ? "navbar-shrink shadow-sm" : ""}`} data-bs-theme="dark">
      <Container className="justify-content-between">
        {/* Quando usar router, troque href="/" por: as={Link} to="/" */}
        <Navbar.Brand as={Link} to="/" aria-label="Ir para a Home" className="brand">
          <span className="brand-badge">
            <img src={logoImage} alt="Thor Inc" />
          </span>
          {/** 
          <span className="brand-title">Thor</span>
          */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav className="pillMenu">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <MenuServicos/>
            <Nav.Link as={NavLink} to="/portfolio">Portfólio</Nav.Link>
            <Nav.Link as={NavLink} to="/sobre">Sobre Nós</Nav.Link>
            <Nav.Link as={NavLink} to="/contato">Contato</Nav.Link>

            {admin && (
              <>
                <Nav.Link as={NavLink} to="/contatosFormulario">Formulários</Nav.Link>
                <Nav.Link as={NavLink} to="/clientes/opcoes"> Administrador </Nav.Link>
                <Nav.Link as={NavLink} to="/empresas/dashboard"> Dashboard </Nav.Link>
              </>
            )}
            {admin && (
              <Nav.Link as="button" onClick={handleLogout} className="btn btn-link nav-link">
                Sair
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

