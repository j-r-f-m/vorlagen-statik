import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { FormNumberReinforcement } from "../../components/FormNumberReinforcement";
import { BrGeneralInfo } from "./BrGeneralInfo";
import { BrCalculationInfo } from "./BrCalculationInfo";

export function BeamReinforcement() {
  return (
    <Container className="d-flex align-items-center justify-content-center flex-column mt-5">
      <h1>Balken Bewehrung</h1>
      <BrGeneralInfo />
      <h3 className="mt-4">Maximale Anzahl an Stäben </h3>
      <Image
        style={{ maxWidth: "55rem" }}
        src="./imgs/stb-querschnitt-stäbe.png"
      />
      <BrCalculationInfo />

      <FormNumberReinforcement />
    </Container>
  );
}
