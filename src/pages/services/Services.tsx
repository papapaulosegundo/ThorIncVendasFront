import { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaGlobe } from "react-icons/fa";
import "./services.css";

export default function Services() {
  const { hash } = useLocation();
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hash === "#opcoes" && optionsRef.current) {
      optionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <>
      {/* HERO */}
      <section className="srv-hero">
        <Container>
          <h1 className="title text-center">Serviços</h1>
          <p className="subtitle text-center">
            Escolha a solução ideal para o seu negócio.
          </p>
        </Container>
      </section>

      {/* OPÇÕES */}
      <section id="opcoes" ref={optionsRef} className="srv-options">
        <Container>
          <Row className="g-4 justify-content-center">
            <Col md={5} lg={4}>
              <Link to="/servicos/ecommerce" className="srv-card">
                <div className="icon"><FaShoppingCart /></div>
                <h3 className="srv-title">E-commerce</h3>
                <p className="srv-desc">
                  Lojas modernas, rápidas e escaláveis para vender 24/7.
                </p>
                <span className="srv-cta">Ver detalhes →</span>
              </Link>
            </Col>

            <Col md={5} lg={4}>
              <Link to="/servicos/websites" className="srv-card">
                <div className="icon"><FaGlobe /></div>
                <h3 className="srv-title">Websites</h3>
                <p className="srv-desc">
                  Sites institucionais elegantes, focados em conversão.
                </p>
                <span className="srv-cta">Ver detalhes →</span>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
