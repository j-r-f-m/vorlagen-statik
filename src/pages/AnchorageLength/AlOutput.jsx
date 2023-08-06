import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";
import { LBminFinalRender } from "./AlLBminFinalRender";
import { LbeqFinalRender } from "./AlLbeqFinalRender";
import { LbeqDirFinalRender } from "./AlLbeqDirFinalRender";
import { LatexOuputSingle } from "../../components/LatexOutputSingle";

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

        <LatexOuputSingle
          name={"\\(l_{b,eq} = \\)"}
          data={`\\(${props.data.lbeq.lbeqFinal}\\)`}
          unit={"\\(mm\\)"}
          title="Verankerunglängen"
        />

        <LatexOuputSingle
          name={"\\(l_{b,min} = \\)"}
          data={`\\(${props.data.lbmin.lBminFinal}\\)`}
          unit={"\\(mm\\)"}
        />

        <LatexOuputSingle
          name={"\\(l_{b,eq,dir} = \\)"}
          data={`\\(${props.data.lbeqDir.lbeqDirFinal}\\)`}
          unit={"\\(mm\\)"}
        />

        <LatexOuputSingle
          name={"\\(l_{b,eq,indir} = \\)"}
          data={`\\(${props.data.lbeqIndir}\\)`}
          unit={"\\(mm\\)"}
        />

        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start flex-column"
        >
          <div className="fw-bold ms-2 me-auto">Nachweis</div>
          <div className="ms-2 me-auto">
            <LBminFinalRender data={props.data} />
          </div>
        </ListGroup.Item>

        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start flex-column"
        >
          <div className="ms-2  me-auto">
            <MathJax className="mb-2">
              {
                "\\(l_{b,eq} = \\alpha_{a} \\cdot l_{b,rqd} \\cdot \\frac{A_{s,erf}}{A_{s,vorh}} 	\\geq l_{b,min}\\)"
              }
            </MathJax>

            <LbeqFinalRender data={props.data} />
          </div>
        </ListGroup.Item>

        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start flex-column"
        >
          <div className="ms-2 me-auto">
            <MathJax className="mb-2">
              {
                "\\(l_{b,eq,dir} = 2/3 \\cdot l_{b,eq} \\geq 6,7 \\cdot \\theta \\)"
              }
            </MathJax>
            <LbeqDirFinalRender data={props.data} />
          </div>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  const guterVerbundString = <>{"\\(Gut\\)"}&nbsp;</>;

  const schlechterVerbundString = <span>{"\\(Schlecht\\)"}&nbsp;</span>;

  const druckStabString = <span>{"\\(Druck\\)"}&nbsp;</span>;
  const zugStabString = <span>{"\\(Zug\\)"}&nbsp;</span>;

  const lagerungDirektString = <span>{"\\(Direkte\\)"}</span>;
  const lagerungIndirektString = <span>{"\\(Indirekte\\)"}</span>;

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
