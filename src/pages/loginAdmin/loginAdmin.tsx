import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../services/auth";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", {
        username: user,
        password: pass,
      });
      if (data?.autenticado) {
        setAdmin(true);
        await Swal.fire({
          icon: "success",
          title: "Bem-vindo!",
          text: "Login realizado com sucesso.",
          confirmButtonText: "Ok",
          confirmButtonColor: "#198754",
        });
        navigate("/", { replace: true }); 
      } else {
        await Swal.fire({
          icon: "error",
          title: "Credenciais inválidas",
          text: "Usuário ou senha incorretos.",
        });
      }
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Falha no login",
        text: err?.response?.data?.message || "Usuário ou senha inválidos.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="list-hero full">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 mb-3">Acesso Administrador</h2>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="loginUser">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="loginPass">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="dark" disabled={loading} className="w-100">
                    {loading ? (<><Spinner size="sm" className="me-2" /> Entrando…</>) : "Entrar"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
