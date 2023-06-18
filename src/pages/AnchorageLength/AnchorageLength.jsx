import Container from "react-bootstrap/Container";
import { AlGeneralInfo } from "./AlGeneralInfo";
import { AlCalculationInfo } from "./AlCalculationInfo";

export function AnchorageLength() {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Ersatzverankerungslänge</h1>
        <AlGeneralInfo />
        <AlCalculationInfo />
      </Container>
    </>
  );
}
