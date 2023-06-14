// ----------------------- Fix -> remove sMin ---------------------------------

/**
 * Berechnet den Biegerollendurchmessers für einen gegebenen Stabdurchmessers
 * @param {number} theta Durchmesser Längstab in cm
 * @returns number
 */
function dMin(theta) {
  // wenn
  if (theta < 2) {
    return 4 * theta;
  } else if (theta >= 2) {
    return 7 * theta;
  }
}

/**
 * Mindestabstand zwischen Längsstäben
 * @param {number} theta Durchmesser Biegebewehrung
 * @returns number
 */
function sMin(theta) {
  if (theta < 2) {
    return 2;
  } else if (theta >= 2) {
    return theta;
  }
}

/**
 * Berechne term1
 * @param {number} b width of beam
 * @param {number} cNomA Betondeckung außen
 * @param {number} cNomI Beteckung innen
 * @param {number} thetaBü Bügel Durchmesser
 * @returns number
 */
function term1(b, cNomA, cNomI, thetaBü) {
  return b - cNomA - cNomI - 2 * thetaBü;
}

/**
 * Berechne term2
 * @param {number} dMin Biegerollendurchmesser
 * @returns number
 */
function term2(dMin) {
  const subTerm1 = -(1 - 1 / Math.sqrt(2));
  const interimResult = subTerm1 * dMin;

  const roundedResult =
    Math.round((interimResult + Number.EPSILON) * 100) / 100;

  return roundedResult;
}

/**
 * Berechne term3
 * @param {number} theta Durchmesser Längsstab
 * @param {number} sMin Längsstababstand
 * @returns number
 */
function term3(theta, sMin) {
  const interimResult = -(1 / Math.sqrt(2)) * theta - theta - sMin;
  const roundedResult =
    Math.round((interimResult + Number.EPSILON) * 100) / 100;
  return roundedResult;
}

/**
 * Berechne term4
 * @param {number} theta Längsstabdurchmesser
 * @param {number} sMin Längsstabdurchmesser
 * @returns number
 */
function term4(theta, sMin) {
  return theta + sMin;
}

function maxNumBars(b, cNomA, cNomI, thetaBü, theta) {
  const currentDmin = dMin(theta);
  const currentSmin = sMin(theta);

  const currentTerm1 = term1(b, cNomA, cNomI, thetaBü);
  const currentTerm2 = term2(currentDmin);
  const currentTerm3 = term3(theta, currentSmin);
  const currentTerm4 = term4(theta, currentSmin);

  const interimsResult = Math.floor(
    (currentTerm1 + currentTerm2 + currentTerm3) / currentTerm4
  );
  console.log(interimsResult);

  const nBars = interimsResult + 2;
  return nBars;
}

export { maxNumBars, dMin, term1, term2, term3, term4, sMin };
