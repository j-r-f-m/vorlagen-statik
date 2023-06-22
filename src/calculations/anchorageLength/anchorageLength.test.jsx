import { describe, it, expect } from "vitest";
import {
  round1decimal,
  round2decimalStr,
  round3decimalStr,
  fctm,
  fctk005,
  fctmSmaller50,
  fctmBigger50,
  fyd,
  fbdGuterVerbund,
  fbdMaessigerVerbund,
  l_brqd_guterVerbund,
} from "./anchorageLength";

describe("Mittelwert der Zugfestigkeit", () => {
  it("fctm für C12/15 - C100/115", () => {
    const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
    const notRoundedFctms = fcks.map(fctm);
    const roundedFctm = notRoundedFctms.map(round1decimal);
    // console.log(roundedFctm);
    expect(roundedFctm).toEqual([
      1.6, 1.9, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2,
    ]);
  });
});

describe("f_bd Bemessungswert der Verbundspannung", () => {
  it("f_bd gute Verbundbedingung", () => {
    const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
    const notRoundedFbd = fcks.map(fbdGuterVerbund);

    const roundedFbd = notRoundedFbd.map(round3decimalStr);

    expect(roundedFbd).toEqual([
      1.65, 2.0, 2.32, 2.69, 3.04, 3.37, 3.68, 3.99, 4.28, 4.43, 4.57, 4.57,
      4.57, 4.57, 4.57,
    ]);
  });

  it("f_bd mässige Verbundbedingung", () => {
    const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
    const notRoundedFbd = fcks.map(fbdMaessigerVerbund);

    const roundedFbd = notRoundedFbd.map(round3decimalStr);

    expect(roundedFbd).toEqual([
      1.16, 1.4, 1.62, 1.89, 2.13, 2.36, 2.58, 2.79, 2.99, 3.1, 3.2, 3.2, 3.2,
      3.2, 3.2,
    ]);
  });

  it("Bemessungswert der Streckgrenz - N/mm²", () => {
    const fyk = 500; // N/mm²
    const gamma_s = 1.15;
    const currFyd = fyd(fyk, gamma_s);
    const roundedCurrFyd = round3decimalStr(currFyd);
    console.log(roundedCurrFyd);
    expect(roundedCurrFyd).toBe(435);
  });
});

describe("Grundwert der Verankerungslänge", () => {
  it("l_brqd guter Verbund", () => {
    const test = (fck) => {
      const currTheta = 12; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const l_brqd = l_brqd_guterVerbund(currTheta, currFyd, currFbd);
      return l_brqd;
    };

    const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
    const currLbrqd = fcks.map(test);
    console.log(currLbrqd);
    const roundedCurrLbrqd = currLbrqd.map(round2decimalStr);
    console.log(roundedCurrLbrqd);
    expect(roundedCurrLbrqd).toEqual([
      790, 650, 560, 480, 430, 390, 350, 330, 310, 290, 290, 290, 290, 290, 290,
    ]);
  });
});

// fctk konnte nicht abschließend getestet werden. Es runden ist problemeatisch
// describe("5 % Quantil der Zugfestigkeit", () => {
//   it("fctk für C12/15 - C100/115", () => {
//     // um die richtigen ergebnisse zu bekommen müssen alle formeln berechnet
//     // es darf nicht mit gerundeten Werten direkt fctk005 berechnet werden
//     // const fctm = [
//     //   1.6, 1.9, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2,
//     // ];

//     const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
//     const notRoundedFctms = fcks.map(fctm);
//     console.log(notRoundedFctms);
//     const notRoundedFctk005 = notRoundedFctms.map(fctk005);
//     console.log(notRoundedFctk005);

//     const roundedFctk005_1 = notRoundedFctk005.map(round3decimalStr);
//     console.log(roundedFctk005_1);

//     // const round_2_Fctk005_2 = roundedFctk005_1.map(round2decimalStr);
//     // console.log(round_2_Fctk005_2);

//     expect(roundedFctk005_1).toEqual([
//       1.1, 1.3, 1.5, 1.8, 2, 2.2, 2.5, 2.7, 2.9, 3, 3.1, 3.2, 3.4, 3.5, 3.7,
//     ]);
//   });
// });
