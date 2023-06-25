import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";

export function ImgAccordion(props) {
  // const imageLink = "./imgs/verankerungsarten.png";
  const imageLink = props.imgLink;
  const heading = props.heading;
  return (
    <Accordion className="mt-3" style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{heading}</Accordion.Header>
        <Accordion.Body className="d-flex justify-content-center">
          <Image fluid src={imageLink} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
