import { Container, Row, Col, Card } from "react-bootstrap";
import "./aboutUs.css";
import "../../assets/ImagemIntegrantes/Paulo.jpg"
import "../../assets/ImagemIntegrantes/Giulia.jpg"

const TEAM = [
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
    foto: new URL("../../assets/ImagemIntegrantes/Giulia.jpg", import.meta.url).href,
    cargo: "Backend & Integrações",
  },
  {
    nome: "Bruno",
    foto: new URL("../../assets/ImagemIntegrantes/Bruno.jpeg", import.meta.url).href,
    cargo: "Backend & Integrações",
  },
];

export default function AboutUs() {
  return (
    <>
      <section className="about-hero">
        <Container>
          <h1 className="title">Sobre Nós</h1>
          <p className="subtitle">
            Somos uma equipe focada em soluções rápidas, configuráveis e com reúso de software.
          </p>
        </Container>
      </section>

      {/* Cards de equipe */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {TEAM.map((m) => (
              <Col key={m.nome} xs={12} sm={6} lg={3}>
                <Card className="team-card text-center">
                  <div className="avatar-wrap">
                    <img src={m.foto} alt={m.nome} />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-1">{m.nome}</Card.Title>
                    <Card.Text className="text-secondary small">{m.cargo}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="about-block">
        <Container>
          <p>
            Nosso objetivo é acelerar a criação de sites e produtos digitais para diferentes nichos, mantendo qualidade, performance e uma base reutilizável.
            <br></br>
            Somos uma equipe composta por quatro estudantes da Pontifícia Universidade Católica do Paraná, localizada em Curitiba. 
            Estamos desenvolvendo um website de venda de softwares, Intitulado de "Thor Inc". 
            O objetivo do nosso projeto é permitir que as vendas de software se realizem de maneira mais rapída, simples e com menos trabalho, utilizando especificamento do reúso de software.
            Este projeto esta sendo desenvolvido em 2025, durante o quarto e o quinto período de nosso curso de Engenharia de Software.
            Esperamos que goste!
          </p>
        </Container>
      </section>
    </>
  );
}