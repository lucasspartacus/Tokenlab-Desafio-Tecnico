import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import '../styles/NavBar.css';  
import companyLogo from '../img/favicon.png'

const NavBar = ({ user, setUser }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Navbar.Brand className='d-flex custom-navbar-brand' as={Link} to="/">
        <img
          src={companyLogo}
          alt="Calendar"     
          style={{ maxWidth: '50px', height: '50px' }}
        />
        <h3 className='px-2 py-1'>Calendar</h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <div className='d-flex custom-buttons'>
              <Nav.Link as={Link} to="/events"  className='px-2'>Eventos</Nav.Link>
           
              <Nav.Link 
                      className='px-2 '
                      style={{color:'#DC3545'}}
                      onClick={() => setUser(null)} 
                      as={Link} to="/">Sair
              </Nav.Link>
            </div>
          ) : (
           <div className='d-flex custom-buttons'>
            <Nav.Link as={Link} className='px-2' to="/login">Acessar</Nav.Link>
            <Nav.Link as={Link} className='px-2' to="/register">Registrar</Nav.Link>
           </div>

          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
