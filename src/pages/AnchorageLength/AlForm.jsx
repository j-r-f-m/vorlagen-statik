import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { MathJax } from "better-react-mathjax";
import { calculateAl } from "../../calculations/anchorageLength/anchorageLength";

export function AlForm() {
  // const [result, setResult] = useState({ nStäbe: null });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // string -> number
    const iptFck = Number(data.fck);
    const iptThetaS = Number(data.thetaS);
    const iptAlphaA = Number(data.alphaA);
    const iptAsErf = Number(data.asErf);
    const iptAsVor = Number(data.asVor);
    // object
    const currAnchorageLength = calculateAl(
      iptFck,
      data.verbund,
      iptThetaS,
      iptAlphaA,
      iptAsErf,
      iptAsVor,
      data.lagerung,
      data.stab
    );
  };

  return (
    <>
      <Accordion
        className="mt-3"
        style={{ width: "100%" }}
        defaultActiveKey="0"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Berechnung</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                {/* ---------------------------- inputs -------------------------- */}
                {/* stegbreite */}
                <MathJax>
                  {
                    "\\(l_{b,eq} = \\alpha_{a} \\cdot l_{b,rqd} \\cdot \\frac{A_{s,erf}}{A_{s,vorh}} 	\\geq l_{b,min}\\)"
                  }
                </MathJax>
                <div className="mb-3 mt-2">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\(f_{ck} \\)"}</MathJax>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Betonfestigkeitsklasse"
                      aria-label="Betonfestigkeitsklasse"
                      aria-describedby="basic-addon1"
                      autoFocus
                      {...register("fck", {
                        required: true,
                      })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\([N/mm²] \\)"}</MathJax>
                    </InputGroup.Text>
                  </InputGroup>

                  {errors.fck && (
                    <div className="error-validation mt-1 ms-2 text-danger">
                      Betonfestigkeitsklasse
                    </div>
                  )}
                </div>

                {/* Verbundbedingung */}
                <div className="mb-3">
                  <Form.Select
                    aria-label="Lagerungsart"
                    {...register("verbund", {
                      required: true,
                    })}
                  >
                    <option value="guterVerbund">Gute Verbundbedingung</option>
                    <option value="schlechterVerbund">
                      Schlechte Verbundbedingung
                    </option>
                  </Form.Select>
                </div>

                <div className="mb-3">
                  {/* alpha_a */}
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\(\\alpha_{a} \\)"}</MathJax>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Verankerungsart"
                      aria-label="Verankerungsart"
                      aria-describedby="basic-addon1"
                      {...register("alphaA", {
                        required: true,
                      })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\([-] \\)"}</MathJax>
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.alphaA && (
                    <div className="error-validation mt-1 ms-2 text-danger">
                      Beiwert zur Berücksichtigung der Verankerungsart
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <Form.Select
                    aria-label="Lagerungsart"
                    {...register("lagerung", {
                      required: true,
                    })}
                  >
                    <option value="direkt">Direkte Lagerung</option>
                    <option value="indirekt">Indirekte Lagerung</option>
                  </Form.Select>
                </div>

                <div className="mb-3">
                  {/* theta */}
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\(\\theta_{s} \\)"}</MathJax>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Stabdurchmesser"
                      aria-label="Stabdurchmesser"
                      aria-describedby="basic-addon1"
                      {...register("thetaS", {
                        required: true,
                      })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\([mm] \\)"}</MathJax>
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.thetaS && (
                    <div className="error-validation mt-1 ms-2 text-danger">
                      Stabdurchmesser
                    </div>
                  )}
                </div>

                {/* Stabart */}
                <div className="mb-3">
                  <Form.Select
                    aria-label="Stabart"
                    {...register("stab", {
                      required: true,
                    })}
                  >
                    <option value="zugstab">Zugstab</option>
                    <option value="druckstab">Druckstab</option>
                  </Form.Select>
                </div>

                <div className="mb-3">
                  {/* theta_bügel */}
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\(A_{s,erf} \\)"}</MathJax>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="As erforderlich"
                      aria-label="As erforderlichl"
                      aria-describedby="basic-addon1"
                      {...register("asErf", {
                        required: true,
                      })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\([cm] \\)"}</MathJax>
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.asErf && (
                    <div className="error-validation mt-1 ms-2 text-danger">
                      As erforderlich in cm²
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  {/* theta_stab */}
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\(A_{s,vorh} \\)"}</MathJax>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="As vorhanden"
                      aria-label="As vorhanden"
                      aria-describedby="basic-addon1"
                      {...register("asVor", {
                        required: true,
                      })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <MathJax>{"\\([cm] \\)"}</MathJax>
                    </InputGroup.Text>
                  </InputGroup>

                  {errors.asVor && (
                    <div className="error-validation mt-1 ms-2 text-danger">
                      As vorhanden in cm²
                    </div>
                  )}
                </div>
              </Form.Group>
              <Button type="submit" variant="primary">
                Berechne
              </Button>
            </Form>
            <div className="mt-3 fw-bold">
              lbeq
              {/* Anzahl an Stäben: n = {props.data.data.n} */}
            </div>
            {/* {renderResult} */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* ---------------------------- Output -------------------------- */}
    </>
  );
}
