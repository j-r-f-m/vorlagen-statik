import { round } from "mathjs";

/**
 * Offene Punkte:
 * 1. Bemessungswet der Betonzugfestigkeit könnte implementiert werden
 * fctd = alpha_ct * fctk_005/ gamma_c ist im mmoment mit fctk_005/ gamma_c
 * berücksichtigt
 *
 * 2. Die einzelnen Berechnungsfunktionen sollten ein object zurückgeben mit
 * allen relevanten Zwischenberechnungen. Bsp. Bei der Berechnung von lbeq
 * sollte der linke und der rechter Term von
 * lbeq = alpha * lbrqd * Aserf/Asvorh >= 0.3 * lbrqd = lbmin zurückgegeben
 * werden
 *
 * 3.
 */

/**
 * Returns rounded number
 * @param {number} decimals
 * @param {number} num number you want to round
 * @returns number
 */

const roundWhole = (num) => {
  const roundedNum = Math.round(num);
  return roundedNum;
};

const round1decimal = (num) => {
  const roundedFctm = Math.round((num + Number.EPSILON) * 10) / 10;
  return roundedFctm;
};

const round3decimalStr = (num) => {
  return Number(num.toPrecision(3));
};

const round2decimalStr = (num) => {
  return Number(num.toPrecision(2));
};

/**
 * Mittelwert der Zylinderdruckfestigkeit des Betons
 * @param {number} fck charakteristische Zylinderdruckfestigkeit nach 28d
 * @returns number
 */
const fcm = (fck) => {
  return fck + 8;
};

/**
 * Mittelwert der zentrischen Zugfestigkeit des Betons
 * Für fck <= 50  (12 - 30) [N/mm²]
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns number
 */
const fctmSmaller50 = (fck) => {
  return 0.3 * fck ** (2 / 3);
};

/**
 * Mittelwert der zentrischen Zugfestigkeit des Betons
 * Für fck > 50 (55 - 100) [N/mm²]
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns number
 */
const fctmBigger50 = (fck) => {
  return 2.12 * Math.log(1 + fcm(fck) / 10);
};

/**
 * Entscheidungsfunktion - Mittelwert der zentrischen Zugfestigkeit des Betons
 * Die Funktion ruft in Abhängigkeit von fck die entsprechende
 * Berechnungsfunktion auf.
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns number
 */
const fctm = (fck) => {
  if (fck > 50) {
    return fctmBigger50(fck);
  } else if (fck <= 50) {
    const currFctm = fctmSmaller50(fck);
    return currFctm;
  }
};

/**
 * unterercharakteristischer Grenzwert der zentrischen Betonzugfestigkeit
 * @param {number} fctm Mittelwert der zentrischen Zugfestigkeit des Betons
 * @returns number
 */
const fctk005 = (fctm) => {
  return 0.7 * fctm;
};

/**
 * Bemessungswert der Streckgrenze
 * @param {number} fyk charakteristischer Wert der Streckgrenze
 * @param {number} gamma_s Teilsicherheitsbeiwert für Betonstahl und Spannstahl
 * @returns number
 */
const fyd = (fyk, gamma_s) => {
  return fyk / gamma_s;
};

/**
 * Bemessungswert der Verbundspannung f_bd für guten Verbund und theta_s < 32 mm
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns number
 */
const fbdGuterVerbund = (fctk005, eta1, gammaC) => {
  /**
   * Aufgrund der höheren Sprödigkeit wird die Verbundfestigkeit für
   * Betone > C55/67 auf den Wert von C60/75 begrenzt.
   */
  if (fctk005 > 3) {
    return 4.57;
  }
  return 2.25 * eta1 * (fctk005 / gammaC);
};

/**
 * Bemessungswert der Verbundspannung f_bd für mässigen Verbund und theta_s < 32 mm
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns
 */

const fbdMaessigerVerbund = (fctk005, eta1, gammaC) => {
  if (fctk005 > 3) {
    return 3.2;
  }
  return 2.25 * eta1 * (fctk005 / gammaC);
};

/**
 * Entscheidungsfunktion - Bemessungswert der Verbundspannung
 * Die Funktion führt eine Fallunterscheidung durch und ruft die entsprechenden
 * Funktionen auf. Eta wird in abhängigkeit vom User Input in der Funktion
 * definiert. Eventuell weiss der User nicht welcher Faktor welcher Verbund-
 * bedingung entspricht. Deswegen erhält er die Möglichkeit sich zwischen
 * zwei Strings zu entscheiden welche selbst erklärend sind
 * @param {number} fctk005 5 % Quantil der Zugfestigkeit
 * @param {number} gammaC Teilsicherheitsbeiwert Beton
 * @param {string} verbund "guterVerbund" "schlechterVerbund"
 * @returns
 */
const fbd = (fctk005, gammaC, verbund) => {
  let currFbd = null; // initilized currFbd
  if (verbund === "guterVerbund") {
    const eta1 = 1;
    currFbd = fbdGuterVerbund(fctk005, eta1, gammaC);
  } else if (verbund === "schlechterVerbund") {
    const eta1 = 0.7;
    currFbd = fbdMaessigerVerbund(fctk005, eta1, gammaC);
  }
  return currFbd;
};

/**
 * Grundwert der Verankerungslänge bei gutem Verbund
 * @param {number} theta Durchmesser Stab [mm]
 * @param {number} fyd Bemessungswert der Streckgrenze
 * @param {number} fbd Bemessungswert der Verbundspannung in Abhängigkeit der
 * Verbundbedingung
 * @returns number
 */
const lbrqd = (theta, fyd, fbd) => {
  return (theta / 4) * (fyd / fbd);
};

/**
 * Berechne den linken Term der gleichung
 * lbeq = alpha * lbrqd * as,erf/asvorh >= lbmin
 * die Funktiokn sollte in lbeqLeftTerm oder etwas sinnvolleres unbenannt werden
 * @param {number} alpha_a Faktor zur Berücksichtigung der Verankerungsart
 * @param {number} lbrqd Grundwert der Verankerungslänge
 * @param {number} a_serf As,erf
 * @param {number} a_svorh As, vorh
 * @returns number lbeq linker Term
 */
const lbeq = (alpha_a, lbrqd, a_serf, a_svorh) => {
  return alpha_a * lbrqd * (a_serf / a_svorh);
};

/**
 * Entscheidungsfunktion
 * lBmin und lBeq werden verglichen der höhere Wert wird zurückgegeben
 * @param {number} lBmin Mindestverankerungslänge
 * @param {number} lbeq Ersatzverankerunslänge
 * @returns Engültige Ersatzverankerungslänge
 */

const lbeqEntscheidung = (lBmin, lbeq) => {
  if (lbeq >= lBmin) {
    return {
      lbeqFinal: lbeq,
      lbeqSmaller: lBmin,
      lbeqLeftTerm: lbeq,
      lbeqRightTerm: lBmin,
    };
  } else if (lbeq < lBmin)
    return {
      lbeqFinal: lBmin,
      lbeqSmaller: lbeq,
      lbeqLeftTerm: lbeq,
      lbeqRightTerm: lBmin,
    };
};

/**
 * Mindestverankerungslänge bei Zugstäben
 * Bemessungs im Konstruktiven Ingeniuerbau, s.551
 * @param {number} lbrqd Grundwert der Verankerungslänge
 * @param {number} theta Durchmesser längsstab
 * @param {number} alpha Beiwert zur Berücksichtigung der Verankerungsart
 * @returns number lBminZug
 */
const lBminZug = (lbrqd, theta, alpha) => {
  // lbmin >= max {0.3 * lbrqd : 10 * theta}
  const leftTerm = round(0.3 * lbrqd * alpha, 2);
  const rightTerm = round(10 * theta, 2);
  if (leftTerm >= rightTerm) {
    return {
      lBminFinal: leftTerm,
      lBminSmaller: rightTerm,
      lBminLeftTerm: leftTerm,
      lBminRightTerm: rightTerm,
    };
  } else {
    return {
      lBminFinal: rightTerm,
      lBminSmaller: leftTerm,
      lBminLeftTerm: leftTerm,
      lBminRightTerm: rightTerm,
    };
  }
};

/**
 * Mindestverankerungslänge bei Druchstäben
 * @param {number} lbrqd Grundwert der Verankerungslänge
 * @param {number} theta Stab
 * @returns number lBminDruck
 */
const lBminDruck = (lbrqd, theta) => {
  // lbmin >= max {0.6 * lbrqd : 10 * theta}
  const leftTerm = round(0.6 * lbrqd, 2);
  const rightTerm = round(10 * theta);
  if (leftTerm >= rightTerm) {
    // return leftTerm;
    return {
      lBminFinal: leftTerm,
      lBminSmaller: rightTerm,
      lBminLeftTerm: leftTerm,
      lBminRightTerm: rightTerm,
    };
  } else {
    return rightTerm;
  }
};

/**
 * Entscheidungsfunktion für Mindestverankerungslänge
 * @param {number} lbrqd Grundwert der Verankerungslänge
 * @param {number} theta Durchmesser Stab
 * @param {number} alpha Beiwert zur Berücksichtigun der Verankerungsart
 * @param {string} stab Belastungsart des Stabes (Zug oder Druck)
 * @returns number lbmin
 */
const lBmin = (lbrqd, theta, alpha, stab) => {
  if (stab === "Zugstab") {
    const lBminObj = lBminZug(lbrqd, theta, alpha);
    return lBminObj;
  } else if (stab === "Druckstab") {
    const lBminObj = lBminDruck(lbrqd, theta);
    return lBminObj;
  }
};

/**
 * Berechnet die Ersatzverankerungslänge bei direkter Lagerung
 * @param {number} lbeq Ersatzverankerungslänge
 * @param {number} theta Stabdurchmesser
 * @returns number
 */
const lbeqDir = (lbeq, theta) => {
  const leftTerm = round((2 / 3) * lbeq, 2);
  const rightTerm = round(6.7 * theta, 2);
  // implementieren
  // lbdir = max {2/3 * lbmin; 6,7 * theta}
  if (leftTerm >= rightTerm) {
    return {
      lbeqDirFinal: leftTerm,
      lbeqDirSmaller: rightTerm,
      lbeqDirLeftTerm: leftTerm,
      lbeqDirRightTerm: rightTerm,
    };
  } else
    return {
      lbeqDirFinal: rightTerm,
      lbeqDirSmaller: leftTerm,
      lbeqDirLeftTerm: leftTerm,
      lbeqDirRightTerm: rightTerm,
    };
};

/* const lbeqDir = (lbeq, theta) => {
  const leftTerm = (2 / 3) * lbeq;
  const rightTerm = 6.7 * theta;
  // implementieren
  // lbdir = max {2/3 * lbmin; 6,7 * theta}
  if (leftTerm >= rightTerm) {
    return leftTerm;
  } else return rightTerm;
}; */

/* {
  lbeqDirFinal: leftTerm,
  lbeqDirSmaller: rightTerm,
  lbeqDirLeftTerm: leftTerm,
  lbeqDirRightTerm: rightTerm,
} */

/**
 * Berechnet die Ersatzverankerungslänge bei indirekter Lagerung
 * @param {number} lbeq Ersatzverankerungslänge
 * @returns number
 */
const lbeqIndir = (lbeq) => {
  return lbeq;
};

/**
 * Entscheidungsfunktion
 * Berechnet die erforderliche Vernakerungslänge am Endauflager
 * @param {number} lbeq Ersatzverankerungslänge
 * @param {string} lagerung Lagerungsbedingung
 * @returns number
 */
const verankerungEndauflager = (lbeq, lagerung) => {
  if (lagerung === "direkt") {
    return lbeqDir(lbeq);
  } else if (lagerung === "indirekt") {
    return lbeqIndir;
  }
};

/**
 * Berechnungsobjekt welches alle verfügbaren Berechnungs - und
 * Zwischenergebnisse enthält. Das Objekt wird erstelllt wenn der
 * Berechnungs-Button betätigt wird.
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @param {string} verbund Verbundbedingung
 * @param {number} theta Durchmesser Längseisen
 * @param {number} alpha_a Faktor zur Berücksichtigung
 * @param {number} a_serf As,erforderlich
 * @param {number} a_svorh As,vorhanden
 * @param {string} lagerung Lagersituation
 * @param {string} stab Zug- oder Druckstab
 * @returns
 */
const calculateAl = (
  fck,
  verbund,
  theta,
  alpha_a,
  a_serf,
  a_svorh,
  lagerung,
  stab
) => {
  /**
   * Hardcoded values
   * Die Teilsicherheitsbeiwerte soll der user erstmal nicht selber eingeben
   * können.
   */
  const fyk = 500; // N/mm²
  const gamma_s = 1.15;
  const gamma_c = 1.5;

  const currFyd = fyd(fyk, gamma_s);
  const roundedCurrFyd = round(currFyd, 2);

  const currfck = fck;
  const currFctm = fctm(fck);
  const roundedCurrFctm = round(currFctm, 1);
  const currFctk005 = fctk005(currFctm);
  const roundedCurrFctk005 = round(currFctk005, 1);
  const currFbd = fbd(currFctk005, gamma_c, verbund);
  const roundedCurrFbd = round(currFbd, 2);

  const currLbrqd = lbrqd(theta, currFyd, currFbd);
  const roundedCurrLbrqd = round(currLbrqd, 0);

  // final lbmin object
  // right term of lbeq = alpha * lbrqd * as,erf/as,vorh
  const currLbmin = lBmin(currLbrqd, theta, alpha_a, stab);
  const roundedCurrLbmin = round(currLbmin.lBminFinal, 1);

  // left term of lbeq = alpha * lbrqd * as,erf/as,vorh
  const currLbeq = lbeq(alpha_a, currLbrqd, a_serf, a_svorh);
  const roundedCurrLbeq = round(currLbeq, 1);

  // final lbeq object
  const lbeqFinal = lbeqEntscheidung(roundedCurrLbmin, roundedCurrLbeq);
  // const roundedLbeqFinal = round(lbeqFinal.lbeqFinal, 1);

  const currLbeqDir = lbeqDir(lbeqFinal.lbeqFinal, theta);
  /*   const roundedCurrLbeqDir = round(currLbeqDir.lbeqDirFinal, 2); */

  const currLbeqIndir = lbeqIndir(lbeqFinal.lbeqFinal);
  const roundedCurrLbeqIndir = round(currLbeqIndir, 2);

  return {
    name: "anchorage length results",
    fck: currfck,
    fctk005: roundedCurrFctk005,
    fctm: roundedCurrFctm,
    verbund: verbund,
    alpha: alpha_a,
    fbd: roundedCurrFbd,
    theta: theta,
    fyd: roundedCurrFyd,
    lbrqd: roundedCurrLbrqd,
    lbeq: lbeqFinal,
    lbeqDir: currLbeqDir,
    lbeqIndir: roundedCurrLbeqIndir,
    lbmin: currLbmin,
    lagerung: lagerung,
    stab: stab,
    asErf: a_serf,
    asVorh: a_svorh,
  };
};

// export only for testing purposes
// only calculateAl() can be called from the interface
export {
  roundWhole,
  round1decimal,
  round2decimalStr,
  round3decimalStr,
  fctk005,
  fctmSmaller50,
  fctmBigger50,
  fctm,
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
  verankerungEndauflager,
};
