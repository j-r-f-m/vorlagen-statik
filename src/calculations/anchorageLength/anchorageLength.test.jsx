import { describe, it, expect } from "vitest";
import {
  fctm,
  fctk005,
  fctmSmaller50,
  fctmBigger50,
  round1decimal,
} from "./anchorageLength";

describe("Mittelwert der Zugfestigkeit", () => {
  it("fctm für C12/15 - C100/115", () => {
    const fcks = [12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100];
    const notRoundedFctms = fcks.map(fctm);
    const roundedFctm = notRoundedFctms.map(round1decimal);
    console.log(roundedFctm);
    expect(roundedFctm).toEqual([
      1.6, 1.9, 2.2, 2.6, 2.9, 3.2, 3.5, 3.8, 4.1, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2,
    ]);
  });
});
