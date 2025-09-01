import { Container, Row, Col, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { FaTools, FaLayerGroup, FaHandshake } from "react-icons/fa";

const heroBg = new URL("../../assets/TesteCipreste.webp", import.meta.url).href;

const HERO_IMAGES = [
  new URL("../../assets/Prototipos/Montanhismo.webp", import.meta.url).href,
  new URL("../../assets/Prototipos/Mercado.webp", import.meta.url).href,
  new URL("../../assets/Prototipos/Farmacia.webp", import.meta.url).href,
];

export default function Home() {

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // pré-carrega as imagens
    HERO_IMAGES.forEach((src) => { const i = new Image(); i.src = src; });

    const id = setInterval(
      () => setIdx((i) => (i + 1) % HERO_IMAGES.length),
      8000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO tipo “Wix” */}
      <section className="home-hero full">
        {/* camada de slides (fundo) */}
        <div className="hero-slides">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`hero-slide ${i === idx ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
              aria-hidden={i !== idx}
            />
          ))}
        </div>

        <Container className="position-relative">
          <div className="hero-card">
            <small className="eyebrow">Desenvolvendo estratégias inovadoras</small>

            <h1 className="hero-title">
              Alavanque suas vendas.<br />
            </h1>

            <p className="hero-lead">
              Sites rápidos, reutilizáveis e prontos para escalar. Foque no seu negócio — nós
              cuidamos do resto.
            </p>

            <div className="actions">
              <Button className="btn-hero" variant="outline-dark">
                Fale Conosco!
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEÇÃO de apoio (3 colunas) */}
      <section className="home-sections">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaTools /></div>
                <h3 className="feature-title">Serviços</h3>
                <p className="feature-text">
                  Construímos lojas virtuais e sites institucionais com foco em conversão,
                  desempenho e escalabilidade. Integramos pagamentos, ERP e analytics para
                  você crescer com segurança.
                </p>
                <Link to="/servicos#opcoes" className="feature-cta">Ver serviços</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaLayerGroup /></div>
                <h3 className="feature-title">Projetos</h3>
                <p className="feature-text">
                  Um portfólio com cases reais: e-commerce, landing pages e soluções sob
                  medida. Veja o que já entregamos e como podemos aplicar ao seu cenário.
                </p>
                <Link to="/portfolio" className="feature-cta">Ver portfólio</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaHandshake /></div>
                <h3 className="feature-title">Seja Nosso Cliente</h3>
                <p className="feature-text">
                  Parcerias de longo prazo: suporte contínuo, evolução do produto e
                  acompanhamento de métricas para garantir resultado e previsibilidade.
                </p>
                <Link to="/contato" className="feature-cta">Fale com a gente</Link>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
