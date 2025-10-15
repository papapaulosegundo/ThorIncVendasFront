import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Table, Spinner, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../services/api";
import type { ContatoDTO } from "../../services/api";

type Contato = ContatoDTO & { id: number };

export default function ContactList() {
  const [items, setItems] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEmpresa, setFilterEmpresa] = useState("");

    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            const { data } = await api.get<Contato[]>("/contatos");
            setItems(data || []);
        } catch (err: any) {
            console.error(err);
            Swal.fire({
            title: "Erro ao carregar",
            text: err?.response?.data?.message || err?.message || "Falha ao buscar contatos.",
            icon: "error",
            confirmButtonText: "Ok",
            });
        } finally {
            setLoading(false);
        }
        })();
    }, []);

  const list = useMemo(() => {
    const q = filterEmpresa.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => (c.nomeEmpresa || "").toLowerCase().includes(q));
  }, [items, filterEmpresa]);

  return (
    <section className="py-4">
      <Container>
        <Card className="mx-auto">
          <Card.Body className="p-3 p-md-4">
            <Row className="align-items-center mb-3 g-2">
              <Col>
                <h2 className="m-0">Listagem - Formulários</h2>
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
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Nome da empresa</th>
                      <th>Segmento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-muted">
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    ) : (
                      list.map((c) => (
                        <tr key={c.id}>
                          <td>{c.nome}</td>
                          <td className="text-truncate" style={{ maxWidth: 240 }}>{c.email}</td>
                          <td>{c.nomeEmpresa}</td>
                          <td>{c.segmentoEmpresa}</td>
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
    </section>
  );
}
