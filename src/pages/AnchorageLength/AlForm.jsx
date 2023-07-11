import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { MathJax } from "better-react-mathjax";
import { calculateAl } from "../../calculations/anchorageLength/anchorageLength";
import { PropTypes } from "prop-types";

export function AlForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // the data-object contains the input information of the form
    console.log(data);

    // conver strings to numbers
    const iptFck = Number(data.fck);
    const iptTheta = Number(data.theta);
    const iptAlphaA = Number(data.alphaA);
    const iptAsErf = Number(data.asErf);
    const iptAsVor = Number(data.asVor);

    // calculate anchorage length for given inputs
    const currAnchorageLength = calculateAl(
      iptFck,
      data.verbund,
      iptTheta,
      iptAlphaA,
      iptAsErf,
      iptAsVor,
      data.lagerung,
      data.stab
    );
    console.log(currAnchorageLength);

    // set state
    props.setDataChild(
      currAnchorageLength.name,
      currAnchorageLength.fck,
      currAnchorageLength.fctk005,
      currAnchorageLength.fctm,
      currAnchorageLength.verbund,
      currAnchorageLength.fbd,
      currAnchorageLength.fyd,
      currAnchorageLength.lbrqd,
      currAnchorageLength.lbeq,
      currAnchorageLength.lagerung,
      currAnchorageLength.stab,
      currAnchorageLength.alpha,
      currAnchorageLength.theta,
      currAnchorageLength.lbmin,
      currAnchorageLength.lbeqDir,
      currAnchorageLength.lbeqIndir,
      currAnchorageLength.asErf,
      currAnchorageLength.asVorh
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
                <MathJax>
                  {
                    "\\(l_{b,eq} = \\alpha_{a} \\cdot l_{b,rqd} \\cdot \\frac{A_{s,erf}}{A_{s,vorh}} 	\\geq l_{b,min}\\)"
                  }
                </MathJax>

                {/* fck */}
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

                {/* alpha_a */}
                <div className="mb-3">
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

                {/* Lagerungsbedingung */}
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

                {/* theta */}
                <div className="mb-3">
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
                      {...register("theta", {
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
                    <option value="Zugstab">Zugstab</option>
                    <option value="Druckstab">Druckstab</option>
                  </Form.Select>
                </div>

                {/* A_s,erf */}
                <div className="mb-3">
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

                {/* A_s,vorh */}
                <div className="mb-3">
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

            {/* Schnelle ergebnisanzeige */}
            <div className="mt-3 fw-bold">lbeq = {props.data.lbeq} mm</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* ---------------------------- Output -------------------------- */}
    </>
  );
}

AlForm.propTypes = {
  setDataChild: PropTypes.func,
  data: PropTypes.object,
  lbeq: PropTypes.number,
};
