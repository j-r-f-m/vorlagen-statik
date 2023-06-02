import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
// import Accordion from "react-bootstrap/Accordion";
// import ListGroup from "react-bootstrap/ListGroup";
import { AccordionComponent } from "../components/AccordionComponent";
import { FormNumberReinforcement } from "../components/FormNumberReinforcement";
export function BeamReinforcement() {
  return (
    <Container className="d-flex align-items-center justify-content-center flex-column mt-5">
      <h1>Balken Bewehrung</h1>
      <AccordionComponent />
      <h3 className="mt-4">Maximale Anzahl an Stäben </h3>
      <Image src="./imgs/stb-querschnitt.png" />
      <FormNumberReinforcement />
    </Container>
  );
}
