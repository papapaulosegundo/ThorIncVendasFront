import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaList } from "react-icons/fa";

export default function OpcoesClientes() {

  return (
    <>
        <section className="home-sections">
            <Container>
                <header className="section-header text-center">
                    <h2 className="section-heading">
                    Gestão do Ecommerce
                    </h2>
                </header>

                <Row className="g-4 align-items-stretch">
                    <Col sm={12} md={6} lg={6}>
                    <article className="feature-card">
                        <div className="feature-icon"><FaList /></div>
                        <h3 className="feature-title">Cadastrar Cliente para Gestão</h3>
                        <p className="feature-text">
                            Cadastro de cliente que fechou o contrato para gestão de contrato e valores da empresa.
                        </p>
                        <Link to="/clientes/cadastro" className="feature-cta">Adicionar Clientes</Link>
                    </article>
                    </Col>

                    <Col sm={12} md={6} lg={6}>
                    <article className="feature-card">
                        <div className="feature-icon"><MdProductionQuantityLimits /></div>
                        <h3 className="feature-title">Visualizar e Editar Clientes Parceiros</h3>
                        <p className="feature-text">
                            Visualizar e editar informações de clientes parceiros da empresa!
                        </p>
                        <Link to="/clientes/edit" className="feature-cta">Visualizar e Editar Clientes</Link>
                    </article>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  );
}
