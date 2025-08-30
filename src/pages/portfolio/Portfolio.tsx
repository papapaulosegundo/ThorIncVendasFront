import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./portfolio.css";

type Item = { title: string; img: string; href: string };

const ITEMS: Item[] = [
  {
    title: "Amazon",
    img: "https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/refreshCreative/stores/Stores_hero._TTW_.png",
    href: "https://www.amazon.com.br/",
  },
  {
    title: "Mercado Livre",
    img: "https://www.mercadobusca.com.br/wp-content/uploads/2018/06/site_mercado_livre.png",
    href: "https://www.mercadolivre.com.br/",
  },
  {
    title: "Shopee",
    img: "https://lh6.googleusercontent.com/WULd5Tdoj1Rf3Bc9w2LKoKpxITKBBnoy9DcGzALcm1aPPwQOFjHPgsebyF3U57Uj9KtaPa0odtQs2ewq-gWCxujp6Owe93T86F_Tuy8IN8b60hFG6o5A4II_wfq_uinFP8GGz-jOb_uT5qjv6gbOQLE",
    href: "https://shopee.com.br/",
  },
  {
    title: "Ebay",
    img: "https://s2-techtudo.glbimg.com/YpYYuWYaKPoyzA0pPJxhMMgqCDA=/0x0:695x434/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/B/C/E8ke4pSt6CAazQJWX9FQ/2014-05-06-versao-portugues-ebay1.png",
    href: "https://br.ebay.com/",
  },
  {
    title: "Magazine Luiza",
    img: "https://jpimg.com.br/uploads/2019/05/magazine-luiza.jpg",
    href: "https://www.magazineluiza.com.br",
  },
  {
    title: "Americanas",
    img: "https://ogimg.infoglobo.com.br/economia/25406271-f90-d47/FT1086A/760/WhatsApp-Image-2022-02-23-at-10.27.59.jpeg.jpg",
    href: "https://www.americanas.com.br/",
  },
];

export default function Portfolio() {
  return (
    <>
      {/* HERO */}
      <section className="portfolio-hero">
        <Container>
          <h1 className="title text-center">Confira nosso portfólio</h1>
          <p className="subtitle text-center">
            Confira todos os nossos projetos até o momento .
          </p>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {ITEMS.map((it) => (
                <Col key={it.title} md={4} sm={6} xs={12}>
                    <a
                        className="folio-card"
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir ${it.title} em nova guia`}
                    >
                        <div className="thumb">
                            <img src={it.img} alt={it.title} loading="lazy" />
                        </div>
                        {/* rótulo no rodapé */}
                        <div className="label">{it.title}</div>

                        {/* seta que aparece no hover */}
                        <div className="arrow-wrap"><FaArrowRight /></div>
                    </a>
                </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
