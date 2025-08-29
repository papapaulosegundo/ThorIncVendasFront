import { Button, Col, Container, Row } from "react-bootstrap";
import "./home.css";
// Se quiser usar imagem, descomente as duas linhas abaixo e coloque um hero.jpg na pasta assets
// import hero from "../assets/hero.jpg";

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <h1 className="display-4 fw-bold lh-1">
                Alavanque suas vendas. <br />
                <span className="d-inline-block">Prático e funcional.</span>
              </h1>
              <p className="lead mt-3 opacity-75">
                Sites rápidos, configuráveis e prontos para escalar. Foque no seu negócio — nós cuidamos do resto.
              </p>

              <div className="d-flex gap-3 flex-wrap mt-4">
                <Button className="rounded-pill px-4 py-2" variant="light">
                  Comece agora →
                </Button>
                <Button className="rounded-pill px-4 py-2" variant="outline-light">
                  Ver soluções
                </Button>
              </div>
            </Col>

            <Col lg={5}>
              {/* Se quiser imagem, use o bloco abaixo */}
              {/* <img src={hero} alt="Ilustração" className="img-fluid rounded-4 shadow" /> */}
              {/* Placeholder minimalista */}
              <div className="hero-placeholder rounded-4 shadow-sm d-none d-lg-block" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* “features” rápidas (opcional, bem minimalista) */}
      <section className="py-5 bg-body-tertiary">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <h5 className="fw-semibold mb-2">Performance</h5>
                <p className="mb-0 text-secondary">Páginas leves com Vite + React.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <h5 className="fw-semibold mb-2">Personalização</h5>
                <p className="mb-0 text-secondary">Componentes reutilizáveis e tema.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <h5 className="fw-semibold mb-2">Pronto para crescer</h5>
                <p className="mb-0 text-secondary">Estrutura limpa para evoluir.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
