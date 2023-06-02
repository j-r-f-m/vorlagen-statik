import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand to="/" as={NavLink} href="#home">
              Statik Vorlagen
            </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
