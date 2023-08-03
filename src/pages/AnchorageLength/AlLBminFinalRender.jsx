import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";

export function LBminFinalRender(props) {
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
}

LBminFinalRender.propTypes = {
  data: PropTypes.object,
  fck: PropTypes.number,
  verbund: PropTypes.string,
};
