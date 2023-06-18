import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";

export function AlCalculationInfo() {
  return (
    <Accordion className="mt-3" style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Berechnungsansatz</Accordion.Header>
        <Accordion.Body className="d-flex align-items-center justify-content-center flex-column p-0">
          <ListGroup style={{ width: "100%" }} as="ol">
            {/* Ersatzverankerungslänge */}
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Ersatzverankerungslänge</div>
                <MathJax>
                  {
                    "\\(l_{b,eq} = \\alpha_{a} \\cdot l_{b,rqd} \\cdot \\frac{A_{s,erf}}{A_{s,vorh}} 	\\geq l_{b,min}\\)"
                  }{" "}
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(l_{b,eq} \\)"}</div>
                  <div>
                    Ersatzverankerungslänge (ist dem Bemessungswert{" "}
                    {"\\(l_{bd}\\)"} äquivalent)
                  </div>
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(\\alpha_{a} \\)"}</div>
                  <div>Beiwert zur Berücksichtigung der Verankerungsart</div>
                </MathJax>
              </div>
            </ListGroup.Item>

            {/* grundwert der verankerungslänge */}
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  <div className="fw-bold">Grundwert der Verankerungslänge</div>
                  <MathJax>
                    {
                      "\\(l_{b,rqd} = \\frac{\\theta_{s}}{4}  \\cdot \\frac{f_{yd}}{f_{bd}}\\)"
                    }
                  </MathJax>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(l_{b,rqd} \\)"}</div>
                  <div>
                    Grundwert der Verankerungslänge <br />
                  </div>
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(\\theta_{s} \\)"}</div>
                  <div>
                    Stabdurchmesser <br />
                  </div>
                </MathJax>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(f_{yd} \\)"}</div>
                  <div>
                    Bemessungswert der Streckgrenzee <br />
                  </div>
                </MathJax>
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <MathJax className="d-flex">
                  <div style={{ width: "3rem" }}>{"\\(f_{bd} \\)"}</div>
                  <div>
                    Grundwert der Verbundspannung <br />
                  </div>
                </MathJax>
              </div>
            </ListGroup.Item>

            {/* Mindestverankerungslänge */}
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Mindestverankerungslänge</div>
                <MathJax>
                  {
                    "\\(l_{b,min} \\geq max \\{ 0,3 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
                  }
                  &emsp; Bei Zugstäben
                </MathJax>
                <MathJax>
                  {
                    "\\(l_{b,min} \\geq max \\{ 0,6 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
                  }{" "}
                  &emsp;Bei Druckstäben
                </MathJax>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
