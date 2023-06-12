function maxNumBars(b, cNomA, cNomI, thetaBü, theta, sMin) {
  const term1 = 1 - 1 / Math.sqrt(2);
}

/**
 * Berechnet den Biegerollendurchmessers für einen gegebenen Stabdurchmessers
 * @param {number} theta Durchmesser des Stabs in cm
 * @returns number
 */
function dMin(theta) {
  if (theta < 2) {
    return 4 * theta;
  } else if (theta >= 2) {
    return 7 * theta;
  }
}

export { maxNumBars, dMin };
