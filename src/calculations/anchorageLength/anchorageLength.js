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
const fbdGuterVerbund = (fck) => {
  const currFctm = fctm(fck);
  /**
   * Aufgrund der höheren Sprödigkeit wird die Verbundfestigkeit für
   * Betone > C55/67 auf den Wert von C60/75 begrenzt.
   */
  if (fck > 55) {
    return 4.57;
  } else {
    const currFctk005 = fctk005(currFctm);
    const eta_1 = 1; // guter verbund
    const gamma_c = 1.5;
    const currFbd = 2.25 * eta_1 * (currFctk005 / gamma_c);
    return currFbd;
  }
};

/**
 * Bemessungswert der Verbundspannung f_bd für mässigen Verbund und theta_s < 32 mm
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @returns
 */
const fbdMaessigerVerbund = (fck) => {
  const currFctm = fctm(fck);
  /**
   * Aufgrund der höheren Sprödigkeit wird die Verbundfestigkeit für
   * Betone > C55/67 auf den Wert von C60/75 begrenzt.
   */
  if (fck > 55) {
    return 3.2;
  } else {
    const currFctk005 = fctk005(currFctm);
    const eta_1 = 0.7; // mässiger verbund
    const gamma_c = 1.5;
    const currFbd = 2.25 * eta_1 * (currFctk005 / gamma_c);
    return currFbd;
  }
};

/**
 * Entscheidungsfunktion - Bemessungswert der Verbundspannung
 * Die Funktion führt eine Fallunterscheidung durch und ruft die entsprechenden
 * Funktionen auf
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @param {string} verbund Verbundbedingung
 * @returns number
 */
const fbd = (fck, verbund) => {
  let currFbd = null; // initilized currFbd
  if (verbund === "guterVerbund") {
    currFbd = fbdGuterVerbund(fck);
  } else if (verbund === "schlechterVerbund") {
    currFbd = fbdMaessigerVerbund(fck);
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

const lBimZug = (fck, verbund, theta) => {
  const fyk = 500; // N/mm²
  const gamma_s = 1.15;
  const fyd = fyk / gamma_s;

  const currFbd = fbd(fck, verbund);
  const currLbrqd = lbrqd(theta, fyd, currFbd);

  if (0.3 * currLbrqd >= 10 * theta) {
    return 0.3 * currLbrqd;
  } else {
    return 10 * theta;
  }
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
  lBimZug,
};
