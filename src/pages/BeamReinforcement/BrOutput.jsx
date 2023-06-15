import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";

export function BrOutput(props) {
  console.log(props.data.data.b);
  return (
    <>
      <Accordion className="mt-5 mb-3" style={{ width: "100%" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bemessungsprotokoll</Accordion.Header>
          <Accordion.Body className="d-flex align-items-center justify-content-center flex-column p-0">
            <ListGroup style={{ width: "100%" }} as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto d-flex">
                  <MathJax hideUntilTypeset={"first"} inline dynamic>
                    <div className="fw-bold">Randbedingungen</div>
                    {"\\(b \\)"}&nbsp;{"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.b} \\)`}
                    &nbsp;{"\\(cm,\\)"}&emsp;{"\\(c_{nom,a} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.b} \\)`}
                    &nbsp;{"\\(cm,\\)"} &emsp;{"\\(c_{nom,i} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.b} \\)`}
                    &nbsp;{"\\(cm,\\)"}&nbsp;
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto d-flex">
                  {props.data.data.b}
                  <MathJax hideUntilTypeset={"first"} inline dynamic>
                    {"\\(\\theta_{Bü} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.b} \\)`}
                    &nbsp;{"\\(cm,\\)"}&emsp;
                    {"\\(\\theta \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.b} \\)`}
                    &nbsp;{"\\(cm,\\)"}
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <MathJax hideUntilTypeset={"first"} inline dynamic>
                    <div className="fw-bold">Zwischenergebnisse</div>
                    {"\\(D_{Bü} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.dMin} \\)`}
                    &nbsp;{"\\(cm,\\)"}&emsp;
                    {"\\(s_{min} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {`\\(${props.data.data.sMin} \\)`}
                    &nbsp;{"\\(cm,\\)"}
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start flex-column"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Berechnung der maximalen Zahl &rdquo;n&rdquo; der Stäbe imr
                    Balkenquerschnitt
                  </div>
                  <MathJax
                    className="fw-bold"
                    hideUntilTypeset={"first"}
                    inline
                    dynamic
                  >
                    {`\\(n=Ganzzahl \\left[ \\frac{b \\ - \\ c_{nom,a} \\ - \\ c_{nom,i} \\ - \\ 2 \\ \\cdot \\ \\theta_{Bü} \\ - \\ (1-\\frac{1}{\\sqrt{2}}) \\cdot D_{Bü}\\ - \\ \\frac{1}{\\sqrt{2}} \\cdot \\ \\theta \\ - \\ \\theta \\ - \\ s_{min} }{\\theta \\ + \\ s_{min}}  \\right] \\ + \\ 2  \\)`}
                  </MathJax>
                </div>
                <div className="mt-2">
                  <MathJax
                    className="fw-bold"
                    hideUntilTypeset={"first"}
                    inline
                    dynamic
                  >
                    {`\\(n=Ganzzahl \\left[ \\frac{${props.data.data.b} \\ - \\ ${props.data.data.cNomA} \\ - \\ ${props.data.data.cNomI} \\ - \\ 2 \\ \\cdot \\ ${props.data.data.thetaBügel} \\ - \\ (1-\\frac{1}{\\sqrt{2}}) \\cdot \\ ${props.data.data.dMin} \\ - \\ \\frac{1}{\\sqrt{2}} \\cdot \\ \\ ${props.data.data.theta} \\ - \\ ${props.data.data.theta}  \\ - \\ ${props.data.data.theta} }{\\ ${props.data.data.theta} \\ + \\ ${props.data.data.theta}}  \\right] \\ + \\ 2  \\)`}{" "}
                    &nbsp;
                    {`\\(= \\)`} {`\\(${props.data.data.n} \\)`}
                  </MathJax>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
