import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "../index.css";
import { useState } from "react";
import apiEventFecth from "../axios/config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    await apiEventFecth
      .post("/auth/login", user)
      .then(response => {
        sessionStorage.setItem('token', response.data.token );
        sessionStorage.setItem('userId', response.data.id );

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
            <h2>
              Entre e comece agora mesmo a criar ou participar dos melhores
              eventos!
            </h2>
            <Image
              src="https://images.blush.design/DakUwKxcKPeiveauY2JI?w=920&auto=compress&cs=srgb"
              fluid
            />
          </div>
        </Col>
        <Col className="text-center">
          <h2>Entre</h2>
          <Form onSubmit={(e) => createUser(e)}>
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

            <Link to={"/register"}>
            <Button className="m-4"  variant="link">
              Registrar-se
            </Button>
            </Link>

            <Button type="submit" disabled={!email && !password}>
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
