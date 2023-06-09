import { round } from "mathjs";

/**
 * Offene Punkte:
 * Bemessungswet der Betonzugfestigkeit könnte implementiert werden
 * fctd = alpha_ct * fctk_005/ gamma_c ist im mmoment mit fctk_005/ gamma_c
 * berücksichtigt
 *
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
 * @param {number} eta1 faktor zur Berücksichtigung der Verbundbedingung
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
 * Berechnet die Ersatzverankerungslänge
 * @param {number} fck char. Zylinderdruckfestigkeit des Betons nach 28d
 * @param {number} alpha_a Beiwert zur Berücksichtigung der Verankerungsart
 * @param {string} verbund Verbundbedingung
 * @param {number} theta Durchmesser
 * @param {number} a_serf Erforderliche Stahlfäche
 * @param {number} a_svorh Vorhandene Stahlfläche
 * @returns number
 */
const lbeq = (alpha_a, lbrqd, a_serf, a_svorh) => {
  return alpha_a * lbrqd * (a_serf / a_svorh);
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
  if (0.3 * lbrqd >= 10 * alpha * theta) {
    return 0.3 * lbrqd;
  } else {
    return 10 * theta;
  }
};

/**
 * Mindestverankerungslänge bei Druchstäben
 * @param {number} lbrqd Grundwert der Verankerungslänge
 * @param {number} theta Stab
 * @returns number lBminDruck
 */
const lBminDruck = (lbrqd, theta) => {
  if (0.6 * lbrqd >= 10 * theta) {
    return 0.6 * lbrqd;
  } else {
    return 10 * theta;
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
const lBmin = (lbrqd, theta, stab, alpha) => {
  if (stab === "Zugstab") {
    return lBminZug(lbrqd, theta, alpha);
  } else if (stab === "Druckstab") {
    return lBminDruck(lbrqd, theta);
  }
};

/**
 * Berechnet die Ersatzverankerungslänge bei direkter Lagerung
 * @param {number} lbeq Ersatzverankerungslänge
 * @returns number
 */
const lbeqDir = (lbeq) => {
  return (2 / 3) * lbeq;
};

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

  const currLbeq = lbeq(alpha_a, currLbrqd, a_serf, a_svorh);
  const roundedCurrLbeq = round(currLbeq, 1);

  const currLbmin = lBmin(currLbrqd, theta, stab);
  // const roundedCurrLbmin = round(currLbmin, 2);
  const roundedCurrLbmin = round(currLbmin, 2);

  // const currVerankerungAlr = verankerungEndauflager(currLbeq, lagerung);
  // const roundedCurrVerankerungAlr = round(currVerankerungAlr, 2);

  const currLbeqDir = lbeqDir(currLbeq);
  const roundedCurrLbeqDir = round(currLbeqDir, 2);

  const currLbeqIndir = lbeqIndir(currLbeq);
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
    lbeq: roundedCurrLbeq,
    lbeqDir: roundedCurrLbeqDir,
    lbeqIndir: roundedCurrLbeqIndir,
    lbmin: roundedCurrLbmin,
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
  lBminZug,
  lBminDruck,
  lBmin,
  calculateAl,
  verankerungEndauflager,
};
