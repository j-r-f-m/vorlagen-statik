/**
 * mindest Balkenbreite die benötigt wird um die gegebene Anzal an Stäben
 * unter zu bringen
 * @param {number} cnomBügel Betondeckung Bügel
 * @param {number} thetaBügel Durchmesser Bügel
 * @param {number} thetaLängs Durchmesser Längsstäbe
 * @param {number} nStäbe Anzahl der Längsstäbe
 * @param {number} aStäbe Abstand der Stäbe
 * @returns number
 */
function minWidthBeam(cnomBügel, thetaBügel, thetaLängs, nStäbe, aStäbe) {
  console.log(cnomBügel);
  return (
    cnomBügel * 2 + thetaBügel * 2 + nStäbe * thetaLängs + (nStäbe - 1) * aStäbe
  );
}

export { minWidthBeam };
