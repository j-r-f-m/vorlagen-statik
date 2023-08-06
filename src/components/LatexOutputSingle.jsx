import { MathJax } from "better-react-mathjax";
import { PropTypes } from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

/**
 * Display the calculation result with latex
 * @param {string} name Name of Variable
 * @param {string} data calculated Number
 * @param {string} unit unit of calculation
 * @param {string} title title of section
 * @returns string formatted with latex
 */
export function LatexOuputSingle(props) {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start flex-column"
    >
      {/* display title if there is one */}
      {props.title ? (
        <div className="fw-bold ms-2 me-auto">{props.title}</div>
      ) : null}
      <div className="ms-2 me-auto">
        <MathJax className="mb-2">
          {props.name}&nbsp;{props.data}&nbsp;{props.unit}&emsp;
        </MathJax>
      </div>
    </ListGroup.Item>
  );
}

LatexOuputSingle.propTypes = {
  name: PropTypes.string,
  data: PropTypes.string,
  unit: PropTypes.string,
  title: PropTypes.string,
};
