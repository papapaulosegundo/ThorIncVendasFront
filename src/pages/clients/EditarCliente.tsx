// src/pages/clientes/EditarCliente.tsx
import { useEffect, useMemo, useState } from "react";
import {Container, Row, Col, Form, Table, Spinner, Card, Button, Modal, Badge} from "react-bootstrap";
import Swal from "sweetalert2";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../../services/api";

type Empresa = {
  id: number;
  empresaTipoContrato: string;
  empresaNome: string;
  empresaLocal: string;
  dataInicioContrato: string;    
  valorContrato: number | null;  
  empresaContato: string;
  empresaAtivo: boolean; 
};

type FormEmpresa = {
  empresaTipoContrato: string;
  empresaNome: string;
  empresaLocal: string;
  dataInicioContrato: string;
  valorContrato: string;         
  empresaContato: string;
  empresaAtivo: boolean;
};

export default function EditarCliente() {
  const [items, setItems] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEmpresa, setFilterEmpresa] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // modal de edição
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormEmpresa>({
    empresaTipoContrato: "",
    empresaNome: "",
    empresaLocal: "",
    dataInicioContrato: "",
    valorContrato: "",
    empresaContato: "",
    empresaAtivo: true,
  });
  const [saving, setSaving] = useState(false);

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get<Empresa[]>("/empresas");
        setItems(data || []);
      } catch (err: any) {
        console.error(err);
        Swal.fire({
          title: "Erro ao carregar",
          text: err?.response?.data?.message || err?.message || "Falha ao buscar empresas.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const list = useMemo(() => {
    const filtro = filterEmpresa.trim().toLowerCase();
    if (!filtro) return items;
    return items.filter((c) => (c.empresaNome || "").toLowerCase().includes(filtro));
  }, [items, filterEmpresa]);

  function openEdit(row: Empresa) {
    setEditId(row.id);
    setForm({
      empresaTipoContrato: row.empresaTipoContrato || "",
      empresaNome: row.empresaNome || "",
      empresaLocal: row.empresaLocal || "",
      dataInicioContrato: row.dataInicioContrato || "",
      valorContrato: row.valorContrato != null ? String(row.valorContrato) : "",
      empresaContato: row.empresaContato || "",
      empresaAtivo: !!row.empresaAtivo,
    });
    setShow(true);
  }

  function onChange<K extends keyof FormEmpresa>(key: K, value: FormEmpresa[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving || editId == null) return;

    try {
      setSaving(true);
      await api.put(`/empresas/${editId}`, {
        empresaTipoContrato: form.empresaTipoContrato,
        empresaNome: form.empresaNome.trim(),
        empresaLocal: form.empresaLocal.trim(),
        dataInicioContrato: form.dataInicioContrato, // yyyy-MM-dd
        valorContrato: form.valorContrato ? Number(form.valorContrato) : null,
        empresaContato: form.empresaContato.trim(),
         empresaAtivo: form.empresaAtivo,
      });

      // atualiza lista local
      setItems((prev) =>
        prev.map((it) =>
          it.id === editId
            ? {
                ...it,
                empresaTipoContrato: form.empresaTipoContrato,
                empresaNome: form.empresaNome.trim(),
                empresaLocal: form.empresaLocal.trim(),
                dataInicioContrato: form.dataInicioContrato,
                valorContrato: form.valorContrato ? Number(form.valorContrato) : null,
                empresaContato: form.empresaContato.trim(),
                empresaAtivo: form.empresaAtivo,  // (novo)
              }
            : it
        )
      );

      setShow(false);
      await Swal.fire({
        title: "Atualizado!",
        text: "Dados da empresa salvos com sucesso.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#198754",
      });
    } catch (err: any) {
      console.error(err);
      await Swal.fire({
        title: "Erro ao salvar",
        text: err?.response?.data?.message || err?.message || "Não foi possível atualizar.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: Empresa) {
    const confirm = await Swal.fire({
      title: "Excluir empresa?",
      text: `Remover "${row.empresaNome}"? Esta ação não pode ser desfeita.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    });
    if (!confirm.isConfirmed) return;

    try {
      setDeletingId(row.id);
      await api.delete(`/empresas/${row.id}`);
      setItems((prev) => prev.filter((i) => i.id !== row.id));
      await Swal.fire({
        title: "Excluída",
        text: "A empresa foi removida com sucesso.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Erro ao excluir",
        text: err?.response?.data?.message || err?.message || "Não foi possível excluir.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="list-hero full">
      <Container>
        <Card className="mx-auto">
          <Card.Body className="p-3 p-md-4">
            <Row className="align-items-center mb-3 g-2">
              <Col>
                <h2 className="m-0">Gestão de Empresas</h2>
              </Col>
              <Col md="auto" className="ms-auto" style={{ minWidth: 260 }}>
                <Form.Control
                  type="text"
                  placeholder="Filtrar por nome da empresa…"
                  value={filterEmpresa}
                  onChange={(e) => setFilterEmpresa(e.target.value)}
                  className="input-pill"
                />
              </Col>
            </Row>

            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>Local</th>
                      <th>Tipo</th>
                      <th>Início</th>
                      <th>Valor</th>
                      <th>Contato</th>
                      <th>Status</th>
                      <th style={{ width: 180 }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    ) : (
                      list.map((c) => (
                        <tr key={c.id}>
                          <td>{c.empresaNome}</td>
                          <td>{c.empresaLocal}</td>
                          <td>{c.empresaTipoContrato}</td>
                          <td>{c.dataInicioContrato}</td>
                          <td>{c.valorContrato != null ? money.format(c.valorContrato) : "-"}</td>
                          <td>{c.empresaContato}</td>
                          <td>
                            <Badge bg={c.empresaAtivo ? "success" : "secondary"} pill>
                              {c.empresaAtivo ? "Ativo" : "Inativo"}
                            </Badge>
                          </td>
                          <td className="text-end">
                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEdit(c)}>
                              <FaEdit className="me-1" /> Editar
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c)} disabled={deletingId === c.id}>
                              <FaTrash className="me-1" />{deletingId === c.id ? "Excluindo..." : "Excluir"}
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modal de edição */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form onSubmit={handleSave} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>Editar Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="empresaTipoContrato">
                  <Form.Label>Tipo do Contrato</Form.Label>
                  <Form.Select
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
                  <Form.Label>Nome da Empresa</Form.Label>
                  <Form.Control
                    className="input-pill"
                    value={form.empresaNome}
                    onChange={(e) => onChange("empresaNome", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Group controlId="empresaLocal">
                  <Form.Label>Local da Empresa</Form.Label>
                  <Form.Control
                    className="input-pill"
                    value={form.empresaLocal}
                    onChange={(e) => onChange("empresaLocal", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="dataInicioContrato">
                  <Form.Label>Data Início</Form.Label>
                  <Form.Control
                    type="date"
                    className="input-pill"
                    value={form.dataInicioContrato}
                    onChange={(e) => onChange("dataInicioContrato", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="valorContrato">
                  <Form.Label>Valor do Contrato</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    className="input-pill"
                    value={form.valorContrato}
                    onChange={(e) => onChange("valorContrato", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="empresaContato">
                  <Form.Label>Contato Responsável</Form.Label>
                  <Form.Control
                    className="input-pill"
                    value={form.empresaContato}
                    onChange={(e) => onChange("empresaContato", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="empresaAtivo">
                  <Form.Label>Status da Empresa</Form.Label>
                  <Form.Select
                    className="input-pill"
                    value={String(form.empresaAtivo)}
                    onChange={(e) => setForm((p) => ({ ...p, empresaAtivo: e.target.value === "true" }))}
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? <Spinner size="sm" className="me-2" /> : null}
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
}