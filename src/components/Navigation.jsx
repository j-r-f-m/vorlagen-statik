import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

export function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Statik Vorlagen</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
