import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { FaLayerGroup, FaHandshake, FaFileImage} from "react-icons/fa";
import "./aboutUs.css";
import CustomerLoop from "../../components/CustomerLoop/CustomerLoop";

const Equipe = [
  {
    nome: "Paulo Muchalski",
    foto: new URL("../../assets/ImagemIntegrantes/Paulo.jpg", import.meta.url).href,
    cargo: "Full-Stack & Tech Lead",
  },
  {
    nome: "Giulia Casteluci",
    foto: new URL("../../assets/ImagemIntegrantes/Giulia.jpg", import.meta.url).href,
    cargo: "QA & Testes",
  },
  {
    nome: "Paulo Vitor",
    foto: new URL("../../assets/ImagemIntegrantes/PauloVitor.jpg", import.meta.url).href,
    cargo: "Backend & Integrações",
  },
  {
    nome: "Bruno Pacek",
    foto: new URL("../../assets/ImagemIntegrantes/Bruno.jpeg", import.meta.url).href,
    cargo: "Backend & Integrações",
  },
];

const LOGOS = [
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Nestlé" },
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Pulse" },
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Nordestão" },
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Tidmo" },
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Rui Cadete" },
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Activesoft" },
];

export default function AboutUs() {
  // lista de slides (apenas as URLs das fotos)
  const SLIDES = useMemo(() => Equipe.map(t => t.foto), []);
  const [idx, setIdx] = useState(0);

  // troca a cada 8s + preload
  useEffect(() => {
    SLIDES.forEach(src => { const i = new Image(); i.src = src; });
    if (SLIDES.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [SLIDES]);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <Container>
          <h1 className="title">Sobre Nós</h1>
          <p className="subtitle">
            Somos uma equipe focada em soluções rápidas, configuráveis e com reúso de software.
          </p>
        </Container>
      </section>

      <section className="about-split">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <h2 className="split-title">Serviços de qualidade para sua necessidade</h2>

              <p className="split-text">
                O objetivo da Thor é acelerar a criação de sites e produtos digitais para diferentes nichos, mantendo qualidade, performance e uma base reutilizável.
              </p>

              <p className="split-text">
                  Somos uma equipe composta por quatro estudantes da Pontifícia Universidade Católica do Paraná, localizada em Curitiba. 
                    Estamos desenvolvendo um website de venda de softwares. 
                    O objetivo do nosso projeto é permitir que as vendas de software se realizem de maneira mais rapída, simples e com menos trabalho, utilizando especificamento do reúso de software.
                    Este projeto esta sendo desenvolvido em 2025, durante o quarto e o quinto período de nosso curso de Engenharia de Software.
                    Esperamos que goste!
              </p>

            </Col>

            <Col lg={6} className="d-flex justify-content-lg-end">
              <Card className="about-photo-card">
                <Card.Body className="p-3">
                  <div className="about-slideshow">
                    {SLIDES.map((src, i) => (
                      <div
                        key={i}
                        className={`slide ${i === idx ? "is-active" : ""}`}
                        style={{ backgroundImage: `url(${src})` }}
                        aria-hidden={i !== idx}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="home-sections">
        <Container>
          <header className="section-header text-center">
            <h2 className="section-heading">
              Temos a solução ideal para seu negócio
            </h2>
          </header>

          <Row className="g-4 align-items-stretch">
            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaFileImage /></div>
                  <h3 className="feature-title">Desenvolvimento Web</h3>
                    <p className="feature-text">
                      Com nossos sistemas reutilizaveís e o atendimento da nossa equipe
                      seu Website ficará pronto de maneira rapída, com muita efetividade
                      Venha buscar novos horizontes com o time do Thor.
                    </p>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaLayerGroup /></div>
                  <h3 className="feature-title">Hospedagem de Websites</h3>
                    <p className="feature-text">
                      Nossa hospedagem de Websites e email busca os melhores mecanismos
                      para melhorar seu negócio.
                    </p>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaHandshake /></div>
                  <h3 className="feature-title">Projetos</h3>
                    <p className="feature-text">
                      Com nosso portfólio com clientes de diversas áreas, mostra que nós conseguimos
                      atender clientes de diferentes ramos e extrair a essência para cada cliente
                      transformando a ideia em algo com vida.
                    </p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>

      {/*Seção logos clietes */}
      <section>
        <CustomerLoop
          emphasis="+100 empresas"
          rest="estão prosperando no Thor"
          logos={LOGOS}
          speed={30}          
          logoHeight={30}    
          grayscale           // opcional: manter logos em cinza
        />
      </section>
    </>
  );
}