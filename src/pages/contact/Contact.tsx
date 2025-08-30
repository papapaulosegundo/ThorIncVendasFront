import { Container, Row, Col, Button } from "react-bootstrap";
import { FaComments, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <Container>
          <h1 className="title">Fale Conosco!</h1>
          <p className="subtitle">
            Estamos prontos para acelerar suas vendas com soluções sob medida.
          </p>
        </Container>
      </section>

      {/* CARDS DE CONTATO (flip) */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* CHAT */}
            <Col md={4}>
              <div className="card-3d" tabIndex={0}>
                <div className="flip-inner">
                  {/* frente */}
                  <div className="face front contact-card"> 
                    <div className="icon-badge"><FaComments /></div>
                    <h5 className="card-title">Chat Online</h5>
                    <p className="card-text">Atendimento em tempo real.</p>
                  </div>
                  {/* verso */}
                  <div className="face back contact-back">
                    <h5 className="mb-2">Chat Online</h5>
                    <p className="mb-3 opacity-75">Fale com a nossa equipe agora.</p>
                    <Button className="btn-pill btn-cta" href="#">
                      Iniciar Chat →
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            {/* EMAIL */}
            <Col md={4}>
              <div className="card-3d" tabIndex={0}>
                <div className="flip-inner">
                  <div className="face front contact-card">
                    <div className="icon-badge"><FaEnvelope /></div>
                    <h5 className="card-title">Mande um e-mail</h5>
                    <p className="card-text">
                      contato@thorinc.com<br />ou preencha o formulário.
                    </p>
                  </div>
                  <div className="face back contact-back">
                    <h5 className="mb-2">E-mail</h5>
                    <div className="d-flex gap-2 flex-wrap justify-content-center">
                      <Button className="btn-pill btn-cta" href="mailto:contato@thorinc.com">
                        Enviar e-mail
                      </Button>
                      <Button className="btn-pill btn-ghost" href="#" disabled>
                        Formulário (em breve)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* TELEFONE */}
            <Col md={4}>
              <div className="card-3d" tabIndex={0}>
                <div className="flip-inner">
                  <div className="face front contact-card">
                    <div className="icon-badge"><FaPhoneAlt /></div>
                    <h5 className="card-title">Contato</h5>
                    <p className="card-text">
                      Ligue (47) 99999-9999<br />Todos os dias, todos os horários.
                    </p>
                  </div>
                  <div className="face back contact-back">
                    <h5 className="mb-2">Telefone</h5>
                    <Button className="btn-pill btn-cta" href="tel:+5547999999999">
                      Ligar agora
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
