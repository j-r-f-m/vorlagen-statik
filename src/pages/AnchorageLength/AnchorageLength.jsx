import Container from "react-bootstrap/Container";
import { useState } from "react";
import { AlGeneralInfo } from "./AlGeneralInfo";
import { AlCalculationInfo } from "./AlCalculationInfo";
import { AlForm } from "./AlForm";
import { ImgAccordion } from "../../components/ImgAccordion";
import { AlOutput } from "./AlOutput";

export function AnchorageLength() {
  const [data, setData] = useState({
    data: {
      name: "",
      fck: 0,
      fctk005: 0,
      fctm: 0,
      verbund: "",
      fbd: 0,
      fyd: 0,
      lbrqd: 0,
      lbeq: 0,
      lagerung: "",
      stab: "",
    },
  });
  /**
   * set state from child component
   * @param {string} iptName name of calculation
   * @param {number} iptFck Festigkeitsklasse
   * @param {number} iptFctk005 5 % Quantil der Zugfestigkeit
   * @param {number} iptFctm Mittelwert der Zugfestigkeit
   * @param {string} iptVerbund Verbundbedingung
   * @param {number} iptFbd Bemessungswert der Verbundspannung
   * @param {number} iptFyd Bemessungswert der Streckgrenze
   * @param {number} iptLbrqd Grundwert der Verankeungslänge
   * @param {number} iptLbeq Erstazverankerungslänge
   * @param {string} iptLagerung Lagerungsart
   * @param {string} iptStab Stabart (Druck- oder Zugstab)
   */
  const setDataChild = (
    iptName,
    iptFck,
    iptFctk005,
    iptFctm,
    iptVerbund,
    iptFbd,
    iptFyd,
    iptLbrqd,
    iptLbeq,
    iptLagerung,
    iptStab
  ) => {
    setData({
      ...data,
      data: {
        name: iptName,
        fck: iptFck,
        fctk005: iptFctk005,
        fctm: iptFctm,
        verbund: iptVerbund,
        fbd: iptFbd,
        fyd: iptFyd,
        lbrqd: iptLbrqd,
        lbeq: iptLbeq,
        lagerung: iptLagerung,
        stab: iptStab,
      },
    });
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Ersatzverankerungslänge</h1>
        <AlGeneralInfo />
        <AlCalculationInfo />
        <ImgAccordion
          imgLink="./imgs/verankerungsarten.png"
          heading="Verankerungsarten"
        />
        <ImgAccordion
          imgLink="./imgs/verbundbereich.png"
          heading="Verbundbedingung"
        />
        <AlForm setDataChild={setDataChild} />
        <AlOutput data={data} />
      </Container>
    </>
  );
}
