import { screen } from "@testing-library/react";
import { dMin } from "./maxNumberBars";

import { describe, it, expect } from "vitest";

describe("Biegerollendurchmesser", () => {
  it("theta_längs = 1.2 cm", () => {
    const theta_längs = 1.2; // cm
    const biegeRollenDurchmesser = dMin(theta_längs);

    expect(biegeRollenDurchmesser).toBe(4.8);
    //screen.debug();
  });

  it("theta_längs = 2.5 cm", () => {
    const theta_längs = 2.5; // cm
    const biegeRollenDurchmesser = dMin(theta_längs);

    expect(biegeRollenDurchmesser).toBe(17.5);
    //screen.debug();
  });
});
