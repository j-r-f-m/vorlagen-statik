// import { screen } from "@testing-library/react";
import { dMin, term1, sMin, maxNumBars, term4 } from "./maxNumberBars";

import { describe, it, expect } from "vitest";

describe.skip("Biegerollendurchmesser", () => {
  it("theta_längs = 1.2 cm < 2.0 cm", () => {
    const theta_längs = 0.8; // cm
    const biegeRollenDurchmesser = dMin(theta_längs);

    expect(biegeRollenDurchmesser).toBe(3.2);
    //screen.debug();
  });

  it("theta_längs = 2.5 >= 2.0 cm", () => {
    const theta_längs = 2.5; // cm
    const biegeRollenDurchmesser = dMin(theta_längs);

    expect(biegeRollenDurchmesser).toBe(17.5);
    //screen.debug();
  });

  it("Berechne sMin", () => {
    const theta = 1; // cm
    const currentSmin = sMin(theta);
    expect(currentSmin).toBe(2);
  });

  it("Berechne Dmin", () => {
    const thetaBügel = 0.8; // cm
    const currentDmin = dMin(thetaBügel);

    expect(currentDmin).toBe(3.2);
  });

  it("Berechne term1", () => {
    const b = 20; // cm
    const cNomA = 2.5; // cm
    const cNomI = 2.5; // cm
    const thetaBügel = 0.8; // cm

    const currentTerm1 = term1(b, cNomA, cNomI, thetaBügel);

    expect(currentTerm1).toBe(13.4);
  });

  // it("Berechne term2", () => {
  //   const thetaBügel = 0.8; // cm
  //   const currentDmin = dMin(thetaBügel);
  //   const currentTerm2 = term2(currentDmin);
  //   expect(currentTerm2).toBe(-0.94);
  // });

  // it("Berechne term3", () => {
  //   const theta = 1; // cm
  //   const currentSmin = sMin(theta);
  //   const currentTerm3 = term3(theta, currentSmin);
  //   expect(currentTerm3).toBe(-3.71);
  // });

  it("Berechne term4", () => {
    const theta = 1; //cm
    const currentSmin = sMin(theta);
    const currentTerm4 = term4(theta, currentSmin);
    expect(currentTerm4).toBe(3);
  });

  /** ------------------- VERIFIKATION -------------------------------------- */

  it("Berechne Anzahl an Eisen1", () => {
    const b = 20; // cm
    const currentCnomA = 2.5; // cm
    const currrentCnomI = 2.5; // cm
    const currentThetaBügel = 0.8; // cm
    const currentTheta = 1; // cm
    const currentMaxNumBars = maxNumBars(
      b,
      currentCnomA,
      currrentCnomI,
      currentThetaBügel,
      currentTheta
    );
    expect(currentMaxNumBars).toBe(4);
  });
});
