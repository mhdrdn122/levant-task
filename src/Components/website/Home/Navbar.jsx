import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Navbar
    expanded={expanded}
    sticky="top"
    expand="lg"
    bg="transparent"
    variant="light"
    className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
  >
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          Levant <span>Task</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarCollapse"
          style={{ color: '#fbaf32', background: '#fbaf32' }}
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="navbarCollapse" className="justify-content-end">
          <Nav className="ml-auto"  style={{height: !expanded ? "auto" : "200px"}}>
            <Nav.Link href="#" active>Home</Nav.Link>
            <Nav.Link href="#">Chef</Nav.Link>
            <Nav.Link href="#">Menu</Nav.Link>
            <Nav.Link href="#">Booking</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
