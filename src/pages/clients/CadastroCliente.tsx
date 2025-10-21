import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../services/api";
import "../../styles/index.css";

type FormState = {
  empresaTipoContrato: string;
  empresaNome: string;
  empresaLocal: string;
  dataInicioContrato: string;
  valorContrato: string;      
  empresaContato: string;
};

export default function CadastroCliente() {
  const [form, setForm] = useState<FormState>({
    empresaTipoContrato: "",
    empresaNome: "",
    empresaLocal: "",
    dataInicioContrato: "",
    valorContrato: "",
    empresaContato: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate(): string | null {
    if (!form.empresaTipoContrato) return "Selecione o tipo do contrato.";
    if (!form.empresaNome.trim()) return "Informe o nome da empresa.";
    if (!form.empresaLocal.trim()) return "Informe o local da empresa.";
    if (!form.dataInicioContrato) return "Informe a data de início do contrato.";
    const v = Number(form.valorContrato);
    if (!form.valorContrato || Number.isNaN(v) || v < 0) return "Informe um valor de contrato válido.";
    if (!form.empresaContato.trim()) return "Informe o contato responsável da empresa.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    const msg = validate();
    if (msg) {
      await Swal.fire({ title: "Dados incompletos", text: msg, icon: "warning", confirmButtonText: "Ok" });
      return;
    }

    try {
      setSaving(true);
      setError(null);

      await api.post("/empresas", {
        empresaTipoContrato: form.empresaTipoContrato,
        empresaNome: form.empresaNome.trim(),
        empresaLocal: form.empresaLocal.trim(),
        dataInicioContrato: form.dataInicioContrato, 
        valorContrato: Number(form.valorContrato),   
        empresaContato: form.empresaContato.trim(),
      });

      await Swal.fire({
        icon: "success",
        title: "Cadastrado!",
        text: "Empresa parceira salva com sucesso.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#198754",
      });

      setForm({
        empresaTipoContrato: "",
        empresaNome: "",
        empresaLocal: "",
        dataInicioContrato: "",
        valorContrato: "",
        empresaContato: "",
      });
    } catch (err: any) {
      const text = err?.response?.data?.message || err?.message || "Falha ao salvar.";
      setError(text);
      await Swal.fire({ icon: "error", title: "Erro", text });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="list-hero full">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h2 className="h4 mb-1">Nova Empresa Parceira</h2>
                    <small className="text-muted">
                      Preencha as informações para adicionar uma nova empresa parceira.
                    </small>
                  </div>
                </div>

                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                <Form onSubmit={onSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="empresaTipoContrato">
                        <Form.Label>Tipo do Contrato <span className="req">*</span></Form.Label>
                        <Form.Select
                          required
                          className="input-pill"
                          value={form.empresaTipoContrato}
                          onChange={(e) => onChange("empresaTipoContrato", e.target.value)}
                        >
                          <option value="">Selecione…</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Website">Website</option>
                          <option value="Outro">Outro</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="empresaNome">
                        <Form.Label>Nome da Empresa <span className="req">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          className="input-pill"
                          value={form.empresaNome}
                          onChange={(e) => onChange("empresaNome", e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group controlId="empresaLocal">
                        <Form.Label>Local da Empresa <span className="req">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          className="input-pill"
                          value={form.empresaLocal}
                          onChange={(e) => onChange("empresaLocal", e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={4}>
                      <Form.Group controlId="dataInicioContrato">
                        <Form.Label>Data Início Contrato <span className="req">*</span></Form.Label>
                        <Form.Control
                          type="date"
                          className="input-pill"
                          value={form.dataInicioContrato}
                          onChange={(e) => onChange("dataInicioContrato", e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="valorContrato">
                        <Form.Label>Valor do Contrato <span className="req">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          step="0.01"
                          className="input-pill"
                          value={form.valorContrato}
                          onChange={(e) => onChange("valorContrato", e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="empresaContato">
                        <Form.Label>Contato Responsável Empresa <span className="req">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          className="input-pill"
                          value={form.empresaContato}
                          onChange={(e) => onChange("empresaContato", e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="d-flex gap-2">
                      <Button type="submit" variant="dark" disabled={saving}>
                        {saving ? (<><Spinner size="sm" className="me-2" /> Salvando…</>) : "Salvar"}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setForm({
                          empresaTipoContrato: "",
                          empresaNome: "",
                          empresaLocal: "",
                          dataInicioContrato: "",
                          valorContrato: "",
                          empresaContato: "",
                        })}
                        disabled={saving}
                      >
                        Limpar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}