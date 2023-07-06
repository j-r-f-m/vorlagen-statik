import { describe, it, expect } from "vitest";
import { round } from "mathjs";
import {
  roundWhole,
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
  fbd,
  lbrqd,
  lbeq,
  lBminZug,
  lBminDruck,
  calculateAl,
} from "./anchorageLength";

describe.skip("Mittelwert der Zugfestigkeit", () => {
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
  // test wurde angepasst
  it("f_bd guter Bemessungswert der Verbundspannung ALT", () => {
    const fckArr = [
      12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100,
    ];
    const eta1 = 1;
    const gammaC = 1.5;

    const notRoundedfctmArr = fckArr.map(fctm);
    const notRoundedFctk005 = notRoundedfctmArr.map(fctk005);

    /**
     * using an annonymous function to use map with a callback function that has
     * more than one argument
     */
    const notRoundedFbd = notRoundedFctk005.map(function (x) {
      return fbdGuterVerbund(x, eta1, gammaC);
    });

    const roundedFbd = notRoundedFbd.map(round3decimalStr);

    expect(roundedFbd).toEqual([
      1.65, 2.0, 2.32, 2.69, 3.04, 3.37, 3.68, 3.99, 4.28, 4.43, 4.57, 4.57,
      4.57, 4.57, 4.57,
    ]);
  });

  it("f_bd mässige Verbundbedingung", () => {
    const fckArr = [
      12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100,
    ];
    const eta1 = 0.7;
    const gammaC = 1.5;

    const notRoundedfctmArr = fckArr.map(fctm);
    const notRoundedFctk005 = notRoundedfctmArr.map(fctk005);

    const notRoundedFbd = notRoundedFctk005.map(function (x) {
      return fbdMaessigerVerbund(x, eta1, gammaC);
    });

    const roundedFbd = notRoundedFbd.map(round3decimalStr);

    expect(roundedFbd).toEqual([
      1.16, 1.4, 1.62, 1.89, 2.13, 2.36, 2.58, 2.79, 2.99, 3.1, 3.2, 3.2, 3.2,
      3.2, 3.2,
    ]);
  });

  /**
   * Entscheidungfunktion für fbd je nach Verbundbedingung
   */
  it("fbd Entscheidungsfunktion guter Verbund", () => {
    //inputs
    const currFctm = fctm(30);
    const currFctk005 = fctk005(currFctm);

    const gammaC = 1.5;
    const currVerbund = "guterVerbund";

    const currFbd = fbd(currFctk005, gammaC, currVerbund);
    const roundFbd = round3decimalStr(currFbd);
    expect(roundFbd).toBe(3.04);
  });

  it("fbd Entscheidungsfunktion schlechter Verbund", () => {
    const currFctm = fctm(30);
    const currFctk005 = fctk005(currFctm);
    const gammaC = 1.5;
    const currVerbund = "schlechterVerbund";
    const currFbd = fbd(currFctk005, gammaC, currVerbund);
    const roundFbd = round3decimalStr(currFbd);

    expect(roundFbd).toBe(2.13);
  });

  // /**
  //  * Bemessungswert der Streckgrenze
  //  */
  // it("Bemessungswert der Streckgrenz - N/mm²", () => {
  //   const fyk = 500; // N/mm²
  //   const gamma_s = 1.15;
  //   const currFyd = fyd(fyk, gamma_s);
  //   const roundedCurrFyd = round3decimalStr(currFyd);

  //   expect(roundedCurrFyd).toBe(435);
  // });
});

/**
 * Tests für die Berechnung des Grundwerts der Verankerungslänge für
 *  C12/15 - C50/60 in Abhängigkeit von
 *
 */
describe.skip("Grundwert der Verankerungslänge", () => {
  it("l_brqd guter Verbund C12/15", () => {
    const test = (theta) => {
      const fck = 12; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      // lbrqd wird in mm berechnet
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    console.log(currLbrqd);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    console.log(roundedCurrLbrqd);
    expect(roundedCurrLbrqd).toEqual([40, 53, 66, 79, 92, 105, 132, 165, 184]);
  });

  it("l_brqd mässiger Verbund C12/15", () => {
    const test = (theta) => {
      const fck = 12; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([
      56, 75, 94, 113, 132, 150, 188, 235, 263,
    ]);
  });

  it("l_brqd guter Verbund C16/20", () => {
    const test = (theta) => {
      const fck = 16; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([33, 43, 54, 65, 76, 87, 109, 136, 152]);
  });

  it("l_brqd mässiger Verbund C16/20", () => {
    const test = (theta) => {
      const fck = 16; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([47, 62, 78, 93, 109, 124, 155, 194, 217]);
  });

  it("l_brqd guter Verbund C20/25", () => {
    const test = (theta) => {
      const fck = 20; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([28, 37, 47, 56, 66, 75, 94, 117, 131]);
  });

  it("l_brqd mässiger Verbund C20/25", () => {
    const test = (theta) => {
      const fck = 20; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([40, 54, 67, 80, 94, 107, 134, 167, 187]);
  });

  it("l_brqd guter Verbund C25/30", () => {
    const test = (theta) => {
      const fck = 25; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([24, 32, 40, 48, 57, 65, 81, 101, 113]);
  });

  it("l_brqd mässiger Verbund C25/30", () => {
    const test = (theta) => {
      const fck = 25; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([35, 46, 58, 69, 81, 92, 115, 144, 161]);
  });

  it("l_brqd guter Verbund C30/37", () => {
    const test = (theta) => {
      const fck = 30; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([21, 29, 36, 43, 50, 57, 71, 89, 100]);
  });

  it("l_brqd mässiger Verbund C30/37", () => {
    const test = (theta) => {
      const fck = 30; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([31, 41, 51, 61, 71, 82, 102, 128, 143]);
  });

  it("l_brqd guter Verbund C35/45", () => {
    const test = (theta) => {
      const fck = 35; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([19, 26, 32, 39, 45, 52, 64, 81, 90]);
  });

  it("l_brqd mässiger Verbund C35/45", () => {
    const test = (theta) => {
      const fck = 35; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([28, 37, 46, 55, 64, 74, 92, 115, 129]);
  });

  it("l_brqd guter Verbund C40/50", () => {
    const test = (theta) => {
      const fck = 40; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([18, 24, 30, 35, 41, 47, 59, 74, 83]);
  });

  it("l_brqd mässiger Verbund C40/50", () => {
    const test = (theta) => {
      const fck = 40; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([25, 34, 42, 51, 59, 67, 84, 105, 118]);
  });

  it("l_brqd guter Verbund C40/50", () => {
    const test = (theta) => {
      const fck = 40; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([18, 24, 30, 35, 41, 47, 59, 74, 83]);
  });

  it("l_brqd mässiger Verbund C40/50", () => {
    const test = (theta) => {
      const fck = 40; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([25, 34, 42, 51, 59, 67, 84, 105, 118]);
  });

  it("l_brqd guter Verbund C45/55", () => {
    const test = (theta) => {
      const fck = 45; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([16, 22, 27, 33, 38, 44, 55, 68, 76]);
  });

  it("l_brqd mässiger Verbund C45/55", () => {
    const test = (theta) => {
      const fck = 45; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([23, 31, 39, 47, 55, 62, 78, 97, 109]);
  });

  it("l_brqd guter Verbund C50/60", () => {
    const test = (theta) => {
      const fck = 50; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdGuterVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);

    const roundedCurrLbrqd = currLbrqd.map(roundWhole);

    expect(roundedCurrLbrqd).toEqual([15, 20, 25, 31, 36, 41, 51, 64, 71]);
  });

  it("l_brqd mässiger Verbund C50/60", () => {
    const test = (theta) => {
      const fck = 50; // mm

      const fyk = 500; // N/mm²
      const gamma_s = 1.15;
      const currFyd = fyd(fyk, gamma_s);

      const currFbd = fbdMaessigerVerbund(fck);
      const currLbrqd = lbrqd(theta, currFyd, currFbd);
      return currLbrqd / 10;
    };

    const theta = [6, 8, 10, 12, 14, 16, 20, 25, 28];
    const currLbrqd = theta.map(test);
    const roundedCurrLbrqd = currLbrqd.map(roundWhole);
    expect(roundedCurrLbrqd).toEqual([22, 29, 36, 44, 51, 58, 73, 91, 102]);
  });
});

describe.skip("Mindestverankerungslänge", () => {
  it("l_bmin bei Zugstäben", () => {
    const currFck = 30; // N/mm²
    const currVerbund = "guterVerbund";
    const currTheta = 20; // mm
    const currLbminZug = lBminZug(currFck, currVerbund, currTheta);
    console.log(currLbminZug);
    const roundedCurrLbminZug = round(currLbminZug, 2);
    console.log(roundedCurrLbminZug);
    /**
     * Handrechnung Zwischenergebnisse
     * lbrqd = 20/4 *(500/1.1)/(2.25*1*(0.7*(0.3*30**(2/3)))/1.5) 714.7992882
     * theta * l_brqd = 0.3*714.7992882 = 214.4397865
     * 20*10 = 200 mm
     * 214.44 > 200
     */
    expect(roundedCurrLbminZug).toBe(214.44);
  });

  it("l_bmin bei Druckstäben", () => {
    const currFck = 30; // N/mm²
    const currVerbund = "guterVerbund";
    const currTheta = 20; // mm
    const currLbminDruck = lBminDruck(currFck, currVerbund, currTheta);
    const roundedCurrLbminDruck = round(currLbminDruck, 2);
    /**
     * Handrechnung Zwischenergebnisse
     * lbrqd = 20/4 *(500/1.1)/(2.25*1*(0.7*(0.3*30**(2/3)))/1.5) 714.7992882
     * theta * l_brqd = 0.6*714.7992882 = 428.8795729
     * 20*10 = 200 mm
     * 428.88 > 200
     */
    expect(roundedCurrLbminDruck).toBe(428.88);
  });
});

describe.skip("Ersatzverankerungslänge", () => {
  /**
   * tests für Ersatzverankerungslänge
   * Die hier berechnete Ersatzverankerungslänge wird mit verschiedenen
   * Berechnungsbeispielen aus der Literatur verglichen
   */
  it("l_beq ", () => {
    /**
     * Aus "Stahlbetonbau in Beispielen Teil 1 Beispiel 4.1, S.73"
     */
    const currFck = 30; // N/mm²
    const currAlphaA = 1; // gerades Stabende
    const currVerbund = "guterVerbund";
    const currTheta = 20; // mm
    const currAserf = 2.3; // cm²
    const currAsvorh = 9.42; // cm²

    const currLbeq = lbeq(
      currFck,
      currAlphaA,
      currVerbund,
      currTheta,
      currAserf,
      currAsvorh
    );
    const roundCurrLbeq = round1decimal(currLbeq);
    /**
     * der .toBe-Wert entspricht nicht genau dem Wert aus dem Verifikationsbeispiel
     * die ist aufgrund unterschiedlicher Rundungsentscheidungen
     * Beispiel lb,rqd = 177mm und hier berechnen wir 175mm bzw. 17.5 cm
     */
    const currLbminZug = lBminZug(currFck, currVerbund, currTheta);

    expect(roundCurrLbeq).toBe(174.5);
  });
});

describe.skip("Output lbeq", () => {
  /**
   * Aus "Stahlbetonbau in Beispielen Teil 1 Beispiel 4.1, S.73"
   */
  // const currFck = 30; // N/mm²
  // const currAlphaA = 1; // gerades Stabende
  // const currVerbund = "guterVerbund";
  // const currTheta = 20; // mm
  // const currAserf = 2.3; // cm²
  it("fyd", () => {
    // inpput erhalten wir aus dem data object
    const fck = 30;
    const verbund = "guterVerbund";
    const currentCalculation = calculateAl(fck, verbund);
    console.log(currentCalculation);
    expect(currentCalculation.fyd).toBe(434.78);
  });

  it("fbd", () => {
    const fck = 30;
    const verbund = "guterVerbund";
    const currentCalculation = calculateAl(fck, verbund);
    console.log(currentCalculation);
    expect(currentCalculation.fbd).toBe(3.04);
  });

  it("lbrqd", () => {
    const fck = 30; // N/mm²
    const verbund = "guterVerbund";
    const theta = 20; // mm

    const currentCalculation = calculateAl(fck, verbund, theta);
    console.log(currentCalculation);
    expect(currentCalculation.fbd).toBe(3.04);
  });

  it("lbeq", () => {
    const fck = 30; // N/mm²
    const verbund = "guterVerbund";
    const theta = 20; // mm

    const currentCalculation = calculateAl(fck, verbund, theta);
  });
});
