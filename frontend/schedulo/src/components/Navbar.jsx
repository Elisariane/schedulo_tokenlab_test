import {Container, Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'
const NavBar = () => {
  return (
      <Navbar className='bg-dark mb-2 ' variant='secondary'>
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../assets/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Schedulo
          </Navbar.Brand>
          <Nav className="justify-content-end navbar">
            <Nav.Link> <Link to={'/'}>Home</Link> </Nav.Link>
            <Nav.Link>Meus Eventos</Nav.Link>
            <Nav.Link><Link to={'/new-event'}>Novo Evento</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;
