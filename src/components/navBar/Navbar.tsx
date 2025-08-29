import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css"; // estilos específicos da navbar

function NavbarApp() {
  return (
    <Navbar expand="lg" className="navbar-hero" data-bs-theme="dark">
      <Container className="d-flex align-items-center gap-3">
        <Navbar.Brand className="fw-bold">Projeto Reuso</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* menu central com formato pill */}
          <Nav className="mx-auto pillMenu">
            <Nav.Link className="active">Home</Nav.Link>
            <Nav.Link disabled>Serviços</Nav.Link>
            <Nav.Link disabled>Portfólio</Nav.Link>
            <Nav.Link disabled>Sobre Nós</Nav.Link>
            <Nav.Link disabled>Contato</Nav.Link>
          </Nav>

          {/* ação à direita (opcional) */}
          <div className="d-none d-lg-block">
            <a className="btn btn-light btn-sm rounded-pill px-3" href="#">
              Começar
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
