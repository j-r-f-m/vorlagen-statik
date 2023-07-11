import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";

export function AlOutput(props) {
  // Nachweis lbeq >= lbmin
  // const nachweisLbeq = `\\(l_{b,eq} = ${props.data.alpha} \\cdot ${props.data.lbrqd} \\cdot \\frac{${props.data.asErf}}{${props.data.asVorh}} 	\\geq ${props.data.lbmin} = l_{b,min}\\)`;

  // function Nachweis(bigger) {
  //   if (bigger) {
  //     return `\\(l_{b,eq} = ${props.data.alpha} \\cdot ${props.data.lbrqd} \\cdot \\frac{${props.data.asErf}}{${props.data.asVorh}} 	\\geq ${props.data.lbmin} = l_{b,min}\\)`;
  //   } else {
  //     `\\(l_{b,eq} = ${props.data.alpha} \\cdot ${props.data.lbrqd} \\cdot \\frac{${props.data.asErf}}{${props.data.asVorh}} 	asdasdfasdf ${props.data.lbmin} = l_{b,min}\\)`;
  //   }
  // }

  // const checkLbeq = () => {
  //   if (props.data.lbeq >= props.data.lbmin) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
                    {"\\(A_{s,erf}=\\)"}
                    &nbsp;
                    {props.data.asErf}&emsp;
                    {"\\(A_{s,vorh} \\)"}&nbsp;
                    {"\\(= \\)"}&nbsp;
                    {props.data.asVorh}
                    &emsp;
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
                    {props.data.verbund}&emsp;
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
                  <div className="fw-bold">Verankerungslängen</div>
                  <MathJax>
                    {"\\(l_{b,eq} = \\)"}&nbsp;
                    {props.data.lbeq}
                    &nbsp;{"\\(mm\\)"}&emsp;
                  </MathJax>
                </div>
                <div className="mt-2"></div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start flex-column"
              >
                <div className="ms-2 me-auto">
                  <MathJax>
                    {"\\(l_{b,min} = \\)"}&nbsp;
                    {props.data.lbmin}
                    &nbsp;{"\\(mm\\)"}&emsp;
                    {props.data.stab}
                  </MathJax>
                </div>
                <div className="mt-2"></div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start flex-column"
              >
                <div className="ms-2 me-auto">
                  <MathJax>
                    {"\\(l_{b,eq,dir} = \\)"}&nbsp;
                    {props.data.lbeqDir}
                    &nbsp;{"\\(mm\\)"}&emsp;
                  </MathJax>
                </div>
                <div className="mt-2"></div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start flex-column"
              >
                <div className="ms-2 me-auto">
                  <MathJax>
                    {"\\(l_{b,eq,indir} = \\)"}&nbsp;
                    {props.data.lbeqIndir}
                    &nbsp;{"\\(mm\\)"}&emsp;
                  </MathJax>
                </div>
                <div className="mt-2"></div>
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start flex-column"
              >
                <div className="ms-2  me-auto">
                  <div className="fw-bold">Nachweis</div>

                  <MathJax className="mb-2">
                    {
                      "\\(l_{b,eq} = \\alpha_{a} \\cdot l_{b,rqd} \\cdot \\frac{A_{s,erf}}{A_{s,vorh}} 	\\geq l_{b,min}\\)"
                    }{" "}
                  </MathJax>
                  <MathJax>
                    {/* check if calculation run for at least one time 
                    if calculation ran for one time call the Nachweis component
                    if calculation did not run do show anything*/}
                    {/* {props.data.calculated ? (
                      <Nachweis isBigger={checkLbeq} />
                    ) : null}*/}
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

AlOutput.propTypes = {
  data: PropTypes.object,
  fck: PropTypes.number,
  verbund: PropTypes.string,
};
