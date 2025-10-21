import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../services/api";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

type Empresa = {
  id: number;
  empresaTipoContrato: string | null;
  empresaNome: string;
  empresaLocal: string | null;
  dataInicioContrato: string;      
  valorContrato: number | null;    
  empresaContato: string | null;
};

export default function DashboardEmpresas() {
  const [items, setItems] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

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

  // util: últimos N meses (mais antigos -> recentes)
  function lastMonths(n: number) {
    const out: { key: string; label: string }[] = [];
    const d = new Date();
    d.setDate(1); // trava dia 1 p/ evitar pulo
    for (let i = n - 1; i >= 0; i--) {
      const dt = new Date(d.getFullYear(), d.getMonth() - i, 1);
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const key = `${y}-${m}`;
      const label = dt.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
      out.push({ key, label });
    }
    return out;
  }

  // agrega
  const {
    totalEmpresas,
    totalValor,
    ticketMedio,
    serieMeses,
    pizzaTipos,
  } = useMemo(() => {
    const fmtBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

    const total = items.length;
    const valorTotal = items.reduce((acc, it) => acc + (Number(it.valorContrato) || 0), 0);
    const ticket = total > 0 ? valorTotal / total : 0;

    // por mês (últimos 12)
    const months = lastMonths(12);
    const countByKey: Record<string, number> = {};
    months.forEach(m => (countByKey[m.key] = 0));
    for (const it of items) {
      const k = (it.dataInicioContrato || "").slice(0, 7); // yyyy-MM
      if (k in countByKey) countByKey[k] += 1;
    }
    const serie = months.map(m => ({ label: m.label, cadastros: countByKey[m.key] || 0 }));

    // por tipo de contrato
    const mapTipos: Record<string, number> = {};
    for (const it of items) {
      const t = (it.empresaTipoContrato || "Indefinido").trim() || "Indefinido";
      mapTipos[t] = (mapTipos[t] || 0) + 1;
    }
    const pizza = Object.entries(mapTipos).map(([name, value]) => ({ name, value }));

    return {
      totalEmpresas: total,
      totalValor: fmtBRL.format(valorTotal),
      ticketMedio: fmtBRL.format(ticket),
      serieMeses: serie,
      pizzaTipos: pizza,
    };
  }, [items]);

  const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7"];

  return (
    <section className="list-hero full">
      <Container>
        <Row className="g-3 mb-2">
          {/* KPIs */}
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <div className="text-muted small">Total de Clientes</div>
                {loading ? <Spinner size="sm" /> : <h3 className="m-0">{totalEmpresas}</h3>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <div className="text-muted small">Valor Total de Contratos</div>
                {loading ? <Spinner size="sm" /> : <h3 className="m-0">{totalValor}</h3>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <div className="text-muted small">Ticket Médio</div>
                {loading ? <Spinner size="sm" /> : <h3 className="m-0">{ticketMedio}</h3>}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3">
          {/* Cadastros por mês */}
          <Col md={8}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="m-0">Cadastros por mês (12m)</h5>
                </div>
                <div style={{ width: "100%", height: 260 }}>
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Spinner />
                    </div>
                  ) : (
                    <ResponsiveContainer>
                      <AreaChart data={serieMeses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="cadastros" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tipos de contrato */}
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <h5 className="mb-2">Tipos de contrato</h5>
                <div style={{ width: "100%", height: 260 }}>
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Spinner />
                    </div>
                  ) : (
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={pizzaTipos} dataKey="value" nameKey="name" outerRadius={90} label>
                          {pizzaTipos.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
