import Container from "react-bootstrap/Container";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { BrGeneralInfo } from "./BrGeneralInfo";
import { BrCalculationInfo } from "./BrCalculationInfo";
import { BrForm } from "./BrForm";
import { BrOutput } from "./BrOutput";

export function BeamReinforcement() {
  const [data, setData] = useState({
    data: {
      b: 0,
      cNomA: 0,
      cNomI: 0,
      thetaBügel: 0,
      theta: 0,
      n: 0,
      dMin: 0,
      sMin: 0,
    },
  });

  /**
   * Set state for maxNumBars
   * @param {number} iptB Width of Beam in cm
   * @param {number} iptCnomA Betondeckung Außen in cm
   * @param {number} iptCnomI Betondeckung Innen in cm
   * @param {number} iptThetaBügel Durchmesser Bügel in cm
   * @param {number} iptTheta Durchmesser Längsstab in cm
   */
  const setDataChild = (
    iptB,
    iptCnomA,
    iptCnomI,
    iptThetaBügel,
    iptTheta,
    calcN,
    calcDmin,
    calcSmin
  ) => {
    setData({
      ...data,
      data: {
        b: iptB,
        cNomA: iptCnomA,
        cNomI: iptCnomI,
        thetaBügel: iptThetaBügel,
        theta: iptTheta,
        n: calcN,
        dMin: calcDmin,
        sMin: calcSmin,
      },
    });
  };

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
      <BrForm setDataChild={setDataChild} data={data} />
      <BrOutput data={data} />
    </Container>
  );
}
