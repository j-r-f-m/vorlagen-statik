import { PropTypes } from "prop-types";
import { MathJax } from "better-react-mathjax";

export function LbeqDirFinalRender(props) {
  if (
    props.data.lbeqDir.lbeqDirLeftTerm >= props.data.lbeqDir.lbeqDirRightTerm
  ) {
    return (
      <MathJax className="mb-2">
        {`\\(l_{b,eq,dir} = ${props.data.lbeqDir.lbeqDirLeftTerm}\\)`} &nbsp;
        {"\\(mm\\geq\\)"}&nbsp; {`\\(${props.data.lbeqDir.lbeqDirRightTerm}\\)`}
        &nbsp;
        {"\\(mm\\)"}
      </MathJax>
    );
  } else if (
    props.data.lbeqDir.lbeqDirLeftTerm < props.data.lbeqDir.lbeqDirRightTerm
  ) {
    return (
      <MathJax className="mb-2">
        {`\\(l_{b,eq,dir} = ${props.data.lbeqDir.lbeqDirLeftTerm}   \\)`}&nbsp;{" "}
        {"\\(mm<\\)"}&nbsp; {`\\(${props.data.lbeqDir.lbeqDirRightTerm}\\)`}
        &nbsp;
        {"\\(mm\\)"}
      </MathJax>
    );
  }
}

LbeqDirFinalRender.propTypes = {
  data: PropTypes.object,
  fck: PropTypes.number,
  verbund: PropTypes.string,
};
