import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";

export function AlOutput(props) {
  return (
    <>
      <Accordion className="mt-3 mb-3" style={{ width: "100%" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bemessungsprotokoll</Accordion.Header>
          <Accordion.Body className="d-flex align-items-center justify-content-center flex-column p-0">
            <ListGroup style={{ width: "100%" }} as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto d-flex">
                  <MathJax>
                    <div className="fw-bold">Randbedingungen</div>
                    {"\\(f_{ck} \\)"}&nbsp;{"\\(= \\)"}&nbsp;
                    {props.data.fck}
                    &nbsp;{"\\(N/mm²\\)"}&emsp;
                    {"\\(f_{ctm} = \\)"}&nbsp;
                    {props.data.fctm}
                    &nbsp;{"\\(N/mm²\\)"}&emsp;
                    {"\\(f_{ctk;0,05} = \\)"}&nbsp;
                    {props.data.fctk005}
                    &nbsp;{"\\(N/mm²\\)"}&emsp;
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto d-flex">
                  <MathJax>
                    {"\\(Verbundbedingung:\\)"}
                    &nbsp;
                    {props.data.verbund} {"\\(,\\)"}&emsp;
                    {"\\(\\alpha_{a} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {props.data.alpha}
                    &emsp;
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <MathJax>
                    <div className="fw-bold">Zwischenergebnisse</div>
                    {"\\(\\theta = \\)"}&nbsp;
                    {props.data.theta}
                    &nbsp;{"\\(mm\\)"}&emsp;
                    {"\\(f_{yd} = \\)"}&nbsp;
                    {props.data.fyd}
                    &nbsp;{"\\(N/mm²\\)"}&emsp;
                    {"\\(f_{bd} = \\)"}&nbsp;
                    {props.data.fbd}
                    &nbsp;{"\\(N/mm²\\)"}
                  </MathJax>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <MathJax>
                    {"\\(l_{b,rqd} = \\)"}&nbsp;
                    {props.data.lbrqd}
                    &nbsp;{"\\(mm\\)"}&emsp;
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
                  <MathJax>
                    {`\\(n=Ganzzahl \\left[ \\frac{b \\ - \\ c_{nom,a} \\ - \\ c_{nom,i} \\ - \\ 2 \\ \\cdot \\ \\theta_{Bü} \\ - \\ (1-\\frac{1}{\\sqrt{2}}) \\cdot D_{Bü}\\ - \\ \\frac{1}{\\sqrt{2}} \\cdot \\ \\theta \\ - \\ \\theta \\ - \\ s_{min} }{\\theta \\ + \\ s_{min}}  \\right] \\ + \\ 2 =  \\)`}
                    {/* &nbsp; {props.data.data.dMin} */}
                  </MathJax>
                </div>
                <div className="mt-2">
                  {/* <MathJax hideUntilTypeset={"first"} inline dynamic>
                    <mrow>
                      <mi>x</mi>
                      <mo>=</mo>
                      <mi>{props.data.data.n}</mi>
                    </mrow>
                  </MathJax> */}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

AlOutput.propTypes = {
  data: PropTypes.object,
  fck: PropTypes.number,
  verbund: PropTypes.string,
};
