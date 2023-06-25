import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import ReactFlow from "reactflow";
import { MathJax } from "better-react-mathjax";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Verankerungslänge" },
  },
  {
    id: "2",
    position: { x: 0, y: 60 },
    data: { label: <MathJax>{"\\(l_{b,eq} \\)"}</MathJax> },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function AlFlow() {
  return (
    <Accordion className="mt-3" style={{ width: "100%" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Flowchart</Accordion.Header>
        <Accordion.Body className="p-0">
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div
                className="ms-2 me-auto"
                style={{ width: "100%", height: "10rem" }}
              >
                <ReactFlow nodes={initialNodes} edges={initialEdges} />
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
