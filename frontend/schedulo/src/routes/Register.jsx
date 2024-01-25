import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "../index.css";
import { useState } from "react";
import apiEventFecth from "../axios/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };
    await apiEventFecth
      .post("/auth/register", user)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert("Ops! Houve algum erro ao tentar se cadastrar!");
        console.error(error);
      });
  };

  return (
    <Container className="p-4 text-center" fluid>
      <Row>
        <Col>
            <div>
                <h2>Registre-se e comece agora mesmo a criar ou participar dos melhores eventos!</h2>
                <Image src="https://images.blush.design/DakUwKxcKPeiveauY2JI?w=920&auto=compress&cs=srgb" fluid />
            </div>
        </Col>
        <Col className="text-center">
        <h2 >Registre-se</h2>
          <Form onSubmit={(e) => createUser(e)}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="2">
                Nome
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="text"
                  placeholder="Joe Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="e-mail"
                  placeholder="email@exemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Senha
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="password"
                  placeholder="senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPasswordConfirmed"
            >
              <Form.Label column sm="2">
                Confirma Senha
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="password"
                  placeholder="senha"
                  onChange={(e) => setPasswordConfirmed(e.target.value)}
                />

                {password != passwordConfirmed ? (
                  <span className="password-wrong">Senhas estão diferente</span>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>

            <Button
              type="submit"
              disabled={
                !password || !passwordConfirmed || password != passwordConfirmed
              }
            >
              Salvar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
