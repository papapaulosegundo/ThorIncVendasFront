import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaBolt, FaShieldAlt } from "react-icons/fa";
import "./serviceDetail.css";

export default function Ecommerce() {
  return (
    <>
      <section className="sd-hero">
        <Container>
          <h1 className="title">E-commerce</h1>
          <p className="subtitle">
            Lojas modernas, rápidas e integradas — prontas para escalar e vender 24/7.
          </p>
        </Container>
      </section>

      <section className="sd-section">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaShoppingCart /></div>
                <h5 className="sd-title">Checkout que converte</h5>
                <p className="sd-text">Fluxo de compra otimizado e suporte a múltiplos meios de pagamento.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaBolt /></div>
                <h5 className="sd-title">Performance</h5>
                <p className="sd-text">Páginas leves com Vite + React, SEO técnico e carregamento rápido.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="sd-card">
                <div className="sd-icon"><FaShieldAlt /></div>
                <h5 className="sd-title">Segurança</h5>
                <p className="sd-text">Boas práticas, HTTPS, autenticação e monitoramento contínuo.</p>
              </div>
            </Col>
          </Row>

          <div className="sd-cta">
            <Button className="sd-btn" href="/contato">Quero vender mais</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
