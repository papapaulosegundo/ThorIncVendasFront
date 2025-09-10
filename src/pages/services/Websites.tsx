import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaRocket, FaDesktop, FaGraduationCap } from "react-icons/fa";
import "../../styles/index.css";
import CustomerLoop from "../../components/CustomerLoop/CustomerLoop";
import websiteImg from "../../assets/website.webp";
import homemProsperando from "../../assets/homemprosperando.webp";

const LOGOS = [
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Nestlé", href: "https://www.nestle.com/" },
  { src: new URL("../../assets/logos/amazon2.png", import.meta.url).href, alt: "Amazon", href: "https://www.amazon.com.br/" },
  { src: new URL("../../assets/logos/mercadoLivre.png", import.meta.url).href, alt: "Mercado Livre", href: "https://www.mercadolivre.com.br/" },
  { src: new URL("../../assets/logos/ebay.png", import.meta.url).href, alt: "Ebay", href: "https://br.ebay.com/" },
  { src: new URL("../../assets/logos/shopee.jpg", import.meta.url).href, alt: "Shopee", href: "https://shopee.com.br/" },
  { src: new URL("../../assets/logos/magalu.png", import.meta.url).href, alt: "Magalu", href: "https://www.magazineluiza.com.br" },
];

export default function EcommercePage() {
  return (
    <>
      {/* HERO */}
      <section className="ecom-hero">
        <Container>
          <Row className="align-items-center">
            {/* Texto */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <span className="ecom-eyebrow">Criação de E-commerce</span>

              <h1 className="ecom-title">
                Aumente sua presença online{" "}
                <span className="ecom-accent">com sites personalizados e de alta performance</span>{" "}
              </h1>

              <p className="ecom-lead">
                Desenvolvemos sites modernos, responsivos e otimizados para SEO, que ajudam a converter visitantes em clientes.
              </p>

              <div className="mt-4">
                <Button className="btn-chat" onClick={() => { /* abrir chat depois */ }}>
                  Iniciar chat
                </Button>
              </div>
            </Col>

            {/* Imagem */}
            <Col lg={6} className="text-center">
              <div className="ecom-art">
                <img src={websiteImg} alt="E-commerce" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br></br>
      {/* logos */}
      <section>
        <CustomerLoop
          emphasis="+100 empresas"
          rest="estão prosperando no Thor"
          logos={LOGOS}
          speed={30}
          logoHeight={30}
          grayscale
        />
      </section>

      <section className="ecom-target">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="target-img">
                <img src={homemProsperando} alt="Profissional trabalhando e prosperando" loading="lazy" />
              </div>
            </Col>

            <Col lg={6}>
              <header className="target-header">
                <h2 className="target-title">
                  Para quem é indicado a{" "}
                  <span className="target-highlight">Criação de Site?</span>
                </h2>
                <p className="target-lead">
                  A criação de e-commerce é ideal para empresas que desejam expandir suas
                  operações e alcançar clientes em uma escala global, oferecendo
                  uma experiência de compra conveniente e acessível 24/7.
                </p>
              </header>

              <div className="target-list">
                <div className="target-card">
                  <div className="target-ico"><FaShoppingCart /></div>
                  <div className="target-text">Para empresas de E-commerce</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaRocket /></div>
                  <div className="target-text">Quem é dono de Startups</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaDesktop /></div>
                  <div className="target-text">Empresas que atendem de forma remotas</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaGraduationCap /></div>
                  <div className="target-text">Para gestores e Instituições de Ensino</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
}
