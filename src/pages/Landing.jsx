import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uniqid from "uniqid";
import { NavLink } from "react-router-dom";

export function Landing() {
  // create data file with the modules-array, import array and use it as state
  const [modules] = useState([
    {
      title: "Balken Bewehrung",
      img: "imgs/bewehrung.png",
      description: "Ermittelt die maximale Anzahl an Bewehrungseisen",
      id: uniqid(),
    },
    {
      title: "Verankerungslänge",
      img: "imgs/verankerungslänge.png",
      description: "Ermittelt Verankerungs- oder Übergreifungslänge",
      id: uniqid(),
    },
    {
      title: "Lastannahmen",
      img: "imgs/lastannahmen.png",
      description: "Lastannahmen und Teilsicherheitswerte",
      id: uniqid(),
    },
  ]);

  return (
    <Container>
      <Row>
        {modules.map((module) => (
          <Col
            key={module.id}
            className="d-flex align-items-center justify-content-center"
          >
            <Card
              bg="light"
              style={{ width: "18rem", height: "25rem", marginTop: "2rem" }}
            >
              <CardHeader>{module.title}</CardHeader>
              <Card.Img variant="top" src={module.img} />
              <Card.Body>
                <Card.Text>{module.description}</Card.Text>
                <Button variant="primary">
                  <Nav.Link to="/balkenBewehrung" as={NavLink}>
                    Balken Bewehrung
                  </Nav.Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
