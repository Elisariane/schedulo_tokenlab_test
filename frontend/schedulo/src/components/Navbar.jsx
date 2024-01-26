import {Container, Navbar, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/logo.png';


const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    navigate('/')
  }
  return (
      <Navbar className='bg-dark mb-2 ' variant='secondary'>
        <Container fluid>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Schedulo
          </Navbar.Brand>
          <Nav className="justify-content-end navbar">
            <Nav.Link> <Link to={'/home'}>Home</Link> </Nav.Link>
            <Nav.Link><Link to={'/my-events'}>Meus Eventos</Link></Nav.Link>
            <Nav.Link><Link to={'/new-event'}>Novo Evento</Link></Nav.Link>
            <Nav.Link><Link to={'/'} onClick={() => logout()}>Sair</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;
