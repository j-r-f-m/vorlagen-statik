import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";

export function BrCalculationInfo() {
  return (
    <Accordion style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Berechnungsansatz</Accordion.Header>
        <Accordion.Body className="d-flex align-items-center justify-content-center flex-column p-0">
          <ListGroup style={{ width: "100%" }} as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                Hinweis: Randabstände liegen im Scheitel der Biegung des Bügels
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax>
                  {"\\(\\theta \\)"} &emsp; Durchmesser Längsstab
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax>
                  {"\\(\\theta_{Bü} \\)"} &emsp; Durchmesser Bügel
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  <MathJax>
                    {"\\(D_{Bü} \\)"} &emsp; Biegerollendurchmesser Bügel
                  </MathJax>
                </div>

                <MathJax>
                  mit &nbsp;
                  {
                    "\\(\\theta_{Bü}<20 \\ mm  : D_{Bü}=4\\cdot\\theta_{Bü} \\ sonst \\ D_{Bü}=7\\cdot\\theta_{Bü}\\)"
                  }
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  <MathJax>
                    {"\\(s_{min} \\)"} &emsp;Mindest-Längsstababstand
                  </MathJax>
                </div>

                <MathJax>
                  mit &nbsp;
                  {
                    "\\(\\theta_{min}<20 \\ mm  : s_{min}=20 \\ mm \\ sonst \\ s_{min}=\\theta\\)"
                  }
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax>
                  {"\\(c_{nom,a} \\)"} &emsp; Betondeckung außen
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax>
                  {"\\(c_{nom,i} \\)"} &emsp; Betondeckung innen
                </MathJax>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
