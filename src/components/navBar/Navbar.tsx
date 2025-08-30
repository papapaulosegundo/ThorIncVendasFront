import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css"; 

function NavbarApp() {
  return (
    <Navbar expand="lg" className="navbar-hero" data-bs-theme="dark">
      <Container className="d-flex align-items-center gap-3">
        <Navbar.Brand className="fw-bold">Thor Vendas</Navbar.Brand>

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
