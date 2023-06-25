import Container from "react-bootstrap/Container";
import { AlGeneralInfo } from "./AlGeneralInfo";
import { AlCalculationInfo } from "./AlCalculationInfo";
import { AlForm } from "./AlForm";
import { ImgAccordion } from "../../components/ImgAccordion";
import { AlOutput } from "./AlOutput";
import { AlFlow } from "./AlFlow";

export function AnchorageLength() {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Ersatzverankerungslänge</h1>
        <AlGeneralInfo />
        <AlCalculationInfo />
        <AlFlow />
        <ImgAccordion imgLink={"verankerungsarten.png"} />
        <AlForm />
        <AlOutput />
      </Container>
    </>
  );
}
