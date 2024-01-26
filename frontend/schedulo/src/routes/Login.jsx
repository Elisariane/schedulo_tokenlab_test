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
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.id);

        navigate("/home");
      })
      .catch((error) => {
        alert("Ops! Houve algum erro ao tentar se cadastrar!");
        console.error(error);
      });
  };

  return (
    <Container className="p-4 text-center" fluid>
      <Row className="text-center m-4 p-4">
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
        <Col className="card-login">
          <h2 className="m-4">Login</h2>
          <Form onSubmit={(e) => createUser(e)} className="card-login_form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
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
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Button
              className="btn btn-block"
              type="submit"
              disabled={!email && !password}
            >
              Entrar
            </Button>
            <p className="m-2">
              Sem conta? Registre-se <Link to={"/register"}>aqui</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
