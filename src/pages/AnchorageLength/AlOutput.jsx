import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";

export function AlOutput(props) {
  // Das Bemessungsprotokoll soll erst nach einer ersten Berechnung sichtbar sein
  const AfterCalculation = () => {
    return (
      <ListGroup style={{ width: "100%" }} as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto d-flex">
            <MathJax>
              <div className="fw-bold">Randbedingungen</div>
              {"\\(f_{ck} \\)"}&nbsp;{"\\(= \\)"}&nbsp;
              {`\\(${props.data.fck}\\)`}&nbsp;{"\\(N/mm^{2}\\)"}
              &emsp;
              {"\\(f_{ctm} = \\)"}&nbsp;
              {`\\(${props.data.fctm}\\)`}&nbsp;{"\\(N/mm^{2}\\)"}
              &emsp;
              {"\\(f_{ctk;0,05} = \\)"}&nbsp;
              {`\\(${props.data.fctk005}\\)`}&nbsp;{"\\(N/mm^{2}\\)"}
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
              {`\\(${props.data.asErf}\\)`}&nbsp;{"\\(cm^{2}\\)"}&emsp;
              {"\\(A_{s,vorh} \\)"}&nbsp;
              {"\\(= \\)"}&nbsp;
              {`\\(${props.data.asVorh}\\)`}
              &nbsp;{"\\(cm^{2}\\)"}
              &emsp;
              {"\\(\\alpha_{a} \\)"}&nbsp;
              {"\\(= \\)"}&nbsp;
              {`\\(${props.data.alpha}\\)`}
              &emsp;
            </MathJax>
          </div>
        </ListGroup.Item>

        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto d-flex">
            {/* Verbundbedingung */}
            <MathJax>
              {"\\(Verbund:\\)"}
              &nbsp;
              {props.data.verbund === "guterVerbund"
                ? guterVerbundString
                : schlechterVerbundString}
              &emsp;
            </MathJax>

            {/* Stabart */}
            <MathJax>
              {"\\(Stabart:\\)"}
              &nbsp;
              {props.data.stab === "Zugstab" ? zugStabString : druckStabString}
              &emsp;
            </MathJax>

            {/* Lagerbedingung */}
            <MathJax>
              {"\\(Lagerung:\\)"}
              &nbsp;
              {props.data.lagerung === "direkt"
                ? lagerungDirektString
                : lagerungIndirektString}
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
              {`\\(${props.data.theta}\\)`}
              &nbsp;{"\\(mm\\)"}&emsp;
              {"\\(f_{yd} = \\)"}&nbsp;
              {`\\(${props.data.fyd}\\)`}
              &nbsp;{"\\(N/mm^{2}\\)"}&emsp;
              {"\\(f_{bd} = \\)"}&nbsp;
              {`\\(${props.data.fbd}\\)`}
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
              {`\\(\\frac{${props.data.theta}}{4} \\cdot \\frac{${props.data.fyd}}{${props.data.fbd}} = \\)`}
              &nbsp;{`\\(${props.data.lbrqd}\\)`}
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
              {`\\(l_{b,eq} = ${props.data.lbeq.lbeqFinal} \\)`}
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
              {`\\(${props.data.lbmin.lBminFinal}\\)`}
              &nbsp;{"\\(mm\\)"}&emsp;
              {/* {props.data.stab} */}
              {/* {props.data.stab === "Zugstab" ? <LbminZugRender /> : null} */}
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
              {`\\(${props.data.lbeqDir}\\)`}
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
              {`\\(${props.data.lbeqIndir}\\)`}
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
              }
            </MathJax>

            <LbeqFinalRender />
          </div>
        </ListGroup.Item>

        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start flex-column"
        >
          <div className="ms-2 me-auto">
            <LBminFinalRender />
          </div>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  const guterVerbundString = <>{"\\(Gut\\)"}&nbsp;</>;

  const schlechterVerbundString = <span>{"\\(Schlecht)"}&nbsp;</span>;

  const druckStabString = <span>{"\\(Druck\\)"}&nbsp;</span>;
  const zugStabString = <span>{"\\(Zug\\)"}&nbsp;</span>;

  const lagerungDirektString = <span>{"\\(Direkte\\)"}</span>;
  const lagerungIndirektString = <span>{"\\(Indirekte\\)"}</span>;

  const LbeqFinalRender = () => {
    if (props.data.lbeq.lbeqLeftTerm >= props.data.lbeq.lbeqRightTerm) {
      return (
        <MathJax className="mb-2">
          {`\\(l_{b,eq} = ${props.data.lbeq.lbeqLeftTerm}\\)`} &nbsp;
          {"\\(mm\\geq\\)"}&nbsp; {`\\(${props.data.lbeq.lbeqRightTerm}\\)`}
          &nbsp;
          {"\\(mm\\)"}
        </MathJax>
      );
    } else if (props.data.lbeq.lbeqLeftTerm < props.data.lbeq.lbeqRightTerm) {
      return (
        <>
          {/* <MathJax className="mb-2">{`\\(l_{b,eq} = ${props.data.lbeq.lbeqLeftTerm} mm < ${props.data.lbeq.lbeqRightTerm} \\)`}</MathJax> */}
          <MathJax className="mb-2">
            {`\\(l_{b,eq} = ${props.data.lbeq.lbeqLeftTerm}   \\)`}&nbsp;{" "}
            {"\\(mm<\\)"}&nbsp; {`\\(${props.data.lbeq.lbeqRightTerm}\\)`}&nbsp;
            {"\\(mm\\)"}
          </MathJax>
        </>
      );
    }
  };

  const LBminFinalRender = () => {
    if (
      props.data.stab === "Zugstab" &&
      props.data.lbmin.lBminLeftTerm >= props.data.lbmin.lBminRightTerm
    ) {
      return (
        <>
          <MathJax className="mb-2">
            {
              "\\(l_{b,min} \\geq max \\{ 0,3 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
            }
            &emsp; Bei Zugstäben
          </MathJax>
          <MathJax>
            {`\\(l_{b,min} = ${props.data.lbmin.lBminLeftTerm}\\)`} &nbsp;
            {"\\(mm\\geq\\)"}&nbsp; {`\\(${props.data.lbmin.lBminRightTerm}\\)`}
            &nbsp;
            {"\\(mm\\)"}
          </MathJax>
        </>
      );
    } else if (
      props.data.stab === "Zugstab" &&
      props.data.lbmin.lBminLeftTerm < props.data.lbmin.lBminRightTerm
    ) {
      return (
        <>
          <MathJax className="mb-2">
            {
              "\\(l_{b,min} \\geq max \\{ 0,3 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
            }
            &emsp; Bei Zugstäben
          </MathJax>
          <MathJax className="mb-2">
            {`\\(l_{b,min} = ${props.data.lbmin.lBminLeftTerm}   \\)`}&nbsp;{" "}
            {"\\(mm<\\)"}&nbsp; {`\\(${props.data.lbmin.lBminRightTerm}\\)`}
            &nbsp;
            {"\\(mm\\)"}
          </MathJax>
        </>
      );
    } else if (
      props.data.stab === "Druckstab" &&
      props.data.lbmin.lBminLeftTerm >= props.data.lbmin.lBminRightTerm
    ) {
      return (
        <>
          <MathJax className="mb-2">
            {
              "\\(l_{b,min} \\geq max \\{ 0,6 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
            }
            &emsp; Bei Druckstäben
          </MathJax>
          <MathJax>
            {`\\(l_{b,min} = ${props.data.lbmin.lBminLeftTerm}\\)`} &nbsp;
            {"\\(mm\\geq\\)"}&nbsp; {`\\(${props.data.lbmin.lBminRightTerm}\\)`}
            &nbsp;
            {"\\(mm\\)"}
          </MathJax>
        </>
      );
    } else if (
      props.data.stab === "Druckstab" &&
      props.data.lbmin.lBminLeftTerm < props.data.lbmin.lBminRightTerm
    ) {
      return (
        <>
          <MathJax className="mb-2">
            {
              "\\(l_{b,min} \\geq max \\{ 0,6 \\cdot l_{b,rqd}:10 \\cdot \\theta_{s} \\} \\)"
            }
            &emsp; Bei Druckstäben
          </MathJax>
          <MathJax>
            {`\\(l_{b,min} = ${props.data.lbmin.lBminLeftTerm}\\)`} &nbsp;
            {"\\(mm\\geq\\)"}&nbsp; {`\\(${props.data.lbmin.lBminRightTerm}\\)`}
            &nbsp;
            {"\\(mm\\)"}
          </MathJax>
        </>
      );
    }
  };

  return (
    <>
      <Accordion
        className="mt-3 mb-3"
        style={{ width: "100%" }}
        defaultActiveKey="0"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bemessungsprotokoll</Accordion.Header>
          <Accordion.Body className="d-flex align-items-center justify-content-center flex-column p-0">
            {props.data.calculated ? (
              <AfterCalculation />
            ) : (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="m-3 me-auto d-flex">
                  Keine Berechnungsergebnisse
                </div>
              </ListGroup.Item>
            )}
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
