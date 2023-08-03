import { PropTypes } from "prop-types";
import { MathJax } from "better-react-mathjax";

export function LbeqFinalRender(props) {
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
}

LbeqFinalRender.propTypes = {
  data: PropTypes.object,
  fck: PropTypes.number,
  verbund: PropTypes.string,
};
