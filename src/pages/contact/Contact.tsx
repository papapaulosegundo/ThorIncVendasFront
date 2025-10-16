import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { FaComments, FaEnvelope, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import "../../styles/index.css";
import { useState } from "react";
import api from "../../services/api";
import type { ContatoDTO } from "../../services/api";
import Swal from 'sweetalert2';

export default function Contact() {

    const [form, setForm] = useState<ContatoDTO>({
        nome: "",
        email: "",
        nomeEmpresa: "",
        segmentoEmpresa: "",
    });

    const [sending, setSending] = useState(false);

    function onChange<K extends keyof ContatoDTO>(key: K, value: ContatoDTO[K]) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (sending) return;

        const errMsg = validateForm();
        if (errMsg) {
            await Swal.fire({
            title: "Dados incompletos",
            text: errMsg,
            icon: "warning",
            confirmButtonText: "Ok",
            });
            return;
        }

        try {
            setSending(true);
            await api.post("/contatos", {
                ...form,
                nome: form.nome.trim(),
                email: form.email.trim(),
                nomeEmpresa: form.nomeEmpresa.trim(),
                segmentoEmpresa: form.segmentoEmpresa.trim(),
            });

            await Swal.fire({
                title: "Enviado!",
                text: "Recebemos seu contato.",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#198754",
            });

            setForm({ nome: "", email: "", nomeEmpresa: "", segmentoEmpresa: "" });
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Não foi possível enviar. Tente novamente.";
            await Swal.fire({
                title: "Atenção",
                text: msg,
                icon: "error",
                confirmButtonText: "Ok",
            });
        } finally {
            setSending(false);
        }
    }

    const labels: Record<keyof ContatoDTO, string> = {
        nome: "Nome",
        email: "Email",
        nomeEmpresa: "Nome da empresa",
        segmentoEmpresa: "Segmento",
        };

        function validateForm(): string | null {
        for (const k of Object.keys(labels) as (keyof ContatoDTO)[]) {
            const v = String(form[k] ?? "").trim();
            if (!v) return `Preencha o campo "${labels[k]}".`;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
        if (!emailOk) return "Informe um e-mail válido.";
        return null;
    }


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
                <div className="card-3d">
                    <div className="flip-inner">
                        <div className="face front contact-card">
                            <div className="icon-badge"><FaComments /></div>
                            <h5 className="card-title">Chat Online</h5>
                            <p className="card-text">Atendimento em tempo real com nossa equipe.</p>
                        </div>
                        <div className="face back contact-back">
                            <h5 className="mb-2">Chat Online</h5>
                            <p className="mb-3 opacity-75">Fale com a nossa equipe agora.</p>
                            <Button className="btn-pill btn-cta" as="button" onClick={() => {/* abrir chat aqui depois */}} >
                                Iniciar Chat
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
                            contato@thorinc.com<br />ou Preencha o Formulário Abaixo.
                        </p>
                        </div>
                        <div className="face back contact-back">
                        <h5 className="mb-2">E-mail</h5>
                        <p className="mb-3 opacity-75">Envie um email para nossa equipe. <br></br> contato@thorinc.com</p>
                        <div className="d-flex gap-2 flex-wrap justify-content-center">
                            <Button className="btn-pill btn-cta" href="mailto:contato@thorinc.com">
                                Enviar e-mail
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
                            Ligue (47) 99999-9999<br />Todos os dias, Todos os horários.
                        </p>
                        </div>
                        <div className="face back contact-back">
                        <h5 className="mb-2">Telefone</h5>
                        <p className="mb-3 opacity-75">Ligue para nossa equipe.</p>
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
        
        {/* FORMULÁRIO */}
        <section className="contact-form-wrap">
            <Container>
                <Card className="contact-form-card mx-auto">
                <Card.Body className="p-4 p-md-5">
                    <h2 className="form-title text-center mb-4">Formulário de Contato</h2>

                    <Form onSubmit={handleSubmit} noValidate>
                    <Row className="g-4">
                        <Col md={6}>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome <span className="req">*</span></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Seu nome"
                            className="input-pill"
                            required
                            value={form.nome}
                            onChange={(e) => onChange("nome", e.target.value)}
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email <span className="req">*</span></Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="empresa@email.com"
                            className="input-pill"
                            required
                            value={form.email}
                            onChange={(e) => onChange("email", e.target.value)}
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formEmpresa">
                            <Form.Label>Nome da empresa <span className="req">*</span></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Ex.: Barbecue Cuccina's"
                            className="input-pill"
                            required
                            value={form.nomeEmpresa}
                            onChange={(e) => onChange("nomeEmpresa", e.target.value)}
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formSegmento">
                            <Form.Label>Segmento <span className="req">*</span></Form.Label>
                            <Form.Select
                            required
                            className="input-pill"
                            value={form.segmentoEmpresa}
                            onChange={(e) => onChange("segmentoEmpresa", e.target.value)}
                            >
                            <option value="">Selecione…</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Website">Website</option>
                            <option value="Outro">Outro</option>
                            </Form.Select>
                        </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button type="submit" variant="success" className="btn-send" disabled={sending}>
                        {sending ? "Enviando..." : <>Enviar Formulário <FaArrowRight className="ms-1" /></>}
                        </Button>
                    </div>
                    </Form>
                </Card.Body>
                </Card>
            </Container>
        </section>

        {/* MAPA */}
        <section className="contact-map">
            <Container>
                <h2 className="map-title text-center mb-3">Estamos Localizados:</h2>

                <div className="map-embed">
                <iframe
                    title="PUCPR - Bloco 9"
                    src="https://www.google.com/maps?q=PUCPR%20Bloco%209%2C%20Pontif%C3%ADcia%20Universidade%20Cat%C3%B3lica%20do%20Paran%C3%A1%2C%20Curitiba&hl=pt-BR&z=16&output=embed"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                >   
                </iframe>
                </div>

                <div className="text-center mt-2">
                <a className="map-open-link" href="https://www.google.com/maps/search/?api=1&query=PUCPR%20Bloco%209%20Curitiba" target="_blank" rel="noreferrer">
                    Abrir no Google Maps
                </a>
                </div>
            </Container>
        </section>
    </>
  );
}
