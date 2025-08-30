import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGlobe, FaMobileAlt, FaRocket } from "react-icons/fa";
import "./serviceDetail.css";

export default function Websites() {
  return (
    <>
      <section className="sd-hero">
        <Container>
          <h1 className="title">Websites</h1>
          <p className="subtitle">
            Sites institucionais elegantes, responsivos e focados em conversão.
          </p>
        </Container>
      </section>

      <section className="sd-section">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaGlobe /></div>
                <h5 className="sd-title">Identidade forte</h5>
                <p className="sd-text">Design alinhado à marca, tipografia moderna e conteúdo claro.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaMobileAlt /></div>
                <h5 className="sd-title">100% responsivo</h5>
                <p className="sd-text">Experiência perfeita em desktop, tablet e celular.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaRocket /></div>
                <h5 className="sd-title">Pronto para crescer</h5>
                <p className="sd-text">Base limpa para evoluir com novas páginas e integrações.</p>
              </div>
            </Col>
          </Row>

          <div className="sd-cta">
            <Button className="sd-btn" href="/contato">Quero meu site</Button>
          </div>
        </Container>
      </section>
    </>
  );
}

