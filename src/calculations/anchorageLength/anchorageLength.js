import { round } from "mathjs";

/**
 * Returns rounded number
 * @param {number} decimals
 * @param {number} num number you want to round
 * @returns number
 */
// const round = (decimals, num) => {
//   const roundedFctm =
//     (Math.round((num + Number.EPSILON) * 1 * decimals) / 10) * decimals;
//   return roundedFctm;
// };

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
 * @param {number} eta1 faktor zur Berücksichtigung der Verbundbedingung
 * @param {number} gammaC Teilsicherheitsbeiwert Beton
 * @param {string} verbund "guterVerbund" "schlechterVerbund"
 * @returns
 */
const fbd = (fctk005, gammaC, verbund) => {
  let currFbd = null; // initilized currFbd
  console.log(currFbd);
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
 * Berechnet die Ersatzverankerungslänge
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @param {number} alpha_a Beiwert zur Berücksichtigung der Verankerungsart
 * @param {string} verbund Verbundbedingung
 * @param {number} theta Durchmesser
 * @param {number} a_serf Erforderliche Stahlfäche
 * @param {number} a_svorh Vorhandene Stahlfläche
 * @returns number
 */
const lbeq = (fck, alpha_a, verbund, theta, a_serf, a_svorh) => {
  const fyk = 500; // N/mm²
  const gamma_s = 1.15;

  const currFyd = fyd(fyk, gamma_s);
  const currFbd = fbd(fck, verbund);
  const currLbrqd = lbrqd(theta, currFyd, currFbd);
  // console.log(currLbrqd);
  return alpha_a * currLbrqd * (a_serf / a_svorh);
};

const lBminZug = (lbrqd, theta) => {
  if (0.3 * lbrqd >= 10 * theta) {
    return 0.3 * lbrqd;
  } else {
    return 10 * theta;
  }
};

const lBminDruck = (lbrqd, theta) => {
  if (0.6 * lbrqd >= 10 * theta) {
    return 0.6 * lbrqd;
  } else {
    return 10 * theta;
  }
};

const lBmin = (stab, fck, verbund, theta) => {
  if (stab === "zugstab") {
    return lBminZug(fck, verbund, theta);
  } else if (stab === "druckstab") {
    return lBminDruck(fck, verbund, theta);
  }
};

const lbeqDir = (lbeq) => {
  return (2 / 3) * lbeq;
};

const lbeqIndir = (lbeq) => {
  return lbeq;
};

const calculateAl = (fck, verbund, theta, alpha_a) => {
  /***
   * Für den output brauche ich zwei Dinge.
   * 1. Es müssen alle Berechnungen aufgeschlüssel werden
   * 2. Es muss der Konkrete Fall gerechnet werden
   *
   * Wenn ich die Verankeungslänge wissen will, möchte ich das für den konkreten
   * Fall machen bzw aus verschiedenen Möglichkeiten wählen können.
   */
  // hardcoded values
  const fyk = 500; // N/mm²
  const gamma_s = 1.15;
  const currFyd = fyd(fyk, gamma_s);
  const roundedCurrFyd = round(currFyd, 2);

  const currFbd = fbd(fck, verbund);
  const roundedCurrFbd = round(currFbd, 2);

  const currLbrqd = lbrqd(theta, roundedCurrFyd, roundedCurrFbd);
  const roundedCurrLbrqd = round(currLbrqd, 0);

  const currLbeq = lbeq(fck, alpha_a);

  return {
    fyd: roundedCurrFyd,
    fbd: roundedCurrFbd,
    lbrqd: roundedCurrLbrqd,
  };
};

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
  lBminZug,
  lBminDruck,
  calculateAl,
};
