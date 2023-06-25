import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";

export function ImgAccordion() {
  return (
    <Accordion className="mt-3" style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Verankerungsarten</Accordion.Header>
        <Accordion.Body className="d-flex justify-content-center">
          <Image
            // style={{ maxWidth: "50rem" }}
            fluid
            src="./imgs/verankerungsarten.png"
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
