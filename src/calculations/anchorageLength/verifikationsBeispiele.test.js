import { describe, it, expect } from "vitest";
import { round } from "mathjs";
import {
  lbrqd,
  lbeq,
  lbeqEntscheidung,
  lBmin,
  lbeqDir,
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
  it.skip("Beispiel 1: Verankerungslänge - 6. Bewehrungsführung...", () => {
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

    const currLbeq = lbeqEntscheidung(currLbmin, rawLbeq);
    const currLbdir = round(lbeqDir(currLbeq.lbeqFinal, theta));

    expect(currLbrqd).toBe(473);
    expect(currLbmin).toBe(142);
    expect(currLbeq.lbeqFinal).toBe(142);
    expect(currLbdir).toBe(95);
  });

  // Beispiel 2: Vollplatte, einachsig gespannt
  it.skip("Beispiel 2: 6. Bewehrungsführung und Bauliche Durchbildung", () => {
    // inputs
    const fck = 20; // N/mm²
    const verbund = "guterVerbund";
    const theta = 8; // mm0
    const alpha = 0.7;
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

    const rawLbeq = round(
      lbeq(
        currentCalculation.alpha,
        currLbrqd,
        currentCalculation.asErf,
        currentCalculation.asVorh
      ),
      0
    );

    const currLbeq = lbeqEntscheidung(currLbmin, rawLbeq);

    const currLbdir = round(lbeqDir(currLbeq.lbeqFinal, theta), 0);

    expect(currLbrqd).toBe(378);
    expect(currLbmin).toBe(80);
    expect(currLbeq.lbeqFinal).toBe(80);
    /* Auszug aus der Literatur
    lbd,dir = 2/3 * 80 < 6.7 * 80
    lbd,dir = 53.3 < 53.6
    lb,dir = 54 mm 
     */
    expect(currLbdir).toBe(54);
  });

  // Beispiel 3: Vollplattemit großer Dicke
  it.skip("Beispiel 3: 6. Bewehrungsführung und Bauliche Durchbildung", () => {
    /* Getestet wird ein Durchmesser von 20 mm und guten Verbundbedingungen im 
    2. Feld unten.*/

    // inputs
    const fck = 30; // N/mm²
    const verbund = "schlechterVerbund";
    const theta = 20; // mm
    const alpha = 0.7;
    const aserf = 44.9; // cm²
    const asvorh = 75.4; // cm²
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

    const rawLbeq = round(
      lbeq(
        currentCalculation.alpha,
        currLbrqd,
        currentCalculation.asErf,
        currentCalculation.asVorh
      ),
      0
    );

    const currLbeq = lbeqEntscheidung(currLbmin, rawLbeq);
    const currLbdir = round(lbeqDir(453, theta));
    console.log(currLbdir);

    expect(currLbrqd).toBe(1036);
    expect(currLbmin).toBe(218);
    expect(currLbeq.lbeqFinal).toBe(432);
    // müsste noch mit Literatur abgeglichen werden lb,dir = 298 mm
    expect(currLbdir).toBe(302);
  });

  // Beispiel 5: Einfeldbalken Fertigteil
  it.skip("Beispiel 5: 6. Bewehrungsführung", () => {
    /* Getestet wird Längsbewehrung mit einem  Durchmesser von 20 mm und guten
     Verbundbedingungen */

    // inputs
    const fck = 35; // N/mm²
    const verbund = "guterVerbund";
    const theta = 25; // mm
    const alpha = 1; // Verankeurngsart
    const aserf = 3.45; // cm²
    const asvorh = 9.82; // cm²
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

    const roundedFyd = round(currentCalculation.fyd, 0);
    const roundedFbd = round(currentCalculation.fbd, 1);
    const currLbrqd = round(
      lbrqd(currentCalculation.theta, roundedFyd, roundedFbd),
      0
    );
    /* console.log(currLbrqd); */

    const currLbeq = round(lbeq(alpha, currLbrqd, aserf, asvorh));
    /*     console.log(currLbeq); */
    const currLbeqFinal = lbeqEntscheidung(currentCalculation.lbmin, currLbeq);
    console.log(currLbeqFinal);
    const currLbdir = round(lbeqDir(currLbeqFinal.lbeqFinal, theta), 0);
    console.log(currLbdir);

    expect(currLbrqd).toBe(800);
    expect(currentCalculation.lbmin).toBe(250);
    expect(currLbeqFinal.lbeqFinal).toBe(281);
    expect(currLbdir).toBe(187);
  });

  // Beispiel 5: Einfeldbalken Fertigteil
  it.skip("Beispiel 5: 6. Bewehrungsführung", () => {
    /* Getestet wird Längsbewehrung mit einem Durchmesser von 10 mm und mäßigen
     Verbundbedingungen */

    // inputs
    const fck = 35; // N/mm²
    const verbund = "schlechterVerbund";
    const theta = 10; // mm
    const alpha = 0.7; // Winkelhaken
    const aserf = 0.38; // cm²
    const asvorh = 0.79; // cm²
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

    const roundedFyd = round(currentCalculation.fyd, 0);
    const roundedFbd = round(currentCalculation.fbd, 1);
    console.log(roundedFbd);
    const currLbrqd = round(
      lbrqd(currentCalculation.theta, roundedFyd, roundedFbd),
      0
    );
    console.log(currLbrqd);

    const currLbeq = round(lbeq(alpha, currLbrqd, aserf, asvorh));
    /*     console.log(currLbeq); */
    const currLbeqFinal = lbeqEntscheidung(currentCalculation.lbmin, currLbeq);
    console.log(currLbeqFinal);
    const currLbdir = round(lbeqDir(currLbeqFinal.lbeqFinal, theta), 0);
    console.log(currLbdir);

    //
    expect(currLbrqd).toBe(453);
    expect(currentCalculation.lbmin).toBe(100);
    expect(currLbeqFinal.lbeqFinal).toBe(153);
    expect(currLbdir).toBe(102);
  });

  // Beispiel 6: Zweifeldriger Durchlaufbalken mit Kragtäger
  it("Beispiele 6: 6. Bewehrungsführung", () => {
    /* Getestet wird Längsbewehrung mit einem Durchmesser von 10 mm und mäßigen
     Verbundbedingungen */

    // inputs
    const fck = 25; // N/mm²
    const verbund = "schlechterVerbund";
    const theta = 25; // mm
    const alpha = 0.7; // Winkelhaken
    const aserf = 10.9; // cm²
    const asvorh = 34.4; // cm²
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

    const roundedFyd = round(currentCalculation.fyd, 0);
    const roundedFbd = round(currentCalculation.fbd, 2);
    console.log(roundedFbd);
    const currLbrqd = round(
      lbrqd(currentCalculation.theta, roundedFyd, roundedFbd),
      0
    );
    /* console.log(currLbrqd); */

    const currLbmin = round(
      lBmin(currLbrqd, theta, alpha, "Zugstab").lBminFinal
    );
    console.log(currLbmin);
    const currLbeq = round(lbeq(alpha, currLbrqd, aserf, asvorh));
    /*     console.log(currLbeq); */
    const currLbeqFinal = lbeqEntscheidung(
      currentCalculation.lbmin.lBminFinal,
      currLbeq
    );
    console.log(currLbeqFinal);
    const currLbdir = round(
      lbeqDir(currLbeqFinal.lbeqFinal, theta).lbeqDirFinal,
      0
    );
    console.log(currLbdir);

    //
    expect(currLbrqd).toBe(1438);
    expect(currLbmin).toBe(302);
    expect(currLbeqFinal.lbeqFinal).toBe(319);
  });
});
