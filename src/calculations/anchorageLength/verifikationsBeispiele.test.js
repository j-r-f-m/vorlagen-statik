import { describe, it, expect } from "vitest";
import { round } from "mathjs";
import {
  fctm,
  fctk005,
  fyd,
  fbdGuterVerbund,
  fbdMaessigerVerbund,
  fbd,
  lbrqd,
  lbeq,
  lbeqEntscheidung,
  lBminZug,
  lBminDruck,
  lBmin,
  lbeqDir,
  lbeqIndir,
  calculateAl,
} from "./anchorageLength";

/**
 * Verifikationsbeispiele aus der Literatur
 */
describe("Beispiele zur Bemessung nach Eurocode 2 Band 1: Hochbau", () => {
  /**
   * Beispiele zur Bemessung nach Eurocode 2 Band 1: Hochbau
   * Deutscher Beton- und Bautechnik-Verein E.V.
   */

  // Beispiel 1: Vollplatte, einachsig gespannt
  it("Beispiel 1: Verankerungslänge", () => {
    const fck = 20; // N/mm²
    const verbund = "guterVerbund";
    const theta = 10; // mm
    const alpha = 1;
    const aserf = 0.85; // cm²
    const asvorh = 5.24; // cm²
    const lagerung = "direkt";
    const stab = "Zugstab";

    const currentCalculation = calculateAl(
      fck,
      verbund,
      theta,
      alpha,
      aserf,
      asvorh,
      lagerung,
      stab
    );
    console.log(currentCalculation);

    /**
     * Die berechneten Zwischenergebnisse müssen entsprechend gerundet werden,
     * um die Werte aus der Literatur verifizieren zu können.
     */
    const roundedFyd = round(currentCalculation.fyd, 0);
    const roundedFbd = round(currentCalculation.fbd, 1);
    const currLbrqd = round(
      lbrqd(currentCalculation.theta, roundedFyd, roundedFbd),
      0
    );

    const currLbmin = round(
      lBmin(
        currLbrqd,
        currentCalculation.theta,
        currentCalculation.alpha,
        currentCalculation.stab
      ),
      0
    );
    console.log(currLbmin);

    // Linke seite der Gleichung
    const rawLbeq = round(
      lbeq(
        currentCalculation.alpha,
        currLbrqd,
        currentCalculation.asErf,
        currentCalculation.asVorh
      ),
      0
    );
    console.log(rawLbeq);

    const currLbeq = lbeqEntscheidung(currLbmin, rawLbeq);
    console.log(currLbeq);

    const currLbeqDir = lbeqDir(currLbeq);
    console.log(currLbeqDir);

    expect(currLbrqd).toBe(473);
    expect(currLbmin).toBe(142);
    expect(currLbeq).toBe(142);
  });
});
